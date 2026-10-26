import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Artiste" };

export default function Page({ params }: PageProps<"/musique/artiste/[id]">) {
  return (
    <PagePlaceholder
      title="Artiste"
      phase={1}
      description="La page publique d'un artiste musical."
      sections={[
        "Présentation",
        "Titres populaires",
        "Discographie",
        "Collaborations cross-média",
      ]}
      detail={params.then(({ id }) => id)}
    />
  );
}
