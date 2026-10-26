import Link from "next/link";
import { domains } from "@/lib/domains";
import type { WorkSummary } from "@/lib/data/home";
import { Cover } from "./Cover";

export function WorkCard({ work }: { work: WorkSummary }) {
  return (
    <Link href={work.href} className="group flex flex-col gap-2.5">
      <Cover
        domain={work.domain}
        className={`${domains[work.domain].ratio} w-full transition-transform group-hover:-translate-y-0.5`}
      />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold group-hover:text-accent-hover">{work.title}</p>
        <p className="truncate text-xs text-muted">{work.creator}</p>
      </div>
    </Link>
  );
}
