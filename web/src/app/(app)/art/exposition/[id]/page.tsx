import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Exposition virtuelle" };

export default function Page({ params }: PageProps<"/art/exposition/[id]">) {
  return (
    <PagePlaceholder
      title="Exposition virtuelle"
      phase={2}
      description="Une exposition thématique à parcourir salle par salle."
      sections={[
        "Salles et parcours",
        "Œuvres exposées",
        "Visite guidée audio (phase 3)",
      ]}
      detail={params.then(({ id }) => id)}
    />
  );
}
