"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Réaligne document.documentElement.lang côté client.
 *
 * Le layout racine rend <html lang="fr"> pour toutes les pages. Les pages NL
 * et EN corrigent l'attribut au montage, afin que les lecteurs d'écran et les
 * outils qui lisent le DOM voient la bonne langue. Le HTML statique servi est
 * en outre corrigé au build par tools/localiser-html.mjs.
 */
export function SyncLangue({ lang }: { lang: Locale }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "fr";
    };
  }, [lang]);
  return null;
}
