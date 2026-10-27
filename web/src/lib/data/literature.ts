/**
 * Sample literary works, until the API exists.
 * Fictional creators' texts are original; public-domain works only carry
 * text that is reproduced verbatim (the full texts will be imported later).
 */
import type { WorkSummary } from "./home";

export type Access = "free" | "premium";

export type Chapter = {
  number: number;
  title: string;
  minutes: number;
  access: Access;
  /** Missing when the text is not available in the demo yet. */
  paragraphs?: string[];
  /** Line breaks are kept (poetry). */
  verse?: boolean;
  soundtrack?: { title: string; artist: string; duration: string };
  illustration?: { caption: string };
};

export type Comment = { author: string; chapter: number; text: string };

export type LiteraryWork = {
  slug: string;
  title: string;
  author: { name: string; pseudo?: string };
  genre: string;
  status: "En cours" | "Terminé";
  license: string;
  language: string;
  summary: string;
  chapters: Chapter[];
  /** Reader's position, once accounts exist. */
  progress?: { chapter: number; percent: number };
  crossMedia?: {
    soundtrack: { title: string; creator: string; href: string; tracks: number };
    illustrations: { creator: string; href: string; count: number };
    projectHref: string;
  };
  comments: Comment[];
  similar: string[];
};

const fleuveSoundtrack = (title: string, duration: string) => ({ title, artist: "Sékou T.", duration });

const works: LiteraryWork[] = [
  {
    slug: "le-fleuve-et-la-nuit",
    title: "Le Fleuve et la nuit",
    author: { name: "Awa Diallo", pseudo: "awa-diallo" },
    genre: "Roman",
    status: "En cours",
    license: "CC BY-NC",
    language: "Français",
    summary:
      "Une nuit de crue, une passeuse du fleuve Niger recueille un inconnu sans mémoire. Chaque chapitre est accompagné d’une bande-son originale et d’une illustration créées par la communauté.",
    progress: { chapter: 4, percent: 20 },
    crossMedia: {
      soundtrack: { title: "Bande-son officielle", creator: "Sékou T.", href: "/musique/album/bande-son-fleuve", tracks: 6 },
      illustrations: { creator: "Mariam K.", href: "/art/oeuvre/planches-fleuve", count: 9 },
      projectHref: "/projets/le-fleuve-et-la-nuit",
    },
    chapters: [
      {
        number: 1, title: "La crue", minutes: 14, access: "free",
        soundtrack: fleuveSoundtrack("La crue", "4:02"),
        illustration: { caption: "La pirogue dans la nuit de crue, par Mariam K." },
        paragraphs: [
          "L’eau était montée d’un coup, comme si quelqu’un, en amont, avait ouvert une porte. Aminata avait entendu le fleuve changer de voix avant de le voir changer de couleur.",
          "Elle détacha la pirogue à la lueur de la lampe tempête. Les autres passeurs étaient rentrés depuis longtemps ; personne ne traverse un soir pareil, disait-on à Mopti, sauf ceux qui n’ont plus rien à perdre ou ceux qui ont tout à sauver.",
          "Au milieu du courant, quelque chose heurta la coque. Elle crut d’abord à un tronc. Puis une main sortit de l’eau et s’agrippa au bord, si fort que le bois craqua.",
          "Elle hissa l’homme à bord. Il était vivant, trempé, les yeux grands ouverts sur un ciel sans étoiles. Quand elle lui demanda son nom, il ouvrit la bouche, et rien ne vint.",
        ],
      },
      {
        number: 2, title: "Le passager", minutes: 18, access: "free",
        soundtrack: fleuveSoundtrack("Le passager", "3:47"),
        paragraphs: [
          "Il dormit deux jours sous l’auvent de la maison, enroulé dans la couverture rouge que la mère d’Aminata gardait pour les grands froids, qui ne venaient jamais.",
          "Le troisième jour, il se leva, regarda le fleuve longtemps et dit merci. C’était le premier mot qu’on lui entendait prononcer, et il le dit avec un accent que personne, dans le quartier, ne sut reconnaître.",
          "Les enfants le suivaient à distance. Les vieux faisaient semblant de ne pas le voir. Aminata, elle, l’observait réparer le filet de son père avec des gestes sûrs, comme s’il avait fait cela toute sa vie.",
          "— Tu es pêcheur ? demanda-t-elle.\n— Je ne sais pas, répondit-il. Mes mains, peut-être.",
        ],
      },
      {
        number: 3, title: "Les voix de l’eau", minutes: 16, access: "free",
        soundtrack: fleuveSoundtrack("Les voix de l’eau", "4:18"),
        illustration: { caption: "Pirogue à l’aube, par Mariam K." },
        paragraphs: [
          "La pluie avait cessé avant l’aube, mais le fleuve continuait de parler. Aminata l’écoutait depuis la proue, la perche immobile entre ses mains, comme on écoute une vieille tante qui raconte toujours la même histoire en changeant un détail.",
          "L’inconnu dormait au fond de la pirogue, enroulé dans la couverture rouge. Il n’avait rien dit de la nuit, sinon un mot, un seul, qu’elle n’avait jamais entendu et qui sonnait pourtant comme un nom de village.",
          "Sur la rive, les pêcheurs repliaient leurs filets. L’un d’eux leva la main, puis la laissa retomber en voyant le passager. Aminata comprit qu’elle ne pourrait pas le cacher longtemps : à Mopti, le fleuve parle, mais les gens parlent plus vite encore.",
          "Elle reprit la perche. L’eau était lourde, brune, pleine de tout ce que la crue avait arraché aux berges.",
        ],
      },
      {
        number: 4, title: "Mopti, à l’aube", minutes: 20, access: "free",
        soundtrack: fleuveSoundtrack("Mopti, à l’aube", "5:10"),
        paragraphs: [
          "Le marché s’ouvrait toujours avant le soleil. Aminata y conduisit le passager à travers les étals de poisson séché, en lui interdisant de parler.",
          "— Ici, chacun connaît le visage de chacun, dit-elle. Un visage nouveau, c’est une histoire nouvelle. Et les histoires nouvelles finissent toujours chez le chef de quartier.",
          "Il hocha la tête. Mais devant l’étal d’une vendeuse de tissus, il s’arrêta net, saisit un pagne indigo et le porta à son visage, les yeux fermés, comme on respire une odeur d’enfance.",
        ],
      },
      { number: 5, title: "Ce que le fleuve garde", minutes: 17, access: "free", soundtrack: fleuveSoundtrack("Ce que le fleuve garde", "4:36") },
      { number: 6, title: "La rive des absents", minutes: 22, access: "premium", soundtrack: fleuveSoundtrack("La rive des absents", "6:02") },
    ],
    comments: [
      { author: "Lina", chapter: 2, text: "La scène du filet réparé, avec la bande-son en fond, j’en ai eu des frissons." },
      { author: "Moussa", chapter: 3, text: "Hâte de comprendre qui est vraiment le passager." },
      { author: "Claire", chapter: 1, text: "L’illustration d’ouverture colle parfaitement au texte." },
    ],
    similar: ["sable-et-sel", "les-marees", "contes-du-soir"],
  },
  {
    slug: "les-miserables",
    title: "Les Misérables",
    author: { name: "Victor Hugo" },
    genre: "Roman",
    status: "Terminé",
    license: "Domaine public",
    language: "Français",
    summary:
      "La trajectoire de Jean Valjean, ancien forçat, à travers la France du XIXᵉ siècle. Texte intégral du domaine public, édition numérique Pandora.",
    progress: { chapter: 3, percent: 42 },
    chapters: [
      { number: 1, title: "Monsieur Myriel", minutes: 12, access: "free" },
      { number: 2, title: "Monsieur Myriel devient monseigneur Bienvenu", minutes: 10, access: "free" },
      { number: 3, title: "À bon évêque dur évêché", minutes: 9, access: "free" },
      { number: 4, title: "Les œuvres semblables aux paroles", minutes: 15, access: "free" },
    ],
    comments: [],
    similar: ["notre-dame-de-paris", "le-fleuve-et-la-nuit"],
  },
  {
    slug: "notre-dame-de-paris",
    title: "Notre-Dame de Paris",
    author: { name: "Victor Hugo" },
    genre: "Roman",
    status: "Terminé",
    license: "Domaine public",
    language: "Français",
    summary: "Paris, 1482 : Esmeralda, Quasimodo et Frollo autour de la cathédrale. Texte intégral du domaine public.",
    chapters: [
      { number: 1, title: "La grand’salle", minutes: 16, access: "free" },
      { number: 2, title: "Pierre Gringoire", minutes: 11, access: "free" },
      { number: 3, title: "Monsieur le cardinal", minutes: 9, access: "free" },
    ],
    comments: [],
    similar: ["les-miserables", "poemes-saturniens"],
  },
  {
    slug: "poemes-saturniens",
    title: "Poèmes saturniens",
    author: { name: "Paul Verlaine" },
    genre: "Poésie",
    status: "Terminé",
    license: "Domaine public",
    language: "Français",
    summary: "Le premier recueil de Verlaine (1866), entre mélancolie et musique du vers.",
    chapters: [
      {
        number: 1, title: "Chanson d’automne", minutes: 2, access: "free", verse: true,
        paragraphs: [
          "Les sanglots longs\nDes violons\nDe l’automne\nBlessent mon cœur\nD’une langueur\nMonotone.",
          "Tout suffocant\nEt blême, quand\nSonne l’heure,\nJe me souviens\nDes jours anciens\nEt je pleure ;",
          "Et je m’en vais\nAu vent mauvais\nQui m’emporte\nDeçà, delà,\nPareil à la\nFeuille morte.",
        ],
      },
      { number: 2, title: "Mon rêve familier", minutes: 2, access: "free", verse: true },
      { number: 3, title: "Nevermore", minutes: 2, access: "free", verse: true },
    ],
    comments: [],
    similar: ["les-marees", "les-miserables"],
  },
  {
    slug: "sable-et-sel",
    title: "Sable et sel",
    author: { name: "Kofi Mensah", pseudo: "kofi-mensah" },
    genre: "Nouvelle",
    status: "Terminé",
    license: "Tous droits réservés",
    language: "Français",
    summary: "Sur la côte du Ghana, une saunière et son fils attendent une pirogue qui ne revient pas.",
    chapters: [{ number: 1, title: "Sable et sel", minutes: 25, access: "free" }],
    comments: [],
    similar: ["le-fleuve-et-la-nuit", "contes-du-soir"],
  },
  {
    slug: "contes-du-soir",
    title: "Contes du soir",
    author: { name: "Collectif" },
    genre: "Recueil",
    status: "Terminé",
    license: "CC BY",
    language: "Français",
    summary: "Six auteurs, six contes à lire à voix haute, chacun suivi d’une courte mise en musique.",
    chapters: [
      { number: 1, title: "L’hyène et la lune", minutes: 6, access: "free" },
      { number: 2, title: "Le baobab qui marchait", minutes: 6, access: "free" },
    ],
    comments: [],
    similar: ["sable-et-sel", "le-fleuve-et-la-nuit"],
  },
  {
    slug: "les-marees",
    title: "Les Marées",
    author: { name: "Inès Morel" },
    genre: "Roman",
    status: "En cours",
    license: "CC BY-NC",
    language: "Français",
    summary: "Une gardienne de phare compte les marées pour ne pas compter les jours.",
    chapters: [
      { number: 1, title: "Coefficient 110", minutes: 15, access: "free" },
      { number: 2, title: "Étale", minutes: 13, access: "free" },
      { number: 3, title: "Le jusant", minutes: 18, access: "premium" },
    ],
    comments: [],
    similar: ["poemes-saturniens", "le-fleuve-et-la-nuit"],
  },
];

export async function getWorkSlugs(): Promise<string[]> {
  return works.map((w) => w.slug);
}

export async function getWork(slug: string): Promise<LiteraryWork | undefined> {
  return works.find((w) => w.slug === slug);
}

export function toSummary(work: LiteraryWork): WorkSummary {
  return { id: work.slug, domain: "lit", title: work.title, creator: work.author.name, href: `/litterature/${work.slug}` };
}

export async function getSimilarWorks(work: LiteraryWork): Promise<WorkSummary[]> {
  return work.similar.flatMap((slug) => {
    const found = works.find((w) => w.slug === slug);
    return found ? [toSummary(found)] : [];
  });
}

export function readerHref(slug: string, chapter: number) {
  return `/lire/${slug}/${chapter}`;
}
