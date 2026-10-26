"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, mainNav } from "@/lib/navigation";

export function SidebarNav() {
  return <SidebarNavList pathname={usePathname()} />;
}

/** `pathname` is null while the URL is not known yet: no link is marked active. */
export function SidebarNavList({ pathname }: { pathname: string | null }) {
  return (
    <nav aria-label="Navigation principale" className="flex flex-col gap-6">
      {mainNav.map((section, i) => (
        <div key={section.title ?? i} className="flex flex-col gap-0.5">
          {section.title && (
            <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-widest text-muted">
              {section.title}
            </p>
          )}
          {section.items.map(({ label, href, icon: Icon }) => {
            const active = pathname !== null && isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                  active
                    ? "bg-surface-muted font-semibold text-ink"
                    : "text-muted hover:bg-surface-muted hover:text-ink"
                }`}
              >
                <Icon className={`size-5 ${active ? "text-accent" : ""}`} aria-hidden />
                {label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
