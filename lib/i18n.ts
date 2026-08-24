/**
 * Internationalisation — ossature FR / NL / EN.
 *
 * Le français reste à la racine (`/traductions/`), les deux autres langues
 * sont préfixées (`/nl/traductions/`, `/en/traductions/`). Ce choix préserve
 * les URL du site actuel, donc les positions acquises sur Google.
 *
 * ÉTAT DE LA TRADUCTION
 * Les libellés d'interface (navigation, pied de page, boutons) sont traduits
 * ici : ce sont des termes standard. Le contenu rédactionnel des pages — corps
 * de texte, FAQ, fiches pays — reste en français en attendant la traduction
 * fournie par le bureau. Les pages NL et EN affichent donc pour l'instant le
 * texte français, dans une coquille entièrement localisée.
 */

export const LOCALES = ["fr", "nl", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAUT: Locale = "fr";

export function estLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}

/** Préfixe un chemin absolu par la locale (rien pour le français, racine). */
export function lien(lang: Locale, chemin: string): string {
  if (lang === DEFAUT) return chemin;
  if (chemin === "/") return `/${lang}/`;
  // les ancres et liens externes ne sont pas préfixés
  if (!chemin.startsWith("/") || chemin.startsWith("//")) return chemin;
  return `/${lang}${chemin}`;
}

/** Alternates hreflang pour une page donnée (chemin français canonique). */
export function alternates(cheminFr: string) {
  return {
    canonical: cheminFr,
    languages: {
      fr: cheminFr,
      nl: lien("nl", cheminFr),
      en: lien("en", cheminFr),
      "x-default": cheminFr,
    },
  };
}

// --------------------------------------------------------------------------
// Dictionnaire d'interface
// --------------------------------------------------------------------------
type Dico = {
  nom_langue: string;
  bascule_langue: string;
  nav: Record<
    "traductions" | "legalisations" | "visas" | "tarifs" | "ressources" | "a-propos",
    string
  >;
  cta_devis: string;
  suivre_dossier: string;
  aller_contenu: string;
  pied: {
    services: string;
    destinations: string;
    ressources: string;
    bureau: string;
    lettre_titre: string;
    lettre_accroche: string;
    lettre_note: string;
    inscrire: string;
    email_placeholder: string;
    droits: string;
    toutes_destinations: string;
  };
  cookies: {
    titre: string;
    texte: string;
    en_savoir: string;
    accepter: string;
    refuser: string;
  };
  a_venir: string;
};

const FR: Dico = {
  nom_langue: "Français",
  bascule_langue: "Changer de langue",
  nav: {
    traductions: "Traductions",
    legalisations: "Légalisations",
    visas: "Visas",
    tarifs: "Tarifs & Délais",
    ressources: "Ressources",
    "a-propos": "À propos",
  },
  cta_devis: "Devis en 2 minutes",
  suivre_dossier: "Suivre mon dossier",
  aller_contenu: "Aller au contenu",
  pied: {
    services: "Services",
    destinations: "Destinations visa",
    ressources: "Ressources",
    bureau: "Le bureau",
    lettre_titre: "Changements de procédure, délais consulaires, nouvelles destinations.",
    lettre_accroche: "Lettre d’information",
    lettre_note: "Une fois par trimestre, pas davantage.",
    inscrire: "S’inscrire",
    email_placeholder: "vous@exemple.be",
    droits: "Tous droits réservés.",
    toutes_destinations: "Les {n} destinations",
  },
  cookies: {
    titre: "Cookies : votre choix",
    texte:
      "Ce site n’utilise aucun traceur publicitaire. Seuls des cookies strictement nécessaires sont posés. Une mesure d’audience anonyme peut être activée avec votre accord.",
    en_savoir: "En savoir plus",
    accepter: "Accepter",
    refuser: "Refuser",
  },
  a_venir: "Version à venir",
};

const NL: Dico = {
  nom_langue: "Nederlands",
  bascule_langue: "Taal wijzigen",
  nav: {
    traductions: "Vertalingen",
    legalisations: "Legalisaties",
    visas: "Visa",
    tarifs: "Tarieven & Termijnen",
    ressources: "Hulpbronnen",
    "a-propos": "Over ons",
  },
  cta_devis: "Offerte in 2 minuten",
  suivre_dossier: "Mijn dossier volgen",
  aller_contenu: "Naar de inhoud",
  pied: {
    services: "Diensten",
    destinations: "Visabestemmingen",
    ressources: "Hulpbronnen",
    bureau: "Het kantoor",
    lettre_titre: "Procedurewijzigingen, consulaire termijnen, nieuwe bestemmingen.",
    lettre_accroche: "Nieuwsbrief",
    lettre_note: "Eenmaal per kwartaal, niet meer.",
    inscrire: "Inschrijven",
    email_placeholder: "u@voorbeeld.be",
    droits: "Alle rechten voorbehouden.",
    toutes_destinations: "De {n} bestemmingen",
  },
  cookies: {
    titre: "Cookies: uw keuze",
    texte:
      "Deze site gebruikt geen advertentietrackers. Alleen strikt noodzakelijke cookies worden geplaatst. Anonieme statistieken kunnen met uw toestemming worden ingeschakeld.",
    en_savoir: "Meer weten",
    accepter: "Aanvaarden",
    refuser: "Weigeren",
  },
  a_venir: "Binnenkort beschikbaar",
};

const EN: Dico = {
  nom_langue: "English",
  bascule_langue: "Change language",
  nav: {
    traductions: "Translations",
    legalisations: "Legalisations",
    visas: "Visas",
    tarifs: "Pricing & Times",
    ressources: "Resources",
    "a-propos": "About",
  },
  cta_devis: "Quote in 2 minutes",
  suivre_dossier: "Track my file",
  aller_contenu: "Skip to content",
  pied: {
    services: "Services",
    destinations: "Visa destinations",
    ressources: "Resources",
    bureau: "The office",
    lettre_titre: "Procedure changes, consular times, new destinations.",
    lettre_accroche: "Newsletter",
    lettre_note: "Once a quarter, no more.",
    inscrire: "Subscribe",
    email_placeholder: "you@example.be",
    droits: "All rights reserved.",
    toutes_destinations: "The {n} destinations",
  },
  cookies: {
    titre: "Cookies: your choice",
    texte:
      "This site uses no advertising trackers. Only strictly necessary cookies are set. Anonymous analytics can be enabled with your consent.",
    en_savoir: "Learn more",
    accepter: "Accept",
    refuser: "Decline",
  },
  a_venir: "Coming soon",
};

const DICOS: Record<Locale, Dico> = { fr: FR, nl: NL, en: EN };

export function t(lang: Locale): Dico {
  return DICOS[lang];
}
