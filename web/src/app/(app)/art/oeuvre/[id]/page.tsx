import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Œuvre d'art" };

export default function Page({ params }: PageProps<"/art/oeuvre/[id]">) {
  return (
    <PagePlaceholder
      title="Œuvre d'art"
      phase={1}
      description="Une œuvre en haute définition, avec zoom."
      sections={[
        "Visionneuse avec zoom et plein écran",
        "Fiche technique et licence",
        "Écouter en regardant",
        "Avis des visiteurs",
      ]}
      detail={params.then(({ id }) => id)}
    />
  );
}
