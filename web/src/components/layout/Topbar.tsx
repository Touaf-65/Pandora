import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import { Logo } from "./Logo";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-bg/80 px-4 py-3 backdrop-blur md:px-8">
      <div className="lg:hidden">
        <Logo />
      </div>

      <form action="/recherche" role="search" className="hidden max-w-xl flex-1 sm:block">
        <label htmlFor="q" className="sr-only">
          Rechercher une œuvre, un artiste, une humeur
        </label>
        <div className="flex h-11 items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5">
          <Search className="size-4 text-muted" aria-hidden />
          <input
            id="q"
            name="q"
            type="search"
            placeholder="Œuvre, artiste, humeur…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/recherche"
          aria-label="Rechercher"
          className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-muted sm:hidden"
        >
          <Search className="size-5" aria-hidden />
        </Link>
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-muted hover:text-ink"
        >
          <Bell className="size-5" aria-hidden />
        </Link>
        <Link
          href="/compte"
          aria-label="Mon compte"
          className="flex size-11 items-center justify-center rounded-full bg-surface-muted text-ink"
        >
          <User className="size-5" aria-hidden />
        </Link>
      </div>
    </header>
  );
}
