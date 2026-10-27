import Link from "next/link";
import type { Artwork } from "@/lib/data/art";
import { ArtworkVisual } from "./ArtworkVisual";

export function ArtworkCard({ artwork, current = false }: { artwork: Artwork; current?: boolean }) {
  return (
    <Link
      href={`/art/oeuvre/${artwork.id}`}
      aria-current={current ? "page" : undefined}
      className="group flex flex-col gap-2.5"
    >
      <div
        className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-surface-muted p-3 ring-2 transition-transform group-hover:-translate-y-0.5 ${
          current ? "ring-accent" : "ring-transparent"
        }`}
      >
        <div
          className="max-h-full max-w-full shadow-md"
          style={{
            aspectRatio: `${artwork.ratio[0]} / ${artwork.ratio[1]}`,
            width: artwork.ratio[0] >= artwork.ratio[1] ? "100%" : "auto",
            height: artwork.ratio[0] >= artwork.ratio[1] ? "auto" : "100%",
          }}
        >
          <ArtworkVisual artwork={artwork} className="h-full w-full" />
        </div>
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold group-hover:text-accent-hover">{artwork.title}</p>
        <p className="truncate text-xs text-muted">
          {artwork.artist.name} · {artwork.year}
        </p>
      </div>
    </Link>
  );
}
