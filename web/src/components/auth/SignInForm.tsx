"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonClasses } from "@/components/ui/Button";
import { isEmail } from "@/lib/validation";
import { SocialButtons } from "./SocialButtons";
import { TextField } from "./TextField";

/** Interface only: nothing is checked against an account; a valid form opens the home page. */
export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    email: isEmail(email) ? undefined : "Saisissez une adresse e-mail valide.",
    password: password ? undefined : "Saisissez votre mot de passe.",
  };
  const valid = !errors.email && !errors.password;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (valid) router.push("/");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <SocialButtons />
      <TextField
        label="Adresse e-mail"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={submitted ? errors.email : undefined}
      />
      <TextField
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        revealable
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={submitted ? errors.password : undefined}
      />
      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-4 accent-accent" />
          Rester connecté
        </label>
        <Link href="/mot-de-passe-oublie" className="font-medium text-accent-hover hover:underline">
          Mot de passe oublié ?
        </Link>
      </div>
      <button type="submit" className={buttonClasses("primary", "w-full")}>
        Se connecter
      </button>
      <p className="text-center text-xs text-muted">Version de démonstration : aucun compte n’est encore vérifié.</p>
    </form>
  );
}
