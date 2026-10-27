"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Image as ImageIcon, Music, Search, Sparkles, X } from "lucide-react";
import { MOODS, score, type Mood, type ResultType, type SearchItem } from "@/lib/search";
import { ResultCard, Thumbnail } from "./ResultCard";

type Tab = "all" | ResultType;
type Duration = "" | "courte" | "moyenne" | "longue";
type Sort = "pertinence" | "az" | "recent";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "lit", label: "Littérature" },
  { id: "mus", label: "Musique" },
  { id: "art", label: "Art visuel" },
  { id: "collections", label: "Playlists et expositions" },
  { id: "people", label: "Créateurs" },
];

const SECTION_ORDER: ResultType[] = ["lit", "mus", "art", "collections", "people"];
const SECTION_PREVIEW = 4;
const SUGGESTIONS = ["pluie", "indigo", "kora", "Hugo", "impressionnisme"];

const DURATIONS: Record<Exclude<Duration, "">, [number, number]> = {
  courte: [0, 15],
  moyenne: [15, 60],
  longue: [60, Infinity],
};

function isMood(value: string | null): value is Mood {
  return !!value && (MOODS as readonly string[]).includes(value);
}

/** Search state lives in the URL (?q=&type=&humeur=…) so results can be shared and reloaded. */
export function SearchExperience({ index }: { index: SearchItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const urlQuery = params.get("q") ?? "";
  const tab = (TABS.some((t) => t.id === params.get("type")) ? params.get("type") : "all") as Tab;
  const moodParam = params.get("humeur");
  const mood = isMood(moodParam) ? moodParam : null;
  const emergingOnly = params.get("emergents") === "1";
  const publicDomainOnly = params.get("domaine-public") === "1";
  const durationParam = params.get("duree");
  const duration = (durationParam && durationParam in DURATIONS ? durationParam : "") as Duration;
  const sortParam = params.get("tri");
  const sort: Sort = sortParam === "az" || sortParam === "recent" ? sortParam : "pertinence";

  // The input keeps its own value while typing; a new search from the top bar resets it.
  const [query, setQuery] = useState(urlQuery);
  const [lastUrlQuery, setLastUrlQuery] = useState(urlQuery);
  if (urlQuery !== lastUrlQuery) {
    setLastUrlQuery(urlQuery);
    setQuery(urlQuery);
  }

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const onQueryChange = (value: string) => {
    setQuery(value);
    // Matches what the URL will hold, so the round trip does not overwrite the input.
    setLastUrlQuery(value.trim());
    update({ q: value.trim() || null });
  };

  // Filter, then sort.
  const filtered = index
    .map((item, order) => ({ item, order, relevance: score(item, query) }))
    .filter(({ item, relevance }) => {
      if (relevance === 0) return false;
      if (mood && !item.moods.includes(mood)) return false;
      if (emergingOnly && !item.emerging) return false;
      if (publicDomainOnly && !item.publicDomain) return false;
      if (duration) {
        const [min, max] = DURATIONS[duration];
        if (item.minutes === undefined || item.minutes < min || item.minutes >= max) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sort === "az") return a.item.title.localeCompare(b.item.title, "fr");
      if (sort === "recent") return (b.item.year ?? -Infinity) - (a.item.year ?? -Infinity);
      return b.relevance - a.relevance || a.order - b.order;
    });

  const counts = Object.fromEntries(
    TABS.map((t) => [t.id, t.id === "all" ? filtered.length : filtered.filter((r) => r.item.type === t.id).length]),
  ) as Record<Tab, number>;
  const results = filtered.filter((r) => tab === "all" || r.item.type === tab).map((r) => r.item);
  const top = query.trim() && tab === "all" ? results[0] : undefined;
  const crossMedia = mood
    ? (["lit", "mus", "art"] as const).map((d) => results.find((r) => r.type === d)).filter((r) => r !== undefined)
    : [];
  const filtersActive = emergingOnly || publicDomainOnly || !!duration || sort !== "pertinence";

  const chip = (active: boolean) =>
    `min-h-10 rounded-full px-4 text-sm transition-colors ${
      active ? "bg-accent font-semibold text-accent-ink" : "glass text-muted hover:text-ink"
    }`;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Recherche</h1>
        <div role="search" className="glass flex h-14 items-center gap-3 rounded-card px-4 focus-within:ring-2 focus-within:ring-accent">
          <Search className="size-5 text-muted" aria-hidden />
          <label htmlFor="search-page-input" className="sr-only">
            Rechercher une œuvre, un créateur, un genre
          </label>
          <input
            id="search-page-input"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Œuvre, créateur, genre, style…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-base placeholder:text-muted focus-visible:outline-none"
          />
          {query && (
            <button
              type="button"
              aria-label="Effacer la recherche"
              onClick={() => onQueryChange("")}
              className="flex size-9 items-center justify-center rounded-lg text-muted hover:text-ink"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Chercher par humeur">
          <span className="mr-1 flex items-center gap-1.5 text-sm font-medium text-muted">
            <Sparkles className="size-4" aria-hidden />
            Humeur
          </span>
          {MOODS.map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mood === m}
              onClick={() => update({ humeur: mood === m ? null : m })}
              className={chip(mood === m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Type de résultat"
        className="flex gap-1 overflow-x-auto border-b border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls="search-results"
            onClick={() => update({ type: t.id === "all" ? null : t.id })}
            className={`-mb-px flex min-h-11 shrink-0 items-center gap-2 border-b-2 px-4 text-sm transition-colors ${
              tab === t.id ? "border-accent font-semibold text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
            <span className="rounded-full bg-surface-muted px-2 text-xs tabular-nums text-muted">{counts[t.id]}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* On small screens the results come first and the filters follow. */}
        <aside
          aria-label="Filtres"
          className="glass order-last flex w-full flex-col gap-5 rounded-card p-5 lg:sticky lg:top-24 lg:order-first lg:w-64"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Filtres</h2>
            {filtersActive && (
              <button
                type="button"
                onClick={() => update({ emergents: null, "domaine-public": null, duree: null, tri: null })}
                className="text-xs font-medium text-accent-hover hover:underline"
              >
                Réinitialiser
              </button>
            )}
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Trier par
            <select
              value={sort}
              onChange={(e) => update({ tri: e.target.value === "pertinence" ? null : e.target.value })}
              className="h-10 rounded-xl border border-border bg-white px-3 text-sm font-normal"
            >
              <option value="pertinence">Pertinence</option>
              <option value="az">Titre, de A à Z</option>
              <option value="recent">Plus récents</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Durée de lecture ou d’écoute
            <select
              value={duration}
              onChange={(e) => update({ duree: e.target.value || null })}
              className="h-10 rounded-xl border border-border bg-white px-3 text-sm font-normal"
            >
              <option value="">Toutes</option>
              <option value="courte">Moins de 15 min</option>
              <option value="moyenne">De 15 à 60 min</option>
              <option value="longue">Plus d’une heure</option>
            </select>
          </label>
          <fieldset className="flex flex-col gap-2.5">
            <legend className="mb-2 text-sm font-medium">Créateurs et droits</legend>
            <label className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={emergingOnly}
                onChange={(e) => update({ emergents: e.target.checked ? "1" : null })}
                className="size-4 accent-accent"
              />
              Créateurs émergents
            </label>
            <label className="flex items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={publicDomainOnly}
                onChange={(e) => update({ "domaine-public": e.target.checked ? "1" : null })}
                className="size-4 accent-accent"
              />
              Domaine public
            </label>
          </fieldset>
        </aside>

        <div id="search-results" role="tabpanel" aria-live="polite" className="flex min-w-0 flex-1 flex-col gap-8">
          {results.length === 0 ? (
            <div className="glass flex flex-col items-start gap-4 rounded-card p-6">
              <p className="text-base font-semibold">Aucun résultat{query.trim() ? ` pour « ${query.trim()} »` : ""}</p>
              <p className="text-sm text-muted">Essayez un autre mot, retirez un filtre, ou partez d’une de ces pistes :</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => onQueryChange(s)} className={chip(false)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {(top || crossMedia.length > 0) && (
                <div className="grid gap-4 md:grid-cols-2">
                  {top && (
                    <Link href={top.href} className="glass group flex items-center gap-5 rounded-card p-5 hover:shadow-lg">
                      <div className="w-28 shrink-0">
                        <Thumbnail item={top} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Meilleur résultat</p>
                        <p className="mt-1 text-xl font-bold leading-snug group-hover:text-accent-hover">{top.title}</p>
                        <p className="text-sm text-muted">{top.subtitle}</p>
                      </div>
                    </Link>
                  )}
                  {crossMedia.length > 0 && (
                    <section className="glass flex flex-col gap-3 rounded-card p-5" aria-label="Expérience croisée">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">Expérience croisée · {mood}</p>
                      <ul className="flex flex-col gap-2">
                        {crossMedia.map((item) => {
                          const Icon = item.domain === "lit" ? BookOpen : item.domain === "mus" ? Music : ImageIcon;
                          const verb = item.domain === "lit" ? "Lire" : item.domain === "mus" ? "Écouter" : "Regarder";
                          return (
                            <li key={item.id}>
                              <Link href={item.href} className="flex items-center gap-2 text-sm hover:text-accent-hover">
                                <Icon className="size-4 shrink-0 text-muted" aria-hidden />
                                <span className="font-semibold">{verb}</span>
                                <span className="truncate text-muted">{item.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  )}
                </div>
              )}

              {tab === "all" ? (
                SECTION_ORDER.map((type) => {
                  const items = results.filter((r) => r.type === type);
                  if (items.length === 0) return null;
                  const label = TABS.find((t) => t.id === type)!.label;
                  return (
                    <section key={type} className="flex flex-col gap-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <h2 className="text-lg font-semibold">{label}</h2>
                        {items.length > SECTION_PREVIEW && (
                          <button
                            type="button"
                            onClick={() => update({ type })}
                            className="text-sm font-medium text-accent-hover hover:underline"
                          >
                            Voir les {items.length} résultats
                          </button>
                        )}
                      </div>
                      <ResultGrid items={items.slice(0, SECTION_PREVIEW)} />
                    </section>
                  );
                })
              ) : (
                <ResultGrid items={results} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultGrid({ items }: { items: SearchItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <li key={`${item.type}-${item.id}`}>
          <ResultCard item={item} />
        </li>
      ))}
    </ul>
  );
}
