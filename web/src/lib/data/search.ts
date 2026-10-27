/**
 * Unified search index over the sample catalogue (literature, music, art, creators).
 * The index is small enough to be filtered in the browser; the API will
 * take over once the catalogue grows.
 */
import type { Mood, SearchItem } from "@/lib/search";
import { getArtwork, getArtworkIds, getExhibition, getExhibitionIds } from "./art";
import { getWork, getWorkSlugs } from "./literature";
import { getAlbum, getAlbumIds, getArtist, getArtistIds, totalDuration } from "./music";

const moodsById: Record<string, Mood[]> = {
  "le-fleuve-et-la-nuit": ["Inspiré", "Curieux"],
  "les-miserables": ["Apaisé", "Mélancolique"],
  "notre-dame-de-paris": ["Curieux"],
  "poemes-saturniens": ["Mélancolique", "Apaisé"],
  "sable-et-sel": ["Curieux", "Mélancolique"],
  "contes-du-soir": ["Énergique", "Apaisé"],
  "les-marees": ["Mélancolique"],
  "kora-sessions": ["Apaisé", "Inspiré"],
  "bande-son-fleuve": ["Inspiré"],
  "lagos-nights": ["Énergique"],
  gnossiennes: ["Mélancolique", "Apaisé"],
  "clair-de-lune": ["Apaisé"],
  "pluie-douce": ["Apaisé", "Mélancolique"],
  "afro-jazz-minuit": ["Énergique", "Curieux"],
  "indigo-4": ["Inspiré", "Apaisé"],
  "indigo-2": ["Apaisé"],
  "planches-fleuve": ["Inspiré"],
  "sahel-1": ["Apaisé"],
  "sahel-2": ["Énergique", "Curieux"],
  "sahel-3": ["Mélancolique"],
  masques: ["Curieux"],
  "ville-bleue": ["Énergique"],
  "impression-soleil-levant": ["Apaisé"],
  "rue-de-paris-temps-de-pluie": ["Mélancolique"],
  "la-nuit-etoilee": ["Mélancolique", "Inspiré"],
  "lumieres-du-sahel": ["Apaisé", "Inspiré"],
  "paris-sous-la-pluie": ["Mélancolique", "Apaisé"],
};

/** Creators who are not musicians, linked to their public profile. */
const profileCreators: SearchItem[] = [
  { pseudo: "awa-diallo", name: "Awa Diallo", subtitle: "Autrice · roman", domain: "lit" as const, keywords: ["Littérature", "Le Fleuve et la nuit"] },
  { pseudo: "kofi-mensah", name: "Kofi Mensah", subtitle: "Auteur · nouvelles", domain: "lit" as const, keywords: ["Littérature", "Sable et sel"] },
  { pseudo: "mariam-k", name: "Mariam K.", subtitle: "Peintre · abstrait", domain: "art" as const, keywords: ["Art visuel", "Indigo"] },
].map((c): SearchItem => ({
  id: c.pseudo, type: "people", domain: c.domain, title: c.name, subtitle: c.subtitle, href: `/profil/${c.pseudo}`,
  keywords: c.keywords, moods: [], emerging: true, publicDomain: false,
}));

const PUBLIC_DOMAIN_ARTISTS = new Set(["erik-satie", "claude-debussy"]);

export async function getSearchIndex(): Promise<SearchItem[]> {
  const works = (await Promise.all((await getWorkSlugs()).map(getWork))).flatMap((w) => (w ? [w] : []));
  const albums = (await Promise.all((await getAlbumIds()).map(getAlbum))).flatMap((a) => (a ? [a] : []));
  const artists = (await Promise.all((await getArtistIds()).map(getArtist))).flatMap((a) => (a ? [a] : []));
  const artworks = (await Promise.all((await getArtworkIds()).map(getArtwork))).flatMap((a) => (a ? [a] : []));
  const exhibitions = (await Promise.all((await getExhibitionIds()).map(getExhibition))).flatMap((e) => (e ? [e] : []));

  return [
    ...works.map((w): SearchItem => ({
      id: w.slug, type: "lit", domain: "lit", title: w.title, subtitle: `${w.genre} · ${w.author.name}`,
      href: `/litterature/${w.slug}`, keywords: [w.genre, w.author.name, w.summary],
      moods: moodsById[w.slug] ?? [], emerging: w.license !== "Domaine public" && w.author.name !== "Collectif",
      publicDomain: w.license === "Domaine public", minutes: w.chapters.reduce((s, c) => s + c.minutes, 0),
    })),
    ...albums.map((a): SearchItem => ({
      id: a.id, type: a.type === "Playlist" ? "collections" : "mus", domain: "mus", title: a.title,
      subtitle: `${a.type} · ${a.artist}`, href: `/musique/album/${a.id}`,
      keywords: [a.artist, a.description, ...a.tracks.map((t) => t.title)],
      moods: moodsById[a.id] ?? [], emerging: !!a.artistId && !PUBLIC_DOMAIN_ARTISTS.has(a.artistId),
      publicDomain: a.license.toLowerCase().includes("domaine public"),
      minutes: Math.round(totalDuration(a.tracks) / 60), year: a.year,
    })),
    ...artworks.map((a): SearchItem => ({
      id: a.id, type: "art", domain: "art", title: a.title, subtitle: `${a.style} · ${a.artist.name}`,
      href: `/art/oeuvre/${a.id}`, keywords: [a.style, a.technique, a.artist.name, a.description],
      moods: moodsById[a.id] ?? [], emerging: a.license !== "Domaine public", publicDomain: a.license === "Domaine public",
      year: a.year, art: { ratio: a.ratio, palette: a.palette },
    })),
    ...exhibitions.map((e): SearchItem => ({
      id: e.id, type: "collections", domain: "art", title: e.title,
      subtitle: `Exposition · ${e.rooms.reduce((s, r) => s + r.artworkIds.length, 0)} œuvres`,
      href: `/art/exposition/${e.id}`, keywords: [e.description, ...e.rooms.map((r) => r.title)],
      moods: moodsById[e.id] ?? [], emerging: false, publicDomain: false,
    })),
    ...artists.map((a): SearchItem => ({
      id: a.id, type: "people", domain: "mus", title: a.name, subtitle: `${a.specialty} · ${a.location}`,
      href: `/musique/artiste/${a.id}`, keywords: a.genres, moods: [],
      emerging: !PUBLIC_DOMAIN_ARTISTS.has(a.id), publicDomain: PUBLIC_DOMAIN_ARTISTS.has(a.id),
    })),
    ...profileCreators,
  ];
}
