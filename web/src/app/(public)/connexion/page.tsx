import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = { title: "Connexion" };

export default function Page() {
  return (
    <PagePlaceholder
      title="Connexion"
      phase={1}
      description="Accédez à votre compte Pandora."
      sections={[
        "E-mail et mot de passe",
        "Connexion Google, Apple",
        "Mot de passe oublié",
      ]}
    />
  );
}
