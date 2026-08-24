/**
 * Dictionnaire de contenu par page.
 *
 * Chaque bloc de contenu est décliné par locale. Le néerlandais et l'anglais
 * qui manquent retombent silencieusement sur le français, si bien qu'une page
 * reste toujours complète — traduite là où c'est fait, française ailleurs.
 *
 * Ces traductions sont un premier jet, à faire valider par le bureau (c'est
 * son métier). Elles sont néanmoins figées dans le HTML statique au build :
 * Googlebot reçoit donc du vrai néerlandais / anglais, ce qui rend les balises
 * hreflang cohérentes — à la différence d'un widget de traduction côté client.
 */

import type { Locale } from "./i18n";

/** Un contenu traduit : le français est obligatoire, nl/en optionnels. */
export type Trad<T> = { fr: T } & Partial<Record<Locale, T>>;

/** Résout un contenu dans la locale demandée, avec repli sur le français. */
export function resoudre<T>(bloc: Trad<T>, lang: Locale): T {
  return bloc[lang] ?? bloc.fr;
}

// ==========================================================================
//  Libellés courts, partagés par plusieurs sections
// ==========================================================================
type Sections = {
  delai_moyen: string;
  a_partir_de: string;
  en_resume: string;
  toutes_destinations: string;
  voir_grille: string;
  voir_aussi: string;
  autres_destinations: string;
  lire_guide: string;
  lancer_demande: string;
  procedures_traitees: string;
  delai_obtention: string;
  tarifs: string;
  livraison: string;
  documents: string;
  langues_affichees: string;
  destinations_affichees: string;
  rechercher_langue: string;
  rechercher_pays: string;
  traducteur_jure_dispo: string;
  notre_service: string;
  decision_consulat_titre: string;
  decision_consulat: string;
};

export const SECTIONS: Trad<Sections> = {
  fr: {
    delai_moyen: "Délai moyen",
    a_partir_de: "À partir de",
    en_resume: "En résumé",
    toutes_destinations: "Toutes les destinations",
    voir_grille: "Voir la grille complète",
    voir_aussi: "Voir aussi",
    autres_destinations: "Autres destinations",
    lire_guide: "Lire le guide",
    lancer_demande: "Lancer ma demande",
    procedures_traitees: "Procédures traitées",
    delai_obtention: "Délai d’obtention",
    tarifs: "Tarifs",
    livraison: "Livraison",
    documents: "documents",
    langues_affichees: "langues affichées",
    destinations_affichees: "destinations affichées",
    rechercher_langue: "Rechercher une langue",
    rechercher_pays: "Rechercher un pays",
    traducteur_jure_dispo: "Traducteur juré disponible",
    notre_service: "Notre service",
    decision_consulat_titre: "La décision appartient au consulat.",
    decision_consulat:
      "Notre prestation porte sur la conformité et la complétude du dossier, la prise de rendez-vous, le dépôt et le suivi. Aucun intermédiaire ne peut garantir la délivrance d’un visa.",
  },
  nl: {
    delai_moyen: "Gemiddelde termijn",
    a_partir_de: "Vanaf",
    en_resume: "Samengevat",
    toutes_destinations: "Alle bestemmingen",
    voir_grille: "Volledige tarieventabel",
    voir_aussi: "Zie ook",
    autres_destinations: "Andere bestemmingen",
    lire_guide: "Lees de gids",
    lancer_demande: "Mijn aanvraag starten",
    procedures_traitees: "Behandelde procedures",
    delai_obtention: "Verkrijgingstermijn",
    tarifs: "Tarieven",
    livraison: "Levering",
    documents: "documenten",
    langues_affichees: "getoonde talen",
    destinations_affichees: "getoonde bestemmingen",
    rechercher_langue: "Een taal zoeken",
    rechercher_pays: "Een land zoeken",
    traducteur_jure_dispo: "Beëdigd vertaler beschikbaar",
    notre_service: "Onze dienst",
    decision_consulat_titre: "De beslissing ligt bij het consulaat.",
    decision_consulat:
      "Onze dienst betreft de conformiteit en volledigheid van het dossier, de afspraak, de indiening en de opvolging. Geen enkele tussenpersoon kan de afgifte van een visum garanderen.",
  },
  en: {
    delai_moyen: "Average time",
    a_partir_de: "From",
    en_resume: "At a glance",
    toutes_destinations: "All destinations",
    voir_grille: "See the full price list",
    voir_aussi: "See also",
    autres_destinations: "Other destinations",
    lire_guide: "Read the guide",
    lancer_demande: "Start my request",
    procedures_traitees: "Procedures handled",
    delai_obtention: "Processing time",
    tarifs: "Pricing",
    livraison: "Delivery",
    documents: "documents",
    langues_affichees: "languages shown",
    destinations_affichees: "destinations shown",
    rechercher_langue: "Search a language",
    rechercher_pays: "Search a country",
    traducteur_jure_dispo: "Sworn translator available",
    notre_service: "Our service",
    decision_consulat_titre: "The decision rests with the consulate.",
    decision_consulat:
      "Our service covers the conformity and completeness of the file, the appointment, submission and follow-up. No intermediary can guarantee the issuance of a visa.",
  },
};

export const sections = (lang: Locale) => resoudre(SECTIONS, lang);

// ==========================================================================
//  Page d'accueil
// ==========================================================================
type Accueil = {
  hero_surtitre: string;
  hero_titre: string;
  hero_titre_italique: string;
  hero_chapeau: string;
  hero_cta1: string;
  hero_cta2: string;
  stats: string[]; // 4 libellés
  metiers_surtitre: string;
  metiers_titre_1: string;
  metiers_titre_2: string;
  metiers_intro: string;
  metiers: { titre: [string, string]; texte: string; points: string[]; decouvrir: string }[];
  processus_surtitre: string;
  processus_titre: string;
  etapes: [string, string][];
  langues_titre: string;
  langues_chapeau: string;
  cta_titre: string;
  cta_chapeau: string;
};

export const ACCUEIL: Trad<Accueil> = {
  fr: {
    hero_surtitre: "Bureau de traduction jurée — Bruxelles, avenue Louise",
    hero_titre: "Vos documents officiels, traduits, légalisés et validés.",
    hero_titre_italique: "Sans un seul aller-retour inutile.",
    hero_chapeau:
      "Traductions assermentées, légalisations consulaires, apostilles et visas de voyage. Une expertise rigoureuse pour vos démarches internationales.",
    hero_cta1: "Obtenir mon devis instantané",
    hero_cta2: "Déposer un document",
    stats: ["Langues traitées", "Dépôt & retrait", "Traducteurs jurés", "Vues Google"],
    metiers_surtitre: "Notre expertise",
    metiers_titre_1: "Trois métiers,",
    metiers_titre_2: "une seule adresse.",
    metiers_intro:
      "Nous simplifions la complexité administrative. De la traduction assermentée à l’obtention de votre visa, nous gérons l’intégralité de la chaîne documentaire.",
    metiers: [
      {
        titre: ["Traductions", "Jurées"],
        texte:
          "Vos actes officiels traduits par des experts assermentés près les tribunaux belges, garantissant leur validité juridique.",
        points: ["Actes d'état civil", "Jugements & Notarié", "Diplômes"],
        decouvrir: "Découvrir",
      },
      {
        titre: ["Légalisations", "& Apostilles"],
        texte:
          "Nous nous chargeons des démarches auprès des Ministères (Justice, Affaires Étrangères) et des ambassades pour authentifier vos documents.",
        points: ["Ministère de la Justice", "Affaires Étrangères", "Consulats & Ambassades"],
        decouvrir: "Découvrir",
      },
      {
        titre: ["Visas de", "Voyage"],
        texte:
          "Un service d'assistance complet pour l'obtention de vos visas consulaires, touristiques ou d'affaires, partout dans le monde.",
        points: ["Analyse du dossier", "Dépôt consulaire", "Suivi & Retrait"],
        decouvrir: "Découvrir",
      },
    ],
    processus_surtitre: "Processus",
    processus_titre: "Comment ça se passe ?",
    etapes: [
      ["Scan & Envoi", "Envoyez-nous une copie numérique claire de vos documents via notre formulaire sécurisé ou par email."],
      ["Devis Flash", "Recevez une proposition détaillée (prix et délais) en moins de 2 heures ouvrables."],
      ["Traitement Expert", "Nos traducteurs assermentés ou nos agents consulaires prennent en charge votre dossier avec rigueur."],
      ["Retrait / Livraison", "Récupérez vos documents certifiés à notre bureau ou optez pour un envoi sécurisé."],
    ],
    langues_titre: "langues, de l’albanais au wolof",
    langues_chapeau:
      "Nous traduisons à partir et vers toute autre langue. Les langues signalées disposent d’un traducteur juré.",
    cta_titre: "Un prix et un délai, sans appel téléphonique.",
    cta_chapeau:
      "Envoyez le scan de vos documents : la proposition détaillée arrive en moins de 2 heures ouvrables.",
  },

  nl: {
    hero_surtitre: "Kantoor voor beëdigde vertalingen — Brussel, Louizalaan",
    hero_titre: "Uw officiële documenten: vertaald, gelegaliseerd en gevalideerd.",
    hero_titre_italique: "Zonder één overbodige heen-en-weer.",
    hero_chapeau:
      "Beëdigde vertalingen, consulaire legalisaties, apostilles en reisvisa. Nauwkeurige expertise voor uw internationale formaliteiten.",
    hero_cta1: "Mijn offerte meteen aanvragen",
    hero_cta2: "Een document indienen",
    stats: ["Behandelde talen", "Indienen & ophalen", "Beëdigde vertalers", "Google-weergaven"],
    metiers_surtitre: "Onze expertise",
    metiers_titre_1: "Drie vakgebieden,",
    metiers_titre_2: "één adres.",
    metiers_intro:
      "Wij vereenvoudigen de administratieve complexiteit. Van beëdigde vertaling tot het verkrijgen van uw visum beheren wij de volledige documentaire keten.",
    metiers: [
      {
        titre: ["Beëdigde", "vertalingen"],
        texte:
          "Uw officiële akten vertaald door beëdigde experts bij de Belgische rechtbanken, met gewaarborgde juridische geldigheid.",
        points: ["Akten van burgerlijke stand", "Vonnissen & notariële akten", "Diploma's"],
        decouvrir: "Ontdekken",
      },
      {
        titre: ["Legalisaties", "& apostilles"],
        texte:
          "Wij verzorgen de stappen bij de ministeries (Justitie, Buitenlandse Zaken) en de ambassades om uw documenten te authenticeren.",
        points: ["Ministerie van Justitie", "Buitenlandse Zaken", "Consulaten & ambassades"],
        decouvrir: "Ontdekken",
      },
      {
        titre: ["Reis-", "visa"],
        texte:
          "Volledige begeleiding bij het verkrijgen van uw consulaire, toeristische of zakelijke visa, waar ook ter wereld.",
        points: ["Analyse van het dossier", "Consulaire indiening", "Opvolging & ophaling"],
        decouvrir: "Ontdekken",
      },
    ],
    processus_surtitre: "Proces",
    processus_titre: "Hoe verloopt het?",
    etapes: [
      ["Scan & verzending", "Stuur ons een duidelijke digitale kopie van uw documenten via ons beveiligde formulier of per e-mail."],
      ["Snelle offerte", "Ontvang een gedetailleerd voorstel (prijs en termijnen) binnen 2 werkuren."],
      ["Deskundige behandeling", "Onze beëdigde vertalers of consulaire agenten behandelen uw dossier met zorg."],
      ["Ophaling / levering", "Haal uw gecertificeerde documenten op kantoor op of kies voor een beveiligde verzending."],
    ],
    langues_titre: "talen, van het Albanees tot het Wolof",
    langues_chapeau:
      "Wij vertalen van en naar elke andere taal. De aangeduide talen beschikken over een beëdigd vertaler.",
    cta_titre: "Een prijs en een termijn, zonder telefoongesprek.",
    cta_chapeau:
      "Stuur de scan van uw documenten: het gedetailleerde voorstel volgt binnen 2 werkuren.",
  },

  en: {
    hero_surtitre: "Sworn translation office — Brussels, Avenue Louise",
    hero_titre: "Your official documents: translated, legalised and validated.",
    hero_titre_italique: "Without a single needless back-and-forth.",
    hero_chapeau:
      "Sworn translations, consular legalisations, apostilles and travel visas. Rigorous expertise for your international formalities.",
    hero_cta1: "Get my instant quote",
    hero_cta2: "Submit a document",
    stats: ["Languages handled", "Drop-off & pickup", "Sworn translators", "Google views"],
    metiers_surtitre: "Our expertise",
    metiers_titre_1: "Three services,",
    metiers_titre_2: "one address.",
    metiers_intro:
      "We simplify administrative complexity. From sworn translation to obtaining your visa, we handle the entire documentary chain.",
    metiers: [
      {
        titre: ["Sworn", "translations"],
        texte:
          "Your official records translated by experts sworn before the Belgian courts, guaranteeing their legal validity.",
        points: ["Civil status records", "Judgments & notarial deeds", "Diplomas"],
        decouvrir: "Discover",
      },
      {
        titre: ["Legalisations", "& apostilles"],
        texte:
          "We handle the steps with the ministries (Justice, Foreign Affairs) and embassies to authenticate your documents.",
        points: ["Ministry of Justice", "Foreign Affairs", "Consulates & embassies"],
        decouvrir: "Discover",
      },
      {
        titre: ["Travel", "visas"],
        texte:
          "Full assistance in obtaining your consular, tourist or business visas, anywhere in the world.",
        points: ["File review", "Consular submission", "Follow-up & pickup"],
        decouvrir: "Discover",
      },
    ],
    processus_surtitre: "Process",
    processus_titre: "How does it work?",
    etapes: [
      ["Scan & send", "Send us a clear digital copy of your documents through our secure form or by email."],
      ["Fast quote", "Receive a detailed proposal (price and timing) within 2 business hours."],
      ["Expert handling", "Our sworn translators or consular agents handle your file with rigour."],
      ["Pickup / delivery", "Collect your certified documents at our office or opt for secure delivery."],
    ],
    langues_titre: "languages, from Albanian to Wolof",
    langues_chapeau:
      "We translate from and into any other language. The marked languages have a sworn translator available.",
    cta_titre: "A price and a timeframe, with no phone call.",
    cta_chapeau:
      "Send the scan of your documents: the detailed proposal arrives within 2 business hours.",
  },
};

export const accueil = (lang: Locale) => resoudre(ACCUEIL, lang);
