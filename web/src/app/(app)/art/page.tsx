import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Art visuel" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Art visuel"
      phase={1}
      description="Galeries, collections et expositions virtuelles."
      sections={[
        "Œuvres à la une",
        "Styles et techniques",
        "Expositions en cours",
        "Artistes émergents",
      ]}
    />
  );
}
