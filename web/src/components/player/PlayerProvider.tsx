"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import type { Track } from "@/lib/data/music";

type State = {
  queue: Track[];
  /** Index of the current track in the queue, -1 when empty. */
  index: number;
  playing: boolean;
  /** Seconds into the current track. */
  position: number;
};

type Action =
  | { type: "play"; tracks: Track[]; start: number }
  | { type: "toggle" }
  | { type: "next" }
  | { type: "previous" }
  | { type: "seek"; position: number }
  | { type: "jump"; index: number }
  | { type: "enqueue"; tracks: Track[] }
  | { type: "remove"; index: number }
  | { type: "clear" }
  | { type: "tick" };

const initialState: State = { queue: [], index: -1, playing: false, position: 0 };

/** Seconds after which "previous" restarts the track instead of going back. */
const RESTART_THRESHOLD = 3;

function reducer(state: State, action: Action): State {
  const current = state.queue[state.index];
  switch (action.type) {
    case "play":
      return { queue: action.tracks, index: action.start, playing: true, position: 0 };
    case "toggle":
      return current ? { ...state, playing: !state.playing } : state;
    case "next":
      return state.index + 1 < state.queue.length
        ? { ...state, index: state.index + 1, position: 0 }
        : { ...state, playing: false, position: 0 };
    case "previous":
      if (state.position > RESTART_THRESHOLD || state.index === 0) return { ...state, position: 0 };
      return { ...state, index: state.index - 1, position: 0 };
    case "seek":
      return current ? { ...state, position: Math.min(Math.max(action.position, 0), current.duration) } : state;
    case "jump":
      return { ...state, index: action.index, position: 0, playing: true };
    case "enqueue": {
      const queue = [...state.queue, ...action.tracks];
      return state.index === -1 ? { ...state, queue, index: 0, position: 0 } : { ...state, queue };
    }
    case "remove": {
      const queue = state.queue.filter((_, i) => i !== action.index);
      if (queue.length === 0) return initialState;
      if (action.index < state.index) return { ...state, queue, index: state.index - 1 };
      if (action.index === state.index) return { ...state, queue, index: Math.min(state.index, queue.length - 1), position: 0 };
      return { ...state, queue };
    }
    case "clear":
      return initialState;
    case "tick": {
      if (!state.playing || !current) return state;
      if (state.position + 1 < current.duration) return { ...state, position: state.position + 1 };
      return state.index + 1 < state.queue.length
        ? { ...state, index: state.index + 1, position: 0 }
        : { ...state, playing: false, position: 0 };
    }
  }
}

type Player = State & {
  current: Track | undefined;
  volume: number;
  playTracks: (tracks: Track[], start?: number) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (position: number) => void;
  jumpTo: (index: number) => void;
  enqueue: (tracks: Track[]) => void;
  removeAt: (index: number) => void;
  clear: () => void;
  setVolume: (volume: number) => void;
};

const PlayerContext = createContext<Player | null>(null);

/**
 * Audio player shared by every page, so playback continues across navigation.
 * Tracks have no audio files yet: playback is simulated with a one-second clock.
 * Real streaming will replace the clock with an <audio> element driven by this state.
 */
export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    if (!state.playing) return;
    const timer = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(timer);
  }, [state.playing]);

  const player = useMemo<Player>(
    () => ({
      ...state,
      current: state.queue[state.index],
      volume,
      playTracks: (tracks, start = 0) => dispatch({ type: "play", tracks, start }),
      toggle: () => dispatch({ type: "toggle" }),
      next: () => dispatch({ type: "next" }),
      previous: () => dispatch({ type: "previous" }),
      seek: (position) => dispatch({ type: "seek", position }),
      jumpTo: (index) => dispatch({ type: "jump", index }),
      enqueue: (tracks) => dispatch({ type: "enqueue", tracks }),
      removeAt: (index) => dispatch({ type: "remove", index }),
      clear: () => dispatch({ type: "clear" }),
      setVolume,
    }),
    [state, volume],
  );

  return <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const player = useContext(PlayerContext);
  if (!player) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return player;
}
