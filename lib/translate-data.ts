/**
 * Traduction des données (instances, documents de traduction, synthèses et
 * pièces des fiches pays) via un dictionnaire FR → {nl, en} compilé par des
 * agents de traduction. Repli sur le français si la chaîne n'est pas trouvée.
 */

import dict from "./data-pays-i18n.json";
import type { Locale } from "./i18n";

type Entry = { nl?: string; en?: string };
const D = dict as Record<string, Entry>;

export function trData(lang: Locale, s: string | undefined | null): string {
  if (!s) return s ?? "";
  if (lang === "fr") return s;
  const e = D[s];
  const v = e && (lang === "nl" ? e.nl : e.en);
  return v || s;
}

/** Traduit une liste de chaînes. */
export function trList(lang: Locale, arr: string[]): string[] {
  return lang === "fr" ? arr : arr.map((s) => trData(lang, s));
}
