import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, MapPin, Radio, Sparkles } from "lucide-react";
import { DomainHeader } from "@/components/catalogue/DomainHeader";
import { FilterableGrid } from "@/components/catalogue/FilterableGrid";
import { FollowButton } from "@/components/home/FollowButton";
import { PlayCollectionButtons } from "@/components/player/PlayCollectionButtons";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Cover } from "@/components/works/Cover";
import { WorkCard } from "@/components/works/WorkCard";
import { albumToSummary, getAlbums, getArtists, totalDuration } from "@/lib/data/music";
import { formatTotal } from "@/lib/format";

export const metadata: Metadata = { title: "Musique" };

const FEATURED = "bande-son-fleuve";

const radios = [
  { title: "Radio kora", detail: "Autour de Sékou T. et de la musique mandingue" },
  { title: "Piano pour lire", detail: "Calée sur le rythme de vos lectures" },
  { title: "Afrobeat de nuit", detail: "D’après vos écoutes du soir" },
];

export default async function MusicPage() {
  const albums = await getAlbums();
  const artists = await getArtists();
  const featured = albums.find((a) => a.id === FEATURED) ?? albums[0];
  const releases = albums.filter((a) => a.type !== "Playlist").sort((a, b) => b.year - a.year);
  const playlists = albums.filter((a) => a.type === "Playlist");
  const novel = featured.tracks.find((t) => t.accompanies)?.accompanies;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
      <DomainHeader
        domain="mus"
        description="Albums, singles, playlists et radios, souvent pensés pour accompagner une lecture."
        facts={[`${releases.length} sorties`, `${artists.length} artistes`, `${playlists.length} playlists`]}
      />

      <section aria-labelledby="featured-title">
        <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
          <Cover domain="mus" className="aspect-square w-40 shrink-0 shadow-md md:w-48" />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-mus uppercase">
              <Sparkles className="size-3.5" aria-hidden />À la une
            </p>
            <h2 id="featured-title" className="text-2xl font-bold tracking-tight md:text-3xl">
              {featured.title}
            </h2>
            <p className="text-sm text-muted">
              {featured.artistId ? (
                <Link href={`/musique/artiste/${featured.artistId}`} className="font-semibold text-ink hover:text-accent-hover">
                  {featured.artist}
                </Link>
              ) : (
                <span className="font-semibold text-ink">{featured.artist}</span>
              )}{" "}
              · {featured.type} · {featured.tracks.length} titres · {formatTotal(totalDuration(featured.tracks))}
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-muted">{featured.description}</p>
            {novel && (
              <Link
                href={novel.href}
                className="inline-flex w-fit items-center gap-1.5 rounded-full bg-lit-soft px-3 py-1 text-sm font-medium text-lit hover:underline"
              >
                <BookOpen className="size-3.5" aria-hidden />
                Lire en écoutant : {novel.label.split(" · ")[0]}
              </Link>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              <PlayCollectionButtons tracks={featured.tracks} />
            </div>
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Nouveautés" />
        <FilterableGrid
          label="Filtrer par format"
          allLabel="Tous les formats"
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5"
          items={releases.map((a) => ({
            id: a.id,
            tag: a.type,
            content: <WorkCard work={{ ...albumToSummary(a), creator: `${a.artist} · ${a.type}` }} />,
          }))}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Playlists pour vous" />
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {playlists.map((p) => (
            <li key={p.id}>
              <WorkCard
                work={{ ...albumToSummary(p), creator: `${p.tracks.length} titres · ${formatTotal(totalDuration(p.tracks))}` }}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Artistes" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {artists.map((a) => {
            const initials = a.name.split(" ").map((p) => p[0]).join("").slice(0, 2);
            return (
              <li key={a.id} className="glass flex items-center gap-4 rounded-card p-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-mus-soft text-base font-bold text-mus">
                  {initials}
                </span>
                <div className="min-w-0 flex-1">
                  <Link href={`/musique/artiste/${a.id}`} className="block truncate font-semibold hover:text-accent-hover">
                    {a.name}
                  </Link>
                  <p className="flex items-center gap-1 truncate text-xs text-muted">
                    {a.specialty} ·
                    <MapPin className="size-3 shrink-0" aria-hidden />
                    {a.location}
                  </p>
                </div>
                <FollowButton name={a.name} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Radios personnalisées" />
        <Card className="flex flex-col gap-4">
          <p className="text-sm text-muted">
            Bientôt : des radios sans fin composées à partir de votre génome culturel et de vos lectures du moment.
          </p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {radios.map((r) => (
              <li key={r.title} className="flex items-center gap-3 rounded-xl border border-dashed border-border p-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mus-soft text-mus">
                  <Radio className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{r.title}</span>
                  <span className="block text-xs text-muted">{r.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
