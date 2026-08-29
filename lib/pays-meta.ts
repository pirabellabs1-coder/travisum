/**
 * Méta par pays pour la page Visas : code ISO-3166 alpha-2 (drapeau) et
 * continent (filtre). Le nom et le slug proviennent de lib/donnees (PAYS).
 */

import { PAYS } from "./donnees";

export type Continent = "Afrique" | "Asie" | "Europe" | "Amériques" | "Océanie";

const META: Record<string, { iso2: string; continent: Continent }> = {
  "algerie": { iso2: "DZ", continent: "Afrique" },
  "angola": { iso2: "AO", continent: "Afrique" },
  "arabie-saoudite": { iso2: "SA", continent: "Asie" },
  "bangladesh": { iso2: "BD", continent: "Asie" },
  "birmanie-myanmar": { iso2: "MM", continent: "Asie" },
  "bielorussie": { iso2: "BY", continent: "Europe" },
  "burkina-faso": { iso2: "BF", continent: "Afrique" },
  "burundi": { iso2: "BI", continent: "Afrique" },
  "benin": { iso2: "BJ", continent: "Afrique" },
  "cambodge-2": { iso2: "KH", continent: "Asie" },
  "cameroun": { iso2: "CM", continent: "Afrique" },
  "chine": { iso2: "CN", continent: "Asie" },
  "congo-brazzaville": { iso2: "CG", continent: "Afrique" },
  "republique-democratique-du-congo": { iso2: "CD", continent: "Afrique" },
  "coree-du-sud": { iso2: "KR", continent: "Asie" },
  "cuba": { iso2: "CU", continent: "Amériques" },
  "djibouti": { iso2: "DJ", continent: "Afrique" },
  "egypte": { iso2: "EG", continent: "Afrique" },
  "gabon": { iso2: "GA", continent: "Afrique" },
  "ghana": { iso2: "GH", continent: "Afrique" },
  "guinee-republique": { iso2: "GN", continent: "Afrique" },
  "guinee-equatoriale": { iso2: "GQ", continent: "Afrique" },
  "guinee-bissau": { iso2: "GW", continent: "Afrique" },
  "inde": { iso2: "IN", continent: "Asie" },
  "indonesie": { iso2: "ID", continent: "Asie" },
  "iran": { iso2: "IR", continent: "Asie" },
  "jordanie": { iso2: "JO", continent: "Asie" },
  "kazakhstan": { iso2: "KZ", continent: "Asie" },
  "kenya": { iso2: "KE", continent: "Afrique" },
  "laos": { iso2: "LA", continent: "Asie" },
  "liban": { iso2: "LB", continent: "Asie" },
  "liberia": { iso2: "LR", continent: "Afrique" },
  "madagascar": { iso2: "MG", continent: "Afrique" },
  "malawi": { iso2: "MW", continent: "Afrique" },
  "mali": { iso2: "ML", continent: "Afrique" },
  "mauritanie": { iso2: "MR", continent: "Afrique" },
  "mongolie-2": { iso2: "MN", continent: "Asie" },
  "mozambique": { iso2: "MZ", continent: "Afrique" },
  "namibie": { iso2: "NA", continent: "Afrique" },
  "niger": { iso2: "NE", continent: "Afrique" },
  "nigeria": { iso2: "NG", continent: "Afrique" },
  "nepal": { iso2: "NP", continent: "Asie" },
  "oman": { iso2: "OM", continent: "Asie" },
  "ouganda": { iso2: "UG", continent: "Afrique" },
  "ouzbekistan": { iso2: "UZ", continent: "Asie" },
  "pakistan": { iso2: "PK", continent: "Asie" },
  "papouasie-nouvelle-guinee": { iso2: "PG", continent: "Océanie" },
  "qatar": { iso2: "QA", continent: "Asie" },
  "russie": { iso2: "RU", continent: "Europe" },
  "rwanda": { iso2: "RW", continent: "Afrique" },
  "republique-centrafricaine": { iso2: "CF", continent: "Afrique" },
  "sao-tome-et-principe": { iso2: "ST", continent: "Afrique" },
  "sierra-leone": { iso2: "SL", continent: "Afrique" },
  "soudan": { iso2: "SD", continent: "Afrique" },
  "sud-soudan": { iso2: "SS", continent: "Afrique" },
  "suriname": { iso2: "SR", continent: "Amériques" },
  "tadjikistan": { iso2: "TJ", continent: "Asie" },
  "tanzanie": { iso2: "TZ", continent: "Afrique" },
  "tchad": { iso2: "TD", continent: "Afrique" },
  "thailande": { iso2: "TH", continent: "Asie" },
  "togo": { iso2: "TG", continent: "Afrique" },
  "turkmenistan": { iso2: "TM", continent: "Asie" },
  "vietnam": { iso2: "VN", continent: "Asie" },
  "yemen": { iso2: "YE", continent: "Asie" },
  "zambie": { iso2: "ZM", continent: "Afrique" },
  "zimbabwe": { iso2: "ZW", continent: "Afrique" },
  "emirats-arabes-unis": { iso2: "AE", continent: "Asie" },
  "erythree": { iso2: "ER", continent: "Afrique" },
  "ethiopie": { iso2: "ET", continent: "Afrique" },
};

/** Emoji drapeau à partir d'un code ISO alpha-2 (regional indicators). */
export function drapeau(iso2: string): string {
  if (!iso2 || iso2.length !== 2) return "";
  return String.fromCodePoint(
    ...[...iso2.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
  );
}

/** Lettre d'index (sans accent) pour le classement alphabétique. */
export function initiale(nom: string): string {
  return (nom.normalize("NFD").replace(/[̀-ͯ]/g, "")[0] || "").toUpperCase();
}

export type PaysVisa = {
  slug: string; nom: string; iso2: string; drapeau: string; continent: Continent; lettre: string;
};

/** Liste enrichie des destinations, triée par nom (fr). */
export function listePaysVisa(): PaysVisa[] {
  return PAYS.map((p) => {
    const m = META[p.slug] ?? { iso2: "", continent: "Afrique" as Continent };
    return {
      slug: p.slug, nom: p.nom, iso2: m.iso2, drapeau: drapeau(m.iso2),
      continent: m.continent, lettre: initiale(p.nom),
    };
  }).sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
}
