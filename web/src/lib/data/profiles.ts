/**
 * Sample public profiles, until accounts exist.
 * A creator's works are looked up in the catalogue from their pseudo.
 */
import type { Domain } from "@/lib/domains";
import { artworkToSummary, getArtwork, getArtworkIds } from "./art";
import type { WorkSummary } from "./home";
import { getWork, getWorkSlugs, toSummary } from "./literature";
import { albumToSummary, getAlbumsByArtist } from "./music";

/** The signed-in reader, until authentication exists. */
export const CURRENT_USER = "nadia-b";

export type Activity = { domain: Domain; action: string; href: string; when: string };

export type ProfileCollection = { title: string; count: number; domain: Domain; href: string };

type ProfileData = {
  pseudo: string;
  name: string;
  role: string;
  domain: Domain;
  location: string;
  joined: string;
  bio: string;
  followers: number;
  following: number;
  /** Public cultural genome: share of each domain, in percent. */
  genome: Record<Domain, number>;
  topGenres: string[];
  collaborations: { label: string; href: string }[];
  collections: ProfileCollection[];
  activity: Activity[];
};

export type Profile = ProfileData & { works: WorkSummary[]; isMe: boolean };

const profiles: ProfileData[] = [
  {
    pseudo: "nadia-b", name: "Nadia Bamba", role: "Lectrice", domain: "lit", location: "Abidjan", joined: "septembre 2026",
    bio: "Romans du fleuve, poésie et kora le soir. J’anime un club de lecture en ligne le dimanche.",
    followers: 86, following: 41,
    genome: { lit: 52, mus: 31, art: 17 },
    topGenres: ["Roman", "Poésie", "Kora et musique mandingue", "Impressionnisme"],
    collaborations: [],
    collections: [
      { title: "Lectures du soir", count: 4, domain: "mus", href: "/bibliotheque" },
      { title: "Bleus", count: 4, domain: "art", href: "/bibliotheque" },
      { title: "Lumières d’eau", count: 3, domain: "art", href: "/bibliotheque" },
    ],
    activity: [
      { domain: "lit", action: "annoté le chapitre 3 de Le Fleuve et la nuit", href: "/litterature/le-fleuve-et-la-nuit", when: "Hier" },
      { domain: "mus", action: "créé la playlist Le Fleuve en musique", href: "/bibliotheque", when: "Il y a 2 jours" },
      { domain: "art", action: "ajouté Indigo n° 4 à la collection Bleus", href: "/art/oeuvre/indigo-4", when: "Il y a 4 jours" },
      { domain: "lit", action: "terminé Poèmes saturniens", href: "/litterature/poemes-saturniens", when: "Le 2 octobre" },
    ],
  },
  {
    pseudo: "awa-diallo", name: "Awa Diallo", role: "Autrice", domain: "lit", location: "Mopti", joined: "mars 2026",
    bio: "J’écris des romans qui se lisent avec de la musique. Le Fleuve et la nuit paraît chapitre par chapitre, avec la bande-son de Sékou T. et les illustrations de Mariam K.",
    followers: 4820, following: 112,
    genome: { lit: 61, mus: 27, art: 12 },
    topGenres: ["Roman", "Contes africains", "Kora et musique mandingue"],
    collaborations: [
      { label: "Bande-son du Fleuve, avec Sékou T.", href: "/musique/album/bande-son-fleuve" },
      { label: "Illustrations du Fleuve, avec Mariam K.", href: "/art/oeuvre/planches-fleuve" },
    ],
    collections: [{ title: "Ce qui m’inspire", count: 12, domain: "art", href: "/art/exposition/lumieres-du-sahel" }],
    activity: [
      { domain: "lit", action: "publié le chapitre 6 de Le Fleuve et la nuit", href: "/litterature/le-fleuve-et-la-nuit", when: "Il y a 3 jours" },
      { domain: "art", action: "partagé l’illustration Pirogue à l’aube", href: "/art/oeuvre/planches-fleuve", when: "La semaine dernière" },
    ],
  },
  {
    pseudo: "sekou-t", name: "Sékou T.", role: "Musicien", domain: "mus", location: "Bamako", joined: "février 2026",
    bio: "Joueur de kora. Je compose pour la littérature et l’image : chaque album est pensé comme la bande-son d’une œuvre de la communauté.",
    followers: 6310, following: 87,
    genome: { lit: 22, mus: 64, art: 14 },
    topGenres: ["Kora et musique mandingue", "Jazz", "Roman"],
    collaborations: [
      { label: "Le Fleuve et la nuit, avec Awa Diallo", href: "/litterature/le-fleuve-et-la-nuit" },
      { label: "Série Indigo, avec Mariam K.", href: "/art/oeuvre/indigo-4" },
    ],
    collections: [{ title: "Écoutes de la semaine", count: 18, domain: "mus", href: "/musique/album/afro-jazz-minuit" }],
    activity: [
      { domain: "mus", action: "publié Le Fleuve et la nuit — bande-son", href: "/musique/album/bande-son-fleuve", when: "Il y a 5 jours" },
    ],
  },
  {
    pseudo: "mariam-k", name: "Mariam K.", role: "Peintre", domain: "art", location: "Dakar", joined: "avril 2026",
    bio: "Peinture abstraite et teinture indigo. J’illustre Le Fleuve et la nuit, une planche par chapitre.",
    followers: 3150, following: 203,
    genome: { lit: 18, mus: 25, art: 57 },
    topGenres: ["Art abstrait", "Art africain contemporain", "Kora et musique mandingue"],
    collaborations: [{ label: "Illustrations du Fleuve, avec Awa Diallo", href: "/litterature/le-fleuve-et-la-nuit" }],
    collections: [{ title: "Bleus du monde", count: 24, domain: "art", href: "/art/oeuvre/indigo-2" }],
    activity: [
      { domain: "art", action: "publié Pirogue à l’aube", href: "/art/oeuvre/planches-fleuve", when: "La semaine dernière" },
    ],
  },
  {
    pseudo: "kofi-mensah", name: "Kofi Mensah", role: "Auteur", domain: "lit", location: "Accra", joined: "mai 2026",
    bio: "Nouvelles brèves sur la côte, le sel et ceux qui partent.",
    followers: 1240, following: 64,
    genome: { lit: 70, mus: 20, art: 10 },
    topGenres: ["Nouvelles", "Afrobeat"],
    collaborations: [],
    collections: [],
    activity: [{ domain: "lit", action: "publié Sable et sel", href: "/litterature/sable-et-sel", when: "Le mois dernier" }],
  },
];

async function getWorksBy(pseudo: string): Promise<WorkSummary[]> {
  const books = (await Promise.all((await getWorkSlugs()).map(getWork))).filter((w) => w?.author.pseudo === pseudo);
  const albums = await getAlbumsByArtist(pseudo);
  const artworks = (await Promise.all((await getArtworkIds()).map(getArtwork))).filter((a) => a?.artist.pseudo === pseudo);
  return [
    ...books.flatMap((w) => (w ? [toSummary(w)] : [])),
    ...albums.map(albumToSummary),
    ...artworks.flatMap((a) => (a ? [artworkToSummary(a)] : [])),
  ];
}

export async function getProfilePseudos(): Promise<string[]> {
  return profiles.map((p) => p.pseudo);
}

export async function getProfile(pseudo: string): Promise<Profile | undefined> {
  const data = profiles.find((p) => p.pseudo === pseudo);
  if (!data) return undefined;
  return { ...data, works: await getWorksBy(pseudo), isMe: pseudo === CURRENT_USER };
}
