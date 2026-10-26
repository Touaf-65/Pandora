import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold text-muted">Erreur 404</p>
      <h1 className="text-3xl font-bold tracking-tight">Cette page n’existe pas</h1>
      <Link href="/" className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-ink">
        Retour à l’accueil
      </Link>
    </main>
  );
}
