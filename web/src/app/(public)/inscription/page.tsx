import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Inscription" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Inscription"
      phase={1}
      description="Créez votre compte en une minute."
      sections={[
        "Formulaire d'inscription",
        "Inscription Google, Apple",
        "Conditions et confidentialité",
      ]}
    />
  );
}
