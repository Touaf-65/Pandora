import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Notifications" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Notifications"
      phase={1}
      description="Nouveaux chapitres, réponses, abonnés et invitations."
      sections={[
        "Toutes",
        "Créateurs suivis",
        "Interactions",
        "Préférences de notification",
      ]}
    />
  );
}
