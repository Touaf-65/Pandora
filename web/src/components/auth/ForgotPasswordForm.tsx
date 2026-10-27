"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { isEmail } from "@/lib/validation";
import { TextField } from "./TextField";

/** Interface only: no e-mail is sent yet. */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const error = isEmail(email) ? undefined : "Saisissez l’adresse e-mail de votre compte.";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!error) setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent-hover">
          <Mail className="size-6" aria-hidden />
        </span>
        <p className="text-sm leading-relaxed">
          Si un compte existe pour <strong>{email.trim()}</strong>, vous recevrez un lien pour choisir un nouveau mot de passe.
          Pensez à vérifier vos courriers indésirables.
        </p>
        <p className="text-xs text-muted">Version de démonstration : aucun e-mail n’est encore envoyé.</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/connexion" className={buttonClasses("primary")}>
            Retour à la connexion
          </Link>
          <button type="button" onClick={() => setSent(false)} className={buttonClasses("ghost")}>
            Changer d’adresse
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <TextField
        label="Adresse e-mail"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={submitted ? error : undefined}
      />
      <button type="submit" className={buttonClasses("primary", "w-full")}>
        Recevoir le lien
      </button>
    </form>
  );
}
