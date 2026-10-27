"use client";

import { useState, type ReactNode } from "react";

export type GridItem = { id: string; tag: string; content: ReactNode };

type FilterableGridProps = {
  items: GridItem[];
  /** Name of the filter group, read by screen readers. */
  label: string;
  allLabel?: string;
  className?: string;
};

/** Grid of cards rendered on the server, filtered here by genre, style or type. */
export function FilterableGrid({ items, label, allLabel = "Tout", className = "" }: FilterableGridProps) {
  const [tag, setTag] = useState<string | null>(null);
  const tags = [...new Set(items.map((i) => i.tag))];
  const shown = tag ? items.filter((i) => i.tag === tag) : items;

  const chip = (active: boolean) =>
    `inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-sm transition-colors ${
      active ? "bg-accent font-semibold text-accent-ink" : "glass text-muted hover:text-ink"
    }`;

  return (
    <div className="flex flex-col gap-5">
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={tag === null} onClick={() => setTag(null)} className={chip(tag === null)}>
          {allLabel}
          <span className={tag === null ? "opacity-80" : "text-xs"}>{items.length}</span>
        </button>
        {tags.map((t) => {
          const active = t === tag;
          return (
            <button key={t} type="button" aria-pressed={active} onClick={() => setTag(t)} className={chip(active)}>
              {t}
              <span className={active ? "opacity-80" : "text-xs"}>{items.filter((i) => i.tag === t).length}</span>
            </button>
          );
        })}
      </div>
      <ul className={className} aria-live="polite">
        {shown.map((i) => (
          <li key={i.id}>{i.content}</li>
        ))}
      </ul>
    </div>
  );
}
