"use client";

import { useState } from "react";
import { Download, FileCheck2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { ACCOUNT_EMAIL, messagePolicies, type MessagePolicy } from "@/lib/account";
import { SavedNotice, Segmented, SettingsGroup, SettingsRow } from "./shared";

type Visibility = { profile: boolean; genome: boolean; activity: boolean; listening: boolean };
type Consents = { personalised: boolean; analytics: boolean };

/** Interface only: settings stay in the page and no archive is generated. */
export function PrivacySettings() {
  const [visibility, setVisibility] = useState<Visibility>({ profile: true, genome: true, activity: true, listening: false });
  const [messages, setMessages] = useState<MessagePolicy>("abonnes");
  const [consents, setConsents] = useState<Consents>({ personalised: true, analytics: false });
  const [exportRequested, setExportRequested] = useState(false);
  const [savedAt, setSavedAt] = useState(0);

  function setVisible(key: keyof Visibility, value: boolean) {
    setVisibility({ ...visibility, [key]: value });
    setSavedAt((n) => n + 1);
  }

  function setConsent(key: keyof Consents, value: boolean) {
    setConsents({ ...consents, [key]: value });
    setSavedAt((n) => n + 1);
  }

  const hiddenProfile = !visibility.profile;

  return (
    <div className="flex flex-col gap-6">
      <SettingsGroup title="Visibilité">
        <Switch
          label="Profil public"
          description="Désactivé, seules les personnes que vous suivez voient votre profil."
          checked={visibility.profile}
          onChange={(v) => setVisible("profile", v)}
        />
        <Switch
          label="Afficher mon génome culturel"
          description="La répartition de vos goûts entre littérature, musique et art."
          checked={visibility.genome && !hiddenProfile}
          disabled={hiddenProfile}
          onChange={(v) => setVisible("genome", v)}
        />
        <Switch
          label="Afficher mon activité"
          description="Lectures terminées, playlists et collections créées."
          checked={visibility.activity && !hiddenProfile}
          disabled={hiddenProfile}
          onChange={(v) => setVisible("activity", v)}
        />
        <Switch
          label="Montrer ce que j’écoute"
          description="Le morceau en cours apparaît sur votre profil."
          checked={visibility.listening && !hiddenProfile}
          disabled={hiddenProfile}
          onChange={(v) => setVisible("listening", v)}
        />
        <SettingsRow label="Qui peut m’envoyer un message">
          <Segmented
            label="Qui peut m’envoyer un message"
            options={messagePolicies}
            value={messages}
            onChange={(v) => {
              setMessages(v);
              setSavedAt((n) => n + 1);
            }}
          />
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup title="Données et consentements">
        <Switch
          label="Recommandations personnalisées"
          description="Vos lectures, écoutes et collections servent à vous proposer des œuvres."
          checked={consents.personalised}
          onChange={(v) => setConsent("personalised", v)}
        />
        <Switch
          label="Mesure d’audience anonymisée"
          description="Aide à améliorer Pandora, sans publicité ciblée."
          checked={consents.analytics}
          onChange={(v) => setConsent("analytics", v)}
        />
      </SettingsGroup>

      <SavedNotice stamp={savedAt}>Paramètres de confidentialité enregistrés.</SavedNotice>

      <div className="flex flex-col gap-3 rounded-xl bg-surface-muted p-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold">Télécharger mes données</h3>
          <p className="text-xs leading-relaxed text-muted">
            Une archive de votre profil, de votre bibliothèque, de vos annotations et de votre historique, conformément au
            RGPD.
          </p>
        </div>
        {exportRequested ? (
          <p role="status" className="flex items-start gap-2 text-sm text-success">
            <FileCheck2 className="mt-0.5 size-4 shrink-0" aria-hidden />
            Archive en préparation : un lien de téléchargement sera envoyé à {ACCOUNT_EMAIL} sous 48 heures.
          </p>
        ) : (
          <button type="button" onClick={() => setExportRequested(true)} className={buttonClasses("secondary", "w-fit")}>
            <Download className="size-4" aria-hidden />
            Demander une archive
          </button>
        )}
      </div>
    </div>
  );
}
