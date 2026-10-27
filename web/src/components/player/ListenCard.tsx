"use client";

import Link from "next/link";
import { Pause, Play } from "lucide-react";
import type { Album } from "@/lib/data/music";
import { formatTotal } from "@/lib/format";
import { usePlayer } from "./PlayerProvider";

/** "Écouter en regardant": plays an album in the shared player while the page stays open. */
export function ListenCard({ album, title = "Écouter en regardant" }: { album: Album; title?: string }) {
  const player = usePlayer();
  const playingThis = player.playing && player.current?.albumId === album.id;
  // Computed here rather than imported, to keep the sample catalogue out of the client bundle.
  const total = album.tracks.reduce((sum, t) => sum + t.duration, 0);

  return (
    <section className="glass flex flex-col gap-3 rounded-card p-5">
      <h2 className="text-base font-semibold">{title}</h2>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={playingThis ? `Mettre en pause ${album.title}` : `Écouter ${album.title}`}
          onClick={() => (playingThis ? player.toggle() : player.playTracks(album.tracks))}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink hover:bg-accent-hover"
        >
          {playingThis ? <Pause className="size-5" aria-hidden /> : <Play className="size-5" aria-hidden />}
        </button>
        <div className="min-w-0">
          <Link href={`/musique/album/${album.id}`} className="block truncate text-sm font-semibold hover:text-accent-hover">
            {album.title}
          </Link>
          <p className="truncate text-xs text-muted">
            {album.artist} · {album.tracks.length} titre{album.tracks.length > 1 ? "s" : ""} · {formatTotal(total)}
          </p>
        </div>
      </div>
      <p className="text-xs text-muted">La musique continue pendant que vous parcourez les œuvres.</p>
    </section>
  );
}
