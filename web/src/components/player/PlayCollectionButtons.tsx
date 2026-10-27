"use client";

import { ListPlus, Pause, Play } from "lucide-react";
import type { Track } from "@/lib/data/music";
import { buttonClasses } from "@/components/ui/Button";
import { usePlayer } from "./PlayerProvider";

/** "Écouter" and "Ajouter à la file" for an album, playlist or artist. */
export function PlayCollectionButtons({ tracks, label = "Écouter" }: { tracks: Track[]; label?: string }) {
  const player = usePlayer();
  const ids = new Set(tracks.map((t) => t.id));
  const playingThis = player.playing && !!player.current && ids.has(player.current.id);

  return (
    <>
      <button
        type="button"
        onClick={() => (playingThis ? player.toggle() : player.playTracks(tracks))}
        className={buttonClasses("primary")}
      >
        {playingThis ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
        {playingThis ? "Pause" : label}
      </button>
      <button type="button" onClick={() => player.enqueue(tracks)} className={buttonClasses("secondary")}>
        <ListPlus className="size-4" aria-hidden />
        Ajouter à la file
      </button>
    </>
  );
}
