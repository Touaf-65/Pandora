"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

/** Local toggle only; the library will be saved once accounts exist. */
export function SaveButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => setSaved(!saved)}
      className={buttonClasses("secondary")}
    >
      {saved ? <Check className="size-4 text-success" aria-hidden /> : <Plus className="size-4" aria-hidden />}
      {saved ? "Dans ma bibliothèque" : "Ajouter à ma bibliothèque"}
    </button>
  );
}
