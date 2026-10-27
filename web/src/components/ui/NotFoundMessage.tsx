import Link from "next/link";
import { buttonClasses } from "./Button";

export function NotFoundMessage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-16 text-center">
      <p className="text-sm font-semibold text-muted">Erreur 404</p>
      <h1 className="text-3xl font-bold tracking-tight">Cette page n’existe pas</h1>
      <p className="text-base text-muted">L’œuvre ou la page demandée a peut-être été retirée ou déplacée.</p>
      <Link href="/" className={buttonClasses("primary")}>
        Retour à l’accueil
      </Link>
    </div>
  );
}
