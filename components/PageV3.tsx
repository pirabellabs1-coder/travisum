/**
 * Enveloppe des pages internes migrées au style « v3 » : injecte la feuille de
 * style scopée `.v3`, l'en-tête v3 (sticky), le pied v3 et l'assistant. Le
 * contenu (sections en classes v3) est fourni par la page.
 */

import type { ReactNode } from "react";
import EnteteV3 from "./EnteteV3";
import PiedV3 from "./PiedV3";
import Chat from "./Chat";
import { SyncLangue } from "./SyncLangue";
import { V3_CSS } from "@/lib/v3-styles";
import type { Locale } from "@/lib/i18n";

export default function PageV3({
  lang = "fr",
  cheminFr = "/",
  children,
}: {
  lang?: Locale;
  cheminFr?: string;
  children: ReactNode;
}) {
  return (
    <div className="v3">
      {lang !== "fr" && <SyncLangue lang={lang} />}
      <style dangerouslySetInnerHTML={{ __html: V3_CSS }} />
      <EnteteV3 lang={lang} cheminFr={cheminFr} sticky />
      <main>{children}</main>
      <PiedV3 lang={lang} />
      <Chat lang={lang} />
    </div>
  );
}
