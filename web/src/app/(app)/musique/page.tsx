import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Musique" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Musique"
      phase={1}
      description="Albums, singles, playlists et radios."
      sections={[
        "Nouveautés",
        "Playlists pour vous",
        "Radios personnalisées (phase 2)",
        "Artistes émergents",
      ]}
    />
  );
}
