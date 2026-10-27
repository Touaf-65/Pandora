"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, ChevronLeft, ChevronRight, Lock, Pause, Play } from "lucide-react";
import type { Chapter } from "@/lib/data/literature";
import type { Track } from "@/lib/data/music";
import { usePlayer } from "@/components/player/PlayerProvider";
import { buttonClasses } from "@/components/ui/Button";
import { Cover } from "@/components/works/Cover";

type Theme = "jour" | "sepia" | "nuit";

const themes: { id: Theme; label: string; swatch: string }[] = [
  { id: "jour", label: "Jour", swatch: "bg-white text-[#1f2937]" },
  { id: "sepia", label: "Sépia", swatch: "bg-[#f6efe1] text-[#3b2f1e]" },
  { id: "nuit", label: "Nuit", swatch: "bg-[#111318] text-[#e6e6e3]" },
];

const MIN_SIZE = 15;
const MAX_SIZE = 26;

export type ReaderProps = {
  workTitle: string;
  workHref: string;
  publicDomain: boolean;
  chapter: Chapter;
  chapterCount: number;
  prevHref?: string;
  nextHref?: string;
  /** Chapter soundtrack, played by the shared player so it continues after leaving the reader. */
  soundtrack?: Track;
};

export function Reader({ workTitle, workHref, publicDomain, chapter, chapterCount, prevHref, nextHref, soundtrack }: ReaderProps) {
  const [theme, setTheme] = useState<Theme>("jour");
  const [size, setSize] = useState(19);
  const [bookmarked, setBookmarked] = useState(false);
  const player = usePlayer();
  const soundtrackIsCurrent = !!soundtrack && player.current?.id === soundtrack.id;
  const playing = soundtrackIsCurrent && player.playing;
  const toggleSoundtrack = () => {
    if (!soundtrack) return;
    if (soundtrackIsCurrent) player.toggle();
    else player.playTracks([soundtrack]);
  };

  const locked = chapter.access === "premium";
  const control =
    "flex size-11 items-center justify-center rounded-xl border border-(--reader-line) text-(--reader-ink) hover:bg-(--reader-mark) disabled:opacity-40";

  return (
    <div data-theme={theme} className="reader flex min-h-screen flex-col bg-(--reader-bg) text-(--reader-ink) transition-colors">
      <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-(--reader-line) bg-(--reader-bg)/90 px-4 py-2.5 backdrop-blur md:px-6">
        <Link href={workHref} aria-label={`Retour à la fiche de ${workTitle}`} className={control}>
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{workTitle}</p>
          <p className="truncate text-xs text-(--reader-muted)">
            Chapitre {chapter.number} · {chapter.title}
          </p>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div role="group" aria-label="Thème de lecture" className="flex gap-1 rounded-xl border border-(--reader-line) p-1">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={theme === t.id}
                onClick={() => setTheme(t.id)}
                className={`min-h-9 rounded-lg px-3 text-xs font-semibold ring-2 ${t.swatch} ${
                  theme === t.id ? "ring-accent" : "ring-transparent"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Réduire le texte"
            disabled={size <= MIN_SIZE}
            onClick={() => setSize(size - 1)}
            className={`${control} text-sm`}
          >
            A−
          </button>
          <button
            type="button"
            aria-label="Agrandir le texte"
            disabled={size >= MAX_SIZE}
            onClick={() => setSize(size + 1)}
            className={`${control} text-lg`}
          >
            A+
          </button>
          <button
            type="button"
            aria-label={bookmarked ? "Retirer le marque-page" : "Ajouter un marque-page"}
            aria-pressed={bookmarked}
            onClick={() => setBookmarked(!bookmarked)}
            className={control}
          >
            <Bookmark className={`size-5 ${bookmarked ? "fill-current text-accent" : ""}`} aria-hidden />
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 md:px-6 lg:flex-row lg:justify-center">
        {/* --font-literata is set by the reader page, which loads the font only for this route. */}
        <article
          className="w-full max-w-[42rem] leading-[1.75]"
          style={{ fontSize: size, fontFamily: "var(--font-literata), Georgia, serif" }}
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-(--reader-muted)">
            Chapitre {chapter.number}
          </p>
          <h1 className="mt-2 mb-8 text-[2em] font-semibold leading-tight">{chapter.title}</h1>

          {locked ? (
            <div className="flex flex-col items-start gap-4 rounded-card border border-(--reader-line) p-6 font-sans text-base">
              <Lock className="size-6 text-lit" aria-hidden />
              <p className="font-semibold">Ce chapitre est réservé aux abonnés Premium.</p>
              <p className="text-sm text-(--reader-muted)">
                Premium Local dès 1,99 € par mois : sans publicité, chapitres exclusifs et lecture hors ligne.
              </p>
              <Link href="/compte/abonnement" className={buttonClasses("primary")}>
                Voir les formules
              </Link>
            </div>
          ) : chapter.paragraphs ? (
            <div className="flex flex-col gap-[1.1em]">
              {chapter.paragraphs.map((paragraph, i) => (
                <div key={i} className="contents">
                  <p className="whitespace-pre-line">{paragraph}</p>
                  {i === 0 && chapter.illustration && (
                    <figure className="my-4 flex flex-col gap-2">
                      <Cover domain="art" className="h-64 w-full" />
                      <figcaption className="font-sans text-sm text-(--reader-muted)">{chapter.illustration.caption}</figcaption>
                    </figure>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="font-sans text-base text-(--reader-muted)">
              {publicDomain
                ? "Le texte intégral de cette œuvre du domaine public sera importé prochainement."
                : "Ce chapitre n’est pas encore disponible dans la démo."}
            </p>
          )}
        </article>

        {chapter.soundtrack && soundtrack && !locked && (
          <aside className="flex w-full flex-col gap-4 font-sans lg:sticky lg:top-24 lg:w-72 lg:self-start">
            <section className="flex flex-col gap-3 rounded-card border border-(--reader-line) p-4">
              <h2 className="text-sm font-semibold">Bande-son du chapitre</h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={playing ? "Mettre en pause la bande-son" : "Lire la bande-son"}
                  aria-pressed={playing}
                  onClick={toggleSoundtrack}
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink hover:bg-accent-hover"
                >
                  {playing ? <Pause className="size-5" aria-hidden /> : <Play className="size-5" aria-hidden />}
                </button>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{chapter.soundtrack.title}</p>
                  <p className="truncate text-xs text-(--reader-muted)">
                    {chapter.soundtrack.artist} · {chapter.soundtrack.duration}
                  </p>
                </div>
              </div>
            </section>
            <section className="flex flex-col gap-2 rounded-card border border-(--reader-line) p-4">
              <h2 className="text-sm font-semibold">Annotations</h2>
              <p className="text-sm text-(--reader-muted)">
                Sélectionnez un passage pour le surligner, l’annoter ou le partager.
              </p>
            </section>
          </aside>
        )}
      </div>

      <footer className="sticky bottom-0 flex flex-wrap items-center gap-4 border-t border-(--reader-line) bg-(--reader-bg)/90 px-4 py-3 font-sans backdrop-blur md:px-6">
        {prevHref ? (
          <Link href={prevHref} className="flex min-h-11 items-center gap-1 rounded-xl border border-(--reader-line) px-3 text-sm hover:bg-(--reader-mark)">
            <ChevronLeft className="size-4" aria-hidden />
            Précédent
          </Link>
        ) : (
          <span className="min-h-11 w-[6.5rem]" />
        )}
        <div className="flex min-w-40 flex-1 flex-col gap-1.5">
          <div
            role="progressbar"
            aria-label="Progression dans l’œuvre"
            aria-valuenow={chapter.number}
            aria-valuemin={1}
            aria-valuemax={chapterCount}
            className="h-1.5 rounded-full bg-(--reader-line)"
          >
            <div className="h-full rounded-full bg-accent" style={{ width: `${(chapter.number / chapterCount) * 100}%` }} />
          </div>
          <p className="text-center text-xs text-(--reader-muted)">
            Chapitre {chapter.number} sur {chapterCount} · environ {chapter.minutes} min
          </p>
        </div>
        {nextHref ? (
          <Link href={nextHref} className="flex min-h-11 items-center gap-1 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-ink hover:bg-accent-hover">
            Suivant
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        ) : (
          <Link href={workHref} className="flex min-h-11 items-center rounded-xl border border-(--reader-line) px-4 text-sm hover:bg-(--reader-mark)">
            Retour à la fiche
          </Link>
        )}
      </footer>
    </div>
  );
}
