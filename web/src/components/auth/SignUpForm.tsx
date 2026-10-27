"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { isEmail, MIN_PASSWORD_LENGTH, passwordStrength } from "@/lib/validation";
import { SocialButtons } from "./SocialButtons";
import { TextField } from "./TextField";

const strengthColors = ["bg-danger", "bg-danger", "bg-warning", "bg-success", "bg-success"];

type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "terms", string>>;

/** Interface only: nothing is sent; a valid form continues to the onboarding. */
export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors: Errors = {};
  if (!name.trim()) errors.name = "Indiquez votre prénom ou un pseudonyme.";
  if (!isEmail(email)) errors.email = "Saisissez une adresse e-mail valide, par exemple vous@exemple.com.";
  if (password.length < MIN_PASSWORD_LENGTH) errors.password = `Au moins ${MIN_PASSWORD_LENGTH} caractères.`;
  if (confirm !== password || !confirm) errors.confirm = "Les deux mots de passe ne correspondent pas.";
  if (!terms) errors.terms = "Acceptez les conditions pour créer votre compte.";
  const shown: Errors = submitted ? errors : {};
  const strength = passwordStrength(password);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length === 0) router.push("/onboarding");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <SocialButtons />
      <TextField
        label="Prénom ou pseudonyme"
        autoComplete="nickname"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={shown.name}
      />
      <TextField
        label="Adresse e-mail"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={shown.email}
      />
      <TextField
        label="Mot de passe"
        type="password"
        autoComplete="new-password"
        revealable
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={shown.password}
        hint={
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-1" aria-hidden>
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full ${password && i <= Math.max(strength.score, 1) ? strengthColors[strength.score] : "bg-surface-muted"}`}
                />
              ))}
            </div>
            <span aria-live="polite">{password ? `Sécurité : ${strength.label}` : `${MIN_PASSWORD_LENGTH} caractères minimum`}</span>
          </div>
        }
      />
      <TextField
        label="Confirmer le mot de passe"
        type="password"
        autoComplete="new-password"
        revealable
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={shown.confirm}
      />
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            aria-invalid={shown.terms ? true : undefined}
            className="mt-0.5 size-4 shrink-0 accent-accent"
          />
          <span>
            J’accepte les{" "}
            <Link href="/compte" className="font-medium text-accent-hover hover:underline">conditions d’utilisation</Link> et la{" "}
            <Link href="/compte" className="font-medium text-accent-hover hover:underline">politique de confidentialité</Link>.
          </span>
        </label>
        {shown.terms && <p className="text-xs text-danger">{shown.terms}</p>}
      </div>
      <button type="submit" className={buttonClasses("primary", "w-full")}>
        Créer mon compte
      </button>
      <p className="text-center text-xs text-muted">Version de démonstration : aucun compte n’est encore créé.</p>
    </form>
  );
}
