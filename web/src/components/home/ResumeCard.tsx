import Link from "next/link";
import type { ResumeItem } from "@/lib/data/home";
import { Cover } from "@/components/works/Cover";

export function ResumeCard({ item }: { item: ResumeItem }) {
  return (
    <Link href={item.href} className="glass group flex items-center gap-4 rounded-card p-3 transition-shadow hover:shadow-lg">
      <Cover domain={item.domain} className="size-14 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="truncate text-sm font-semibold group-hover:text-accent-hover">{item.title}</p>
        <p className="truncate text-xs text-muted">{item.detail}</p>
        <div
          role="progressbar"
          aria-label={`Progression : ${item.title}`}
          aria-valuenow={item.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 rounded-full bg-surface-muted"
        >
          <div className="h-full rounded-full bg-accent" style={{ width: `${item.progress}%` }} />
        </div>
      </div>
    </Link>
  );
}
