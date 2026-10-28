import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, ShieldCheck, Smartphone } from "lucide-react";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { paymentMethods } from "@/lib/plans";

export const metadata: Metadata = { title: "Tarifs" };

const methodIcons = { moov: Smartphone, carte: CreditCard };

export default function PricingPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 py-4">
      <header className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Une formule pour chaque curiosité</h1>
        <p className="text-base leading-relaxed text-muted">
          Lisez, écoutez et regardez gratuitement, ou passez Premium pour aller plus loin. Sans engagement, payable avec
          Moov Money.
        </p>
      </header>

      <PricingPlans />

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Comparatif détaillé</h2>
        <ComparisonTable />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Moyens de paiement</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {paymentMethods.map((m) => {
            const Icon = methodIcons[m.id];
            return (
              <li key={m.id} className="glass flex items-start gap-3 rounded-card p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-hover">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold">{m.label}</span>
                  <span className="text-xs leading-relaxed text-muted">{m.detail}</span>
                </span>
              </li>
            );
          })}
          <li className="glass flex items-start gap-3 rounded-card p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success-soft text-success">
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Sans engagement</span>
              <span className="text-xs leading-relaxed text-muted">Résiliable à tout moment depuis votre compte.</span>
            </span>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Questions fréquentes</h2>
        <PricingFaq />
      </section>

      <p className="text-center text-sm text-muted">
        Déjà membre ?{" "}
        <Link href="/compte/abonnement" className="font-medium text-accent-hover hover:underline">
          Gérer mon abonnement
        </Link>{" "}
        ·{" "}
        <Link href="/" className="font-medium text-accent-hover hover:underline">
          Retour à l’accueil
        </Link>
      </p>
    </div>
  );
}
