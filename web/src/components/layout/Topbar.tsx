import Form from "next/form";
import Link from "next/link";
import { Bell, Search, User } from "lucide-react";
import { CURRENT_USER } from "@/lib/data/profiles";
import { Logo } from "./Logo";

export function Topbar() {
  return (
    <header className="glass sticky top-3 z-30 mx-3 mt-3 flex items-center gap-4 rounded-card px-4 py-2.5 md:mx-6 md:px-5">
      <div className="lg:hidden">
        <Logo />
      </div>

      {/* next/form navigates client-side, so the audio player keeps playing. */}
      <Form action="/recherche" role="search" className="hidden max-w-xl flex-1 sm:block">
        <label htmlFor="q" className="sr-only">
          Rechercher une œuvre, un créateur, un genre
        </label>
        <div className="flex h-11 items-center gap-2.5 rounded-xl border border-border bg-white/80 px-3.5 focus-within:border-accent">
          <Search className="size-4 text-muted" aria-hidden />
          <input
            id="q"
            name="q"
            type="search"
            placeholder="Œuvre, créateur, genre…"
            className="min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted focus-visible:outline-none"
          />
        </div>
      </Form>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/recherche"
          aria-label="Rechercher"
          className="flex size-11 items-center justify-center rounded-xl border border-border bg-white/80 text-muted sm:hidden"
        >
          <Search className="size-5" aria-hidden />
        </Link>
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="flex size-11 items-center justify-center rounded-xl border border-border bg-white/80 text-muted hover:text-ink"
        >
          <Bell className="size-5" aria-hidden />
        </Link>
        <Link
          href={`/profil/${CURRENT_USER}`}
          aria-label="Mon profil"
          className="flex size-11 items-center justify-center rounded-full bg-accent-soft text-accent-hover"
        >
          <User className="size-5" aria-hidden />
        </Link>
      </div>
    </header>
  );
}
