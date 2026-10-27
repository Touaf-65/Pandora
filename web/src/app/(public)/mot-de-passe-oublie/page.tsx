import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Mot de passe oublié"
      subtitle="Indiquez votre adresse e-mail : nous vous enverrons un lien pour en choisir un nouveau."
      footer={
        <Link href="/connexion" className="font-medium text-accent-hover hover:underline">
          Retour à la connexion
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
