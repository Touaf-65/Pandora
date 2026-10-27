import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { domains, type Domain } from "@/lib/domains";

const DOMAIN_ORDER: Domain[] = ["lit", "mus", "art"];

/** Literal class names, so Tailwind generates them. */
const barColors: Record<Domain, string> = { lit: "bg-lit", mus: "bg-mus", art: "bg-art" };

type GenomeCardProps = {
  genome: Record<Domain, number>;
  genres: string[];
  title?: string;
};

/** Public cultural genome: share of each domain and favourite genres. */
export function GenomeCard({ genome, genres, title = "Génome culturel" }: GenomeCardProps) {
  return (
    <Card className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-base font-semibold">
        <Sparkles className="size-4 text-accent" aria-hidden />
        {title}
      </h2>
      <ul className="flex flex-col gap-3.5">
        {DOMAIN_ORDER.map((d) => (
          <li key={d} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{domains[d].label}</span>
              <span className="text-muted">{genome[d]} %</span>
            </div>
            <div
              role="meter"
              aria-label={`Part de ${domains[d].label.toLowerCase()}`}
              aria-valuenow={genome[d]}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-2 rounded-full bg-surface-muted"
            >
              <div className={`h-full rounded-full ${barColors[d]}`} style={{ width: `${genome[d]}%` }} />
            </div>
          </li>
        ))}
      </ul>
      {genres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <span key={g} className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted">
              {g}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
