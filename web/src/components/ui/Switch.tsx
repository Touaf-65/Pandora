"use client";

import { useId, type ReactNode } from "react";

type SwitchProps = {
  label: string;
  description?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

/** A labelled on/off row: text on the left, the switch on the right. */
export function Switch({ label, description, checked, onChange, disabled }: SwitchProps) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span id={`${id}-label`} className="text-sm font-medium">
          {label}
        </span>
        {description && (
          <span id={`${id}-desc`} className="text-xs leading-relaxed text-muted">
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={description ? `${id}-desc` : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
          checked ? "bg-accent" : "bg-surface-muted shadow-[inset_0_0_0_1px_var(--color-border)]"
        }`}
      >
        <span
          aria-hidden
          className={`size-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5.5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}
