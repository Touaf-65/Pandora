import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Fiche œuvre" };

export default function Page({ params }: PageProps<"/litterature/[slug]">) {
  return (
    <PagePlaceholder
      title="Fiche œuvre"
      phase={1}
      description="Présentation d'une œuvre littéraire et de ses chapitres."
      sections={[
        "En-tête : couverture, auteur, licence, actions",
        "Liste des chapitres et progression",
        "Commentaires et notes",
        "Univers cross-média : bande-son, illustrations",
      ]}
      detail={params.then(({ slug }) => slug)}
    />
  );
}
