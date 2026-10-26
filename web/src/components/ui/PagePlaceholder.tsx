import { Suspense } from "react";

type Phase = 1 | 2 | 3;

const phaseLabel: Record<Phase, string> = {
  1: "Phase 1 — MVP web",
  2: "Phase 2 — Créer",
  3: "Phase 3 — Cross-média",
};

type PagePlaceholderProps = {
  title: string;
  description: string;
  phase: Phase;
  /** Blocks planned for this screen, from the screen proposal canvas. */
  sections: string[];
  /** Dynamic segment value, shown while there is no data layer. Streamed, so the rest of the page prerenders. */
  detail?: Promise<string>;
};

async function Detail({ value }: { value: Promise<string> }) {
  return (
    <p className="text-sm text-muted">
      Identifiant : <code className="rounded bg-surface-muted px-1.5 py-0.5 text-ink">{await value}</code>
    </p>
  );
}

/** Temporary page body: what the screen will contain, until it is built. */
export function PagePlaceholder({ title, description, phase, sections, detail }: PagePlaceholderProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header className="flex flex-col gap-3">
        <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
          {phaseLabel[phase]}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">{description}</p>
        {detail && (
          <Suspense fallback={<p className="h-5 w-48 rounded bg-surface-muted" />}>
            <Detail value={detail} />
          </Suspense>
        )}
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <li
            key={section}
            className="flex min-h-28 items-end rounded-2xl border border-dashed border-border bg-surface p-5 text-sm font-medium"
          >
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
}
