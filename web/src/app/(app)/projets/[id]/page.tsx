import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Espace projet" };

export default function Page({ params }: PageProps<"/projets/[id]">) {
  return (
    <PagePlaceholder
      title="Espace projet"
      phase={3}
      description="L'avancement d'un projet collaboratif, chapitre par chapitre."
      sections={[
        "Membres et rôles",
        "Avancement texte, bande-son, illustration",
        "Partage des revenus",
        "Droits et discussion",
      ]}
      detail={params.then(({ id }) => id)}
    />
  );
}
