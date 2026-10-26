import { BookOpen, Image as ImageIcon, Music, type LucideIcon } from "lucide-react";

export type Domain = "lit" | "mus" | "art";

type DomainStyle = {
  label: string;
  /** Verb shown on cross-media selections. */
  action: string;
  icon: LucideIcon;
  text: string;
  soft: string;
  /** Cover proportions: book, album, artwork. */
  ratio: string;
};

export const domains: Record<Domain, DomainStyle> = {
  lit: { label: "Littérature", action: "Lire", icon: BookOpen, text: "text-lit", soft: "bg-lit-soft", ratio: "aspect-[2/3]" },
  mus: { label: "Musique", action: "Écouter", icon: Music, text: "text-mus", soft: "bg-mus-soft", ratio: "aspect-square" },
  art: { label: "Art visuel", action: "Regarder", icon: ImageIcon, text: "text-art", soft: "bg-art-soft", ratio: "aspect-[4/3]" },
};
