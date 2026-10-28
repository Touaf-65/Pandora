"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, CreditCard, Crown, Receipt, Smartphone, X } from "lucide-react";
import { TextField } from "@/components/auth/TextField";
import { buttonClasses } from "@/components/ui/Button";
import { formatPrice, getPlan, paymentMethods, type PaymentMethod, type PlanId } from "@/lib/plans";
import { PricingPlans, type PlanChoice } from "./PricingPlans";

type Subscription = PlanChoice & { renewsOn?: Date; cancelled?: boolean };
type Invoice = { id: string; date: Date; label: string; amount: string; method: string };
type Step = "form" | "pending";

/** This month's usage on the free plan, until accounts exist. */
const usage = [
  { label: "Œuvres littéraires", used: 3, limit: { gratuit: 5, local: 20 } },
  { label: "Heures de musique", used: 12, limit: { gratuit: 20, local: 50 } },
  { label: "Œuvres d’art", used: 18, limit: { gratuit: 50, local: 100 } },
];

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

const methodIcons = { moov: Smartphone, carte: CreditCard };

function addPeriod(date: Date, period: PlanChoice["period"]) {
  const next = new Date(date);
  if (period === "mois") next.setMonth(next.getMonth() + 1);
  else next.setFullYear(next.getFullYear() + 1);
  return next;
}

/** Interface only: no payment is made, the chosen plan lives in the page. */
export function SubscriptionManager() {
  const [subscription, setSubscription] = useState<Subscription>({ plan: "gratuit", period: "mois", currency: "XOF" });
  const [choice, setChoice] = useState<PlanChoice | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("moov");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string>();
  const [step, setStep] = useState<Step>("form");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const checkoutRef = useRef<HTMLElement>(null);
  const currentRef = useRef<HTMLElement>(null);

  const current = getPlan(subscription.plan);
  const currentPrice = current.prices[subscription.period][subscription.currency];

  const choose = (next: PlanChoice) => {
    // Going back to the free plan is a cancellation: ask for confirmation first.
    if (next.plan === "gratuit") {
      if (!subscription.cancelled) setConfirmCancel(true);
      currentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setChoice(next);
    setStep("form");
    setPhoneError(undefined);
    // Wait for the panel to render before scrolling to it.
    requestAnimationFrame(() => checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const cancel = () => {
    setSubscription((s) => ({ ...s, cancelled: true }));
    setConfirmCancel(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (method === "moov" && !/^\+?\d[\d\s]{7,15}$/.test(phone.trim())) {
      setPhoneError("Indiquez un numéro Moov Money valide, par exemple 01 23 45 67 89.");
      return;
    }
    setPhoneError(undefined);
    if (method === "moov") setStep("pending");
    else activate();
  };

  const activate = () => {
    if (!choice) return;
    const plan = getPlan(choice.plan);
    const now = new Date();
    setSubscription({ ...choice, renewsOn: addPeriod(now, choice.period) });
    setInvoices((list) => [
      {
        id: `${now.getTime()}`,
        date: now,
        label: `${plan.name} · ${choice.period === "mois" ? "mensuel" : "annuel"}`,
        amount: formatPrice(plan.prices[choice.period][choice.currency], choice.currency),
        method: paymentMethods.find((m) => m.id === method)?.label ?? "",
      },
      ...list,
    ]);
    setChoice(null);
    setStep("form");
  };

  const choicePlan = choice ? getPlan(choice.plan) : null;
  const choicePrice = choice && choicePlan ? formatPrice(choicePlan.prices[choice.period][choice.currency], choice.currency) : "";

  return (
    <div className="flex flex-col gap-10">
      <section
        ref={currentRef}
        aria-labelledby="current-title"
        className="glass flex scroll-mt-24 flex-col gap-6 rounded-card p-6 md:p-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-hover">
              <Crown className="size-6" aria-hidden />
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">Votre formule</p>
              <h2 id="current-title" className="text-2xl font-bold tracking-tight">{current.name}</h2>
              <p className="text-sm text-muted">
                {currentPrice === 0
                  ? "Gratuit, avec une publicité discrète"
                  : `${formatPrice(currentPrice, subscription.currency)} par ${subscription.period}`}
                {subscription.renewsOn &&
                  (subscription.cancelled
                    ? ` · se termine le ${dateFormat.format(subscription.renewsOn)}`
                    : ` · renouvellement le ${dateFormat.format(subscription.renewsOn)}`)}
              </p>
            </div>
          </div>
          {subscription.plan !== "gratuit" && !subscription.cancelled && (
            <div className="flex flex-col items-start gap-2 md:items-end">
              {confirmCancel ? (
                <div role="alertdialog" aria-label="Confirmer la résiliation" className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted">Résilier à la fin de la période ?</span>
                  <button type="button" onClick={cancel} className={buttonClasses("secondary", "text-danger")}>
                    Confirmer
                  </button>
                  <button type="button" onClick={() => setConfirmCancel(false)} className={buttonClasses("ghost")}>
                    Annuler
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setConfirmCancel(true)} className={buttonClasses("ghost")}>
                  Résilier
                </button>
              )}
            </div>
          )}
          {subscription.cancelled && (
            <button
              type="button"
              onClick={() => setSubscription((s) => ({ ...s, cancelled: false }))}
              className={buttonClasses("secondary")}
            >
              Reprendre mon abonnement
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {usage.map((u) => {
            const limit = subscription.plan === "standard" ? null : u.limit[subscription.plan as Exclude<PlanId, "standard">];
            const percent = limit ? Math.min(100, Math.round((u.used / limit) * 100)) : 0;
            return (
              <div key={u.label} className="flex flex-col gap-1.5">
                <div className="flex justify-between gap-2 text-sm">
                  <span className="font-medium">{u.label}</span>
                  <span className="text-muted">{limit ? `${u.used} / ${limit}` : `${u.used} · illimité`}</span>
                </div>
                <div
                  role="meter"
                  aria-label={`${u.label} ce mois-ci`}
                  aria-valuenow={u.used}
                  aria-valuemin={0}
                  aria-valuemax={limit ?? u.used}
                  className="h-2 rounded-full bg-surface-muted"
                >
                  <div
                    className={`h-full rounded-full ${limit ? (percent >= 80 ? "bg-warning" : "bg-accent") : "bg-success"}`}
                    style={{ width: `${limit ? percent : 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="-mt-2 text-xs text-muted">Consommation de ce mois-ci, remise à zéro le 1ᵉʳ de chaque mois.</p>
      </section>

      <section aria-labelledby="plans-title" className="flex flex-col gap-4">
        <h2 id="plans-title" className="text-xl font-semibold tracking-tight">Changer de formule</h2>
        <PricingPlans currentPlan={subscription.plan} onChoose={choose} />
      </section>

      {choice && choicePlan && (
        <section
          ref={checkoutRef}
          aria-labelledby="checkout-title"
          className="glass-strong flex scroll-mt-24 flex-col gap-6 rounded-card p-6 md:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="checkout-title" className="text-xl font-semibold tracking-tight">Passer à {choicePlan.name}</h2>
              <p className="text-sm text-muted">
                {choicePrice} par {choice.period}, sans engagement.
              </p>
            </div>
            <button type="button" aria-label="Fermer le paiement" onClick={() => setChoice(null)} className={buttonClasses("ghost", "px-3")}>
              <X className="size-4" aria-hidden />
            </button>
          </div>

          {step === "form" ? (
            <form onSubmit={submit} noValidate className="flex flex-col gap-5">
              <fieldset className="grid gap-3 sm:grid-cols-2">
                <legend className="mb-3 text-sm font-medium">Moyen de paiement</legend>
                {paymentMethods.map((m) => {
                  const Icon = methodIcons[m.id];
                  const active = m.id === method;
                  return (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 transition ${
                        active ? "border-accent ring-2 ring-accent/20" : "border-border hover:border-accent/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={m.id}
                        checked={active}
                        onChange={() => setMethod(m.id)}
                        className="mt-1 size-4 accent-accent"
                      />
                      <Icon className="mt-0.5 size-5 shrink-0 text-muted" aria-hidden />
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold">{m.label}</span>
                        <span className="text-xs leading-relaxed text-muted">{m.detail}</span>
                      </span>
                    </label>
                  );
                })}
              </fieldset>

              {method === "moov" ? (
                <div className="max-w-sm">
                  <TextField
                    label="Numéro Moov Money"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="01 23 45 67 89"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={phoneError}
                    hint="Une demande de confirmation sera envoyée sur ce téléphone."
                  />
                </div>
              ) : (
                <p className="text-sm text-muted">
                  Vous serez redirigé vers la page de paiement sécurisée de notre prestataire : Pandora ne voit jamais vos
                  numéros de carte.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className={buttonClasses("primary")}>
                  Payer {choicePrice}
                </button>
                <p className="text-xs text-muted">Version de démonstration : aucun paiement n’est effectué.</p>
              </div>
            </form>
          ) : (
            <div role="status" className="flex flex-col items-start gap-4">
              <div className="flex items-start gap-3">
                <Smartphone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                <p className="text-sm leading-relaxed">
                  Une demande de {choicePrice} a été envoyée au <span className="font-semibold">{phone.trim()}</span>.
                  Validez-la dans l’application Moov Money avec votre code secret.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={activate} className={buttonClasses("primary")}>
                  <CheckCircle2 className="size-4" aria-hidden />
                  J’ai confirmé sur mon téléphone
                </button>
                <button type="button" onClick={() => setStep("form")} className={buttonClasses("ghost")}>
                  Modifier le numéro
                </button>
              </div>
              <p className="text-xs text-muted">Version de démonstration : la confirmation est simulée.</p>
            </div>
          )}
        </section>
      )}

      <section aria-labelledby="invoices-title" className="flex flex-col gap-4">
        <h2 id="invoices-title" className="text-xl font-semibold tracking-tight">Factures</h2>
        {invoices.length === 0 ? (
          <p className="glass flex items-center gap-3 rounded-card p-5 text-sm text-muted">
            <Receipt className="size-5 shrink-0" aria-hidden />
            Aucune facture pour l’instant : elles apparaîtront ici dès votre premier paiement.
          </p>
        ) : (
          <ul className="glass flex flex-col rounded-card p-2">
            {invoices.map((inv) => (
              <li key={inv.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl p-3 text-sm">
                <Receipt className="size-4 shrink-0 text-muted" aria-hidden />
                <span className="min-w-0 flex-1 font-medium">{inv.label}</span>
                <span className="text-muted">{dateFormat.format(inv.date)}</span>
                <span className="text-muted">{inv.method}</span>
                <span className="font-semibold">{inv.amount}</span>
                <span className="rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-semibold text-success">Payée</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
