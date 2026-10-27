"use client";

import { useState } from "react";
import { ListMusic } from "lucide-react";
import { PlayCollectionButtons } from "@/components/player/PlayCollectionButtons";
import { TrackList } from "@/components/player/TrackList";
import { usePlayer } from "@/components/player/PlayerProvider";
import type { Playlist } from "@/lib/data/library";
import { formatTotal } from "@/lib/format";

/** The reader's own playlists: pick one on the left, play it on the right. */
export function PlaylistsPanel({ playlists }: { playlists: Playlist[] }) {
  const [selectedId, setSelectedId] = useState(playlists[0]?.id);
  const player = usePlayer();
  const selected = playlists.find((p) => p.id === selectedId);

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <ul className="flex shrink-0 flex-col gap-2 lg:w-64">
        {playlists.map((p) => {
          const active = p.id === selectedId;
          const playing = player.playing && p.tracks.some((t) => t.id === player.current?.id);
          return (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(p.id)}
                className={`flex w-full items-center gap-3 rounded-card p-3 text-left ring-2 transition ${
                  active ? "glass ring-accent" : "glass ring-transparent hover:shadow-lg"
                }`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mus-soft text-mus">
                  <ListMusic className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{p.title}</span>
                  <span className="block text-xs text-muted">
                    {p.tracks.length} titres · {formatTotal(p.duration)}
                    {playing && <span className="text-mus"> · en lecture</span>}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {selected && (
        <section aria-label={`Playlist ${selected.title}`} className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">{selected.title}</h3>
            <p className="text-sm text-muted">{selected.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PlayCollectionButtons tracks={selected.tracks} />
          </div>
          <TrackList tracks={selected.tracks} showAlbum />
        </section>
      )}
    </div>
  );
}
