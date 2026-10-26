import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

/** Persistent audio player. Static placeholder until audio streaming exists. */
export function PlayerBar() {
  return (
    <div
      role="region"
      aria-label="Lecteur audio"
      className="glass sticky bottom-3 z-20 mx-6 mb-3 hidden items-center gap-6 rounded-card px-5 py-3 lg:flex"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="size-12 shrink-0 rounded-md bg-surface-muted" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Aucune lecture en cours</p>
          <p className="truncate text-xs text-muted">Choisissez un titre pour commencer</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Précédent" className="flex size-10 items-center justify-center rounded-full text-muted hover:text-ink">
            <SkipBack className="size-5" aria-hidden />
          </button>
          <button type="button" aria-label="Lecture" className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-ink hover:bg-accent-hover">
            <Play className="size-5" aria-hidden />
          </button>
          <button type="button" aria-label="Suivant" className="flex size-10 items-center justify-center rounded-full text-muted hover:text-ink">
            <SkipForward className="size-5" aria-hidden />
          </button>
        </div>
        <div className="h-1 w-72 rounded-full bg-surface-muted" />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 text-muted">
        <Volume2 className="size-5" aria-hidden />
        <label htmlFor="volume" className="sr-only">
          Volume
        </label>
        <input id="volume" type="range" min={0} max={100} defaultValue={70} className="w-24 accent-accent" />
      </div>
    </div>
  );
}
