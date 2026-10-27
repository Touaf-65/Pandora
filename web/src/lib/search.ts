/**
 * Search types and matching, shared by the server (index) and the browser (filtering).
 * Kept free of data imports so the client bundle does not ship the catalogue modules.
 */
import type { Domain } from "@/lib/domains";

export const MOODS = ["Apaisé", "Curieux", "Énergique", "Mélancolique", "Inspiré"] as const;
export type Mood = (typeof MOODS)[number];

export type ResultType = "lit" | "mus" | "art" | "people" | "collections";

export type SearchItem = {
  id: string;
  type: ResultType;
  /** Visual domain, for covers and colors. */
  domain: Domain;
  title: string;
  subtitle: string;
  href: string;
  /** Extra searchable words: genre, style, technique, artist… */
  keywords: string[];
  moods: Mood[];
  emerging: boolean;
  publicDomain: boolean;
  /** Minutes, for reading or listening. */
  minutes?: number;
  year?: number;
  /** Placeholder drawing for artworks. */
  art?: { ratio: [number, number]; palette: string[] };
};

/** Lowercase without accents, so "ecouter" finds "Écouter". */
export function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

/** 0 when the item does not match every word of the query; higher is more relevant. */
export function score(item: SearchItem, query: string) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return 1;
  const title = normalize(item.title);
  const rest = normalize([item.subtitle, ...item.keywords].join(" "));
  let total = 0;
  for (const word of words) {
    if (title.startsWith(word)) total += 3;
    else if (title.includes(word)) total += 2;
    else if (rest.includes(word)) total += 1;
    else return 0;
  }
  return total;
}
