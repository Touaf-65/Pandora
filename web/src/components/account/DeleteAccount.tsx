"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

type Step = "idle" | "confirm" | "scheduled";

/** Interface only: nothing is deleted, the scheduled deletion can be undone in the page. */
export function DeleteAccount({ pseudo }: { pseudo: string }) {
  const [step, setStep] = useState<Step>("idle");
  const [typed, setTyped] = useState("");

  function reset() {
    setStep("idle");
    setTyped("");
  }

  if (step === "scheduled") {
    return (
      <div role="status" className="flex flex-col items-start gap-3">
        <p className="text-sm">
          Suppression programmée : votre compte et vos données seront effacés dans 30 jours. Reconnectez-vous d’ici là pour
          l’annuler.
        </p>
        <button type="button" onClick={reset} className={buttonClasses("secondary")}>
          Annuler la suppression
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted">
        <li>Votre profil, votre bibliothèque, vos annotations et vos playlists seront effacés.</li>
        <li>Un abonnement Premium en cours est résilié, sans remboursement de la période entamée.</li>
        <li>Vous disposez de 30 jours pour changer d’avis.</li>
      </ul>

      {step === "idle" ? (
        <button
          type="button"
          onClick={() => setStep("confirm")}
          className={buttonClasses("dangerSoft", "w-fit")}
        >
          Supprimer mon compte
        </button>
      ) : (
        <div role="alertdialog" aria-labelledby="delete-confirm-title" className="flex flex-col gap-3 rounded-xl bg-danger-soft p-4">
          <p id="delete-confirm-title" className="flex items-center gap-2 text-sm font-semibold text-danger">
            <TriangleAlert className="size-4 shrink-0" aria-hidden />
            Confirmez la suppression
          </p>
          <label htmlFor="delete-confirm" className="text-sm">
            Saisissez votre pseudo <strong>{pseudo}</strong> pour confirmer.
          </label>
          <input
            id="delete-confirm"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoComplete="off"
            autoFocus
            className="h-11 w-full max-w-xs rounded-xl border border-border bg-white px-3.5 text-sm focus-visible:border-danger focus-visible:outline-none"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={typed.trim() !== pseudo}
              onClick={() => setStep("scheduled")}
              className={buttonClasses("danger")}
            >
              Confirmer la suppression
            </button>
            <button type="button" onClick={reset} className={buttonClasses("ghost")}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
