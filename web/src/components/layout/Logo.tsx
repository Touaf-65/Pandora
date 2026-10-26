import Link from "next/link";
import { Layers } from "lucide-react";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 text-ink">
      <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-ink">
        <Layers className="size-4" aria-hidden />
      </span>
      <span className="text-base font-bold tracking-[0.08em]">PANDORA</span>
    </Link>
  );
}
