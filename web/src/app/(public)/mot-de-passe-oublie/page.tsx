import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Mot de passe oublié"
      phase={1}
      description="Recevez un lien pour choisir un nouveau mot de passe."
      sections={[
        "Saisie de l'e-mail",
        "Confirmation d'envoi",
      ]}
    />
  );
}
