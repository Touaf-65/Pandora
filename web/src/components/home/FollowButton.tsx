"use client";

import { useState } from "react";

/** Local toggle only; following will be saved once accounts exist. */
export function FollowButton({ name }: { name: string }) {
  const [following, setFollowing] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={following}
      aria-label={following ? `Ne plus suivre ${name}` : `Suivre ${name}`}
      onClick={() => setFollowing(!following)}
      className={`min-h-9 shrink-0 rounded-full px-3.5 text-xs font-semibold transition-colors ${
        following ? "bg-accent-soft text-accent-hover" : "border border-border bg-white text-ink hover:border-accent"
      }`}
    >
      {following ? "Suivi" : "Suivre"}
    </button>
  );
}
