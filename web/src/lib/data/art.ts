/**
 * Sample artworks and exhibitions, until the API exists.
 * No images yet: each artwork is drawn as an abstract placeholder from its palette.
 * Public-domain paintings keep their real metadata; their images will be imported later.
 */
import type { WorkSummary } from "./home";

export type Artwork = {
  id: string;
  title: string;
  artist: { name: string; pseudo?: string };
  year: number;
  technique: string;
  dimensions: string;
  style: string;
  license: string;
  description: string;
  /** Width / height, for the viewer frame. */
  ratio: [number, number];
  /** Placeholder colors, background first. */
  palette: string[];
  /** Where the original is kept, for public-domain works. */
  location?: string;
  /** "Écouter en regardant": an album composed for or matching the work. */
  listenWith?: string;
};

export type Exhibition = {
  id: string;
  title: string;
  curator: string;
  description: string;
  rooms: { title: string; artworkIds: string[] }[];
  soundtrack?: string;
};

const artworks: Artwork[] = [
  {
    id: "indigo-4", title: "Indigo n° 4", artist: { name: "Mariam K.", pseudo: "mariam-k" }, year: 2025,
    technique: "Acrylique et teinture indigo sur toile", dimensions: "120 × 150 cm", style: "Art abstrait",
    license: "Consultation uniquement, reproduction sur demande",
    description: "Série consacrée aux teinturières de Kano : le bleu y est travaillé en couches, comme les bains successifs d’un tissu.",
    ratio: [4, 5], palette: ["#1e3a8a", "#2563eb", "#93c5fd", "#0f172a", "#e0e7ff"], listenWith: "kora-sessions",
  },
  {
    id: "indigo-2", title: "Indigo n° 2", artist: { name: "Mariam K.", pseudo: "mariam-k" }, year: 2025,
    technique: "Acrylique et teinture indigo sur toile", dimensions: "100 × 100 cm", style: "Art abstrait",
    license: "Consultation uniquement, reproduction sur demande",
    description: "Deuxième bain de la série Indigo, plus clair, presque délavé.",
    ratio: [1, 1], palette: ["#dbeafe", "#1d4ed8", "#60a5fa", "#1e293b"], listenWith: "kora-sessions",
  },
  {
    id: "planches-fleuve", title: "Pirogue à l’aube", artist: { name: "Mariam K.", pseudo: "mariam-k" }, year: 2026,
    technique: "Illustration numérique", dimensions: "4000 × 3000 px", style: "Illustration",
    license: "CC BY-NC",
    description: "Illustration du chapitre 3 du roman Le Fleuve et la nuit d’Awa Diallo.",
    ratio: [4, 3], palette: ["#fde68a", "#b45309", "#78350f", "#0e7490", "#fef3c7"], listenWith: "bande-son-fleuve",
  },
  {
    id: "sahel-1", title: "Aube sur Mopti", artist: { name: "Yao B." }, year: 2024,
    technique: "Photographie argentique", dimensions: "60 × 90 cm", style: "Photographie",
    license: "Tous droits réservés",
    description: "Le port de Mopti à l’heure où les pirogues partent.",
    ratio: [3, 2], palette: ["#fed7aa", "#ea580c", "#7c2d12", "#fff7ed"], listenWith: "kora-sessions",
  },
  {
    id: "sahel-2", title: "Le marché aux tissus", artist: { name: "Yao B." }, year: 2024,
    technique: "Photographie argentique", dimensions: "60 × 90 cm", style: "Photographie",
    license: "Tous droits réservés",
    description: "Pagnes indigo et wax empilés sous les bâches.",
    ratio: [2, 3], palette: ["#fef3c7", "#d97706", "#1e40af", "#be185d"],
  },
  {
    id: "sahel-3", title: "Harmattan", artist: { name: "Yao B." }, year: 2025,
    technique: "Photographie numérique", dimensions: "80 × 120 cm", style: "Photographie",
    license: "Tous droits réservés",
    description: "Le vent de sable efface l’horizon de Ségou.",
    ratio: [3, 2], palette: ["#fde4c3", "#c2410c", "#a8a29e", "#fffbeb"],
  },
  {
    id: "masques", title: "Masques", artist: { name: "Fatou Ndiaye" }, year: 2023,
    technique: "Bois sculpté et pigments, photographié", dimensions: "Série de 5, 40 cm chacun", style: "Sculpture",
    license: "Tous droits réservés",
    description: "Cinq masques contemporains inspirés des masques de danse sénoufo.",
    ratio: [4, 5], palette: ["#292524", "#a16207", "#f5f5f4", "#b91c1c"],
  },
  {
    id: "ville-bleue", title: "Ville bleue", artist: { name: "Yao B." }, year: 2025,
    technique: "Peinture murale, photographiée", dimensions: "8 × 3 m", style: "Street art",
    license: "CC BY",
    description: "Fresque peinte sur un mur d’Abidjan, entièrement en nuances de bleu.",
    ratio: [8, 3], palette: ["#bfdbfe", "#1d4ed8", "#0c4a6e", "#f0f9ff"],
  },
  {
    id: "impression-soleil-levant", title: "Impression, soleil levant", artist: { name: "Claude Monet" }, year: 1872,
    technique: "Huile sur toile", dimensions: "48 × 63 cm", style: "Impressionnisme",
    license: "Domaine public", location: "Musée Marmottan Monet, Paris",
    description: "Le port du Havre dans la brume du matin. Le tableau a donné son nom à l’impressionnisme.",
    ratio: [4, 3], palette: ["#94a3b8", "#ea580c", "#475569", "#cbd5e1"], listenWith: "pluie-douce",
  },
  {
    id: "rue-de-paris-temps-de-pluie", title: "Rue de Paris, temps de pluie", artist: { name: "Gustave Caillebotte" }, year: 1877,
    technique: "Huile sur toile", dimensions: "212,2 × 276,2 cm", style: "Impressionnisme",
    license: "Domaine public", location: "Art Institute of Chicago",
    description: "Le carrefour de Dublin, dans le Paris haussmannien, sous la pluie.",
    ratio: [4, 3], palette: ["#d6d3d1", "#57534e", "#1c1917", "#a8a29e"], listenWith: "pluie-douce",
  },
  {
    id: "la-nuit-etoilee", title: "La Nuit étoilée", artist: { name: "Vincent van Gogh" }, year: 1889,
    technique: "Huile sur toile", dimensions: "73,7 × 92,1 cm", style: "Postimpressionnisme",
    license: "Domaine public", location: "Museum of Modern Art, New York",
    description: "Peint depuis la fenêtre de sa chambre à Saint-Rémy-de-Provence.",
    ratio: [5, 4], palette: ["#1e3a8a", "#facc15", "#0f172a", "#38bdf8"], listenWith: "gnossiennes",
  },
];

const exhibitions: Exhibition[] = [
  {
    id: "lumieres-du-sahel", title: "Lumières du Sahel", curator: "Pandora",
    description: "Peinture, photographie et sculpture d’artistes d’Afrique de l’Ouest, accompagnées par la kora de Sékou T.",
    rooms: [
      { title: "L’aube", artworkIds: ["sahel-1", "planches-fleuve"] },
      { title: "Le bleu", artworkIds: ["indigo-2", "indigo-4", "sahel-2"] },
      { title: "Le vent", artworkIds: ["sahel-3", "masques"] },
    ],
    soundtrack: "kora-sessions",
  },
  {
    id: "paris-sous-la-pluie", title: "Paris sous la pluie", curator: "Pandora",
    description: "Une exposition courte autour de la pluie et de la lumière chez les impressionnistes.",
    rooms: [
      { title: "Rues mouillées", artworkIds: ["rue-de-paris-temps-de-pluie"] },
      { title: "Lumières d’eau", artworkIds: ["impression-soleil-levant", "la-nuit-etoilee"] },
    ],
    soundtrack: "pluie-douce",
  },
];

export async function getArtworkIds(): Promise<string[]> {
  return artworks.map((a) => a.id);
}

export async function getArtwork(id: string): Promise<Artwork | undefined> {
  return artworks.find((a) => a.id === id);
}

export async function getArtworks(ids: string[]): Promise<Artwork[]> {
  return ids.flatMap((id) => artworks.filter((a) => a.id === id));
}

export async function getExhibitionIds(): Promise<string[]> {
  return exhibitions.map((e) => e.id);
}

export async function getExhibition(id: string): Promise<Exhibition | undefined> {
  return exhibitions.find((e) => e.id === id);
}

/** The exhibition showing this artwork, with the artwork order across rooms. */
export async function getExhibitionFor(artworkId: string) {
  const exhibition = exhibitions.find((e) => e.rooms.some((r) => r.artworkIds.includes(artworkId)));
  if (!exhibition) return undefined;
  const order = exhibition.rooms.flatMap((r) => r.artworkIds);
  return { exhibition, order, index: order.indexOf(artworkId) };
}

export function artworkToSummary(a: Artwork): WorkSummary {
  return { id: a.id, domain: "art", title: a.title, creator: a.artist.name, href: `/art/oeuvre/${a.id}` };
}
