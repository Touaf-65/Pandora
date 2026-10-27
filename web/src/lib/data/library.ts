/**
 * Sample personal library for the signed-in reader, until accounts exist.
 * Everything points to works of the sample catalogue.
 */
import { getArtworks, type Artwork } from "./art";
import { getWork, readerHref } from "./literature";
import { getAlbum, getTrack, totalDuration, type Album, type Track } from "./music";

export type ReadingStatus = "En cours" | "À lire" | "Terminé";

export type Reading = {
  slug: string;
  title: string;
  author: string;
  status: ReadingStatus;
  chapter: number;
  totalChapters: number;
  percent: number;
  lastRead: string;
  annotations: number;
  href: string;
};

export type Annotation = {
  id: string;
  workTitle: string;
  chapterTitle: string;
  quote: string;
  note?: string;
  date: string;
  href: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  tracks: Track[];
  /** Seconds. */
  duration: number;
};

export type ArtCollection = {
  id: string;
  title: string;
  description: string;
  artworks: Artwork[];
};

export type Library = {
  readings: Reading[];
  annotations: Annotation[];
  playlists: Playlist[];
  savedAlbums: Album[];
  collections: ArtCollection[];
};

const readingInputs: { slug: string; status: ReadingStatus; chapter: number; percent: number; lastRead: string }[] = [
  { slug: "le-fleuve-et-la-nuit", status: "En cours", chapter: 4, percent: 55, lastRead: "Hier soir" },
  { slug: "les-miserables", status: "En cours", chapter: 3, percent: 42, lastRead: "Il y a 3 jours" },
  { slug: "sable-et-sel", status: "À lire", chapter: 1, percent: 0, lastRead: "Ajouté lundi" },
  { slug: "les-marees", status: "À lire", chapter: 1, percent: 0, lastRead: "Ajouté le 12 octobre" },
  { slug: "poemes-saturniens", status: "Terminé", chapter: 3, percent: 100, lastRead: "Terminé le 2 octobre" },
];

const annotationInputs = [
  {
    id: "a1", slug: "le-fleuve-et-la-nuit", chapter: 1, date: "Hier",
    quote: "Aminata avait entendu le fleuve changer de voix avant de le voir changer de couleur.",
    note: "La première phrase qui m’a accrochée. À relire avec la bande-son.",
  },
  {
    id: "a2", slug: "le-fleuve-et-la-nuit", chapter: 2, date: "Hier",
    quote: "— Je ne sais pas, répondit-il. Mes mains, peut-être.",
  },
  {
    id: "a3", slug: "le-fleuve-et-la-nuit", chapter: 3, date: "Il y a 2 jours",
    quote: "à Mopti, le fleuve parle, mais les gens parlent plus vite encore.",
    note: "Idée pour le club de lecture : le rôle de la rumeur.",
  },
  {
    id: "a4", slug: "poemes-saturniens", chapter: 1, date: "Le 2 octobre",
    quote: "Les sanglots longs\nDes violons\nDe l’automne",
  },
];

const playlistInputs = [
  {
    id: "lectures-du-soir", title: "Lectures du soir",
    description: "Ce que j’écoute en lisant au lit.",
    trackIds: ["gnossiennes-1", "clair-de-lune-1", "kora-sessions-6", "gnossiennes-3"],
  },
  {
    id: "kora-et-cafe", title: "Kora et café",
    description: "Pour démarrer la journée en douceur.",
    trackIds: ["kora-sessions-1", "kora-sessions-2", "kora-sessions-4", "lagos-nights-2", "kora-sessions-7"],
  },
  {
    id: "le-fleuve-en-musique", title: "Le Fleuve en musique",
    description: "Ma sélection de la bande-son du roman.",
    trackIds: ["le-fleuve-et-la-nuit-ch1", "le-fleuve-et-la-nuit-ch3", "le-fleuve-et-la-nuit-ch4"],
  },
];

const collectionInputs = [
  {
    id: "bleus", title: "Bleus", description: "Indigo, nuits et ciels d’orage.",
    artworkIds: ["indigo-4", "indigo-2", "la-nuit-etoilee", "ville-bleue"],
  },
  {
    id: "lumieres-d-eau", title: "Lumières d’eau", description: "La pluie et le fleuve en peinture.",
    artworkIds: ["impression-soleil-levant", "rue-de-paris-temps-de-pluie", "planches-fleuve"],
  },
  {
    id: "sahel", title: "Sahel", description: "Repérées dans l’exposition Lumières du Sahel.",
    artworkIds: ["sahel-1", "sahel-2", "masques"],
  },
];

const SAVED_ALBUMS = ["kora-sessions", "bande-son-fleuve", "gnossiennes", "lagos-nights"];

export async function getLibrary(): Promise<Library> {
  const readings = await Promise.all(
    readingInputs.map(async (r): Promise<Reading | undefined> => {
      const work = await getWork(r.slug);
      if (!work) return undefined;
      return {
        ...r,
        title: work.title,
        author: work.author.name,
        totalChapters: work.chapters.length,
        annotations: annotationInputs.filter((a) => a.slug === r.slug).length,
        href:
          r.status === "À lire" ? `/litterature/${r.slug}` : readerHref(r.slug, r.status === "Terminé" ? 1 : r.chapter),
      };
    }),
  );

  const annotations = await Promise.all(
    annotationInputs.map(async ({ slug, chapter, ...a }): Promise<Annotation | undefined> => {
      const work = await getWork(slug);
      const found = work?.chapters.find((c) => c.number === chapter);
      if (!work || !found) return undefined;
      return { ...a, workTitle: work.title, chapterTitle: found.title, href: readerHref(slug, chapter) };
    }),
  );

  const playlists = await Promise.all(
    playlistInputs.map(async ({ trackIds, ...p }) => {
      const tracks = (await Promise.all(trackIds.map(getTrack))).filter((t): t is Track => !!t);
      return { ...p, tracks, duration: totalDuration(tracks) };
    }),
  );

  const savedAlbums = (await Promise.all(SAVED_ALBUMS.map(getAlbum))).filter((a): a is Album => !!a);

  const collections = await Promise.all(
    collectionInputs.map(async ({ artworkIds, ...c }) => ({ ...c, artworks: await getArtworks(artworkIds) })),
  );

  return {
    readings: readings.filter((r): r is Reading => !!r),
    annotations: annotations.filter((a): a is Annotation => !!a),
    playlists,
    savedAlbums,
    collections,
  };
}
