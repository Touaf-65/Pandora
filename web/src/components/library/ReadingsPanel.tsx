"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Highlighter } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Cover } from "@/components/works/Cover";
import type { Reading, ReadingStatus } from "@/lib/data/library";

const FILTERS: ("Tout" | ReadingStatus)[] = ["Tout", "En cours", "À lire", "Terminé"];

const badge: Record<ReadingStatus, string> = {
  "En cours": "bg-accent-soft text-accent-hover",
  "À lire": "bg-surface-muted text-muted",
  Terminé: "bg-success-soft text-success",
};

const action: Record<ReadingStatus, string> = { "En cours": "Reprendre", "À lire": "Commencer", Terminé: "Relire" };

export function ReadingsPanel({ readings }: { readings: Reading[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Tout");
  const shown = filter === "Tout" ? readings : readings.filter((r) => r.status === filter);

  return (
    <div className="flex flex-col gap-4">
      <div role="group" aria-label="Filtrer les lectures" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const n = f === "Tout" ? readings.length : readings.filter((r) => r.status === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-sm transition-colors ${
                active ? "bg-accent font-semibold text-accent-ink" : "glass text-muted hover:text-ink"
              }`}
            >
              {f}
              <span className={active ? "opacity-80" : "text-xs"}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul className="flex flex-col gap-3">
        {shown.map((r) => (
          <li key={r.slug} className="glass flex flex-col gap-4 rounded-card p-4 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <Cover domain="lit" className="h-20 w-14 shrink-0" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/litterature/${r.slug}`} className="truncate font-semibold hover:text-accent-hover">
                    {r.title}
                  </Link>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge[r.status]}`}>{r.status}</span>
                </div>
                <p className="truncate text-sm text-muted">
                  {r.author} · {r.lastRead}
                </p>
                {r.status !== "À lire" && (
                  <div className="flex items-center gap-3">
                    <div
                      role="progressbar"
                      aria-label={`Progression : ${r.title}`}
                      aria-valuenow={r.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="h-1.5 max-w-64 flex-1 rounded-full bg-surface-muted"
                    >
                      <div
                        className={`h-full rounded-full ${r.status === "Terminé" ? "bg-success" : "bg-accent"}`}
                        style={{ width: `${r.percent}%` }}
                      />
                    </div>
                    <span className="shrink-0 text-xs text-muted">
                      {r.status === "Terminé" ? "Terminé" : `Chapitre ${r.chapter} sur ${r.totalChapters}`}
                    </span>
                  </div>
                )}
                {r.annotations > 0 && (
                  <p className="inline-flex items-center gap-1 text-xs text-muted">
                    <Highlighter className="size-3.5" aria-hidden />
                    {r.annotations} annotation{r.annotations > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
            <Link
              href={r.href}
              aria-label={`${action[r.status]} ${r.title}`}
              className={buttonClasses(r.status === "En cours" ? "primary" : "secondary", "shrink-0")}
            >
              <BookOpen className="size-4" aria-hidden />
              {action[r.status]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
