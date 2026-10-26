import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Statistiques" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Statistiques"
      phase={2}
      description="Lectures, écoutes, vues et abonnés dans le temps."
      sections={[
        "Période",
        "Indicateurs clés",
        "Détail par œuvre",
        "Revenus (phase 3)",
      ]}
    />
  );
}
