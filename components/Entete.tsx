"use client";

/**
 * En-tête, méga-menu et menu mobile.
 *
 * Reconstruit par rapport à la maquette Stitch, qui ne tenait pas la largeur.
 * Voir la note d'origine dans l'historique ; l'essentiel : jetons de charte
 * identiques, bascule desktop à 1280 px, méga-menu conforme à l'écran 12.
 *
 * Le sélecteur de langue pointe vers les vraies URL localisées (`/nl/…`,
 * `/en/…`). Le chemin courant est passé en prop pour rester sur la même page
 * en changeant de langue.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Icone } from "./ui";
import { entrees, mega, type CleEntree } from "@/lib/navigation";
import { LOCALES, lien, t, type Locale } from "@/lib/i18n";

export default function Entete({
  actif,
  lang = "fr",
  cheminFr = "/",
}: {
  actif?: CleEntree;
  lang?: Locale;
  cheminFr?: string;
}) {
  const [ouvert, setOuvert] = useState<CleEntree | null>(null);
  const [menuMobile, setMenuMobile] = useState(false);
  const [langues, setLangues] = useState(false);
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dico = t(lang);
  const ENTREES = entrees(lang);
  const MEGA = mega(lang);

  const programmer = useCallback((cle: CleEntree | null, delai: number) => {
    if (minuterie.current) clearTimeout(minuterie.current);
    minuterie.current = setTimeout(() => setOuvert(cle), delai);
  }, []);

  useEffect(() => {
    function surTouche(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOuvert(null);
      setLangues(false);
      setMenuMobile(false);
    }
    function surDefilement() {
      setOuvert(null);
    }
    document.addEventListener("keydown", surTouche);
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => {
      document.removeEventListener("keydown", surTouche);
      window.removeEventListener("scroll", surDefilement);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const surChangement = (e: MediaQueryListEvent) => e.matches && setMenuMobile(false);
    mq.addEventListener("change", surChangement);
    return () => mq.removeEventListener("change", surChangement);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuMobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMobile]);

  return (
    <>
      <header
        className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-tertiary-fixed-dim/30 transition-all duration-300"
        onMouseLeave={() => programmer(null, 170)}
      >
        <div className="h-20 max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop flex items-center gap-6 2xl:gap-10">
          <a className="flex items-center shrink-0" href={lien(lang, "/")} aria-label="Travisum">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-10 w-auto"
              src="/assets/img/logo-travisum.svg"
              alt="Travisum — Traductions, légalisations et visas"
              width={672}
              height={152}
            />
          </a>

          <nav className="hidden xl:block ml-auto" aria-label="Navigation">
            <ul className="flex items-stretch gap-6 2xl:gap-8">
              {ENTREES.map(({ libelle, cle, href, mega: aMega }) => {
                const courant = cle === actif;
                return (
                  <li
                    key={cle}
                    className="group"
                    data-mega={aMega ? "" : undefined}
                    data-ouvert={aMega && ouvert === cle ? "" : undefined}
                    onMouseEnter={() => aMega && programmer(cle, 110)}
                    onFocus={() => aMega && programmer(cle, 0)}
                    onBlur={(e) => {
                      if (aMega && !e.currentTarget.contains(e.relatedTarget as Node))
                        programmer(null, 0);
                    }}
                  >
                    <a
                      className={`relative inline-flex items-center gap-1 h-20 font-label-sm text-label-sm uppercase tracking-[0.1em] whitespace-nowrap transition-colors group ${
                        courant
                          ? "text-primary font-bold"
                          : "text-on-surface-variant hover:text-primary"
                      }`}
                      href={href}
                      aria-current={courant ? "page" : undefined}
                      aria-haspopup={aMega ? true : undefined}
                      aria-expanded={aMega ? ouvert === cle : undefined}
                    >
                      {libelle}
                      {aMega && (
                        <span
                          className={`material-symbols-outlined text-[18px] -mr-1 transition-transform duration-200 ${
                            ouvert === cle ? "rotate-180 text-primary" : "text-on-surface-variant/70"
                          }`}
                          aria-hidden="true"
                        >
                          expand_more
                        </span>
                      )}
                      <span
                        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-primary origin-left transition-transform duration-300 ${
                          courant ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                    {aMega && MEGA[cle] && <PanneauMega bloc={MEGA[cle]!} />}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <a
              className="hidden 2xl:inline font-label-sm text-label-sm text-primary uppercase tracking-[0.1em] whitespace-nowrap hover:text-on-tertiary-fixed-variant transition-colors"
              href="tel:+3226420025"
            >
              02 642 00 25
            </a>

            <SelecteurLangues
              lang={lang}
              cheminFr={cheminFr}
              ouvert={langues}
              basculer={() => setLangues((v) => !v)}
            />

            <a
              className="bg-primary text-on-primary px-5 py-3 font-label-sm text-label-sm uppercase tracking-[0.1em] whitespace-nowrap hover:bg-primary-container transition-all rounded-sm"
              href={lien(lang, "/tarifs/")}
            >
              {dico.cta_devis}
            </a>
          </div>

          <div className="xl:hidden ml-auto flex items-center gap-4">
            <a
              className="hidden sm:inline font-label-sm text-label-sm text-primary uppercase tracking-[0.1em] whitespace-nowrap"
              href="tel:+3226420025"
            >
              02 642 00 25
            </a>
            <button
              className="xl:hidden flex flex-col justify-center gap-[5px] w-10 h-10 shrink-0 -mr-2"
              onClick={() => setMenuMobile((v) => !v)}
              aria-expanded={menuMobile}
              aria-controls="menu-mobile"
              aria-label={dico.bascule_langue}
            >
              <span
                className={`block w-6 h-px transition-all duration-300 ${
                  menuMobile ? "bg-on-primary translate-y-[6px] rotate-45" : "bg-primary"
                }`}
              />
              <span
                className={`block w-6 h-px transition-all duration-300 ${
                  menuMobile ? "opacity-0" : "bg-primary"
                }`}
              />
              <span
                className={`block w-6 h-px transition-all duration-300 ${
                  menuMobile ? "bg-on-primary -translate-y-[6px] -rotate-45" : "bg-primary"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <MenuMobile
        ouvert={menuMobile}
        actif={actif}
        lang={lang}
        cheminFr={cheminFr}
        fermer={() => setMenuMobile(false)}
      />
    </>
  );
}

// --------------------------------------------------------------------------
type BlocMega = NonNullable<ReturnType<typeof mega>[CleEntree]>;

function PanneauMega({ bloc }: { bloc: BlocMega }) {
  return (
    <div className="mega absolute left-0 right-0 top-full bg-surface border-t border-tertiary-fixed-dim/30 shadow-xl">
      <div className="max-w-max-width mx-auto px-margin-desktop py-10 grid grid-cols-12 gap-gutter">
        {bloc.colonnes.map((colonne) => (
          <div key={colonne.titre} className="col-span-12 md:col-span-3">
            <p className="font-label-sm text-label-sm uppercase text-on-tertiary-fixed-variant pb-3 mb-3 border-b border-tertiary-fixed-dim/40">
              {colonne.titre}
            </p>
            <ul className="flex flex-col">
              {colonne.liens.map(([libelle, href]) => (
                <li key={libelle}>
                  <a
                    className="block py-1.5 font-body-md text-body-md text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-200"
                    href={href}
                  >
                    {libelle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-12 md:col-span-3">
          <div className="h-full bg-primary text-on-primary p-6 flex flex-col gap-4 rounded-sm">
            <p className="font-label-sm text-label-sm uppercase text-tertiary-fixed-dim">
              {bloc.carte.surtitre}
            </p>
            <p className="font-display-lg text-[20px] leading-snug">{bloc.carte.titre}</p>
            <a
              className="mt-auto inline-flex items-center justify-center gap-2 bg-tertiary-fixed-dim text-on-tertiary-fixed px-5 py-3 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
              href={bloc.carte.href}
            >
              {bloc.carte.action}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
function SelecteurLangues({
  lang,
  cheminFr,
  ouvert,
  basculer,
}: {
  lang: Locale;
  cheminFr: string;
  ouvert: boolean;
  basculer: () => void;
}) {
  return (
    <div className="relative shrink-0">
      <button
        className="flex items-center gap-1 font-label-sm text-label-sm uppercase tracking-[0.1em] text-primary hover:text-on-tertiary-fixed-variant transition-colors"
        onClick={basculer}
        aria-expanded={ouvert}
        aria-haspopup="true"
        aria-label={t(lang).bascule_langue}
      >
        {lang.toUpperCase()}
        <span
          className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
            ouvert ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>
      {ouvert && (
        <ul className="absolute right-0 top-full mt-3 min-w-[124px] bg-surface border border-tertiary-fixed-dim/40 shadow-xl rounded-sm py-1">
          {LOCALES.map((l) => (
            <li key={l}>
              <a
                className={`block px-4 py-2 font-label-sm text-label-sm uppercase transition-colors ${
                  l === lang
                    ? "text-primary font-bold bg-surface-container-low"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                }`}
                href={lien(l, cheminFr)}
                aria-current={l === lang ? "true" : undefined}
                hrefLang={l}
              >
                {t(l).nom_langue}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
function MenuMobile({
  ouvert,
  actif,
  lang,
  cheminFr,
  fermer,
}: {
  ouvert: boolean;
  actif?: CleEntree;
  lang: Locale;
  cheminFr: string;
  fermer: () => void;
}) {
  const [deplie, setDeplie] = useState<CleEntree | null>(null);
  const dico = t(lang);
  const ENTREES = entrees(lang);
  const MEGA = mega(lang);

  return (
    <div
      className="menu-mobile xl:hidden fixed inset-0 z-40 bg-primary text-on-primary overflow-y-auto pt-24 px-margin-mobile pb-16"
      id="menu-mobile"
      data-ouvert={ouvert ? "" : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-9 w-auto mb-10"
        src="/assets/img/logo-travisum-clair.svg"
        alt="Travisum"
        width={672}
        height={152}
      />

      <nav aria-label="Navigation (mobile)">
        <ul className="flex flex-col">
          {ENTREES.map(({ libelle, cle, href, mega: aMega }, i) => (
            <li key={cle} className="border-b border-tertiary-fixed-dim/20">
              <div className="flex items-center gap-2">
                <a
                  className={`flex items-baseline gap-5 py-4 font-display-lg text-[26px] leading-tight grow hover:text-tertiary-fixed-dim transition-colors ${
                    cle === actif ? "text-tertiary-fixed-dim" : "text-on-primary"
                  }`}
                  href={href}
                  aria-current={cle === actif ? "page" : undefined}
                  onClick={fermer}
                >
                  <span className="font-label-sm text-label-sm text-tertiary-fixed-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {libelle}
                </a>
                {aMega && (
                  <button
                    className="shrink-0 w-11 h-11 flex items-center justify-center text-tertiary-fixed-dim"
                    onClick={() => setDeplie((v) => (v === cle ? null : cle))}
                    aria-expanded={deplie === cle}
                    aria-label={libelle}
                  >
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 ${
                        deplie === cle ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </button>
                )}
              </div>

              {aMega && deplie === cle && MEGA[cle] && (
                <div className="pb-5 pl-9">
                  {MEGA[cle]!.colonnes.map((colonne) => (
                    <div key={colonne.titre}>
                      <p className="font-label-sm text-label-sm uppercase text-tertiary-fixed-dim mt-5 mb-2 first:mt-0">
                        {colonne.titre}
                      </p>
                      <ul className="flex flex-col">
                        {colonne.liens.map(([lib, h]) => (
                          <li key={lib}>
                            <a
                              className="block py-1.5 font-body-md text-body-md text-primary-fixed-dim hover:text-on-primary transition-colors"
                              href={h}
                              onClick={fermer}
                            >
                              {lib}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 flex flex-col gap-3 font-body-md text-body-md text-primary-fixed-dim">
        <p className="font-label-sm text-label-sm uppercase text-tertiary-fixed-dim">
          {dico.pied.bureau}
        </p>
        <p>
          367, avenue Louise
          <br />
          1050 Bruxelles
        </p>
        <p>
          <a className="hover:text-on-primary transition-colors" href="tel:+3226420025">
            02 642 00 25
          </a>
          <br />
          <a className="hover:text-on-primary transition-colors" href="tel:+32485948935">
            0485 948 935
          </a>
        </p>

        <div className="flex items-center gap-3 mt-2">
          {LOCALES.map((l) => (
            <a
              key={l}
              className={`font-label-sm text-label-sm uppercase tracking-[0.1em] ${
                l === lang ? "text-tertiary-fixed-dim font-bold" : "hover:text-on-primary"
              }`}
              href={lien(l, cheminFr)}
              hrefLang={l}
            >
              {l.toUpperCase()}
            </a>
          ))}
        </div>

        <a
          className="mt-4 bg-tertiary-fixed-dim text-on-tertiary-fixed px-6 py-4 text-center font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
          href={lien(lang, "/tarifs/")}
          onClick={fermer}
        >
          {dico.cta_devis}
        </a>
      </div>
    </div>
  );
}
