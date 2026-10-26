import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Tarifs" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Tarifs"
      phase={1}
      description="Gratuit, Premium Local et Premium Standard."
      sections={[
        "Comparatif des formules",
        "Questions fréquentes",
        "Moyens de paiement acceptés",
      ]}
    />
  );
}
