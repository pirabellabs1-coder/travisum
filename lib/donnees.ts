/**
 * Couche de données typée.
 *
 * Les JSON de `lib/donnees/` sont produits par `tools/exporter_json.py` à
 * partir du relevé du site actuel (`reference/`). Ils ne doivent pas être
 * édités à la main : la source de vérité reste le contenu du bureau.
 */

import contactJson from "./donnees/contact.json";
import languesJson from "./donnees/langues.json";
import destinationsJson from "./donnees/destinations.json";
import instancesJson from "./donnees/instances.json";
import documentsJson from "./donnees/documents.json";
import procedureJson from "./donnees/procedure-visa.json";
import tarifsJson from "./donnees/tarifs.json";
import faqJson from "./donnees/faq.json";
import paysJson from "./donnees/pays.json";

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------
export type Contact = {
  raison: string;
  rue: string;
  code_postal: string;
  ville: string;
  pays: string;
  telephone: string;
  telephone_tel: string;
  mobile: string;
  mobile_tel: string;
  email: string;
  horaires: string;
  horaires_court: string;
  preuve: string;
};

export type DestinationPhare = {
  nom: string;
  court: string;
  lien?: string;
  drapeau: string;
  type: string;
  delai: string;
  prix: string;
  image: string;
  alt: string;
};

export type BlocTarifaire = {
  colonnes: string[];
  lignes: string[][];
  note?: string;
};

export type Question = [string, string];

export type DocumentRequis = {
  nom: string;
  details: string[];
};

export type SousPage = {
  type: "visa-tourisme" | "visa-business" | "e-visa" | "informations-generales" | "autre";
  titre: string;
  url: string;
  statut_http: number;
  intro: string[];
  documents: DocumentRequis[];
  texte_libre: string[];
};

/**
 * Synthèse visa vérifiée — bloc « à jour » en tête de fiche. Renseignée à partir
 * de sources officielles (portails e-visa, ambassades) avec date de vérification.
 * Reste indicative : la décision appartient toujours au consulat.
 */
export type Synthese = {
  statut: string; // ex. « Sans visa jusqu'à 30 jours », « e-Visa requis », « ESTA (dispense de visa) »
  portail?: { libelle: string; url: string };
  frais?: string;
  delai?: string;
  validite?: string;
  reforme?: string;
  verifie_le: string; // AAAA-MM-JJ
  source?: string;
};

export type FichePays = {
  slug: string;
  nom: string;
  url: string;
  sous_pages: SousPage[];
  synthese?: Synthese;
};

// --------------------------------------------------------------------------
// Données
// --------------------------------------------------------------------------
export const CONTACT = contactJson as Contact;

export const LANGUES: string[] = languesJson.toutes;
export const LANGUES_PHARES: string[] = languesJson.phares;

export const DESTINATIONS: string[] = destinationsJson.toutes;
export const DESTINATIONS_PHARES = destinationsJson.phares as DestinationPhare[];
export const SLUGS = destinationsJson.slugs as Record<string, string>;
export const ARTICLES = destinationsJson.articles as Record<string, string>;

export const INSTANCES: string[] = instancesJson;

export const DOCUMENTS_TRADUCTION: string[] = documentsJson.traduction;
export const DOCUMENTS_LEGALISATION: string[] = documentsJson.legalisation;

export const PROCEDURE_VISA: string[] = procedureJson;

export const TARIFS = tarifsJson as {
  traduction: BlocTarifaire;
  legalisation: BlocTarifaire;
  visa: BlocTarifaire;
};

export const FAQ = faqJson as {
  traduction: Question[];
  legalisation: Question[];
  visa: Question[];
  generale: Question[];
};

export const PAYS = paysJson as FichePays[];

// --------------------------------------------------------------------------
// Utilitaires
// --------------------------------------------------------------------------

/** Retire les diacritiques : « neerlandais » doit trouver « Néerlandais ». */
export function aplatir(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/** « pour l'Inde », « pour le Bangladesh », « pour Cuba ». */
export function articleDe(nom: string): string {
  return ARTICLES[nom] ?? `pour ${nom}`;
}

export function fichePays(slug: string): FichePays | undefined {
  return PAYS.find((p) => p.slug === slug);
}

/** Quatre voisins dans l'ordre alphabétique, pour le maillage interne. */
export function voisinsDe(slug: string): FichePays[] {
  const i = PAYS.findIndex((p) => p.slug === slug);
  if (i < 0) return [];
  return [1, 2, 3, 4].map((k) => PAYS[(i + k) % PAYS.length]);
}

export const URL_SITE = "https://www.travisum.com";
