import { Suspense } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";
import { Logo } from "./Logo";
import { SidebarNav, SidebarNavList } from "./SidebarNav";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r border-border bg-surface px-4 py-6 lg:flex">
      <div className="px-2">
        <Logo />
      </div>

      {/* The active link depends on the URL, which is unknown while prerendering dynamic routes. */}
      <Suspense fallback={<SidebarNavList pathname={null} />}>
        <SidebarNav />
      </Suspense>

      <Link
        href="/compte/abonnement"
        className="mt-auto flex flex-col gap-1 rounded-xl border border-border bg-surface-muted p-4 text-ink"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Crown className="size-4 text-accent" aria-hidden />
          Passer Premium
        </span>
        <span className="text-xs leading-relaxed text-muted">
          Sans publicité, hors ligne, recommandations IA.
        </span>
      </Link>
    </aside>
  );
}
