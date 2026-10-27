import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = { title: "Connexion" };

export default function SignInPage() {
  return (
    <AuthShell
      title="Bon retour sur Pandora"
      subtitle="Connectez-vous pour retrouver vos lectures, playlists et collections."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-accent-hover hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthShell>
  );
}
