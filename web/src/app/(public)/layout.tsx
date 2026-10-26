import { Logo } from "@/components/layout/Logo";

/** Pages reachable without an account: sign-in, sign-up, onboarding, pricing. */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center px-4 py-5 md:px-8">
        <Logo />
      </header>
      <main className="flex-1 px-4 pb-12 md:px-8">{children}</main>
    </div>
  );
}
