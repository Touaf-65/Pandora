import { ChevronDown } from "lucide-react";

const questions = [
  {
    q: "Comment payer avec Moov Money ?",
    a: "Choisissez Moov Money, indiquez votre numéro : une demande de confirmation arrive sur votre téléphone. Une fois validée, votre formule est activée immédiatement et vous recevez une confirmation par SMS et e-mail.",
  },
  {
    q: "Puis-je changer de formule ou résilier à tout moment ?",
    a: "Oui. Le changement prend effet tout de suite ; en cas de résiliation, vous gardez votre formule jusqu’à la fin de la période déjà payée, puis vous repassez en Gratuit sans perdre votre bibliothèque.",
  },
  {
    q: "Que deviennent mes téléchargements si je repasse en Gratuit ?",
    a: "Ils restent dans votre bibliothèque mais ne sont plus lisibles hors connexion. Vos annotations, playlists et collections sont conservées.",
  },
  {
    q: "Pourquoi deux devises ?",
    a: "Les prix en francs CFA sont pensés pour l’Afrique de l’Ouest et centrale ; les prix en euros s’appliquent ailleurs. Les fonctionnalités sont identiques.",
  },
];

export function PricingFaq() {
  return (
    <ul className="flex flex-col gap-3">
      {questions.map(({ q, a }) => (
        <li key={q}>
          <details className="glass group rounded-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {q}
              <ChevronDown className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="pt-3 text-sm leading-relaxed text-muted">{a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
