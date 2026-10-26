import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Studio créateur" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Studio créateur"
      phase={2}
      description="Publier, suivre son audience et gérer son catalogue."
      sections={[
        "Créer : texte, musique, œuvre d'art",
        "Audience",
        "Mon catalogue",
        "À traiter : propositions, signalements, commentaires",
      ]}
    />
  );
}
