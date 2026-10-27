"use client";

import Link from "next/link";
import { AudioLines, BookOpen, ListPlus } from "lucide-react";
import type { Track } from "@/lib/data/music";
import { formatTime } from "@/lib/format";
import { usePlayer } from "./PlayerProvider";

/** Playable track table: a click plays the list from that track. */
export function TrackList({ tracks, showAlbum = false }: { tracks: Track[]; showAlbum?: boolean }) {
  const player = usePlayer();
  const hasLinks = tracks.some((t) => t.accompanies);

  return (
    <div className="glass overflow-x-auto rounded-card">
      <table className="w-full min-w-[32rem] border-collapse text-sm">
        <thead>
          <tr className="text-left text-xs text-muted">
            <th scope="col" className="w-12 px-4 py-3 font-semibold">#</th>
            <th scope="col" className="px-2 py-3 font-semibold">Titre</th>
            {showAlbum && <th scope="col" className="px-2 py-3 font-semibold">Album</th>}
            {hasLinks && <th scope="col" className="px-2 py-3 font-semibold">Accompagne</th>}
            <th scope="col" className="px-2 py-3 text-right font-semibold">Durée</th>
            <th scope="col" className="w-14 px-2 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, i) => {
            const isCurrent = player.current?.id === track.id;
            return (
              <tr key={track.id} className={`border-t border-border/70 ${isCurrent ? "bg-accent-soft/60" : "hover:bg-white/60"}`}>
                <td className="px-4 text-xs tabular-nums text-muted">
                  {isCurrent && player.playing ? <AudioLines className="size-4 text-accent" aria-label="En lecture" /> : i + 1}
                </td>
                <td className="px-2">
                  <button
                    type="button"
                    onClick={() => (isCurrent ? player.toggle() : player.playTracks(tracks, i))}
                    aria-label={isCurrent && player.playing ? `Mettre en pause ${track.title}` : `Écouter ${track.title}`}
                    className={`flex min-h-12 w-full flex-col items-start justify-center text-left ${isCurrent ? "text-accent-hover" : ""}`}
                  >
                    <span className="font-semibold">{track.title}</span>
                    {showAlbum || <span className="text-xs text-muted">{track.artist}</span>}
                  </button>
                </td>
                {showAlbum && (
                  <td className="px-2">
                    <Link href={`/musique/album/${track.albumId}`} className="text-muted hover:text-ink">
                      {track.albumTitle}
                    </Link>
                  </td>
                )}
                {hasLinks && (
                  <td className="px-2">
                    {track.accompanies && (
                      <Link href={track.accompanies.href} className="inline-flex items-center gap-1.5 text-xs font-medium text-lit hover:underline">
                        <BookOpen className="size-3.5" aria-hidden />
                        {track.accompanies.label}
                      </Link>
                    )}
                  </td>
                )}
                <td className="px-2 text-right tabular-nums text-muted">{formatTime(track.duration)}</td>
                <td className="px-2">
                  <button
                    type="button"
                    aria-label={`Ajouter ${track.title} à la file d’attente`}
                    onClick={() => player.enqueue([track])}
                    className="flex size-10 items-center justify-center rounded-lg text-muted hover:bg-white hover:text-ink"
                  >
                    <ListPlus className="size-4" aria-hidden />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
