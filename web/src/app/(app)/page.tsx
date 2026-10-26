import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Ma journée culturelle" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Ma journée culturelle"
      phase={1}
      description="Une sélection croisée à lire, écouter et regarder selon votre humeur."
      sections={[
        "Trilogie du jour : lire, écouter, regarder",
        "Humeur du moment",
        "Reprendre",
        "Recommandations par domaine",
        "Créateurs émergents à suivre",
      ]}
    />
  );
}
