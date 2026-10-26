import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Modération" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Modération"
      phase={2}
      description="File de modération et signalements de droits d'auteur."
      sections={[
        "Contenus signalés",
        "Signalements droits d'auteur",
        "Utilisateurs",
      ]}
    />
  );
}
