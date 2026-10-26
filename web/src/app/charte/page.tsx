import type { Metadata } from "next";
import { BookOpen, Image as ImageIcon, Music, Play } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = { title: "Charte graphique" };

const neutrals = [
  { name: "bg", hex: "#f4f6f9", use: "Fond de page, uni" },
  { name: "surface", hex: "#ffffff", use: "Base des panneaux verre (72 % d’opacité)" },
  { name: "surface-muted", hex: "#edf0f5", use: "Zones secondaires, squelettes" },
  { name: "border", hex: "#e1e6ee", use: "Filets et champs" },
  { name: "muted", hex: "#5b6475", use: "Texte secondaire" },
  { name: "ink", hex: "#0f172a", use: "Texte principal" },
];

const accents = [
  { name: "accent", hex: "#2563eb", use: "Actions principales, lien actif" },
  { name: "accent-hover", hex: "#1d4ed8", use: "Survol, texte d’accent" },
  { name: "accent-soft", hex: "#e8efff", use: "Fond d’élément sélectionné" },
];

const domains = [
  { name: "Littérature", text: "text-lit", soft: "bg-lit-soft", hex: "#b45309", icon: BookOpen },
  { name: "Musique", text: "text-mus", soft: "bg-mus-soft", hex: "#be185d", icon: Music },
  { name: "Art visuel", text: "text-art", soft: "bg-art-soft", hex: "#0e7490", icon: ImageIcon },
];

const status = [
  { name: "success", hex: "#15803d", label: "Publié" },
  { name: "warning", hex: "#b45309", label: "À valider" },
  { name: "danger", hex: "#b91c1c", label: "Signalé" },
];

function Swatch({ name, hex, use }: { name: string; hex: string; use: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="size-12 shrink-0 rounded-xl border border-border" style={{ backgroundColor: hex }} />
      <div className="min-w-0">
        <p className="text-sm font-semibold">
          {name} <code className="ml-1 font-normal text-muted">{hex}</code>
        </p>
        <p className="text-sm text-muted">{use}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function CharterPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 md:px-8">
      <header className="flex flex-col gap-4">
        <Logo />
        <h1 className="text-4xl font-bold tracking-tight">Charte graphique</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Thème clair, sobre et corporate. Fond uni sans dégradé ; la profondeur vient des panneaux en verre
          dépoli : blanc translucide, flou d’arrière-plan, filet clair et ombre douce. Un seul accent, bleu,
          et une couleur discrète par domaine.
        </p>
      </header>

      <Section title="Neutres">
        <Card className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {neutrals.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </Card>
      </Section>

      <Section title="Accent">
        <Card className="grid gap-5 sm:grid-cols-3">
          {accents.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </Card>
      </Section>

      <Section title="Domaines">
        <div className="grid gap-4 sm:grid-cols-3">
          {domains.map(({ name, text, soft, hex, icon: Icon }) => (
            <Card key={name} className="flex flex-col gap-4">
              <span className={`flex size-11 items-center justify-center rounded-xl ${soft} ${text}`}>
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className={`text-sm font-semibold ${text}`}>{name}</p>
                <p className="text-sm text-muted">
                  Texte <code>{hex}</code>, fond teinté pour badges et icônes
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Statuts">
        <Card className="flex flex-wrap gap-3">
          {status.map((s) => (
            <span
              key={s.name}
              className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold"
              style={{ color: s.hex }}
            >
              {s.label}
            </span>
          ))}
        </Card>
      </Section>

      <Section title="Typographie — Inter">
        <Card className="flex flex-col gap-3">
          <p className="text-4xl font-bold tracking-tight">Titre de page — 36 px, gras</p>
          <p className="text-2xl font-semibold">Titre de section — 24 px, demi-gras</p>
          <p className="text-base leading-relaxed">
            Texte courant — 16 px. Une passeuse du fleuve recueille un inconnu sans mémoire.
          </p>
          <p className="text-sm text-muted">Texte secondaire — 14 px, gris</p>
        </Card>
      </Section>

      <Section title="Boutons et champs">
        <Card className="flex flex-wrap items-center gap-3">
          <Button>Commencer la lecture</Button>
          <Button variant="secondary">Ajouter à ma bibliothèque</Button>
          <Button variant="ghost">Annuler</Button>
          <Button disabled>Désactivé</Button>
          <label className="flex min-w-64 flex-1 flex-col gap-1.5 text-sm font-medium">
            Adresse e-mail
            <input
              type="email"
              placeholder="vous@exemple.com"
              className="h-11 rounded-xl border border-border bg-white px-3.5 text-sm font-normal placeholder:text-muted focus-visible:border-accent"
            />
          </label>
        </Card>
      </Section>

      <Section title="Verre au-dessus du contenu">
        <p className="max-w-2xl text-sm text-muted">
          L’effet verre se voit quand un panneau passe au-dessus d’un contenu coloré (pochette, œuvre) : barre du
          haut, lecteur audio, menus. Le fond de page, lui, reste uni.
        </p>
        <div className="relative grid h-64 grid-cols-3 gap-3 overflow-hidden rounded-card">
          <div className="bg-lit-soft" />
          <div className="bg-mus-soft" />
          <div className="bg-art-soft" />
          <div className="absolute inset-x-6 bottom-6 flex items-center gap-4 rounded-card p-4 glass">
            <span className="size-12 shrink-0 rounded-lg bg-mus-soft" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Les voix de l’eau</p>
              <p className="truncate text-xs text-muted">Bande-son du chapitre 3</p>
            </div>
            <button
              type="button"
              aria-label="Lecture"
              className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-ink"
            >
              <Play className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
}
