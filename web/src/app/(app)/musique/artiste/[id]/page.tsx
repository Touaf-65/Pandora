import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layers, MapPin } from "lucide-react";
import { FollowButton } from "@/components/home/FollowButton";
import { PlayCollectionButtons } from "@/components/player/PlayCollectionButtons";
import { TrackList } from "@/components/player/TrackList";
import { Card } from "@/components/ui/Card";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCard } from "@/components/works/WorkCard";
import { albumToSummary, getAlbumsByArtist, getArtist, getArtistIds } from "@/lib/data/music";

const TOP_TRACKS = 5;

export async function generateStaticParams() {
  return (await getArtistIds()).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/musique/artiste/[id]">): Promise<Metadata> {
  const artist = await getArtist((await params).id);
  return { title: artist ? artist.name : "Artiste introuvable" };
}

export default function ArtistPage({ params }: PageProps<"/musique/artiste/[id]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ArtistDetails params={params} />
    </Suspense>
  );
}

async function ArtistDetails({ params }: { params: PageProps<"/musique/artiste/[id]">["params"] }) {
  const artist = await getArtist((await params).id);
  if (!artist) notFound();

  const albums = await getAlbumsByArtist(artist.id);
  const topTracks = albums.flatMap((a) => a.tracks).slice(0, TOP_TRACKS);
  const initials = artist.name.split(" ").map((p) => p[0]).join("").slice(0, 2);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
        <span className="flex size-32 shrink-0 items-center justify-center rounded-full bg-mus-soft text-4xl font-bold text-mus">
          {initials}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <span className="w-fit rounded-full bg-mus-soft px-3 py-1 text-xs font-semibold text-mus">Artiste</span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{artist.name}</h1>
          <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted">
            {artist.specialty}
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" aria-hidden />
              {artist.location}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {artist.genres.map((g) => (
              <span key={g} className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted">{g}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <PlayCollectionButtons tracks={albums.flatMap((a) => a.tracks)} label="Écouter l’artiste" />
            <FollowButton name={artist.name} />
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <section className="flex flex-col gap-3">
            <SectionHeader title="Titres populaires" />
            <TrackList tracks={topTracks} showAlbum />
          </section>
          <section className="flex flex-col gap-4">
            <SectionHeader title="Discographie" />
            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {albums.map((a) => (
                <li key={a.id}>
                  <WorkCard work={albumToSummary(a)} />
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="flex w-full flex-col gap-6 lg:w-80">
          <Card className="flex flex-col gap-3">
            <h2 className="text-base font-semibold">À propos</h2>
            <p className="text-sm leading-relaxed text-muted">{artist.bio}</p>
          </Card>
          {artist.collaborations.length > 0 && (
            <Card className="flex flex-col gap-3">
              <h2 className="text-base font-semibold">Collaborations cross-média</h2>
              <ul className="flex flex-col gap-2">
                {artist.collaborations.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="flex items-center gap-2 text-sm font-medium text-accent-hover hover:underline">
                      <Layers className="size-4 shrink-0" aria-hidden />
                      {c.label}
                    </Link>
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
