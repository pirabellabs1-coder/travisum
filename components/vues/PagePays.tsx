import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import PageV3 from "@/components/PageV3";
import {
  CONTACT,
  PAYS,
  articleDe,
  fichePays,
  voisinsDe,
  type SousPage,
  type Synthese,
} from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";
import { tp } from "@/lib/tpages";
import { trData, trList } from "@/lib/translate-data";
import VoletsPays, { type Volet } from "@/components/vues/VoletsPays";

/**
 * Fiche pays — gabarit le plus important pour le référencement. Style « v3 ».
 * Les URL (`/visas/inde/`) et les contenus (synthèse à jour, pièces à fournir)
 * sont préservés.
 */

const VOLETS: { cle: SousPage["type"]; libelle: string }[] = [
  { cle: "visa-tourisme", libelle: "Visa tourisme" },
  { cle: "visa-business", libelle: "Visa affaires" },
  { cle: "e-visa", libelle: "e-Visa" },
  { cle: "informations-generales", libelle: "Informations générales" },
  { cle: "autre", libelle: "Autre procédure" },
];


function SyntheseCarte({ s, lang, d }: { s: Synthese; lang: Locale; d: Record<string, string> }) {
  const date = new Date(s.verifie_le).toLocaleDateString(d.locale || "fr-BE", { day: "2-digit", month: "long", year: "numeric" });
  const faits: [string, ReactNode][] = [];
  if (s.portail)
    faits.push([
      d.syn_portail,
      <a key="p" href={s.portail.url} target="_blank" rel="noopener noreferrer">
        {trData(lang, s.portail.libelle)}
      </a>,
    ]);
  if (s.frais) faits.push([d.syn_frais, trData(lang, s.frais)]);
  if (s.delai) faits.push([d.syn_delai, trData(lang, s.delai)]);
  if (s.validite) faits.push([d.syn_validite, trData(lang, s.validite)]);

  return (
    <div className="synth">
      <div className="top">
        <span className="lab">✓ {d.syn_lab}</span>
        <span className="date">{d.syn_verif} {date}</span>
      </div>
      <p className="statut">{trData(lang, s.statut)}</p>
      <div className="facts">
        {faits.map(([k, v]) => (
          <div key={k}>
            <p className="fk">{k}</p>
            <p className="fv">{v}</p>
          </div>
        ))}
      </div>
      {s.reforme && (
        <p className="reforme">
          <strong>{d.syn_reforme} </strong>
          {trData(lang, s.reforme)}
        </p>
      )}
      <p className="disc">
        {d.syn_disc}
        {s.source && (
          <>
            {" "}
            <a href={s.source} target="_blank" rel="noopener noreferrer">
              {d.syn_source}
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}

export function PagePaysVue({
  slug,
  lang = "fr",
  cheminFr,
}: {
  slug: string;
  lang?: Locale;
  cheminFr: string;
}) {
  const fiche = fichePays(slug);
  if (!fiche) notFound();
  const L = (c: string) => lien(lang, c);
  const pre = lang === "fr" ? "" : "/" + lang;
  const d = tp(lang);
  const dest = lang === "fr" ? articleDe(fiche.nom) : fiche.nom;
  const volLib: Record<string, string> = {
    "visa-tourisme": d.vol_tourisme,
    "visa-business": d.vol_business,
    "e-visa": d.vol_evisa,
    "informations-generales": d.vol_infos,
    "autre": d.vol_autre,
  };
  const voisins = voisinsDe(fiche.slug);
  const volets = VOLETS.flatMap((v) =>
    fiche.sous_pages.filter((s) => s.type === v.cle && s.documents.length > 0).map((sp) => ({ ...v, sp }))
  );
  // Données traduites pour les onglets (rendu côté client, tous panneaux dans le HTML).
  const voletsData: Volet[] = volets.map(({ cle, sp }) => ({
    type: cle,
    label: volLib[cle] ?? cle,
    docs: sp.documents.map((doc) => ({ nom: trData(lang, doc.nom), details: trList(lang, doc.details) })),
  }));
  const videTxt =
    lang === "nl" ? "Nadere details bij de offerte." : lang === "en" ? "Details provided with the quote." : "Précisions communiquées au devis.";

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      {/* HERO */}
      <section className="dark hero-lite">
        <div className="wrap">
          <nav className="bread" aria-label={d.fil_aria}>
            <a href={L("/")}>{d.fil_accueil}</a>
            <span>/</span>
            <a href={L("/visas/")}>{d.fil_visas}</a>
            <span>/</span>
            <span className="cur">{fiche.nom}</span>
          </nav>
          <div className="eb">{d.pp_dest}</div>
          <h1>
            {d.pp_h1} <span className="g">{dest}.</span>
          </h1>
          <p className="sub">{d.pp_sub}</p>
          <div className="cta">
            <a className="btn btn-p" href={L("/contact/")}>
              {d.cta_devis} <span className="ar">→</span>
            </a>
            <a className="btn btn-out" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Visa — ${fiche.nom}`)}`}>
              {d.pp_lancer}
            </a>
          </div>
        </div>
      </section>

      {/* SYNTHÈSE */}
      {fiche.synthese && (
        <section>
          <div className="wrap">
            <SyntheseCarte s={fiche.synthese} lang={lang} d={d} />
          </div>
        </section>
      )}

      {/* PIÈCES */}
      {volets.length > 0 ? (
        <section className={fiche.synthese ? "tint" : ""}>
          <div className="wrap">
            <div className="eb">{d.pp_pieces_eb}</div>
            <h2 className="sec-h">{d.pp_pieces_h}</h2>
            <VoletsPays volets={voletsData} vide={videTxt} />
          </div>
        </section>
      ) : (
        !fiche.synthese && (
          <section>
            <div className="wrap">
              <div className="eb">{d.pp_prep_eb}</div>
              <h2 className="sec-h">{d.pp_prep_h}</h2>
              <p className="sec-p">{d.pp_prep_p}</p>
              <a className="btn btn-out-d" href={`mailto:${CONTACT.email}`}>
                {d.cta_ecrire} <span className="ar">→</span>
              </a>
            </div>
          </section>
        )
      )}

      {/* VOISINS */}
      <section className="tint">
        <div className="wide">
          <div className="eb">{d.pp_autres_eb}</div>
          <h2 className="sec-h">{d.pp_autres_h}</h2>
          <div className="dest">
            {voisins.map((v) => (
              <a key={v.slug} className="dcard" href={`${pre}/visas/${v.slug}/`}>
                <b>{v.nom}</b>
                <span>{d.pp_fiche}</span>
              </a>
            ))}
          </div>
          <p style={{ marginTop: 26 }}>
            <a className="more-l" href={L("/visas/#toutes")}>
              {d.pp_toutes.replace("{n}", String(PAYS.length))}
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="dark final">
        <div className="wrap">
          <div className="rule" />
          <h2>{d.pp_cta_h.replace("{a}", dest)}</h2>
          <p>{d.pp_cta_p}</p>
          <div className="cta">
            <a className="btn btn-p" href={L("/contact/")}>
              {d.cta_devis} <span className="ar">→</span>
            </a>
            <a className="btn btn-out" href={`mailto:${CONTACT.email}`}>
              {d.cta_ecrire}
            </a>
          </div>
        </div>
      </section>
    </PageV3>
  );
}
