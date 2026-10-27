"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Thumbnail } from "@/components/search/ResultCard";
import { domains, type Domain } from "@/lib/domains";
import { MOODS, type Mood, type SearchItem } from "@/lib/search";

const DOMAIN_ORDER: Domain[] = ["lit", "mus", "art"];
const PER_DOMAIN = 3;

const moodLines: Record<Mood, string> = {
  Apaisé: "Des pages lentes, du piano et des lumières douces.",
  Curieux: "Des voix nouvelles et des univers à découvrir.",
  Énergique: "Récits courts, rythmes rapides, couleurs vives.",
  Mélancolique: "Poésie, pluie et nuits étoilées.",
  Inspiré: "Des œuvres qui dialoguent entre les arts.",
};

/** Pick a mood, get a cross-domain mix: something to read, to listen to and to look at. */
export function MoodExplorer({ works }: { works: SearchItem[] }) {
  const [mood, setMood] = useState<Mood>(MOODS[0]);
  const matching = works.filter((w) => w.moods.includes(mood));

  return (
    <div className="flex flex-col gap-5">
      <div role="group" aria-label="Choisir une humeur" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {MOODS.map((m) => {
          const active = m === mood;
          return (
            <button
              key={m}
              type="button"
              aria-pressed={active}
              onClick={() => setMood(m)}
              className={`glass flex min-h-24 flex-col items-start gap-1 rounded-card p-4 text-left ring-2 transition ${
                active ? "ring-accent" : "ring-transparent hover:shadow-lg"
              }`}
            >
              <span className={`text-base font-semibold ${active ? "text-accent-hover" : ""}`}>{m}</span>
              <span className="text-xs leading-snug text-muted">{moodLines[m]}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3" aria-live="polite">
        {DOMAIN_ORDER.map((d) => {
          const { action, icon: Icon, label, text } = domains[d];
          const items = matching.filter((w) => w.domain === d).slice(0, PER_DOMAIN);
          return (
            <section key={d} aria-label={`${action} — ${label}`} className="glass flex flex-col gap-3 rounded-card p-4">
              <h3 className={`flex items-center gap-2 text-sm font-semibold ${text}`}>
                <Icon className="size-4" aria-hidden />
                {action}
              </h3>
              {items.length === 0 ? (
                <p className="text-sm text-muted">Rien pour cette humeur pour l’instant.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item.id}>
                      <Link href={item.href} className="group flex items-center gap-3 rounded-xl p-1.5 hover:bg-white/70">
                        <div className="w-14 shrink-0">
                          <Thumbnail item={item} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold group-hover:text-accent-hover">{item.title}</p>
                          <p className="truncate text-xs text-muted">{item.subtitle}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <Link
        href={`/recherche?humeur=${encodeURIComponent(mood)}`}
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent-hover hover:underline"
      >
        Toutes les œuvres « {mood} » ({matching.length})
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
