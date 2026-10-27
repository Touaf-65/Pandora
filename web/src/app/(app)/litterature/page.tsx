import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Image as ImageIcon, Lock, Music, Sparkles } from "lucide-react";
import { DomainHeader } from "@/components/catalogue/DomainHeader";
import { FilterableGrid } from "@/components/catalogue/FilterableGrid";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Cover } from "@/components/works/Cover";
import { WorkCard } from "@/components/works/WorkCard";
import { getWorks, readerHref, toSummary } from "@/lib/data/literature";

export const metadata: Metadata = { title: "Littérature" };

const FEATURED = "le-fleuve-et-la-nuit";

export default async function LiteraturePage() {
  const works = await getWorks();
  const featured = works.find((w) => w.slug === FEATURED) ?? works[0];
  const classics = works.filter((w) => w.license === "Domaine public");
  const newChapters = works
    .filter((w) => w.status === "En cours")
    .map((w) => ({ work: w, chapter: w.chapters[w.chapters.length - 1] }));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
      <DomainHeader
        domain="lit"
        description="Romans, nouvelles et poésie, des classiques aux auteurs émergents."
        facts={[`${works.length} œuvres`, `${classics.length} classiques du domaine public`]}
      />

      <section aria-labelledby="featured-title" className="flex flex-col gap-4">
        <Card className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
          <Cover domain="lit" className="aspect-[2/3] w-36 shrink-0 shadow-md md:w-44" />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-lit uppercase">
              <Sparkles className="size-3.5" aria-hidden />À la une
            </p>
            <h2 id="featured-title" className="text-2xl font-bold tracking-tight md:text-3xl">
              {featured.title}
            </h2>
            <p className="text-sm text-muted">
              {featured.author.pseudo ? (
                <Link href={`/profil/${featured.author.pseudo}`} className="font-semibold text-ink hover:text-accent-hover">
                  {featured.author.name}
                </Link>
              ) : (
                <span className="font-semibold text-ink">{featured.author.name}</span>
              )}{" "}
              · {featured.genre} · {featured.status}
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-muted">{featured.summary}</p>
            {featured.crossMedia && (
              <ul className="flex flex-wrap gap-2 text-sm">
                <li>
                  <Link
                    href={featured.crossMedia.soundtrack.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-mus-soft px-3 py-1 font-medium text-mus hover:underline"
                  >
                    <Music className="size-3.5" aria-hidden />
                    Bande-son par {featured.crossMedia.soundtrack.creator}
                  </Link>
                </li>
                <li>
                  <Link
                    href={featured.crossMedia.illustrations.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-art-soft px-3 py-1 font-medium text-art hover:underline"
                  >
                    <ImageIcon className="size-3.5" aria-hidden />
                    Illustrations par {featured.crossMedia.illustrations.creator}
                  </Link>
                </li>
              </ul>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              <Link href={readerHref(featured.slug, 1)} className={buttonClasses("primary")}>
                <BookOpen className="size-4" aria-hidden />
                Commencer la lecture
              </Link>
              <Link href={`/litterature/${featured.slug}`} className={buttonClasses("secondary")}>
                Voir la fiche
              </Link>
            </div>
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Nouveaux chapitres" />
        <ul className="grid gap-4 md:grid-cols-2">
          {newChapters.map(({ work, chapter }) => (
            <li key={work.slug}>
              <Link
                href={readerHref(work.slug, chapter.number)}
                className="glass group flex items-center gap-4 rounded-card p-4 transition-shadow hover:shadow-lg"
              >
                <Cover domain="lit" className="h-16 w-11 shrink-0" />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="truncate text-sm font-semibold group-hover:text-accent-hover">
                    Chapitre {chapter.number} · {chapter.title}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {work.title} · {work.author.name} · {chapter.minutes} min
                  </p>
                </div>
                {chapter.access === "premium" ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-hover">
                    <Lock className="size-3" aria-hidden />
                    Premium
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-semibold text-success">
                    Nouveau
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Classiques du domaine public" />
        <p className="-mt-2 text-sm text-muted">Textes intégraux, gratuits pour tous, en édition numérique Pandora.</p>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {classics.map((w) => (
            <li key={w.slug}>
              <WorkCard work={toSummary(w)} />
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Tout le catalogue" />
        <FilterableGrid
          label="Filtrer par genre"
          allLabel="Tous les genres"
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
          items={works.map((w) => ({ id: w.slug, tag: w.genre, content: <WorkCard work={toSummary(w)} /> }))}
        />
      </section>
    </div>
  );
}
