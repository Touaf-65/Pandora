import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = { title: "Inscription" };

export default function SignUpPage() {
  return (
    <AuthShell
      title="Créer votre compte"
      subtitle="Gratuit, en une minute. Vous choisirez ensuite vos goûts."
      footer={
        <>
          Déjà inscrit ?{" "}
          <Link href="/connexion" className="font-medium text-accent-hover hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}
