import { Check, Minus } from "lucide-react";
import { comparison, plans } from "@/lib/plans";

/** Feature by feature comparison of the three plans. */
export function ComparisonTable() {
  return (
    <div className="glass overflow-x-auto rounded-card">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <caption className="sr-only">Comparatif des formules</caption>
        <thead>
          <tr className="border-b border-border text-left">
            <th scope="col" className="px-5 py-4 font-semibold text-muted">Fonctionnalité</th>
            {plans.map((p) => (
              <th key={p.id} scope="col" className={`px-4 py-4 font-semibold ${p.featured ? "text-accent-hover" : ""}`}>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <th scope="row" className="px-5 py-3 text-left font-medium">{row.label}</th>
              {plans.map((p) => {
                const value = row.values[p.id];
                return (
                  <td key={p.id} className="px-4 py-3 text-muted">
                    {value === true ? (
                      <Check className="size-4 text-success" aria-label="Inclus" />
                    ) : value === false ? (
                      <Minus className="size-4 text-border" aria-label="Non inclus" />
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
