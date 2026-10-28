import type { Metadata } from "next";
import Link from "next/link";
import { SubscriptionManager } from "@/components/pricing/SubscriptionManager";

export const metadata: Metadata = { title: "Abonnement" };

export default function SubscriptionPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <nav aria-label="Fil d’Ariane" className="flex gap-2 text-sm text-muted">
          <Link href="/compte" className="hover:text-ink">Compte</Link>
          <span aria-hidden>/</span>
          <span className="text-ink">Abonnement</span>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight">Abonnement</h1>
        <p className="text-base text-muted">
          Votre formule, votre consommation du mois et vos factures.{" "}
          <Link href="/tarifs" className="font-medium text-accent-hover hover:underline">
            Voir le comparatif complet
          </Link>
        </p>
      </header>
      <SubscriptionManager />
    </div>
  );
}
