/**
 * Enveloppe commune : filet de progression, en-tête, contenu, pied de page.
 *
 * `Rythme` impose l'alternance des fonds — sans changement de valeur entre
 * deux sections, le découpage disparaît. Les sections encre servent d'ancres.
 *
 * `lang` localise le chrome (en-tête, pied de page) et corrige l'attribut
 * `<html lang>` : le layout racine le fixe à « fr » ; pour les pages NL et EN
 * un petit composant client le réaligne (le post-traitement de build le fige
 * aussi dans le HSTML statique, cf. tools/localiser-html.mjs).
 */

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import EnteteV3 from "./EnteteV3";
import PiedDePage from "./PiedDePage";
import Chat from "./Chat";
import { FiletProgression } from "./interactifs";
import { SyncLangue } from "./SyncLangue";
import type { CleEntree } from "@/lib/navigation";
import type { Fond } from "./ui";
import type { Locale } from "@/lib/i18n";

type ProprietesSection = { fond?: Fond };

function rythmer(enfants: ReactNode): ReactNode {
  let prochain: Fond = "basse";
  let premier = true;

  return Children.map(enfants, (enfant) => {
    if (!isValidElement(enfant)) return enfant;

    const element = enfant as ReactElement<ProprietesSection>;
    const fond = element.props?.fond;
    if (fond === undefined && !("fond" in (element.props ?? {}))) return enfant;

    if (fond === "encre") {
      prochain = "basse";
      return enfant;
    }
    if (premier) {
      premier = false;
      prochain = fond === "basse" ? "surface" : "basse";
      return enfant;
    }

    const attribue = prochain;
    prochain = prochain === "basse" ? "surface" : "basse";
    return cloneElement(element, { fond: attribue });
  });
}

export default function Page({
  actif,
  children,
  sansRythme = false,
  lang = "fr",
  cheminFr = "/",
}: {
  actif?: CleEntree;
  children: ReactNode;
  sansRythme?: boolean;
  lang?: Locale;
  cheminFr?: string;
}) {
  return (
    <>
      {lang !== "fr" && <SyncLangue lang={lang} />}
      <FiletProgression />
      <EnteteV3 lang={lang} cheminFr={cheminFr} />
      <main className="w-full pt-20 bg-surface">
        {sansRythme ? children : rythmer(children)}
      </main>
      <PiedDePage lang={lang} />
      <Chat lang={lang} />
    </>
  );
}
