"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Camera } from "lucide-react";
import { TextField } from "@/components/auth/TextField";
import { buttonClasses } from "@/components/ui/Button";
import { SavedNotice } from "./shared";

type ProfileForm = { name: string; pseudo: string; location: string; bio: string };

const BIO_MAX = 160;

function validate(form: ProfileForm) {
  const errors: Partial<Record<keyof ProfileForm, string>> = {};
  if (form.name.trim().length < 2) errors.name = "Indiquez votre nom.";
  if (!/^[a-z0-9-]{3,20}$/.test(form.pseudo)) errors.pseudo = "De 3 à 20 caractères : minuscules, chiffres et tirets.";
  if (form.bio.length > BIO_MAX) errors.bio = `${BIO_MAX} caractères au maximum.`;
  return errors;
}

/** Interface only: changes stay in the page until accounts exist. */
export function ProfileSettings({ initial }: { initial: ProfileForm }) {
  const [saved, setSaved] = useState(initial);
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [savedAt, setSavedAt] = useState(0);
  const [photoNotice, setPhotoNotice] = useState(false);

  const errors = validate(form);
  const shown = submitted ? errors : {};
  const dirty = (Object.keys(form) as (keyof ProfileForm)[]).some((k) => form[k] !== saved[k]);
  const initials = form.name.trim().split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "?";

  function update(field: keyof ProfileForm, value: string) {
    setForm({ ...form, [field]: value });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) return;
    const next = { ...form, name: form.name.trim(), location: form.location.trim() };
    setForm(next);
    setSaved(next);
    setSubmitted(false);
    setSavedAt((n) => n + 1);
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-4">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-lit-soft text-2xl font-bold text-lit">
          {initials}
        </span>
        <div className="flex flex-col items-start gap-1.5">
          <button type="button" onClick={() => setPhotoNotice(true)} className={buttonClasses("secondary", "min-h-10 px-4")}>
            <Camera className="size-4" aria-hidden />
            Changer la photo
          </button>
          <p role="status" className="text-xs text-muted">
            {photoNotice ? "L’envoi de photos arrivera avec la mise en place des comptes." : "JPG ou PNG, 2 Mo au maximum."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Nom affiché" value={form.name} onChange={(e) => update("name", e.target.value)} error={shown.name} autoComplete="name" />
        <TextField
          label="Pseudo"
          value={form.pseudo}
          onChange={(e) => update("pseudo", e.target.value.toLowerCase())}
          error={shown.pseudo}
          autoComplete="username"
          hint={<>Adresse de votre profil : pandora/profil/{form.pseudo || "…"}</>}
        />
        <TextField label="Ville" value={form.location} onChange={(e) => update("location", e.target.value)} autoComplete="address-level2" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="profile-bio" className="text-sm font-medium">
          Présentation
        </label>
        <textarea
          id="profile-bio"
          rows={3}
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
          aria-invalid={shown.bio ? true : undefined}
          aria-describedby="profile-bio-count"
          className={`resize-y rounded-xl border bg-white px-3.5 py-2.5 text-sm leading-relaxed placeholder:text-muted focus-visible:border-accent focus-visible:outline-none ${
            shown.bio ? "border-danger" : "border-border"
          }`}
        />
        <p id="profile-bio-count" className={`text-xs ${form.bio.length > BIO_MAX ? "text-danger" : "text-muted"}`}>
          {shown.bio ?? `${form.bio.length} / ${BIO_MAX} caractères`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={!dirty} className={buttonClasses("primary")}>
          Enregistrer
        </button>
        {dirty && (
          <button
            type="button"
            onClick={() => {
              setForm(saved);
              setSubmitted(false);
            }}
            className={buttonClasses("ghost")}
          >
            Annuler
          </button>
        )}
        <Link href={`/profil/${initial.pseudo}`} className="text-sm font-medium text-accent-hover hover:underline">
          Voir mon profil public
        </Link>
        <SavedNotice stamp={savedAt}>Profil enregistré.</SavedNotice>
      </div>
    </form>
  );
}
