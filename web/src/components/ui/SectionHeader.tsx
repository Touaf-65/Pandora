import Link from "next/link";

export function SectionHeader({ title, href, linkLabel = "Tout voir" }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {href && (
        <Link href={href} className="text-sm font-medium text-accent-hover hover:underline">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
