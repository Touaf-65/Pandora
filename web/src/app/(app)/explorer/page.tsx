import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Explorer" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Explorer"
      phase={1}
      description="Parcourir la culture par humeur, collection thématique et tendance."
      sections={[
        "Explorer par humeur",
        "Collections thématiques",
        "Tendances (phase 2)",
      ]}
    />
  );
}
