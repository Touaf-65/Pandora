import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Projets cross-média" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Projets cross-média"
      phase={3}
      description="Créer à plusieurs : texte, musique et image autour d'une même œuvre."
      sections={[
        "Mes projets",
        "Invitations",
        "Trouver des collaborateurs",
      ]}
    />
  );
}
