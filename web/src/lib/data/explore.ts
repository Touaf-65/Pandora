/**
 * Sample editorial content for the Explorer page, until the API exists.
 * Themes and trends reference items of the unified search index.
 */
import type { SearchItem } from "@/lib/search";
import { getSearchIndex } from "./search";

export type Theme = {
  id: string;
  title: string;
  description: string;
  items: SearchItem[];
};

export type Trend = { item: SearchItem; change: string; reason: string };

export type ExploreContent = {
  /** Works only (no creators), for the mood mixes. */
  works: SearchItem[];
  themes: Theme[];
  trends: Trend[];
};

const themeInputs = [
  {
    id: "le-fleuve",
    title: "Au fil du fleuve",
    description: "Le Niger en roman, en musique et en images : l’univers complet du Fleuve et la nuit.",
    ids: ["le-fleuve-et-la-nuit", "bande-son-fleuve", "planches-fleuve", "sahel-1", "kora-sessions", "lumieres-du-sahel"],
  },
  {
    id: "bleu-indigo",
    title: "Bleu indigo",
    description: "Teintures, nuits étoilées et fresques : le bleu sous toutes ses formes.",
    ids: ["indigo-4", "indigo-2", "ville-bleue", "la-nuit-etoilee", "kora-sessions", "gnossiennes"],
  },
  {
    id: "paris-pluie",
    title: "Paris sous la pluie",
    description: "Hugo, les impressionnistes et du piano pour les jours gris.",
    ids: ["les-miserables", "notre-dame-de-paris", "rue-de-paris-temps-de-pluie", "impression-soleil-levant", "pluie-douce", "clair-de-lune"],
  },
  {
    id: "afrique-de-l-ouest",
    title: "Voix d’Afrique de l’Ouest",
    description: "Nouvelles, contes, afrobeat et sculpture, de Dakar à Lagos.",
    ids: ["sable-et-sel", "contes-du-soir", "lagos-nights", "masques", "sahel-2", "afro-jazz-minuit"],
  },
];

const trendInputs = [
  { id: "le-fleuve-et-la-nuit", change: "+38 %", reason: "Chapitre 6 publié cette semaine" },
  { id: "bande-son-fleuve", change: "+31 %", reason: "Écoutée pendant la lecture du roman" },
  { id: "indigo-4", change: "+22 %", reason: "Ajoutée à 140 collections" },
  { id: "lagos-nights", change: "+17 %", reason: "Partagé par Ada O." },
  { id: "poemes-saturniens", change: "+12 %", reason: "Lu en club de lecture" },
];

export async function getExploreContent(): Promise<ExploreContent> {
  const index = await getSearchIndex();
  const byId = new Map(index.map((i) => [i.id, i]));
  const pick = (ids: string[]) => ids.flatMap((id) => byId.get(id) ?? []);

  return {
    works: index.filter((i) => i.type !== "people"),
    themes: themeInputs.map(({ ids, ...t }) => ({ ...t, items: pick(ids) })),
    trends: trendInputs.flatMap(({ id, ...t }) => {
      const item = byId.get(id);
      return item ? [{ item, ...t }] : [];
    }),
  };
}
