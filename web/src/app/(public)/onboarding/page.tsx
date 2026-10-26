import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Votre génome culturel" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Votre génome culturel"
      phase={1}
      description="Trois étapes pour que Pandora comprenne vos goûts."
      sections={[
        "Étape 1 : domaines",
        "Étape 2 : genres",
        "Étape 3 : moments culturels",
        "Aperçu du génome",
      ]}
    />
  );
}
