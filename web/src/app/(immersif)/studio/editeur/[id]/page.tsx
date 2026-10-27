import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Éditeur de chapitre" };

export default function Page({ params }: PageProps<"/studio/editeur/[id]">) {
  return (
    <div className="px-4 py-8 md:px-8">
      <PagePlaceholder
        title="Éditeur de chapitre"
        phase={2}
        description="Écrire, mettre en forme et publier un chapitre."
        sections={[
          "Liste des chapitres",
          "Éditeur de texte et mode focus",
          "Publication, accès et licence",
          "Médias liés et co-auteurs",
        ]}
        detail={params.then(({ id }) => id)}
      />
    </div>
  );
}
