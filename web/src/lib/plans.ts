/**
 * Subscription plans, from the "Freemium local" business model.
 * Kept free of catalogue imports so client components can use it.
 */

export type PlanId = "gratuit" | "local" | "standard";
export type Period = "mois" | "an";
export type Currency = "EUR" | "XOF";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** Prices per period and currency; the yearly price gives two months free. */
  prices: Record<Period, Record<Currency, number>>;
  highlights: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "gratuit",
    name: "Gratuit",
    tagline: "Pour découvrir Pandora, avec une publicité discrète.",
    prices: { mois: { EUR: 0, XOF: 0 }, an: { EUR: 0, XOF: 0 } },
    highlights: ["5 œuvres littéraires par mois", "20 h de musique par mois", "50 œuvres d’art par mois", "Qualité standard"],
  },
  {
    id: "local",
    name: "Premium Local",
    tagline: "Sans publicité, avec plus de place pour vos lectures et écoutes.",
    prices: { mois: { EUR: 1.99, XOF: 1300 }, an: { EUR: 19.9, XOF: 13000 } },
    highlights: ["20 œuvres littéraires par mois", "50 h de musique par mois", "100 œuvres d’art par mois", "5 téléchargements par mois", "Haute définition"],
  },
  {
    id: "standard",
    name: "Premium Standard",
    tagline: "Tout Pandora, sans limite, même hors connexion.",
    prices: { mois: { EUR: 3.99, XOF: 2600 }, an: { EUR: 39.9, XOF: 26000 } },
    highlights: ["Littérature, musique et art illimités", "Téléchargements illimités et hors ligne", "Recommandations IA", "Contenus exclusifs", "Support prioritaire"],
    featured: true,
  },
];

/** Comparison table: one value per plan, `true`/`false` drawn as a check or a dash. */
export const comparison: { label: string; values: Record<PlanId, string | boolean> }[] = [
  { label: "Œuvres littéraires", values: { gratuit: "5 par mois", local: "20 par mois", standard: "Illimité" } },
  { label: "Musique", values: { gratuit: "20 h par mois", local: "50 h par mois", standard: "Illimité" } },
  { label: "Œuvres d’art", values: { gratuit: "50 par mois", local: "100 par mois", standard: "Illimité" } },
  { label: "Publicité", values: { gratuit: "Bannière discrète", local: false, standard: false } },
  { label: "Qualité", values: { gratuit: "Standard", local: "Haute définition", standard: "Haute définition" } },
  { label: "Téléchargements", values: { gratuit: false, local: "5 par mois", standard: "Illimité" } },
  { label: "Mode hors ligne", values: { gratuit: false, local: false, standard: true } },
  { label: "Recommandations", values: { gratuit: "Basiques", local: "Améliorées", standard: "IA, cross-média" } },
  { label: "Contenus exclusifs", values: { gratuit: false, local: false, standard: true } },
  { label: "Support prioritaire", values: { gratuit: false, local: false, standard: true } },
];

export const paymentMethods = [
  { id: "moov", label: "Moov Money", detail: "Confirmation sur votre téléphone, sans carte bancaire." },
  { id: "carte", label: "Carte bancaire", detail: "Visa et Mastercard, paiement sécurisé." },
] as const;

export type PaymentMethod = (typeof paymentMethods)[number]["id"];

const formats: Record<Currency, Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }),
  XOF: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF" }),
};

/** 1.99 → "1,99 €", 1300 → "1 300 F CFA". */
export function formatPrice(amount: number, currency: Currency) {
  return formats[currency].format(amount);
}

export function getPlan(id: PlanId) {
  return plans.find((p) => p.id === id) ?? plans[0];
}
