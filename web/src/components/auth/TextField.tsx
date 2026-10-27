"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";

type TextFieldProps = Omit<ComponentProps<"input">, "id"> & {
  label: string;
  error?: string;
  hint?: ReactNode;
  /** Adds a show/hide button for password fields. */
  revealable?: boolean;
};

export function TextField({ label, error, hint, revealable, type = "text", className = "", ...props }: TextFieldProps) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div
        className={`flex h-11 items-center rounded-xl border bg-white px-3.5 focus-within:border-accent ${
          error ? "border-danger" : "border-border"
        }`}
      >
        <input
          id={id}
          type={revealable && revealed ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`min-w-0 flex-1 bg-transparent text-sm placeholder:text-muted focus-visible:outline-none ${className}`}
          {...props}
        />
        {revealable && (
          <button
            type="button"
            aria-label={revealed ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            aria-pressed={revealed}
            onClick={() => setRevealed(!revealed)}
            className="-mr-2 flex size-9 items-center justify-center rounded-lg text-muted hover:text-ink"
          >
            {revealed ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-danger">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
      {hint && !error && (
        <div id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </div>
      )}
    </div>
  );
}
