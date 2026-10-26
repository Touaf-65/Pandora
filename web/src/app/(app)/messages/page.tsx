import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Messages" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Messages"
      phase={2}
      description="Messagerie privée et groupes de discussion."
      sections={[
        "Conversations",
        "Fil de discussion",
        "Groupes",
      ]}
    />
  );
}
