"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/Switch";
import {
  languages,
  notificationSettings,
  readerThemes,
  type NotificationSetting,
  type Option,
  type ReaderTheme,
} from "@/lib/account";
import { SavedNotice, Segmented, SettingsGroup, SettingsRow } from "./shared";

const audioQualities: Option<"standard" | "haute">[] = [
  { id: "standard", label: "Standard" },
  { id: "haute", label: "Haute" },
];

/** Interface only: preferences apply as soon as they change and stay in the page. */
export function PreferencesSettings() {
  const [language, setLanguage] = useState("fr");
  const [theme, setTheme] = useState<ReaderTheme>("clair");
  const [quality, setQuality] = useState<"standard" | "haute">("standard");
  const [autoplay, setAutoplay] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [savedAt, setSavedAt] = useState(0);

  /** Wraps a setter so every change shows the saved notice. */
  function saving<T>(set: (value: T) => void) {
    return (value: T) => {
      set(value);
      setSavedAt((n) => n + 1);
    };
  }

  function toggle(id: string, channel: "email" | "push") {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, [channel]: !n[channel] } : n)));
    setSavedAt((n) => n + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      <SettingsGroup title="Affichage">
        <SettingsRow label="Langue de l’interface" description="Les œuvres restent dans leur langue d’origine.">
          <Segmented label="Langue de l’interface" options={languages} value={language} onChange={saving(setLanguage)} />
        </SettingsRow>
        <SettingsRow label="Thème de lecture par défaut" description="Modifiable à tout moment depuis le lecteur.">
          <Segmented
            label="Thème de lecture par défaut"
            options={readerThemes}
            value={theme}
            onChange={saving(setTheme)}
            render={(o) => (
              <>
                <span
                  aria-hidden
                  className={`size-3.5 rounded-full shadow-[inset_0_0_0_1px_rgb(15_23_42/0.15)] ${readerThemes.find((t) => t.id === o.id)?.swatch}`}
                />
                {o.label}
              </>
            )}
          />
        </SettingsRow>
      </SettingsGroup>

      <SettingsGroup title="Écoute">
        <SettingsRow label="Qualité audio" description="La haute qualité consomme davantage de données mobiles.">
          <Segmented label="Qualité audio" options={audioQualities} value={quality} onChange={saving(setQuality)} />
        </SettingsRow>
        <Switch
          label="Enchaîner automatiquement"
          description="Lance la piste suivante à la fin d’un morceau ou d’un album."
          checked={autoplay}
          onChange={saving(setAutoplay)}
        />
        <Switch
          label="Télécharger uniquement en Wi-Fi"
          description="Pour la lecture hors ligne, incluse dans Premium Standard."
          checked={wifiOnly}
          onChange={saving(setWifiOnly)}
        />
      </SettingsGroup>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Notifications</h3>
        <table className="w-full text-sm">
          <caption className="sr-only">Notifications reçues par e-mail et sur l’application</caption>
          <thead>
            <tr className="text-xs text-muted">
              <th scope="col" className="py-2 text-left font-medium">
                Événement
              </th>
              <th scope="col" className="w-16 py-2 text-center font-medium">
                E-mail
              </th>
              <th scope="col" className="w-16 py-2 text-center font-medium">
                Appli
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border border-t border-border">
            {notifications.map((n) => (
              <tr key={n.id}>
                <th scope="row" className="py-3 pr-3 text-left font-normal">
                  {n.label}
                </th>
                {(["email", "push"] as const).map((channel) => (
                  <td key={channel} className="text-center">
                    <NotificationCheckbox setting={n} channel={channel} onToggle={() => toggle(n.id, channel)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SavedNotice stamp={savedAt}>Préférences enregistrées.</SavedNotice>
    </div>
  );
}

function NotificationCheckbox({
  setting,
  channel,
  onToggle,
}: {
  setting: NotificationSetting;
  channel: "email" | "push";
  onToggle: () => void;
}) {
  return (
    <input
      type="checkbox"
      checked={setting[channel]}
      onChange={onToggle}
      aria-label={`${setting.label} : ${channel === "email" ? "par e-mail" : "sur l’application"}`}
      className="size-5 cursor-pointer accent-accent"
    />
  );
}
