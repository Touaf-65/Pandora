import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Crown } from "lucide-react";
import { DeleteAccount } from "@/components/account/DeleteAccount";
import { PreferencesSettings } from "@/components/account/PreferencesSettings";
import { PrivacySettings } from "@/components/account/PrivacySettings";
import { ProfileSettings } from "@/components/account/ProfileSettings";
import { SecuritySettings } from "@/components/account/SecuritySettings";
import { SettingsSection } from "@/components/account/shared";
import { CURRENT_USER, getProfile } from "@/lib/data/profiles";

export const metadata: Metadata = { title: "Paramètres du compte" };

const sections = [
  { id: "profil", label: "Profil" },
  { id: "abonnement", label: "Abonnement" },
  { id: "preferences", label: "Préférences" },
  { id: "confidentialite", label: "Confidentialité" },
  { id: "securite", label: "Sécurité" },
  { id: "suppression", label: "Supprimer le compte" },
];

export default async function AccountPage() {
  const profile = await getProfile(CURRENT_USER);
  if (!profile) notFound();

  return (
    <div className="@container mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres du compte</h1>
        <p className="text-base text-muted">Votre profil, vos préférences, votre confidentialité et la sécurité de votre compte.</p>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 @4xl:grid-cols-[12rem_minmax(0,1fr)]">
        <nav aria-label="Sections des paramètres" className="@4xl:sticky @4xl:top-24 @4xl:self-start">
          <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] @4xl:mx-0 @4xl:flex-col @4xl:gap-1 @4xl:px-0 [&::-webkit-scrollbar]:hidden">
            {sections.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className={`flex min-h-10 items-center whitespace-nowrap rounded-xl bg-white/70 px-3.5 text-sm shadow-[inset_0_0_0_1px_var(--color-border)] transition-colors hover:text-ink @4xl:bg-transparent @4xl:shadow-none @4xl:hover:bg-white/70 ${
                    s.id === "suppression" ? "text-danger hover:text-danger" : "text-muted"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col gap-6">
          <SettingsSection id="profil" title="Profil" description="Ce que les autres membres voient sur votre profil public.">
            <ProfileSettings
              initial={{ name: profile.name, pseudo: profile.pseudo, location: profile.location, bio: profile.bio }}
            />
          </SettingsSection>

          <SettingsSection id="abonnement" title="Abonnement" description="Votre formule et vos factures.">
            <Link
              href="/compte/abonnement"
              className="group flex items-center gap-4 rounded-xl bg-accent-soft p-4 transition-colors hover:bg-[#dde7ff]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-accent">
                <Crown className="size-5" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-sm font-semibold">Formule Gratuite</span>
                <span className="text-xs leading-relaxed text-muted">
                  Premium dès 1 300 F CFA par mois : sans publicité, plus d’œuvres chaque mois.
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-accent-hover">
                Gérer
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </SettingsSection>

          <SettingsSection id="preferences" title="Préférences" description="Langue, lecture, écoute et notifications.">
            <PreferencesSettings />
          </SettingsSection>

          <SettingsSection
            id="confidentialite"
            title="Confidentialité et données"
            description="Ce que vous partagez, comment vos données sont utilisées, et l’accès à vos données personnelles."
          >
            <PrivacySettings />
          </SettingsSection>

          <SettingsSection id="securite" title="Sécurité" description="Identifiants, double authentification et appareils connectés.">
            <SecuritySettings />
          </SettingsSection>

          <SettingsSection id="suppression" title="Supprimer le compte" description="Cette action efface votre compte et vos données.">
            <DeleteAccount pseudo={profile.pseudo} />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
