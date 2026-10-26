import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Recherche" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Recherche"
      phase={1}
      description="Une seule recherche pour toutes les œuvres, tous les créateurs et toutes les humeurs."
      sections={[
        "Barre de recherche et recherche par humeur",
        "Onglets par type de contenu",
        "Filtres : langue, durée, accès, émergents",
        "Résultats par domaine et expérience croisée",
      ]}
    />
  );
}
