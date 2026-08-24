"use client";

/**
 * Bandeau de consentement cookies.
 *
 * La politique cookies promet : « le refus aussi accessible que
 * l'acceptation, aucun traceur déposé avant consentement ». Ce bandeau
 * honore cette promesse. En l'état, le site ne dépose aucun traceur : les
 * deux boutons enregistrent simplement le choix (localStorage), qui
 * conditionnera l'éventuelle mesure d'audience ajoutée plus tard.
 *
 * Le refus est le comportement par défaut : tant que rien n'est cliqué, et
 * même après « Refuser », aucun script tiers n'est chargé.
 */

import { useEffect, useState } from "react";
import { Icone } from "./ui";
import { estLocale, t, type Locale } from "@/lib/i18n";

const CLE = "travisum-cookies";

export default function BandeauCookies() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<Locale>("fr");

  useEffect(() => {
    const l = document.documentElement.lang;
    if (estLocale(l)) setLang(l);
    try {
      if (!localStorage.getItem(CLE)) setVisible(true);
    } catch {
      /* navigation privée stricte : on n'affiche pas le bandeau plutôt que de
         planter. Aucun traceur n'est déposé de toute façon. */
    }
  }, []);

  function choisir(valeur: "accepte" | "refuse") {
    try {
      localStorage.setItem(CLE, JSON.stringify({ valeur, date: Date.now() }));
    } catch {
      /* ignore */
    }
    setVisible(false);
    /* Point d'accroche pour une future mesure d'audience :
       if (valeur === "accepte") chargerMesureAudience(); */
  }

  if (!visible) return null;

  const d = t(lang).cookies;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-label="Gestion des cookies"
    >
      <div className="max-w-max-width mx-auto bg-primary text-on-primary border border-tertiary-fixed-dim/40 rounded-sm shadow-2xl">
        <div className="p-6 md:p-7 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-start gap-4 grow">
            <Icone nom="cookie" taille="text-[22px] shrink-0 mt-0.5" couleur="text-tertiary-fixed-dim" />
            <div>
              <p className="font-display-lg text-[19px] text-on-primary mb-1.5">
                {d.titre}
              </p>
              <p className="font-body-md text-[15px] text-primary-fixed-dim max-w-2xl">
                {d.texte}{" "}
                <a
                  className="underline decoration-tertiary-fixed-dim underline-offset-4 hover:text-on-primary transition-colors"
                  href="/cookies/"
                >
                  {d.en_savoir}
                </a>
                .
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              type="button"
              onClick={() => choisir("refuse")}
              className="order-2 sm:order-1 border border-tertiary-fixed-dim text-tertiary-fixed-dim px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-tertiary-fixed-dim/10 transition-colors"
            >
              {d.refuser}
            </button>
            <button
              type="button"
              onClick={() => choisir("accepte")}
              className="order-1 sm:order-2 bg-tertiary-fixed-dim text-on-tertiary-fixed px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
            >
              {d.accepter}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
