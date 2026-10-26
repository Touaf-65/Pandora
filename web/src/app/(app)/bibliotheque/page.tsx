import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Ma bibliothèque" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Ma bibliothèque"
      phase={1}
      description="Tout ce que vous lisez, écoutez et collectionnez."
      sections={[
        "Lectures en cours et annotations",
        "Playlists",
        "Collections d'art",
        "Téléchargements hors ligne (Premium)",
      ]}
    />
  );
}
