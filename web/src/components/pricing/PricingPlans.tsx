"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { formatPrice, plans, type Currency, type Period, type PlanId } from "@/lib/plans";

export type PlanChoice = { plan: PlanId; period: Period; currency: Currency };

type PricingPlansProps = {
  /** Marked "Votre formule" and not selectable again. */
  currentPlan?: PlanId;
  /** Without it, the buttons are links to sign-up and to the subscription page. */
  onChoose?: (choice: PlanChoice) => void;
};

function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="glass inline-flex rounded-xl p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className={`min-h-9 rounded-lg px-3.5 text-sm transition-colors ${
            o.value === value ? "bg-accent font-semibold text-accent-ink" : "text-muted hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** The three plans side by side, with monthly or yearly prices in euros or CFA francs. */
export function PricingPlans({ currentPlan, onChoose }: PricingPlansProps) {
  const [period, setPeriod] = useState<Period>("mois");
  const [currency, setCurrency] = useState<Currency>("XOF");

  return (
    <div className="@container flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Toggle
          label="Période de facturation"
          value={period}
          onChange={setPeriod}
          options={[
            { value: "mois", label: "Mensuel" },
            { value: "an", label: "Annuel · 2 mois offerts" },
          ]}
        />
        <Toggle
          label="Devise"
          value={currency}
          onChange={setCurrency}
          options={[
            { value: "XOF", label: "F CFA" },
            { value: "EUR", label: "Euro" },
          ]}
        />
      </div>

      {/* Columns follow the available width, so the grid also fits beside the sidebar. */}
      <ul className="grid gap-5 @4xl:grid-cols-3">
        {plans.map((plan) => {
          const price = plan.prices[period][currency];
          const isCurrent = plan.id === currentPlan;
          const free = price === 0;
          const freeLabel = currentPlan && currentPlan !== "gratuit" ? "Repasser en Gratuit" : "Commencer gratuitement";
          const label = isCurrent ? "Votre formule" : free ? freeLabel : `Choisir ${plan.name}`;
          const variant = plan.featured ? "primary" : "secondary";

          return (
            <li
              key={plan.id}
              className={`glass relative flex flex-col gap-5 rounded-card p-6 ${plan.featured ? "ring-2 ring-accent" : ""}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-ink">
                  Le plus complet
                </span>
              )}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm leading-relaxed text-muted">{plan.tagline}</p>
              </div>
              <p className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight">{free ? "0" : formatPrice(price, currency)}</span>
                <span className="text-sm text-muted">{free ? "pour toujours" : `par ${period}`}</span>
              </p>
              <ul className="flex flex-col gap-2.5 text-sm">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                {isCurrent ? (
                  <span className={buttonClasses("ghost", "pointer-events-none w-full bg-surface-muted")}>{label}</span>
                ) : onChoose ? (
                  <button
                    type="button"
                    onClick={() => onChoose({ plan: plan.id, period, currency })}
                    className={buttonClasses(variant, "w-full")}
                  >
                    {label}
                  </button>
                ) : (
                  <Link href={free ? "/inscription" : "/compte/abonnement"} className={buttonClasses(variant, "w-full")}>
                    {label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
