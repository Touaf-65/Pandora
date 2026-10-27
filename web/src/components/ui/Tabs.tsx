"use client";

import { useId, useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode };

export function Tabs({ tabs, label }: { tabs: Tab[]; label: string }) {
  const [current, setCurrent] = useState(tabs[0].id);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-5">
      <div role="tablist" aria-label={label} className="flex gap-1 border-b border-border">
        {tabs.map((tab) => {
          const selected = tab.id === current;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              onClick={() => setCurrent(tab.id)}
              className={`-mb-px min-h-11 border-b-2 px-4 text-sm transition-colors ${
                selected ? "border-accent font-semibold text-ink" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== current}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
