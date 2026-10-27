import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Flag, Share2, ShieldCheck } from "lucide-react";
import { ArtworkCard } from "@/components/art/ArtworkCard";
import { ArtworkViewer } from "@/components/art/ArtworkViewer";
import { ListenCard } from "@/components/player/ListenCard";
import { Card } from "@/components/ui/Card";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { SaveButton } from "@/components/works/SaveButton";
import { getArtwork, getArtworkIds, getArtworks, getExhibitionFor } from "@/lib/data/art";
import { getAlbum } from "@/lib/data/music";

export async function generateStaticParams() {
  return (await getArtworkIds()).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/art/oeuvre/[id]">): Promise<Metadata> {
  const artwork = await getArtwork((await params).id);
  return { title: artwork ? `${artwork.title} — ${artwork.artist.name}` : "Œuvre introuvable" };
}

export default function ArtworkPage({ params }: PageProps<"/art/oeuvre/[id]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ArtworkDetails params={params} />
    </Suspense>
  );
}

async function ArtworkDetails({ params }: { params: PageProps<"/art/oeuvre/[id]">["params"] }) {
  const artwork = await getArtwork((await params).id);
  if (!artwork) notFound();

  const inExhibition = await getExhibitionFor(artwork.id);
  const siblings = inExhibition ? await getArtworks(inExhibition.order) : [];
  const prevId = inExhibition?.order[inExhibition.index - 1];
  const nextId = inExhibition?.order[inExhibition.index + 1];
  const album = artwork.listenWith ? await getAlbum(artwork.listenWith) : undefined;
  const navLink = "flex min-h-11 items-center gap-1 rounded-xl px-4 text-sm glass hover:text-accent-hover";

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <nav aria-label="Fil d’Ariane" className="flex flex-wrap gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Accueil</Link>
        <span aria-hidden>/</span>
        <Link href="/art" className="hover:text-ink">Art visuel</Link>
        {inExhibition && (
          <>
            <span aria-hidden>/</span>
            <Link href={`/art/exposition/${inExhibition.exhibition.id}`} className="hover:text-ink">
              {inExhibition.exhibition.title}
            </Link>
          </>
        )}
        <span aria-hidden>/</span>
        <span className="text-ink">{artwork.title}</span>
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <section className="flex min-w-0 flex-1 flex-col gap-4">
          <ArtworkViewer artwork={artwork} />

          {inExhibition && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                Œuvre {inExhibition.index + 1} sur {inExhibition.order.length} de l’exposition
              </p>
              <div className="flex gap-2">
                {prevId && (
                  <Link href={`/art/oeuvre/${prevId}`} className={navLink}>
                    <ChevronLeft className="size-4" aria-hidden />
                    Précédente
                  </Link>
                )}
                {nextId && (
                  <Link href={`/art/oeuvre/${nextId}`} className={navLink}>
                    Suivante
                    <ChevronRight className="size-4" aria-hidden />
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>

        <aside className="flex w-full flex-col gap-5 lg:w-96">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-art-soft px-3 py-1 text-xs font-semibold text-art">{artwork.style}</span>
            <h1 className="text-3xl font-bold tracking-tight">{artwork.title}</h1>
            {artwork.artist.pseudo ? (
              <Link href={`/profil/${artwork.artist.pseudo}`} className="w-fit text-base font-semibold hover:text-accent-hover">
                {artwork.artist.name}
              </Link>
            ) : (
              <p className="text-base font-semibold">{artwork.artist.name}</p>
            )}
          </div>

          <Card>
            <h2 className="mb-3 text-sm font-semibold">Fiche technique</h2>
            <dl className="grid grid-cols-[7.5rem_1fr] gap-x-4 gap-y-2.5 text-sm">
              <dt className="text-muted">Année</dt>
              <dd>{artwork.year}</dd>
              <dt className="text-muted">Technique</dt>
              <dd>{artwork.technique}</dd>
              <dt className="text-muted">Dimensions</dt>
              <dd>{artwork.dimensions}</dd>
              <dt className="text-muted">Style</dt>
              <dd>{artwork.style}</dd>
              {artwork.location && (
                <>
                  <dt className="text-muted">Conservation</dt>
                  <dd>{artwork.location}</dd>
                </>
              )}
              <dt className="text-muted">Licence</dt>
              <dd>{artwork.license}</dd>
            </dl>
          </Card>

          <p className="text-sm leading-relaxed text-muted">{artwork.description}</p>

          <div className="flex flex-wrap gap-2">
            <SaveButton label="Ajouter à une collection" savedLabel="Dans mes collections" />
            <button type="button" aria-label="Partager" className="glass flex size-11 items-center justify-center rounded-xl text-muted hover:text-ink">
              <Share2 className="size-5" aria-hidden />
            </button>
          </div>

          {album && <ListenCard album={album} />}

          <div className="flex flex-col gap-2 text-xs text-muted">
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-success" aria-hidden />
              Filigrane invisible appliqué à l’image haute définition.
            </p>
            <Link href="/admin" className="flex w-fit items-center gap-2 hover:text-danger">
              <Flag className="size-4" aria-hidden />
              Signaler un contenu ou une violation de droits
            </Link>
          </div>
        </aside>
      </div>

      {inExhibition && (
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-semibold tracking-tight">Dans l’exposition « {inExhibition.exhibition.title} »</h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {siblings.map((a) => (
              <li key={a.id}>
                <ArtworkCard artwork={a} current={a.id === artwork.id} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
