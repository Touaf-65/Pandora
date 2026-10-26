import { domains, type Domain } from "@/lib/domains";

/** Placeholder cover until works have real images: domain tint and icon. */
export function Cover({ domain, className = "" }: { domain: Domain; className?: string }) {
  const { icon: Icon, soft, text } = domains[domain];
  return (
    <div className={`flex items-center justify-center rounded-xl ${soft} ${text} ${className}`}>
      <Icon className="size-1/4 max-h-10 max-w-10 opacity-70" aria-hidden />
    </div>
  );
}
