import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Music, Sparkles } from "lucide-react";
import { ArtworkCard } from "@/components/art/ArtworkCard";
import { ArtworkVisual } from "@/components/art/ArtworkVisual";
import { DomainHeader } from "@/components/catalogue/DomainHeader";
import { FilterableGrid } from "@/components/catalogue/FilterableGrid";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllArtworks, getExhibitions } from "@/lib/data/art";
import { getAlbum } from "@/lib/data/music";

export const metadata: Metadata = { title: "Art visuel" };

const FEATURED = "indigo-4";

export default async function ArtPage() {
  const artworks = await getAllArtworks();
  const exhibitions = await getExhibitions();
  const featured = artworks.find((a) => a.id === FEATURED) ?? artworks[0];
  const listenWith = featured.listenWith ? await getAlbum(featured.listenWith) : undefined;
  const byId = new Map(artworks.map((a) => [a.id, a]));

  // Living artists only: public-domain masters are not "emerging".
  const emerging = [
    ...artworks
      .filter((a) => a.license !== "Domaine public")
      .reduce((map, a) => map.set(a.artist.name, [...(map.get(a.artist.name) ?? []), a]), new Map<string, typeof artworks>())
      .entries(),
  ].map(([name, works]) => ({ name, pseudo: works[0].artist.pseudo, works }));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
      <DomainHeader
        domain="art"
        description="Galeries, collections et expositions virtuelles, à regarder en musique."
        facts={[`${artworks.length} œuvres`, `${exhibitions.length} expositions`, `${emerging.length} artistes émergents`]}
      />

      <section aria-labelledby="featured-title">
        <Card className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-8">
          <Link
            href={`/art/oeuvre/${featured.id}`}
            className="block w-full shrink-0 overflow-hidden rounded-xl shadow-md md:w-72"
            style={{ aspectRatio: `${featured.ratio[0]} / ${featured.ratio[1]}` }}
          >
            <ArtworkVisual artwork={featured} className="h-full w-full" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-art uppercase">
              <Sparkles className="size-3.5" aria-hidden />À la une
            </p>
            <h2 id="featured-title" className="text-2xl font-bold tracking-tight md:text-3xl">
              {featured.title}
            </h2>
            <p className="text-sm text-muted">
              {featured.artist.pseudo ? (
                <Link href={`/profil/${featured.artist.pseudo}`} className="font-semibold text-ink hover:text-accent-hover">
                  {featured.artist.name}
                </Link>
              ) : (
                <span className="font-semibold text-ink">{featured.artist.name}</span>
              )}{" "}
              · {featured.year} · {featured.technique}
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-muted">{featured.description}</p>
            {listenWith && (
              <Link
                href={`/musique/album/${listenWith.id}`}
                className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mus-soft px-3 py-1 text-sm font-medium text-mus hover:underline"
              >
                <Music className="size-3.5" aria-hidden />
                À écouter en regardant : {listenWith.title}
              </Link>
            )}
            <div className="flex flex-wrap gap-2 pt-1">
              <Link href={`/art/oeuvre/${featured.id}`} className={buttonClasses("primary")}>
                <Eye className="size-4" aria-hidden />
                Voir l’œuvre
              </Link>
            </div>
          </div>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Expositions en cours" />
        <ul className="grid gap-5 md:grid-cols-2">
          {exhibitions.map((e) => {
            const preview = e.rooms.flatMap((r) => r.artworkIds).slice(0, 3).flatMap((id) => byId.get(id) ?? []);
            const count = e.rooms.reduce((n, r) => n + r.artworkIds.length, 0);
            return (
              <li key={e.id}>
                <Link
                  href={`/art/exposition/${e.id}`}
                  className="glass group flex h-full flex-col gap-4 rounded-card p-4 transition-shadow hover:shadow-lg"
                >
                  <div className="grid grid-cols-3 gap-2">
                    {preview.map((a) => (
                      <div key={a.id} className="aspect-[3/4] overflow-hidden rounded-xl">
                        <ArtworkVisual artwork={a} className="h-full w-full" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold group-hover:text-accent-hover">{e.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">{e.description}</p>
                  </div>
                  <p className="mt-auto flex items-center justify-between text-xs text-muted">
                    {e.rooms.length} salles · {count} œuvres{e.soundtrack ? " · avec bande-son" : ""}
                    <span className="inline-flex items-center gap-1 font-medium text-accent-hover">
                      Visiter
                      <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Styles et techniques" />
        <FilterableGrid
          label="Filtrer par style"
          allLabel="Tous les styles"
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
          items={artworks.map((a) => ({ id: a.id, tag: a.style, content: <ArtworkCard artwork={a} /> }))}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeader title="Artistes émergents" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emerging.map((artist) => {
            const initials = artist.name.split(" ").map((p) => p[0]).join("").slice(0, 2);
            const href = artist.pseudo ? `/profil/${artist.pseudo}` : `/art/oeuvre/${artist.works[0].id}`;
            return (
              <li key={artist.name}>
                <Link href={href} className="glass group flex items-center gap-3 rounded-card p-4 transition-shadow hover:shadow-lg">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-art-soft text-sm font-bold text-art">
                    {initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold group-hover:text-accent-hover">{artist.name}</span>
                    <span className="block truncate text-xs text-muted">
                      {[...new Set(artist.works.map((w) => w.style))].join(", ")} · {artist.works.length} œuvre
                      {artist.works.length > 1 ? "s" : ""}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
