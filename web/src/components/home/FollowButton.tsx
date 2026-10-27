"use client";

import { useState } from "react";

const sizes = {
  sm: "min-h-9 rounded-full px-3.5 text-xs",
  md: "min-h-11 rounded-xl px-5 text-sm",
};

/** Local toggle only; following will be saved once accounts exist. */
export function FollowButton({ name, size = "sm" }: { name: string; size?: keyof typeof sizes }) {
  const [following, setFollowing] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={following}
      aria-label={following ? `Ne plus suivre ${name}` : `Suivre ${name}`}
      onClick={() => setFollowing(!following)}
      className={`${sizes[size]} shrink-0 font-semibold transition-colors ${
        following ? "bg-accent-soft text-accent-hover" : "border border-border bg-white text-ink hover:border-accent"
      }`}
    >
      {following ? "Suivi" : "Suivre"}
    </button>
  );
}
