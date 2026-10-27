import type { ReactNode } from "react";
import { domains, type Domain } from "@/lib/domains";

const pitch: { domain: Domain; text: string }[] = [
  { domain: "lit", text: "Lisez romans, nouvelles et poésie, des classiques aux auteurs émergents." },
  { domain: "mus", text: "Écoutez les bandes-son composées pour les œuvres que vous lisez." },
  { domain: "art", text: "Explorez des expositions virtuelles en haute définition." },
];

type AuthShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Link to the other auth page, under the card. */
  footer?: ReactNode;
};

/** Two columns on desktop: what Pandora offers, then the form in a glass card. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl items-center gap-12 py-6 lg:grid-cols-2 lg:py-12">
      <section className="hidden flex-col gap-8 lg:flex" aria-label="Pandora en bref">
        <h2 className="text-4xl font-bold leading-tight tracking-tight">
          La littérature, la musique et l’art, au même endroit.
        </h2>
        <ul className="flex flex-col gap-5">
          {pitch.map(({ domain, text }) => {
            const { icon: Icon, soft, text: color, label } = domains[domain];
            return (
              <li key={domain} className="flex items-start gap-4">
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${soft} ${color}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-sm leading-relaxed text-muted">{text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex w-full max-w-md flex-col gap-5 justify-self-center lg:justify-self-end">
        <div className="glass flex flex-col gap-6 rounded-card p-6 sm:p-8">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
          </div>
          {children}
        </div>
        {footer && <p className="text-center text-sm text-muted">{footer}</p>}
      </div>
    </div>
  );
}
