import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlayCollectionButtons } from "@/components/player/PlayCollectionButtons";
import { TrackList } from "@/components/player/TrackList";
import { Card } from "@/components/ui/Card";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { Cover } from "@/components/works/Cover";
import { SaveButton } from "@/components/works/SaveButton";
import { WorkCard } from "@/components/works/WorkCard";
import { albumToSummary, getAlbum, getAlbumIds, getAlbumsByArtist, getArtist, totalDuration } from "@/lib/data/music";
import { formatTotal } from "@/lib/format";

export async function generateStaticParams() {
  return (await getAlbumIds()).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/musique/album/[id]">): Promise<Metadata> {
  const album = await getAlbum((await params).id);
  return { title: album ? `${album.title} — ${album.artist}` : "Album introuvable" };
}

export default function AlbumPage({ params }: PageProps<"/musique/album/[id]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AlbumDetails params={params} />
    </Suspense>
  );
}

async function AlbumDetails({ params }: { params: PageProps<"/musique/album/[id]">["params"] }) {
  const album = await getAlbum((await params).id);
  if (!album) notFound();

  const artist = album.artistId ? await getArtist(album.artistId) : undefined;
  const more = artist ? (await getAlbumsByArtist(artist.id)).filter((a) => a.id !== album.id) : [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <nav aria-label="Fil d’Ariane" className="flex gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Accueil</Link>
        <span aria-hidden>/</span>
        <Link href="/musique" className="hover:text-ink">Musique</Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{album.title}</span>
      </nav>

      <Card className="flex flex-col gap-8 p-6 md:flex-row md:items-end md:p-8">
        <Cover domain="mus" className="aspect-square w-48 shrink-0 shadow-md md:w-56" />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <span className="w-fit rounded-full bg-mus-soft px-3 py-1 text-xs font-semibold text-mus">
            {album.type} · {album.year}
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{album.title}</h1>
          <p className="text-sm text-muted">
            {album.artistId ? (
              <Link href={`/musique/artiste/${album.artistId}`} className="font-semibold text-ink hover:text-accent-hover">
                {album.artist}
              </Link>
            ) : (
              <span className="font-semibold text-ink">{album.artist}</span>
            )}{" "}
            · {album.tracks.length} titre{album.tracks.length > 1 ? "s" : ""} · {formatTotal(totalDuration(album.tracks))}
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-muted">{album.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <PlayCollectionButtons tracks={album.tracks} />
            <SaveButton />
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <section className="flex min-w-0 flex-1 flex-col gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Titres</h2>
          <TrackList tracks={album.tracks} />
          <p className="text-xs text-muted">Licence : {album.license}</p>
        </section>

        {artist && (
          <aside className="flex w-full flex-col gap-6 lg:w-80">
            <Card className="flex flex-col gap-3">
              <h2 className="text-base font-semibold">{artist.name}</h2>
              <p className="text-sm text-muted">{artist.specialty} · {artist.location}</p>
              <p className="text-sm leading-relaxed text-muted">{artist.bio}</p>
              <Link href={`/musique/artiste/${artist.id}`} className="text-sm font-medium text-accent-hover hover:underline">
                Voir la page de l’artiste
              </Link>
            </Card>
            {more.length > 0 && (
              <Card className="flex flex-col gap-4">
                <h2 className="text-base font-semibold">Du même artiste</h2>
                <ul className="grid grid-cols-2 gap-3">
                  {more.map((a) => (
                    <li key={a.id}>
                      <WorkCard work={albumToSummary(a)} />
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
