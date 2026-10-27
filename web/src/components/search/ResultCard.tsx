import Link from "next/link";
import { domains } from "@/lib/domains";
import type { SearchItem } from "@/lib/search";
import { ArtworkVisual } from "@/components/art/ArtworkVisual";
import { Cover } from "@/components/works/Cover";

export function Thumbnail({ item }: { item: SearchItem }) {
  if (item.art) {
    const [w, h] = item.art.ratio;
    return (
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-surface-muted p-3">
        <div
          className="max-h-full max-w-full shadow-md"
          style={{ aspectRatio: `${w} / ${h}`, width: w >= h ? "100%" : "auto", height: w >= h ? "auto" : "100%" }}
        >
          <ArtworkVisual
            artwork={{ id: item.id, title: item.title, ratio: item.art.ratio, palette: item.art.palette }}
            className="h-full w-full"
          />
        </div>
      </div>
    );
  }
  if (item.type === "people") {
    const { soft, text } = domains[item.domain];
    const initials = item.title.split(" ").map((p) => p[0]).join("").slice(0, 2);
    return (
      <div className="flex aspect-square items-center justify-center">
        <span className={`flex size-3/4 items-center justify-center rounded-full text-2xl font-bold ${soft} ${text}`}>
          {initials}
        </span>
      </div>
    );
  }
  return <Cover domain={item.domain} className="aspect-square w-full" />;
}

export function ResultCard({ item }: { item: SearchItem }) {
  const meta = [item.minutes ? `${item.minutes} min` : null, item.year].filter(Boolean).join(" · ");
  return (
    <Link href={item.href} className="group flex flex-col gap-2.5">
      <div className="transition-transform group-hover:-translate-y-0.5">
        <Thumbnail item={item} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold group-hover:text-accent-hover">{item.title}</p>
        <p className="truncate text-xs text-muted">{item.subtitle}</p>
        {meta && <p className="truncate text-xs text-muted">{meta}</p>}
      </div>
    </Link>
  );
}
