"use client";

import { useState, type FormEvent } from "react";
import { BadgeCheck, KeyRound, Laptop, ShieldCheck, Smartphone, Tablet } from "lucide-react";
import { TextField } from "@/components/auth/TextField";
import { buttonClasses } from "@/components/ui/Button";
import { ACCOUNT_EMAIL, ACCOUNT_PHONE, devices as sampleDevices, maskPhone } from "@/lib/account";
import { MIN_PASSWORD_LENGTH, passwordStrength } from "@/lib/validation";
import { SavedNotice, SettingsGroup } from "./shared";

const deviceIcons = { ordinateur: Laptop, telephone: Smartphone, tablette: Tablet };
const strengthColors = ["bg-danger", "bg-danger", "bg-warning", "bg-success", "bg-success"];

/** Interface only: nothing is sent, any 6-digit code is accepted. */
export function SecuritySettings() {
  return (
    <div className="flex flex-col gap-6">
      <SettingsGroup title="Identifiants">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Adresse e-mail</span>
            <span className="flex items-center gap-1.5 text-sm text-muted">
              {ACCOUNT_EMAIL}
              <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
                <BadgeCheck className="size-3.5" aria-hidden />
                Vérifiée
              </span>
            </span>
          </div>
        </div>
        <PasswordForm />
      </SettingsGroup>
      <TwoFactor />
      <Devices />
    </div>
  );
}

function PasswordForm() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [savedAt, setSavedAt] = useState(0);

  const strength = passwordStrength(next);
  const errors = {
    current: current ? undefined : "Saisissez votre mot de passe actuel.",
    next:
      next.length < MIN_PASSWORD_LENGTH
        ? `${MIN_PASSWORD_LENGTH} caractères au minimum.`
        : next === current
          ? "Choisissez un mot de passe différent de l’actuel."
          : undefined,
    confirm: confirm === next ? undefined : "Les deux mots de passe ne correspondent pas.",
  };
  const shown: Partial<typeof errors> = submitted ? errors : {};

  function close() {
    setOpen(false);
    setCurrent("");
    setNext("");
    setConfirm("");
    setSubmitted(false);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (errors.current || errors.next || errors.confirm) return;
    close();
    setSavedAt((n) => n + 1);
  }

  if (!open) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">Mot de passe</span>
          <span className="text-sm text-muted">Modifié le 14 septembre 2026</span>
          <SavedNotice stamp={savedAt}>Mot de passe modifié.</SavedNotice>
        </div>
        <button type="button" onClick={() => setOpen(true)} className={buttonClasses("secondary")}>
          <KeyRound className="size-4" aria-hidden />
          Modifier
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Modifier le mot de passe" className="flex flex-col gap-4 py-4">
      <TextField
        label="Mot de passe actuel"
        type="password"
        revealable
        autoComplete="current-password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        error={shown.current}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Nouveau mot de passe"
          type="password"
          revealable
          autoComplete="new-password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          error={shown.next}
          hint={
            next && (
              <span className="flex items-center gap-2">
                <span className="flex flex-1 gap-1" aria-hidden>
                  {[1, 2, 3, 4].map((i) => (
                    <span key={i} className={`h-1 flex-1 rounded-full ${i <= strength.score ? strengthColors[strength.score] : "bg-surface-muted"}`} />
                  ))}
                </span>
                {strength.label}
              </span>
            )
          }
        />
        <TextField
          label="Confirmer le nouveau mot de passe"
          type="password"
          revealable
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={shown.confirm}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="submit" className={buttonClasses("primary")}>
          Changer le mot de passe
        </button>
        <button type="button" onClick={close} className={buttonClasses("ghost")}>
          Annuler
        </button>
      </div>
    </form>
  );
}

type TwoFactorStep = "off" | "code" | "on";

function TwoFactor() {
  const [step, setStep] = useState<TwoFactorStep>("off");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const phone = maskPhone(ACCOUNT_PHONE);

  function verify(event: FormEvent) {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setError("Saisissez les 6 chiffres reçus par SMS.");
      return;
    }
    setStep("on");
    setCode("");
    setError(undefined);
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Double authentification</h3>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-white/60 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                step === "on" ? "bg-success-soft text-success" : "bg-surface-muted text-muted"
              }`}
            >
              <ShieldCheck className="size-5" aria-hidden />
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">{step === "on" ? "Activée par SMS" : "Désactivée"}</span>
              <span className="text-xs leading-relaxed text-muted">
                {step === "on"
                  ? `Un code est demandé à chaque connexion sur un nouvel appareil, envoyé au ${phone}.`
                  : "Ajoutez un code envoyé par SMS à chaque connexion sur un nouvel appareil."}
              </span>
            </div>
          </div>
          {step === "off" && (
            <button type="button" onClick={() => setStep("code")} className={buttonClasses("primary")}>
              Activer
            </button>
          )}
          {step === "on" && (
            <button type="button" onClick={() => setStep("off")} className={buttonClasses("secondary")}>
              Désactiver
            </button>
          )}
        </div>

        {step === "code" && (
          <form onSubmit={verify} noValidate aria-label="Vérifier le code" className="flex flex-col gap-3 border-t border-border pt-4">
            <p className="text-sm">
              Code envoyé au <strong>{phone}</strong>.
            </p>
            <div className="flex flex-wrap items-start gap-3">
              <div className="w-44">
                <TextField
                  label="Code à 6 chiffres"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  error={error}
                  className="tracking-[0.3em]"
                />
              </div>
              <div className="flex gap-2 pt-7">
                <button type="submit" className={buttonClasses("primary")}>
                  Vérifier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("off");
                    setCode("");
                    setError(undefined);
                  }}
                  className={buttonClasses("ghost")}
                >
                  Annuler
                </button>
              </div>
            </div>
            <p className="text-xs text-muted">Version de démonstration : aucun SMS n’est envoyé, tout code à 6 chiffres est accepté.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function Devices() {
  const [devices, setDevices] = useState(sampleDevices);
  const others = devices.filter((d) => !d.current);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Appareils connectés</h3>
        {others.length > 1 && (
          <button
            type="button"
            onClick={() => setDevices(devices.filter((d) => d.current))}
            className="text-sm font-medium text-accent-hover hover:underline"
          >
            Déconnecter tous les autres
          </button>
        )}
      </div>
      <ul className="divide-y divide-border">
        {devices.map((d) => {
          const Icon = deviceIcons[d.kind];
          return (
            <li key={d.id} className="flex items-center gap-3 py-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-muted">
                <Icon className="size-5" aria-hidden />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex flex-wrap items-center gap-2 text-sm font-medium">
                  {d.name}
                  {d.current && (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-hover">Cet appareil</span>
                  )}
                </span>
                <span className="text-xs text-muted">
                  {d.place} · {d.lastSeen}
                </span>
              </div>
              {!d.current && (
                <button
                  type="button"
                  onClick={() => setDevices(devices.filter((x) => x.id !== d.id))}
                  aria-label={`Déconnecter ${d.name}`}
                  className={buttonClasses("ghost", "min-h-10 px-3")}
                >
                  Déconnecter
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {others.length === 0 && <p className="text-xs text-muted">Aucun autre appareil n’est connecté.</p>}
    </div>
  );
}
