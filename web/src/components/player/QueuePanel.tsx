"use client";

import { AudioLines, X } from "lucide-react";
import { formatTime } from "@/lib/format";
import { usePlayer } from "./PlayerProvider";

export function QueuePanel({ onClose }: { onClose: () => void }) {
  const player = usePlayer();

  return (
    <section
      id="queue-panel"
      aria-label="File d’attente"
      className="glass-strong absolute right-0 bottom-full mb-4 flex max-h-[60vh] w-96 flex-col gap-3 rounded-card p-4 text-ink"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">File d’attente</h2>
        <div className="flex items-center gap-1">
          {player.queue.length > 0 && (
            <button type="button" onClick={player.clear} className="min-h-9 rounded-lg px-2.5 text-xs font-medium text-muted hover:text-ink">
              Tout effacer
            </button>
          )}
          <button
            type="button"
            aria-label="Fermer la file d’attente"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-lg text-muted hover:text-ink"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      {player.queue.length === 0 ? (
        <p className="text-sm text-muted">La file est vide. Ajoutez des titres depuis un album ou une playlist.</p>
      ) : (
        <ol className="-mx-1 flex flex-col gap-0.5 overflow-y-auto">
          {player.queue.map((track, i) => {
            const isCurrent = i === player.index;
            return (
              <li key={`${track.id}-${i}`} className="group flex items-center gap-1">
                <button
                  type="button"
                  aria-current={isCurrent ? "true" : undefined}
                  onClick={() => player.jumpTo(i)}
                  className={`flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-lg px-2 text-left ${
                    isCurrent ? "bg-accent-soft" : "hover:bg-white/70"
                  }`}
                >
                  <span className="flex w-5 shrink-0 justify-center text-xs tabular-nums text-muted">
                    {isCurrent ? <AudioLines className="size-4 text-accent" aria-label="En cours" /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-sm ${isCurrent ? "font-semibold text-accent-hover" : "font-medium"}`}>
                      {track.title}
                    </span>
                    <span className="block truncate text-xs text-muted">{track.artist}</span>
                  </span>
                  <span className="text-xs tabular-nums text-muted">{formatTime(track.duration)}</span>
                </button>
                <button
                  type="button"
                  aria-label={`Retirer ${track.title} de la file`}
                  onClick={() => player.removeAt(i)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted opacity-60 hover:text-danger group-hover:opacity-100"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
