import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Headphones, Image as ImageIcon } from "lucide-react";
import { ArtworkCard } from "@/components/art/ArtworkCard";
import { ArtworkVisual } from "@/components/art/ArtworkVisual";
import { ListenCard } from "@/components/player/ListenCard";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { SaveButton } from "@/components/works/SaveButton";
import { getArtworks, getExhibition, getExhibitionIds } from "@/lib/data/art";
import { getAlbum } from "@/lib/data/music";

export async function generateStaticParams() {
  return (await getExhibitionIds()).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/art/exposition/[id]">): Promise<Metadata> {
  const exhibition = await getExhibition((await params).id);
  return { title: exhibition ? `Exposition « ${exhibition.title} »` : "Exposition introuvable" };
}

export default function ExhibitionPage({ params }: PageProps<"/art/exposition/[id]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ExhibitionDetails params={params} />
    </Suspense>
  );
}

async function ExhibitionDetails({ params }: { params: PageProps<"/art/exposition/[id]">["params"] }) {
  const exhibition = await getExhibition((await params).id);
  if (!exhibition) notFound();

  const rooms = await Promise.all(
    exhibition.rooms.map(async (room) => ({ ...room, artworks: await getArtworks(room.artworkIds) })),
  );
  const all = rooms.flatMap((r) => r.artworks);
  const album = exhibition.soundtrack ? await getAlbum(exhibition.soundtrack) : undefined;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <nav aria-label="Fil d’Ariane" className="flex gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Accueil</Link>
        <span aria-hidden>/</span>
        <Link href="/art" className="hover:text-ink">Art visuel</Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{exhibition.title}</span>
      </nav>

      <Card className="flex flex-col gap-8 p-6 md:flex-row md:items-center md:p-8">
        <div className="grid w-full shrink-0 grid-cols-3 gap-2 md:w-80">
          {all.slice(0, 3).map((a) => (
            <div key={a.id} className="aspect-[3/4] overflow-hidden rounded-xl shadow-md">
              <ArtworkVisual artwork={a} className="h-full w-full" />
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <span className="w-fit rounded-full bg-art-soft px-3 py-1 text-xs font-semibold text-art">Exposition virtuelle</span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{exhibition.title}</h1>
          <p className="text-sm text-muted">
            Commissariat : {exhibition.curator} · {rooms.length} salle{rooms.length > 1 ? "s" : ""} · {all.length} œuvre
            {all.length > 1 ? "s" : ""}
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-muted">{exhibition.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {all[0] && (
              <Link href={`/art/oeuvre/${all[0].id}`} className={buttonClasses("primary")}>
                <ImageIcon className="size-4" aria-hidden />
                Commencer la visite
              </Link>
            )}
            <SaveButton label="Ajouter à mes collections" savedLabel="Dans mes collections" />
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-10">
          {rooms.map((room, i) => (
            <section key={room.title} className="flex flex-col gap-4" aria-labelledby={`room-${i}`}>
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-semibold tabular-nums text-muted">Salle {i + 1}</span>
                <h2 id={`room-${i}`} className="text-xl font-semibold tracking-tight">{room.title}</h2>
              </div>
              <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                {room.artworks.map((a) => (
                  <li key={a.id}>
                    <ArtworkCard artwork={a} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="flex w-full flex-col gap-5 lg:w-80">
          {album && <ListenCard album={album} title="Bande-son de l’exposition" />}
          <Card className="flex flex-col gap-2">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Headphones className="size-4 text-muted" aria-hidden />
              Visite guidée audio
            </h2>
            <p className="text-sm text-muted">Un commentaire audio salle par salle arrivera dans une prochaine version.</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}
