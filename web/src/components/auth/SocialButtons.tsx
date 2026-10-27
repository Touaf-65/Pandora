"use client";

import { useState } from "react";
import { buttonClasses } from "@/components/ui/Button";

const providers = ["Google", "Apple"];

/** Sign-in with external accounts: interface only until authentication exists. */
export function SocialButtons() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {providers.map((p) => (
          <button
            key={p}
            type="button"
            aria-label={`Continuer avec ${p}`}
            onClick={() => setNotice(`La connexion avec ${p} arrivera avec la mise en place des comptes.`)}
            className={buttonClasses("secondary", "w-full")}
          >
            {p}
          </button>
        ))}
      </div>
      {notice && (
        <p role="status" className="text-xs text-muted">
          {notice}
        </p>
      )}
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        ou avec votre e-mail
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
