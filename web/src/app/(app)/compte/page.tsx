import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Paramètres du compte" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Paramètres du compte"
      phase={1}
      description="Profil, confidentialité, sécurité et préférences."
      sections={[
        "Profil",
        "Confidentialité et RGPD",
        "Sécurité et double authentification",
        "Langue et préférences",
      ]}
    />
  );
}
