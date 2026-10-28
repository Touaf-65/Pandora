/**
 * Sample account settings for the signed-in reader, until accounts exist.
 * Kept free of catalogue imports: the settings forms are client components.
 */

export const ACCOUNT_EMAIL = "nadia.bamba@exemple.ci";
export const ACCOUNT_PHONE = "+225 07 48 21 63 45";

export type Option<T extends string = string> = { id: T; label: string };

export const languages: Option[] = [
  { id: "fr", label: "Français" },
  { id: "en", label: "English" },
];

export type ReaderTheme = "clair" | "sepia" | "nuit";

export const readerThemes: (Option<ReaderTheme> & { swatch: string })[] = [
  { id: "clair", label: "Clair", swatch: "bg-white" },
  { id: "sepia", label: "Sépia", swatch: "bg-[#f6efe1]" },
  { id: "nuit", label: "Nuit", swatch: "bg-[#111318]" },
];

export type NotificationSetting = { id: string; label: string; email: boolean; push: boolean };

export const notificationSettings: NotificationSetting[] = [
  { id: "suivis", label: "Nouvelles publications des créateurs suivis", email: true, push: true },
  { id: "reponses", label: "Réponses à mes annotations et commentaires", email: false, push: true },
  { id: "messages", label: "Messages privés", email: true, push: true },
  { id: "recos", label: "Recommandations de la semaine", email: true, push: false },
  { id: "pandora", label: "Actualités et nouveautés de Pandora", email: false, push: false },
];

export type MessagePolicy = "tous" | "abonnes" | "personne";

export const messagePolicies: Option<MessagePolicy>[] = [
  { id: "tous", label: "Tout le monde" },
  { id: "abonnes", label: "Mes abonnés" },
  { id: "personne", label: "Personne" },
];

export type Device = {
  id: string;
  name: string;
  kind: "ordinateur" | "telephone" | "tablette";
  place: string;
  lastSeen: string;
  current?: boolean;
};

export const devices: Device[] = [
  { id: "d1", name: "Chrome sur Windows", kind: "ordinateur", place: "Abidjan, Côte d’Ivoire", lastSeen: "Actif maintenant", current: true },
  { id: "d2", name: "Application Android", kind: "telephone", place: "Abidjan, Côte d’Ivoire", lastSeen: "Il y a 2 heures" },
  { id: "d3", name: "Safari sur iPad", kind: "tablette", place: "Bouaké, Côte d’Ivoire", lastSeen: "Le 12 octobre" },
];

/** "+225 07 48 21 63 45" → "+225 •• •• •• •• 45". */
export function maskPhone(phone: string) {
  const parts = phone.split(" ");
  return parts.map((p, i) => (i === 0 || i === parts.length - 1 ? p : "••")).join(" ");
}
