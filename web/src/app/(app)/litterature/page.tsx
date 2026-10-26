import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Littérature" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Littérature"
      phase={1}
      description="Romans, nouvelles et poésie, des classiques aux auteurs émergents."
      sections={[
        "À la une",
        "Genres",
        "Nouveaux chapitres des auteurs suivis",
        "Classiques du domaine public",
      ]}
    />
  );
}
