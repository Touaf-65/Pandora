import {
  BookOpen,
  Compass,
  House,
  Image as ImageIcon,
  Layers,
  Library,
  MessageSquare,
  Music,
  PenLine,
  Search,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

export const mainNav: NavSection[] = [
  {
    items: [
      { label: "Accueil", href: "/", icon: House },
      { label: "Rechercher", href: "/recherche", icon: Search },
      { label: "Explorer", href: "/explorer", icon: Compass },
      { label: "Littérature", href: "/litterature", icon: BookOpen },
      { label: "Musique", href: "/musique", icon: Music },
      { label: "Art visuel", href: "/art", icon: ImageIcon },
    ],
  },
  {
    title: "Ma culture",
    items: [
      { label: "Bibliothèque", href: "/bibliotheque", icon: Library },
      { label: "Messages", href: "/messages", icon: MessageSquare },
    ],
  },
  {
    title: "Créer",
    items: [
      { label: "Studio", href: "/studio", icon: PenLine },
      { label: "Projets cross-média", href: "/projets", icon: Layers },
    ],
  },
];

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
