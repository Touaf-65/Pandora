/**
 * Sample data for the home screen, until the API exists.
 * Works are either in the public domain or by fictional creators.
 */
import type { Domain } from "@/lib/domains";

export type WorkSummary = {
  id: string;
  domain: Domain;
  title: string;
  creator: string;
  href: string;
};

export type TrilogyItem = WorkSummary & { duration: string; detail: string };

export type Trilogy = {
  reason: string;
  items: [TrilogyItem, TrilogyItem, TrilogyItem];
};

export type ResumeItem = WorkSummary & { detail: string; progress: number };

export type Creator = {
  pseudo: string;
  name: string;
  specialty: string;
  domain: Domain;
};

export type HomeRow = {
  domain: Domain;
  title: string;
  href: string;
  items: WorkSummary[];
};

export type HomeFeed = {
  moods: string[];
  trilogies: Record<string, Trilogy>;
  resume: ResumeItem[];
  rows: HomeRow[];
  creators: Creator[];
};

const book = (id: string, title: string, creator: string): WorkSummary => ({
  id, domain: "lit", title, creator, href: `/litterature/${id}`,
});
const album = (id: string, title: string, creator: string): WorkSummary => ({
  id, domain: "mus", title, creator, href: `/musique/album/${id}`,
});
const artwork = (id: string, title: string, creator: string): WorkSummary => ({
  id, domain: "art", title, creator, href: `/art/oeuvre/${id}`,
});

const trilogies: Record<string, Trilogy> = {
  Apaisé: {
    reason: "Vous lisez Hugo le soir et écoutez du piano en lisant.",
    items: [
      { ...book("les-miserables", "Les Misérables", "Victor Hugo"), href: "/lire/les-miserables/3", duration: "18 min", detail: "Reprise au chapitre 3" },
      { ...album("pluie-douce", "Pluie douce", "Playlist piano solo"), duration: "24 min", detail: "Composée pour cette lecture" },
      { ...artwork("paris-sous-la-pluie", "Paris sous la pluie", "Impressionnistes"), duration: "6 œuvres", detail: "Exposition courte" },
    ],
  },
  Curieux: {
    reason: "Des créateurs que vous ne suivez pas encore, proches de vos goûts.",
    items: [
      { ...book("sable-et-sel", "Sable et sel", "Kofi Mensah"), duration: "25 min", detail: "Nouvelle complète" },
      { ...album("kora-sessions", "Kora Sessions", "Sékou T."), duration: "36 min", detail: "Album, 8 titres" },
      { ...artwork("indigo-4", "Indigo n° 4", "Mariam K."), duration: "7 œuvres", detail: "Série en cours" },
    ],
  },
  Énergique: {
    reason: "Rythmes rapides et récits courts pour démarrer la journée.",
    items: [
      { ...book("contes-du-soir", "Contes du soir", "Collectif"), duration: "12 min", detail: "Deux contes" },
      { ...album("lagos-nights", "Lagos Nights", "Ada O."), duration: "21 min", detail: "EP afrobeat" },
      { ...artwork("ville-bleue", "Ville bleue", "Yao B."), duration: "9 œuvres", detail: "Street art" },
    ],
  },
  Mélancolique: {
    reason: "Poésie et musique lente, comme vos lectures du dimanche.",
    items: [
      { ...book("poemes-saturniens", "Poèmes saturniens", "Paul Verlaine"), duration: "15 min", detail: "Sélection de 8 poèmes" },
      { ...album("gnossiennes", "Gnossiennes", "Erik Satie"), duration: "19 min", detail: "Piano" },
      { ...artwork("la-nuit-etoilee", "La Nuit étoilée", "Vincent van Gogh"), duration: "1 œuvre", detail: "Zoom haute définition" },
    ],
  },
  Inspiré: {
    reason: "Une œuvre cross-média : le roman, sa bande-son et ses illustrations.",
    items: [
      { ...book("le-fleuve-et-la-nuit", "Le Fleuve et la nuit", "Awa Diallo"), duration: "20 min", detail: "Chapitre 1" },
      { ...album("bande-son-fleuve", "Bande-son officielle", "Sékou T."), duration: "4 min", detail: "La crue" },
      { ...artwork("planches-fleuve", "Illustrations", "Mariam K."), duration: "9 planches", detail: "Pour chaque chapitre" },
    ],
  },
};

const feed: HomeFeed = {
  moods: Object.keys(trilogies),
  trilogies,
  resume: [
    { ...book("les-miserables", "Les Misérables", "Victor Hugo"), href: "/lire/les-miserables/3", detail: "Chapitre 3", progress: 42 },
    { ...album("nocturnes", "Nocturnes", "Playlist"), href: "/musique/playlist/nocturnes", detail: "12 titres", progress: 65 },
    { ...artwork("lumieres-du-sahel", "Lumières du Sahel", "Exposition"), href: "/art/exposition/lumieres-du-sahel", detail: "Salle 4 sur 7", progress: 57 },
    { ...book("le-fleuve-et-la-nuit", "Le Fleuve et la nuit", "Awa Diallo"), href: "/lire/le-fleuve-et-la-nuit/4", detail: "Chapitre 4 sur 6", progress: 20 },
  ],
  rows: [
    {
      domain: "lit", title: "Littérature pour vous", href: "/litterature",
      items: [
        book("le-fleuve-et-la-nuit", "Le Fleuve et la nuit", "Awa Diallo"),
        book("contes-du-soir", "Contes du soir", "Collectif"),
        book("notre-dame-de-paris", "Notre-Dame de Paris", "Victor Hugo"),
        book("sable-et-sel", "Sable et sel", "Kofi Mensah"),
        book("poemes-saturniens", "Poèmes saturniens", "Paul Verlaine"),
        book("les-marees", "Les Marées", "Inès Morel"),
      ],
    },
    {
      domain: "mus", title: "Musique pour vous", href: "/musique",
      items: [
        album("kora-sessions", "Kora Sessions", "Sékou T."),
        album("gnossiennes", "Gnossiennes", "Erik Satie"),
        album("lagos-nights", "Lagos Nights", "Ada O."),
        album("pluie-douce", "Pluie douce", "Playlist"),
        album("afro-jazz-minuit", "Afro-jazz à minuit", "Radio"),
        album("clair-de-lune", "Clair de lune", "Claude Debussy"),
      ],
    },
    {
      domain: "art", title: "Art visuel pour vous", href: "/art",
      items: [
        artwork("impression-soleil-levant", "Impression, soleil levant", "Claude Monet"),
        artwork("indigo-4", "Indigo n° 4", "Mariam K."),
        artwork("lumieres-du-sahel", "Lumières du Sahel", "Exposition"),
        artwork("la-nuit-etoilee", "La Nuit étoilée", "Vincent van Gogh"),
        artwork("masques", "Masques", "Collection"),
        artwork("ville-bleue", "Ville bleue", "Yao B."),
      ],
    },
  ],
  creators: [
    { pseudo: "awa-diallo", name: "Awa Diallo", specialty: "Autrice · roman", domain: "lit" },
    { pseudo: "sekou-t", name: "Sékou T.", specialty: "Musicien · kora", domain: "mus" },
    { pseudo: "mariam-k", name: "Mariam K.", specialty: "Peintre · abstrait", domain: "art" },
    { pseudo: "kofi-mensah", name: "Kofi Mensah", specialty: "Auteur · nouvelles", domain: "lit" },
  ],
};

export async function getHomeFeed(): Promise<HomeFeed> {
  return feed;
}
