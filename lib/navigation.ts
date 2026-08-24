/**
 * Structure de navigation : barre principale, méga-menu, pied de page.
 *
 * Les fonctions prennent la locale et renvoient des libellés traduits et des
 * liens préfixés (`/nl/…`, `/en/…`). Contenu des panneaux repris de l'écran
 * 12 du devis TRV-2026-01.
 */

import { lien, t, type Locale } from "./i18n";

export type CleEntree =
  | "traductions"
  | "legalisations"
  | "visas"
  | "tarifs"
  | "ressources"
  | "a-propos";

export type Entree = {
  libelle: string;
  cle: CleEntree;
  href: string;
  mega: boolean;
};

const CHEMINS: Record<CleEntree, string> = {
  traductions: "/traductions/",
  legalisations: "/legalisations/",
  visas: "/visas/",
  tarifs: "/tarifs/",
  ressources: "/ressources/",
  "a-propos": "/a-propos/",
};

export function entrees(lang: Locale): Entree[] {
  const nav = t(lang).nav;
  const mega: CleEntree[] = ["traductions", "legalisations", "visas"];
  return (Object.keys(CHEMINS) as CleEntree[]).map((cle) => ({
    libelle: nav[cle],
    cle,
    href: lien(lang, CHEMINS[cle]),
    mega: mega.includes(cle),
  }));
}

type Colonne = { titre: string; liens: [string, string][] };
type BlocMega = {
  colonnes: Colonne[];
  carte: { surtitre: string; titre: string; action: string; href: string };
};

/**
 * Le contenu éditorial du méga-menu reste en français (traduction à fournir),
 * mais les liens sont préfixés par la locale.
 */
export function mega(lang: Locale): Partial<Record<CleEntree, BlocMega>> {
  const L = (chemin: string) => lien(lang, chemin);
  return {
    traductions: {
      colonnes: [
        {
          titre: "Par type",
          liens: [
            ["Traduction assermentée", L("/traductions/")],
            ["Traduction libre", L("/traductions/")],
            ["Traduction technique", L("/traductions/")],
            ["Traduction de site web", L("/traductions/")],
          ],
        },
        {
          titre: "Par document",
          liens: [
            ["Acte de naissance", L("/traductions/#documents")],
            ["Acte de mariage", L("/traductions/#documents")],
            ["Diplôme et relevé de notes", L("/traductions/#documents")],
            ["Jugement et acte notarié", L("/traductions/#documents")],
            ["Statuts de société", L("/traductions/#documents")],
          ],
        },
        {
          titre: "Langues les plus demandées",
          liens: [
            ["Néerlandais", L("/traductions/#langues")],
            ["Anglais", L("/traductions/#langues")],
            ["Allemand", L("/traductions/#langues")],
            ["Arabe", L("/traductions/#langues")],
            ["Espagnol", L("/traductions/#langues")],
            ["Mandarin", L("/traductions/#langues")],
          ],
        },
      ],
      carte: {
        surtitre: "Estimation immédiate",
        titre: "Un prix et un délai, sans appel téléphonique.",
        action: "Estimer ma traduction",
        href: L("/traductions/#estimation"),
      },
    },

    legalisations: {
      colonnes: [
        {
          titre: "Prestations",
          liens: [
            ["Légalisation complète", L("/legalisations/")],
            ["Apostille de La Haye", L("/legalisations/")],
            ["Dépôt SPF Justice", L("/legalisations/")],
            ["Affaires étrangères", L("/legalisations/")],
          ],
        },
        {
          titre: "Instances couvertes",
          liens: [
            ["Tribunal de 1re instance", L("/legalisations/#instances")],
            ["Cours d’appel", L("/legalisations/#instances")],
            ["Notaires", L("/legalisations/#instances")],
            ["Chambre de commerce (BECI)", L("/legalisations/#instances")],
            ["Ambassades et consulats", L("/legalisations/#instances")],
          ],
        },
        {
          titre: "Comprendre",
          liens: [
            ["Le parcours d’un document", L("/legalisations/")],
            ["Apostille ou légalisation ?", L("/legalisations/#faq")],
            ["Délais et frais officiels", L("/legalisations/#tarifs")],
          ],
        },
      ],
      carte: {
        surtitre: "En trois secondes",
        titre: "L’apostille suffit-elle pour votre pays ?",
        action: "Vérifier",
        href: L("/legalisations/#faq"),
      },
    },

    visas: {
      colonnes: [
        {
          titre: "Destinations phares",
          liens: [
            ["Fédération de Russie", L("/visas/russie/")],
            ["République Populaire de Chine", L("/visas/chine/")],
            ["République de l’Inde", L("/visas/inde/")],
            ["États-Unis — ESTA", L("/visas/etats-unis-2/")],
          ],
        },
        {
          titre: "Par motif",
          liens: [
            ["Tourisme", L("/visas/#toutes")],
            ["Affaires", L("/visas/#toutes")],
            ["Études", L("/visas/#toutes")],
            ["Transit", L("/visas/#toutes")],
          ],
        },
        {
          titre: "Types de procédure",
          liens: [
            ["Visa consulaire", L("/visas/#toutes")],
            ["e-Visa", L("/visas/#toutes")],
            ["ESTA", L("/visas/etats-unis-2/")],
          ],
        },
      ],
      carte: {
        surtitre: "Vérificateur",
        titre: "Ai-je besoin d’un visa pour ce voyage ?",
        action: "Vérifier mes conditions",
        href: L("/visas/#verifier"),
      },
    },
  };
}

export function pagesLegales(lang: Locale): [string, string][] {
  return [
    ["Mentions légales", lien(lang, "/mentions-legales/")],
    ["Confidentialité", lien(lang, "/confidentialite/")],
    ["Conditions générales", lien(lang, "/cgv/")],
    ["Cookies", lien(lang, "/cookies/")],
  ];
}
