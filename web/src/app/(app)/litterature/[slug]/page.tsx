import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Download, Flag, Image as ImageIcon, Layers, Music, Share2 } from "lucide-react";
import { ChapterList } from "@/components/literature/ChapterList";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { Tabs } from "@/components/ui/Tabs";
import { Cover } from "@/components/works/Cover";
import { SaveButton } from "@/components/works/SaveButton";
import { WorkCard } from "@/components/works/WorkCard";
import { getSimilarWorks, getWork, getWorkSlugs, readerHref } from "@/lib/data/literature";

export async function generateStaticParams() {
  return (await getWorkSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/litterature/[slug]">): Promise<Metadata> {
  const work = await getWork((await params).slug);
  if (!work) return { title: "Œuvre introuvable" };
  return { title: `${work.title} — ${work.author.name}` };
}

export default function WorkPage({ params }: PageProps<"/litterature/[slug]">) {
  // The slug-dependent content streams in, so navigations show the skeleton instantly.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <WorkDetails params={params} />
    </Suspense>
  );
}

async function WorkDetails({ params }: { params: PageProps<"/litterature/[slug]">["params"] }) {
  const work = await getWork((await params).slug);
  if (!work) notFound();

  const similar = await getSimilarWorks(work);
  const totalMinutes = work.chapters.reduce((sum, c) => sum + c.minutes, 0);
  const resumeAt = work.progress?.chapter ?? 1;
  const iconButton = "flex size-11 items-center justify-center rounded-xl glass text-muted hover:text-ink";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <nav aria-label="Fil d’Ariane" className="flex gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Accueil</Link>
        <span aria-hidden>/</span>
        <Link href="/litterature" className="hover:text-ink">Littérature</Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{work.title}</span>
      </nav>

      <Card className="flex flex-col gap-8 p-6 md:flex-row md:items-end md:p-8">
        <Cover domain="lit" className="aspect-[2/3] w-44 shrink-0 shadow-md md:w-52" />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-lit-soft px-3 py-1 text-xs font-semibold text-lit">{work.genre}</span>
            <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-muted">{work.status}</span>
            <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-muted">{work.license}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{work.title}</h1>
          <p className="text-sm text-muted">
            {work.author.pseudo ? (
              <Link href={`/profil/${work.author.pseudo}`} className="font-semibold text-ink hover:text-accent-hover">
                {work.author.name}
              </Link>
            ) : (
              <span className="font-semibold text-ink">{work.author.name}</span>
            )}{" "}
            · {work.chapters.length} chapitre{work.chapters.length > 1 ? "s" : ""} · environ {totalMinutes} min de lecture ·{" "}
            {work.language}
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-muted">{work.summary}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link href={readerHref(work.slug, resumeAt)} className={buttonClasses("primary")}>
              <BookOpen className="size-4" aria-hidden />
              {work.progress ? `Reprendre au chapitre ${resumeAt}` : "Commencer la lecture"}
            </Link>
            <SaveButton />
            <button type="button" aria-label="Télécharger pour lire hors ligne (Premium)" className={iconButton}>
              <Download className="size-5" aria-hidden />
            </button>
            <button type="button" aria-label="Partager" className={iconButton}>
              <Share2 className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <Tabs
            label="Sections de l’œuvre"
            tabs={[
              { id: "chapitres", label: "Chapitres", content: <ChapterList work={work} /> },
              {
                id: "commentaires",
                label: `Commentaires${work.comments.length ? ` (${work.comments.length})` : ""}`,
                content: work.comments.length ? (
                  <ul className="flex flex-col gap-3">
                    {work.comments.map((c) => (
                      <li key={c.author + c.chapter} className="glass flex gap-3 rounded-card p-4">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent-hover">
                          {c.author[0]}
                        </span>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold">
                            {c.author} <span className="font-normal text-muted">· chapitre {c.chapter}</span>
                          </p>
                          <p className="text-sm leading-relaxed text-muted">{c.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted">Aucun commentaire pour l’instant. Soyez le premier à donner votre avis.</p>
                ),
              },
              {
                id: "a-propos",
                label: "À propos",
                content: (
                  <Card>
                    <dl className="grid grid-cols-[9rem_1fr] gap-x-6 gap-y-3 text-sm">
                      <dt className="text-muted">Genre</dt>
                      <dd>{work.genre}</dd>
                      <dt className="text-muted">Statut</dt>
                      <dd>{work.status}</dd>
                      <dt className="text-muted">Licence</dt>
                      <dd>{work.license}</dd>
                      <dt className="text-muted">Langue</dt>
                      <dd>{work.language}</dd>
                    </dl>
                    <Link href="/admin" className="mt-5 inline-flex items-center gap-2 text-sm text-muted hover:text-danger">
                      <Flag className="size-4" aria-hidden />
                      Signaler un contenu ou une violation de droits
                    </Link>
                  </Card>
                ),
              },
            ]}
          />
        </div>

        <aside className="flex w-full flex-col gap-6 lg:w-80">
          {work.crossMedia && (
            <Card className="flex flex-col gap-4">
              <h2 className="text-base font-semibold">Univers cross-média</h2>
              <Link href={work.crossMedia.soundtrack.href} className="group flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg bg-mus-soft text-mus">
                  <Music className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold group-hover:text-accent-hover">{work.crossMedia.soundtrack.title}</span>
                  <span className="text-xs text-muted">
                    {work.crossMedia.soundtrack.creator} · {work.crossMedia.soundtrack.tracks} titres
                  </span>
                </span>
              </Link>
              <Link href={work.crossMedia.illustrations.href} className="group flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg bg-art-soft text-art">
                  <ImageIcon className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold group-hover:text-accent-hover">Illustrations</span>
                  <span className="text-xs text-muted">
                    {work.crossMedia.illustrations.creator} · {work.crossMedia.illustrations.count} planches
                  </span>
                </span>
              </Link>
              <Link
                href={work.crossMedia.projectHref}
                className="flex items-center gap-2 text-sm font-medium text-accent-hover hover:underline"
              >
                <Layers className="size-4" aria-hidden />
                Voir le projet collaboratif
              </Link>
            </Card>
          )}

          {similar.length > 0 && (
            <Card className="flex flex-col gap-4">
              <h2 className="text-base font-semibold">Les lecteurs ont aussi aimé</h2>
              <ul className="grid grid-cols-3 gap-3">
                {similar.map((w) => (
                  <li key={w.id}>
                    <WorkCard work={w} />
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
