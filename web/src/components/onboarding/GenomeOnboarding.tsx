"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { domains, type Domain } from "@/lib/domains";

const DOMAIN_ORDER: Domain[] = ["lit", "mus", "art"];

const descriptions: Record<Domain, string> = {
  lit: "Romans, nouvelles, poésie, publication par chapitres.",
  mus: "Albums, playlists, radios et artistes émergents.",
  art: "Galeries, zoom haute définition, expositions virtuelles.",
};

const genres: Record<Domain, string[]> = {
  lit: ["Roman", "Poésie", "Nouvelles", "Science-fiction", "Contes africains", "Classiques", "Polar", "Essai"],
  mus: ["Jazz", "Classique", "Afrobeat", "Rap", "Électro", "Musiques du monde", "Soul", "Kora et musique mandingue"],
  art: ["Impressionnisme", "Art abstrait", "Photographie", "Art africain contemporain", "Street art", "Illustration"],
};

/** Literal class names, so Tailwind generates them. */
const barColors: Record<Domain, string> = { lit: "bg-lit", mus: "bg-mus", art: "bg-art" };

const moments = ["Le matin, en trajet", "Pendant le travail", "Le soir, pour décompresser", "Le week-end, en profondeur"];

const MIN_GENRES = 3;
const STEPS = ["Domaines", "Goûts", "Moments"];

/** Interface only: choices stay in the page until accounts exist. */
export function GenomeOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedDomains, setSelectedDomains] = useState<Set<Domain>>(new Set(DOMAIN_ORDER));
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [selectedMoments, setSelectedMoments] = useState<Set<string>>(new Set([moments[2]]));
  const [language, setLanguage] = useState("fr-en");

  const toggle = <T,>(set: Set<T>, value: T) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const activeDomains = DOMAIN_ORDER.filter((d) => selectedDomains.has(d));
  const pickedCount = activeDomains.reduce((n, d) => n + genres[d].filter((g) => picked.has(g)).length, 0);
  const canContinue = step === 0 ? activeDomains.length > 0 : step === 1 ? pickedCount >= MIN_GENRES : true;
  const missing = MIN_GENRES - pickedCount;

  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm transition-colors ${
      active ? "bg-accent font-semibold text-accent-ink" : "glass text-muted hover:text-ink"
    }`;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-accent-hover">
          Étape {step + 1} sur {STEPS.length} · {STEPS[step]}
        </p>
        <Link href="/" className="text-sm font-medium text-muted hover:text-ink">
          Passer pour l’instant
        </Link>
      </div>
      <div
        role="progressbar"
        aria-label="Progression de l’inscription"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={step + 1}
        className="-mt-4 grid grid-cols-3 gap-2"
      >
        {STEPS.map((s, i) => (
          <span key={s} className={`h-1.5 rounded-full ${i <= step ? "bg-accent" : "bg-surface-muted"}`} />
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <section className="flex min-w-0 flex-1 flex-col gap-6" aria-live="polite">
          {step === 0 && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Qu’est-ce qui vous fait vibrer ?</h1>
                <p className="text-base text-muted">Choisissez un ou plusieurs domaines. Vous pourrez tout changer plus tard.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {DOMAIN_ORDER.map((d) => {
                  const { icon: Icon, label, soft, text } = domains[d];
                  const active = selectedDomains.has(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedDomains((prev) => toggle(prev, d))}
                      className={`glass relative flex min-h-40 flex-col items-start gap-3 rounded-card p-5 text-left ring-2 transition ${
                        active ? "ring-accent" : "ring-transparent hover:shadow-lg"
                      }`}
                    >
                      <span className={`flex size-11 items-center justify-center rounded-xl ${soft} ${text}`}>
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="text-lg font-semibold">{label}</span>
                      <span className="text-sm leading-relaxed text-muted">{descriptions[d]}</span>
                      {active && (
                        <span className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-accent text-accent-ink">
                          <Check className="size-4" aria-hidden />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Affinons vos goûts</h1>
                <p className="text-base text-muted">
                  Sélectionnez au moins {MIN_GENRES} genres : plus vous en choisissez, plus vos recommandations croisées seront justes.
                </p>
              </div>
              {activeDomains.map((d) => (
                <fieldset key={d} className="flex flex-col gap-3">
                  <legend className={`mb-3 text-sm font-semibold ${domains[d].text}`}>{domains[d].label}</legend>
                  <div className="flex flex-wrap gap-2">
                    {genres[d].map((g) => {
                      const active = picked.has(g);
                      return (
                        <button key={g} type="button" aria-pressed={active} onClick={() => setPicked((prev) => toggle(prev, g))} className={chip(active)}>
                          {active && <Check className="size-4" aria-hidden />}
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Vos moments culturels</h1>
                <p className="text-base text-muted">Quand profitez-vous de la culture ? Pandora composera vos journées en fonction.</p>
              </div>
              <fieldset className="grid gap-3 sm:grid-cols-2">
                <legend className="sr-only">Moments de la journée</legend>
                {moments.map((m) => (
                  <label key={m} className="glass flex min-h-14 items-center gap-3 rounded-card px-4 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedMoments.has(m)}
                      onChange={() => setSelectedMoments((prev) => toggle(prev, m))}
                      className="size-5 accent-accent"
                    />
                    {m}
                  </label>
                ))}
              </fieldset>
              <label className="flex max-w-sm flex-col gap-1.5 text-sm font-medium">
                Langues des contenus
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-11 rounded-xl border border-border bg-white px-3 text-sm font-normal"
                >
                  <option value="fr-en">Français et anglais</option>
                  <option value="fr">Français uniquement</option>
                  <option value="all">Toutes les langues</option>
                </select>
              </label>
            </>
          )}

          <div className="flex items-center justify-between gap-3 pt-2">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className={buttonClasses("ghost")}>
                <ArrowLeft className="size-4" aria-hidden />
                Précédent
              </button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep(step + 1)}
                className={buttonClasses("primary")}
              >
                Continuer
                <ArrowRight className="size-4" aria-hidden />
              </button>
            ) : (
              <button type="button" onClick={() => router.push("/")} className={buttonClasses("primary")}>
                Découvrir ma journée culturelle
                <ArrowRight className="size-4" aria-hidden />
              </button>
            )}
          </div>
          {step === 0 && !canContinue && <p className="text-sm text-muted">Choisissez au moins un domaine pour continuer.</p>}
        </section>

        <aside aria-label="Votre génome culturel" className="glass flex w-full flex-col gap-5 rounded-card p-5 lg:sticky lg:top-6 lg:w-80">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Sparkles className="size-4 text-accent" aria-hidden />
            Votre génome culturel
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            Il se construit à partir de vos choix, puis évolue avec ce que vous lisez, écoutez et regardez.
          </p>
          <ul className="flex flex-col gap-4">
            {DOMAIN_ORDER.map((d) => {
              const count = genres[d].filter((g) => picked.has(g)).length;
              const off = !selectedDomains.has(d);
              return (
                <li key={d} className={`flex flex-col gap-1.5 ${off ? "opacity-40" : ""}`}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{domains[d].label}</span>
                    <span className="text-muted">
                      {off ? "non choisi" : `${count} genre${count > 1 ? "s" : ""}`}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-muted">
                    <div
                      className={`h-full rounded-full ${barColors[d]}`}
                      style={{ width: `${off ? 0 : (count / genres[d].length) * 100}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="rounded-xl bg-accent-soft p-3 text-sm text-accent-hover">
            {missing > 0
              ? `Encore ${missing} genre${missing > 1 ? "s" : ""} pour activer les recommandations croisées.`
              : activeDomains.length > 1
                ? `Recommandations croisées prêtes : vos goûts seront mêlés entre ${activeDomains
                    .map((d) => domains[d].label.toLowerCase())
                    .join(", ")
                    .replace(/, ([^,]*)$/, " et $1")}.`
                : "Recommandations prêtes. Ajoutez un autre domaine pour des suggestions croisées."}
          </p>
        </aside>
      </div>
    </div>
  );
}
