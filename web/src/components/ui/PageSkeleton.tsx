/** Loading state shown while a page streams in. */
export function PageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-5xl animate-pulse flex-col gap-8" aria-busy="true" aria-label="Chargement">
      <div className="flex flex-col gap-3">
        <div className="h-6 w-40 rounded-full bg-surface-muted" />
        <div className="h-9 w-2/3 rounded-lg bg-surface-muted" />
        <div className="h-5 w-1/2 rounded-lg bg-surface-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-surface-muted" />
        ))}
      </div>
    </div>
  );
}
