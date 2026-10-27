import type { ReactNode } from "react";
import { domains, type Domain } from "@/lib/domains";

type DomainHeaderProps = {
  domain: Domain;
  description: string;
  /** Short figures shown under the title, e.g. "7 œuvres". */
  facts: string[];
  children?: ReactNode;
};

/** Title block of a domain home page. */
export function DomainHeader({ domain, description, facts, children }: DomainHeaderProps) {
  const { icon: Icon, label, soft, text } = domains[domain];
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-4">
        <span className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${soft} ${text}`}>
          <Icon className="size-7" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{label}</h1>
          <p className="text-base text-muted">{description}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {facts.map((f) => (
          <span key={f} className="glass rounded-full px-3 py-1 text-xs font-medium text-muted">
            {f}
          </span>
        ))}
        {children}
      </div>
    </header>
  );
}
