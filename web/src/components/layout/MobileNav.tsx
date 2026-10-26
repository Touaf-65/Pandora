"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, mainNav } from "@/lib/navigation";

const items = mainNav[0].items.filter((item) => item.href !== "/explorer");

/** Bottom navigation for small screens, where the sidebar is hidden. */
export function MobileNav() {
  return <MobileNavList pathname={usePathname()} />;
}

/** `pathname` is null while the URL is not known yet: no link is marked active. */
export function MobileNavList({ pathname }: { pathname: string | null }) {
  return (
    <nav
      aria-label="Navigation principale"
      className="sticky bottom-0 z-30 grid grid-cols-5 border-t border-border bg-surface/90 backdrop-blur lg:hidden"
    >
      {items.map(({ label, href, icon: Icon }) => {
        const active = pathname !== null && isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] ${
              active ? "font-semibold text-accent" : "text-muted"
            }`}
          >
            <Icon className="size-5" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
