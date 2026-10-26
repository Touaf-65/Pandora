import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Lecteur" };

export default function Page({ params }: PageProps<"/lire/[slug]/[chapitre]">) {
  return (
    <PagePlaceholder
      title="Lecteur"
      phase={1}
      description="Lecture immersive d'un chapitre."
      sections={[
        "Thèmes nuit, sépia, jour et taille du texte",
        "Texte et illustrations",
        "Annotations et marque-pages",
        "Bande-son du chapitre",
      ]}
      detail={params.then(({ slug, chapitre }) => `${slug} / ${chapitre}`)}
    />
  );
}
