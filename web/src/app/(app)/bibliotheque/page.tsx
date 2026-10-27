import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Highlighter, Image as ImageIcon, ListMusic, Lock } from "lucide-react";
import { ArtworkCard } from "@/components/art/ArtworkCard";
import { PlaylistsPanel } from "@/components/library/PlaylistsPanel";
import { ReadingsPanel } from "@/components/library/ReadingsPanel";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tabs } from "@/components/ui/Tabs";
import { WorkCard } from "@/components/works/WorkCard";
import { getLibrary, type Library } from "@/lib/data/library";
import { albumToSummary } from "@/lib/data/music";

export const metadata: Metadata = { title: "Ma bibliothèque" };

export default async function LibraryPage() {
  const library = await getLibrary();
  const artworkCount = library.collections.reduce((n, c) => n + c.artworks.length, 0);

  const stats = [
    { label: "lectures en cours", value: library.readings.filter((r) => r.status === "En cours").length, icon: BookOpen, tone: "bg-lit-soft text-lit" },
    { label: "annotations", value: library.annotations.length, icon: Highlighter, tone: "bg-lit-soft text-lit" },
    { label: "playlists", value: library.playlists.length, icon: ListMusic, tone: "bg-mus-soft text-mus" },
    { label: "œuvres collectionnées", value: artworkCount, icon: ImageIcon, tone: "bg-art-soft text-art" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Ma bibliothèque</h1>
        <p className="text-base text-muted">Tout ce que vous lisez, écoutez et collectionnez, au même endroit.</p>
      </header>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <li key={label} className="glass flex items-center gap-3 rounded-card p-4">
            <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="flex min-w-0 flex-col">
              <span className="text-2xl font-bold leading-tight">{value}</span>
              <span className="text-xs leading-snug text-muted">{label}</span>
            </p>
          </li>
        ))}
      </ul>

      <Tabs
        label="Sections de la bibliothèque"
        tabs={[
          { id: "lectures", label: "Lectures", content: <ReadingsPanel readings={library.readings} /> },
          { id: "annotations", label: "Annotations", content: <AnnotationsPanel library={library} /> },
          { id: "musique", label: "Musique", content: <MusicPanel library={library} /> },
          { id: "art", label: "Collections d’art", content: <ArtPanel library={library} /> },
          { id: "hors-ligne", label: "Hors ligne", content: <OfflinePanel /> },
        ]}
      />
    </div>
  );
}

function AnnotationsPanel({ library }: { library: Library }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {library.annotations.map((a) => (
        <li key={a.id}>
          <Card className="flex h-full flex-col gap-3">
            <p className="text-xs font-semibold text-lit">
              {a.workTitle} · {a.chapterTitle}
            </p>
            <blockquote className="whitespace-pre-line border-l-2 border-lit/40 bg-lit-soft/60 py-2 pr-2 pl-3 font-serif text-base leading-relaxed">
              {a.quote}
            </blockquote>
            {a.note && <p className="text-sm leading-relaxed text-muted">{a.note}</p>}
            <div className="mt-auto flex items-center justify-between gap-3 pt-1 text-xs text-muted">
              {a.date}
              <Link href={a.href} className="inline-flex items-center gap-1 font-medium text-accent-hover hover:underline">
                Ouvrir dans le lecteur
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}

function MusicPanel({ library }: { library: Library }) {
  return (
    <div className="flex flex-col gap-10">
      <PlaylistsPanel playlists={library.playlists} />
      <section className="flex flex-col gap-4">
        <SectionHeader title="Albums enregistrés" href="/musique" linkLabel="Découvrir" />
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {library.savedAlbums.map((a) => (
            <li key={a.id}>
              <WorkCard work={{ ...albumToSummary(a), creator: a.artist }} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ArtPanel({ library }: { library: Library }) {
  return (
    <div className="flex flex-col gap-10">
      {library.collections.map((c) => (
        <section key={c.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">
              {c.title} <span className="text-sm font-normal text-muted">· {c.artworks.length} œuvres</span>
            </h3>
            <p className="text-sm text-muted">{c.description}</p>
          </div>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {c.artworks.map((a) => (
              <li key={a.id}>
                <ArtworkCard artwork={a} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function OfflinePanel() {
  return (
    <Card className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:p-8">
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-hover">
        <Download className="size-6" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          Lire et écouter sans connexion
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-hover">
            <Lock className="size-3" aria-hidden />
            Premium
          </span>
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          Téléchargez vos chapitres, albums et expositions pour en profiter en trajet ou en zone sans réseau.
        </p>
      </div>
      <Link href="/tarifs" className={buttonClasses("primary", "shrink-0")}>
        Voir les offres
      </Link>
    </Card>
  );
}
