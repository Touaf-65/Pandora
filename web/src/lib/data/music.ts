/**
 * Sample music catalogue, until the API exists.
 * Tracks have no audio file yet: the player simulates playback.
 * Public-domain compositions are credited to fictional performers.
 */
import type { WorkSummary } from "./home";

export type Track = {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  albumId: string;
  albumTitle: string;
  /** Seconds. */
  duration: number;
  /** Cross-media link: the chapter or artwork this track accompanies. */
  accompanies?: { label: string; href: string };
};

export type AlbumType = "Album" | "EP" | "Single" | "Playlist";

export type Album = {
  id: string;
  title: string;
  type: AlbumType;
  year: number;
  artist: string;
  artistId?: string;
  description: string;
  license: string;
  tracks: Track[];
};

export type Artist = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  genres: string[];
  collaborations: { label: string; href: string }[];
};

const time = (value: string) => {
  const [m, s] = value.split(":").map(Number);
  return m * 60 + s;
};

type TrackInput = [title: string, duration: string, accompanies?: Track["accompanies"]];

function album(base: Omit<Album, "tracks">, tracks: TrackInput[], ids?: string[]): Album {
  return {
    ...base,
    tracks: tracks.map(([title, duration, accompanies], i) => ({
      id: ids?.[i] ?? `${base.id}-${i + 1}`,
      title,
      artist: base.artist,
      artistId: base.artistId,
      albumId: base.id,
      albumTitle: base.title,
      duration: time(duration),
      accompanies,
    })),
  };
}

const fleuveChapter = (n: number, title: string) => ({
  label: `Le Fleuve et la nuit · ch. ${n}`,
  href: `/lire/le-fleuve-et-la-nuit/${n}`,
  title,
});

/** Track id used by the reader for a chapter soundtrack. */
export function chapterTrackId(slug: string, chapter: number) {
  return `${slug}-ch${chapter}`;
}

const fleuveTracks = [
  fleuveChapter(1, "La crue"),
  fleuveChapter(2, "Le passager"),
  fleuveChapter(3, "Les voix de l’eau"),
  fleuveChapter(4, "Mopti, à l’aube"),
  fleuveChapter(5, "Ce que le fleuve garde"),
  fleuveChapter(6, "La rive des absents"),
];
const fleuveDurations = ["4:02", "3:47", "4:18", "5:10", "4:36", "6:02"];

const albums: Album[] = [
  album(
    {
      id: "kora-sessions", title: "Kora Sessions", type: "Album", year: 2026, artist: "Sékou T.", artistId: "sekou-t",
      description: "Huit pièces pour kora seule, enregistrées à Bamako, pensées comme la bande-son d’une lecture.",
      license: "Tous droits réservés",
    },
    [
      ["Ouverture du fleuve", "3:58"], ["Marché de Mopti", "4:21"], ["Pirogue", "3:12"], ["Indigo", "5:04"],
      ["Saison sèche", "4:40"], ["Interlude — nuit", "1:54"], ["Ségou", "6:02"], ["Retour", "5:41"],
    ],
  ),
  album(
    {
      id: "bande-son-fleuve", title: "Le Fleuve et la nuit — bande-son", type: "Album", year: 2026, artist: "Sékou T.", artistId: "sekou-t",
      description: "Une pièce par chapitre du roman d’Awa Diallo, à écouter pendant la lecture.",
      license: "CC BY-NC",
    },
    fleuveTracks.map((t, i) => [t.title, fleuveDurations[i], { label: t.label, href: t.href }] as TrackInput),
    fleuveTracks.map((_, i) => chapterTrackId("le-fleuve-et-la-nuit", i + 1)),
  ),
  album(
    {
      id: "lagos-nights", title: "Lagos Nights", type: "EP", year: 2025, artist: "Ada O.", artistId: "ada-o",
      description: "Quatre titres afrobeat écrits la nuit, entre Lagos et Paris.",
      license: "Tous droits réservés",
    },
    [["Third Mainland", "3:44"], ["Rain on Lagos", "3:41"], ["Ikoyi 2 a.m.", "4:12"], ["Danfo", "3:20"]],
  ),
  album(
    {
      id: "gnossiennes", title: "Gnossiennes", type: "Album", year: 2024, artist: "Erik Satie", artistId: "erik-satie",
      description: "Les six Gnossiennes, interprétées au piano par Lina Okafor. Compositions du domaine public.",
      license: "Œuvre du domaine public, interprétation CC BY",
    },
    [
      ["Gnossienne n° 1", "3:35"], ["Gnossienne n° 2", "2:10"], ["Gnossienne n° 3", "2:55"],
      ["Gnossienne n° 4", "3:02"], ["Gnossienne n° 5", "3:40"], ["Gnossienne n° 6", "1:55"],
    ],
  ),
  album(
    {
      id: "clair-de-lune", title: "Clair de lune", type: "Single", year: 2024, artist: "Claude Debussy", artistId: "claude-debussy",
      description: "Extrait de la Suite bergamasque, interprété au piano par Lina Okafor. Composition du domaine public.",
      license: "Œuvre du domaine public, interprétation CC BY",
    },
    [["Clair de lune", "5:02"]],
  ),
  album(
    {
      id: "pluie-douce", title: "Pluie douce", type: "Playlist", year: 2026, artist: "Pandora",
      description: "Piano solo pour lire sous la pluie. Composée pour accompagner Les Misérables.",
      license: "Sélection éditoriale",
    },
    [["Gnossienne n° 1", "3:35"], ["Clair de lune", "5:02"], ["Interlude — nuit", "1:54"], ["Gnossienne n° 3", "2:55"]],
  ),
  album(
    {
      id: "afro-jazz-minuit", title: "Afro-jazz à minuit", type: "Playlist", year: 2026, artist: "Pandora",
      description: "Kora, cuivres et contrebasse pour les fins de soirée.",
      license: "Sélection éditoriale",
    },
    [["Indigo", "5:04"], ["Ikoyi 2 a.m.", "4:12"], ["Ségou", "6:02"]],
  ),
];

const artists: Artist[] = [
  {
    id: "sekou-t", name: "Sékou T.", specialty: "Joueur de kora", location: "Bamako",
    bio: "Compose pour la littérature et l’image : chaque album est pensé comme la bande-son d’une œuvre de la communauté Pandora.",
    genres: ["Musique mandingue", "Kora", "Afro-jazz"],
    collaborations: [
      { label: "Le Fleuve et la nuit, avec Awa Diallo", href: "/litterature/le-fleuve-et-la-nuit" },
      { label: "Série Indigo, avec Mariam K.", href: "/art/oeuvre/indigo-4" },
    ],
  },
  {
    id: "ada-o", name: "Ada O.", specialty: "Chanteuse et productrice", location: "Lagos",
    bio: "Afrobeat nocturne et textes en anglais et en yoruba.",
    genres: ["Afrobeat", "Soul"],
    collaborations: [],
  },
  {
    id: "erik-satie", name: "Erik Satie", specialty: "Compositeur (1866-1925)", location: "Paris",
    bio: "Compositeur français. Ses œuvres sont dans le domaine public ; les enregistrements proposés sont des interprétations récentes.",
    genres: ["Classique", "Piano"],
    collaborations: [],
  },
  {
    id: "claude-debussy", name: "Claude Debussy", specialty: "Compositeur (1862-1918)", location: "Paris",
    bio: "Compositeur français. Ses œuvres sont dans le domaine public ; les enregistrements proposés sont des interprétations récentes.",
    genres: ["Classique", "Piano"],
    collaborations: [],
  },
];

export async function getAlbumIds(): Promise<string[]> {
  return albums.map((a) => a.id);
}

export async function getAlbum(id: string): Promise<Album | undefined> {
  return albums.find((a) => a.id === id);
}

export async function getArtistIds(): Promise<string[]> {
  return artists.map((a) => a.id);
}

export async function getArtist(id: string): Promise<Artist | undefined> {
  return artists.find((a) => a.id === id);
}

export async function getAlbumsByArtist(artistId: string): Promise<Album[]> {
  return albums.filter((a) => a.artistId === artistId);
}

export async function getTrack(id: string): Promise<Track | undefined> {
  return albums.flatMap((a) => a.tracks).find((t) => t.id === id);
}

export function albumToSummary(a: Album): WorkSummary {
  return { id: a.id, domain: "mus", title: a.title, creator: `${a.type} · ${a.year}`, href: `/musique/album/${a.id}` };
}

export function totalDuration(tracks: Track[]) {
  return tracks.reduce((sum, t) => sum + t.duration, 0);
}
