"use client";

import { useState } from "react";
import Link from "next/link";
import { domains } from "@/lib/domains";
import type { Trilogy } from "@/lib/data/home";
import { Cover } from "@/components/works/Cover";

type DailyTrilogyProps = {
  moods: string[];
  trilogies: Record<string, Trilogy>;
};

/** Read, listen, look: one cross-media selection per mood. */
export function DailyTrilogy({ moods, trilogies }: DailyTrilogyProps) {
  const [mood, setMood] = useState(moods[0]);
  const trilogy = trilogies[mood];

  return (
    <section className="flex flex-col gap-5" aria-labelledby="trilogy-title">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted">Votre sélection du moment</p>
          <h1 id="trilogy-title" className="text-3xl font-bold tracking-tight md:text-4xl">
            Ma journée culturelle
          </h1>
        </div>
        <div role="group" aria-label="Humeur du moment" className="flex flex-wrap gap-2">
          {moods.map((m) => {
            const active = m === mood;
            return (
              <button
                key={m}
                type="button"
                aria-pressed={active}
                onClick={() => setMood(m)}
                className={`min-h-10 rounded-full px-4 text-sm transition-colors ${
                  active ? "bg-accent font-semibold text-accent-ink" : "glass text-muted hover:text-ink"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {trilogy.items.map((item) => {
          const domain = domains[item.domain];
          return (
            <li key={item.domain}>
              <Link
                href={item.href}
                className="glass group flex h-full flex-col gap-4 rounded-card p-4 transition-shadow hover:shadow-lg"
              >
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${domain.soft} ${domain.text}`}>
                  {domain.action} · {item.duration}
                </span>
                <Cover domain={item.domain} className="h-40 w-full" />
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold leading-snug group-hover:text-accent-hover">{item.title}</p>
                  <p className="text-sm text-muted">
                    {item.creator} · {item.detail}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="text-sm text-muted" aria-live="polite">
        Pourquoi cette sélection ? {trilogy.reason}{" "}
        <Link href="/onboarding" className="font-medium text-accent-hover hover:underline">
          Ajuster mon génome culturel
        </Link>
      </p>
    </section>
  );
}
