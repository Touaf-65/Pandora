import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Catalogue" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Catalogue"
      phase={2}
      description="Toutes vos œuvres, leurs statuts et leurs licences."
      sections={[
        "Filtres par type et statut",
        "Tableau des œuvres",
        "Droits et licences",
      ]}
    />
  );
}
