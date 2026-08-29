"use client";

import { useEffect } from "react";

/**
 * Détection automatique de la langue au premier accès.
 *
 * Le site est exporté en statique (pas de middleware géo-IP côté serveur) : on
 * s'appuie donc sur la langue du navigateur (`navigator.languages`), qui reflète
 * la préférence réelle de l'internaute.
 *
 * Règles (volontairement prudentes pour préserver le référencement) :
 *  - La redirection automatique ne se produit QUE sur la page d'accueil « / »
 *    (la porte d'entrée). Les pages profondes gardent leur URL : un visiteur
 *    arrivant depuis Google voit exactement la version indexée, et peut changer
 *    de langue via les pastilles.
 *  - Sur une URL déjà localisée (/nl, /en) on enregistre ce choix.
 *  - Un choix explicite (clic sur une pastille de langue `a[data-lang]`) est
 *    mémorisé et prime sur la détection.
 *  - Aucune boucle : dès qu'on est sur la bonne langue, on s'arrête.
 */

const CLE = "travisum-lang";
type Lg = "fr" | "nl" | "en";

function langueNavigateur(): Lg {
  const liste =
    (typeof navigator !== "undefined" && (navigator.languages || [navigator.language])) || [];
  for (const brut of liste) {
    const c = (brut || "").slice(0, 2).toLowerCase();
    if (c === "nl") return "nl";
    if (c === "fr") return "fr";
    if (c === "en") return "en";
  }
  return "fr";
}

function localeChemin(p: string): Lg {
  if (p === "/nl" || p.startsWith("/nl/")) return "nl";
  if (p === "/en" || p.startsWith("/en/")) return "en";
  return "fr";
}

export default function AutoLangue() {
  useEffect(() => {
    // Mémorise un choix explicite (pastille de langue) au moment du clic.
    const onClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[data-lang]");
      const l = a?.getAttribute("data-lang");
      if (l === "fr" || l === "nl" || l === "en") {
        try {
          localStorage.setItem(CLE, l);
        } catch {
          /* stockage indisponible */
        }
      }
    };
    document.addEventListener("click", onClic, true);
    const cleanup = () => document.removeEventListener("click", onClic, true);

    let stocke: string | null = null;
    try {
      stocke = localStorage.getItem(CLE);
    } catch {
      return cleanup; // navigation privée stricte : on ne touche à rien
    }

    const courant = localeChemin(location.pathname);

    // URL déjà localisée → on enregistre la langue et on s'arrête.
    if (courant !== "fr") {
      try {
        localStorage.setItem(CLE, courant);
      } catch {
        /* ignore */
      }
      return cleanup;
    }

    // Pages FR profondes : jamais de redirection automatique.
    if (location.pathname !== "/") return cleanup;

    // Page d'accueil FR : on adapte à la préférence connue ou détectée (une fois).
    const cible: Lg =
      stocke === "fr" || stocke === "nl" || stocke === "en" ? stocke : langueNavigateur();
    if (!stocke) {
      try {
        localStorage.setItem(CLE, cible);
      } catch {
        /* ignore */
      }
    }
    if (cible !== "fr") {
      location.replace("/" + cible + "/" + location.search + location.hash);
    }

    return cleanup;
  }, []);

  return null;
}
