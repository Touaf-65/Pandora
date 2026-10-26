import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Playlist" };

export default function Page({ params }: PageProps<"/musique/playlist/[id]">) {
  return (
    <PagePlaceholder
      title="Playlist"
      phase={1}
      description="Une playlist personnelle, partagée ou collaborative."
      sections={[
        "En-tête et actions",
        "Titres",
        "Collaborateurs (phase 2)",
      ]}
      detail={params.then(({ id }) => id)}
    />
  );
}
