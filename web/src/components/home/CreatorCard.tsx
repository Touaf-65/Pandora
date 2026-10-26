import Link from "next/link";
import { domains } from "@/lib/domains";
import type { Creator } from "@/lib/data/home";
import { FollowButton } from "./FollowButton";

export function CreatorCard({ creator }: { creator: Creator }) {
  const { soft, text } = domains[creator.domain];
  const initials = creator.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="glass flex items-center gap-3 rounded-card p-4">
      <span className={`flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${soft} ${text}`}>
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <Link href={`/profil/${creator.pseudo}`} className="block truncate text-sm font-semibold hover:text-accent-hover">
          {creator.name}
        </Link>
        <p className="truncate text-xs text-muted">{creator.specialty}</p>
      </div>
      <FollowButton name={creator.name} />
    </div>
  );
}
