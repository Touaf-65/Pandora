"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ListMusic, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { usePlayer } from "@/components/player/PlayerProvider";
import { QueuePanel } from "@/components/player/QueuePanel";
import { Cover } from "@/components/works/Cover";
import { formatTime } from "@/lib/format";

const iconButton = "flex size-10 items-center justify-center rounded-full text-muted hover:text-ink disabled:opacity-40";

/** Persistent audio player at the bottom of every app page. */
export function PlayerBar() {
  const player = usePlayer();
  const [queueOpen, setQueueOpen] = useState(false);
  const { current } = player;

  const playButton = (
    <button
      type="button"
      aria-label={player.playing ? "Pause" : "Lecture"}
      disabled={!current}
      onClick={player.toggle}
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink hover:bg-accent-hover disabled:opacity-40"
    >
      {player.playing ? <Pause className="size-5" aria-hidden /> : <Play className="size-5" aria-hidden />}
    </button>
  );

  return (
    <>
      {/* Desktop */}
      <div
        role="region"
        aria-label="Lecteur audio"
        className="glass sticky bottom-3 z-20 mx-6 mb-3 hidden items-center gap-6 rounded-card px-5 py-3 lg:flex"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {current ? (
            <>
              <Cover domain="mus" className="size-12 shrink-0" />
              <div className="min-w-0">
                <Link href={`/musique/album/${current.albumId}`} className="block truncate text-sm font-semibold hover:text-accent-hover">
                  {current.title}
                </Link>
                {current.artistId ? (
                  <Link href={`/musique/artiste/${current.artistId}`} className="block truncate text-xs text-muted hover:text-ink">
                    {current.artist}
                  </Link>
                ) : (
                  <p className="truncate text-xs text-muted">{current.artist}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="size-12 shrink-0 rounded-md bg-surface-muted" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Aucune lecture en cours</p>
                <p className="truncate text-xs text-muted">Choisissez un titre pour commencer</p>
              </div>
            </>
          )}
        </div>

        <div className="flex w-full max-w-md flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Précédent" disabled={!current} onClick={player.previous} className={iconButton}>
              <SkipBack className="size-5" aria-hidden />
            </button>
            {playButton}
            <button
              type="button"
              aria-label="Suivant"
              disabled={!current || player.index >= player.queue.length - 1}
              onClick={player.next}
              className={iconButton}
            >
              <SkipForward className="size-5" aria-hidden />
            </button>
          </div>
          <div className="flex w-full items-center gap-2 text-xs tabular-nums text-muted">
            <span className="w-9 text-right">{formatTime(player.position)}</span>
            <input
              type="range"
              aria-label="Position dans le titre"
              aria-valuetext={`${formatTime(player.position)} sur ${formatTime(current?.duration ?? 0)}`}
              min={0}
              max={current?.duration ?? 0}
              value={player.position}
              disabled={!current}
              onChange={(e) => player.seek(Number(e.target.value))}
              className="h-1 flex-1 accent-accent"
            />
            <span className="w-9">{formatTime(current?.duration ?? 0)}</span>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-end gap-2 text-muted">
          {current?.accompanies && (
            <Link
              href={current.accompanies.href}
              className="hidden items-center gap-1.5 truncate rounded-full bg-lit-soft px-3 py-1.5 text-xs font-semibold text-lit xl:flex"
            >
              <BookOpen className="size-3.5" aria-hidden />
              {current.accompanies.label}
            </Link>
          )}
          <button
            type="button"
            aria-label="File d’attente"
            aria-expanded={queueOpen}
            aria-controls="queue-panel"
            onClick={() => setQueueOpen(!queueOpen)}
            className={`${iconButton} ${queueOpen ? "bg-accent-soft text-accent-hover" : ""}`}
          >
            <ListMusic className="size-5" aria-hidden />
          </button>
          <Volume2 className="size-5 shrink-0" aria-hidden />
          <input
            type="range"
            aria-label="Volume"
            min={0}
            max={100}
            value={player.volume}
            onChange={(e) => player.setVolume(Number(e.target.value))}
            className="w-24 accent-accent"
          />
          {queueOpen && <QueuePanel onClose={() => setQueueOpen(false)} />}
        </div>
      </div>

      {/* Mobile: compact bar once something is loaded, above the bottom navigation */}
      {current && (
        <div
          role="region"
          aria-label="Lecteur audio"
          className="glass sticky bottom-[5.25rem] z-20 mx-3 mb-2 flex items-center gap-3 rounded-card p-2.5 lg:hidden"
        >
          <Cover domain="mus" className="size-10 shrink-0" />
          <Link href={`/musique/album/${current.albumId}`} className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{current.title}</p>
            <p className="truncate text-xs text-muted">{current.artist}</p>
          </Link>
          {playButton}
          <button
            type="button"
            aria-label="Suivant"
            disabled={player.index >= player.queue.length - 1}
            onClick={player.next}
            className={iconButton}
          >
            <SkipForward className="size-5" aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
