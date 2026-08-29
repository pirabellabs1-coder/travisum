"use client";

/**
 * Îlots interactifs de la page Visas (rendus côté serveur pour le SEO, puis
 * hydratés) : le moteur de recherche de destination du hero et la grille
 * « Toutes les destinations » avec recherche instantanée, filtre alphabétique
 * et filtre par continent. Aucune dépendance externe.
 */

import { useMemo, useRef, useState, type FormEvent } from "react";
import type { PaysVisa } from "@/lib/pays-meta";

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function Loupe() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function Fleche() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function Pastille({ p }: { p: PaysVisa }) {
  // Vrai drapeau (SVG) — fiable sur tous les systèmes, contrairement aux emojis.
  if (p.iso2) {
    return (
      <img
        className="vz-flag-img"
        src={`https://flagcdn.com/${p.iso2.toLowerCase()}.svg`}
        alt=""
        loading="lazy"
        width={26}
        height={19}
      />
    );
  }
  return <span className="vz-flag" aria-hidden="true">{p.lettre}</span>;
}

/* ---------------------------------------------------------------- Recherche */
type RLabels = {
  dest: string; destPh: string; nat: string; natPh: string; motif: string;
  motifs: string[]; date: string; submit: string; notFound: string;
  contact: string; contactHref: string;
};

export function RechercheDestination({
  pays,
  pre,
  t,
}: {
  pays: PaysVisa[];
  pre: string;
  t: RLabels;
}) {
  const [q, setQ] = useState("");
  const [slug, setSlug] = useState("");
  const [ouvert, setOuvert] = useState(false);
  const [err, setErr] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    const n = norm(q);
    if (!n) return [];
    return pays.filter((p) => norm(p.nom).includes(n)).slice(0, 7);
  }, [q, pays]);

  function choisir(p: PaysVisa) {
    setQ(p.nom);
    setSlug(p.slug);
    setOuvert(false);
    setErr(false);
  }

  function trouver(): string | null {
    if (slug && norm(q) === norm(pays.find((p) => p.slug === slug)?.nom || "")) return slug;
    const n = norm(q);
    if (!n) return null;
    const exact = pays.find((p) => norm(p.nom) === n);
    if (exact) return exact.slug;
    const debut = pays.filter((p) => norm(p.nom).startsWith(n));
    if (debut.length === 1) return debut[0].slug;
    const inclus = pays.filter((p) => norm(p.nom).includes(n));
    if (inclus.length === 1) return inclus[0].slug;
    return null;
  }

  function soumettre(e: FormEvent) {
    e.preventDefault();
    const s = trouver();
    if (s) {
      window.location.href = `${pre}/visas/${s}/`;
    } else {
      setErr(true);
    }
  }

  return (
    <form className="vz-search-form" onSubmit={soumettre} noValidate>
      <div className="vz-fields">
        <div className="vz-field vz-field-dest" ref={boxRef}>
          <label htmlFor="vz-dest">{t.dest}</label>
          <div className="vz-input-ico">
            <Loupe />
            <input
              id="vz-dest"
              type="text"
              autoComplete="off"
              role="combobox"
              aria-expanded={ouvert && suggestions.length > 0}
              aria-controls="vz-suggest"
              placeholder={t.destPh}
              value={q}
              onChange={(e) => { setQ(e.target.value); setSlug(""); setOuvert(true); setErr(false); }}
              onFocus={() => setOuvert(true)}
              onBlur={() => setTimeout(() => setOuvert(false), 150)}
            />
          </div>
          {ouvert && suggestions.length > 0 && (
            <ul className="vz-suggest" id="vz-suggest" role="listbox">
              {suggestions.map((p) => (
                <li key={p.slug} role="option" aria-selected={p.slug === slug}>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => choisir(p)}>
                    <Pastille p={p} />
                    <span>{p.nom}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="vz-field">
          <label htmlFor="vz-nat">{t.nat}</label>
          <input id="vz-nat" type="text" autoComplete="off" placeholder={t.natPh} />
        </div>

        <div className="vz-field">
          <label htmlFor="vz-motif">{t.motif}</label>
          <select id="vz-motif" defaultValue={t.motifs[0]}>
            {t.motifs.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="vz-field">
          <label htmlFor="vz-date">{t.date}</label>
          <input id="vz-date" type="date" />
        </div>

        <button type="submit" className="vz-btn vz-btn-primary vz-search-go">
          {t.submit} <Fleche />
        </button>
      </div>

      {err && (
        <p className="vz-search-err" role="alert">
          {t.notFound}{" "}
          <a href={t.contactHref}>{t.contact}</a>
        </p>
      )}
    </form>
  );
}

/* ------------------------------------------------------------------- Grille */
type GLabels = { searchPh: string; tous: string; empty: string; fiche: string };

export function GrilleDestinations({
  pays,
  pre,
  t,
}: {
  pays: PaysVisa[];
  pre: string;
  t: GLabels;
}) {
  const [q, setQ] = useState("");
  const [lettre, setLettre] = useState("");
  const [cont, setCont] = useState("");

  const lettresDispo = useMemo(() => new Set(pays.map((p) => p.lettre)), [pays]);
  const continents = useMemo(() => {
    const ordre = ["Afrique", "Asie", "Europe", "Amériques", "Océanie"];
    const set = new Set(pays.map((p) => p.continent));
    return ordre.filter((c) => set.has(c as PaysVisa["continent"]));
  }, [pays]);

  const filtres = useMemo(() => {
    const n = norm(q);
    return pays.filter(
      (p) =>
        (!n || norm(p.nom).includes(n)) &&
        (!lettre || p.lettre === lettre) &&
        (!cont || p.continent === cont),
    );
  }, [pays, q, lettre, cont]);

  return (
    <div className="vz-dest">
      <div className="vz-tools">
        <div className="vz-input-ico vz-tools-search">
          <Loupe />
          <input
            type="text"
            autoComplete="off"
            placeholder={t.searchPh}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label={t.searchPh}
          />
        </div>
        <div className="vz-chips" role="group" aria-label="Continents">
          <button type="button" className={cont === "" ? "on" : ""} onClick={() => setCont("")}>{t.tous}</button>
          {continents.map((c) => (
            <button key={c} type="button" className={cont === c ? "on" : ""} onClick={() => setCont((v) => (v === c ? "" : c))}>{c}</button>
          ))}
        </div>
      </div>

      <div className="vz-alpha" role="group" aria-label="A-Z">
        <button type="button" className={lettre === "" ? "on" : ""} onClick={() => setLettre("")}>Tout</button>
        {ALPHA.map((l) => {
          const actif = lettresDispo.has(l);
          return (
            <button
              key={l}
              type="button"
              disabled={!actif}
              className={lettre === l ? "on" : ""}
              onClick={() => setLettre((v) => (v === l ? "" : l))}
            >
              {l}
            </button>
          );
        })}
      </div>

      {filtres.length > 0 ? (
        <ul className="vz-grid">
          {filtres.map((p) => (
            <li key={p.slug}>
              <a href={`${pre}/visas/${p.slug}/`} aria-label={`${p.nom} — ${t.fiche}`}>
                <Pastille p={p} />
                <span className="vz-dname">{p.nom}</span>
                <span className="vz-darr"><Fleche /></span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="vz-empty" role="status">{t.empty}</p>
      )}
    </div>
  );
}
