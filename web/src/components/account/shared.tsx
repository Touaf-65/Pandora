"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Option } from "@/lib/account";

/** A section of the settings page, reachable from the in-page menu. */
export function SettingsSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="glass flex scroll-mt-24 flex-col gap-5 rounded-card p-5 md:p-6">
      <header className="flex flex-col gap-1">
        <h2 id={`${id}-title`} className="text-lg font-semibold tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-muted">{description}</p>
      </header>
      {children}
    </section>
  );
}

/** A titled group of rows inside a section. */
export function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</h3>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

/** Radio buttons shown as a segmented control. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  render,
}: {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  render?: (option: Option<T>) => ReactNode;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-xl bg-surface-muted p-1">
      {options.map((o) => {
        const selected = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.id)}
            className={`inline-flex min-h-9 items-center gap-2 rounded-lg px-3.5 text-sm transition-colors ${
              selected ? "bg-white font-semibold text-ink shadow-sm" : "text-muted hover:text-ink"
            }`}
          >
            {render ? render(o) : o.label}
          </button>
        );
      })}
    </div>
  );
}

/** A row with a label on the left and any control on the right; stacks on narrow screens. */
export function SettingsRow({ label, description, children }: { label: string; description?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{label}</span>
        {description && <span className="text-xs leading-relaxed text-muted">{description}</span>}
      </div>
      {children}
    </div>
  );
}

/** A short confirmation that hides after a few seconds; increment the stamp to show it again. */
export function SavedNotice({ stamp, children }: { stamp: number; children: ReactNode }) {
  const [hidden, setHidden] = useState(0);
  useEffect(() => {
    if (!stamp) return;
    const timer = setTimeout(() => setHidden(stamp), 3000);
    return () => clearTimeout(timer);
  }, [stamp]);

  return (
    <p role="status" className="flex min-h-5 items-center gap-1.5 text-xs font-medium text-success">
      {stamp !== 0 && stamp !== hidden && (
        <>
          <CheckCircle2 className="size-3.5" aria-hidden />
          {children}
        </>
      )}
    </p>
  );
}
