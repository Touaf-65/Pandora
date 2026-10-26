import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Album" };

export default function Page({ params }: PageProps<"/musique/album/[id]">) {
  return (
    <PagePlaceholder
      title="Album"
      phase={1}
      description="Un album ou un single et ses titres."
      sections={[
        "En-tête : pochette, artiste, actions",
        "Liste des titres et œuvres accompagnées",
        "Du même artiste",
        "Radio inspirée de l'album",
      ]}
      detail={params.then(({ id }) => id)}
    />
  );
}
