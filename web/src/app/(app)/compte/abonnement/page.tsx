import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Abonnement" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Abonnement"
      phase={1}
      description="Votre formule, vos moyens de paiement et vos factures."
      sections={[
        "Formule actuelle",
        "Changer de formule",
        "Moyens de paiement : Moov Money, carte",
        "Factures",
      ]}
    />
  );
}
