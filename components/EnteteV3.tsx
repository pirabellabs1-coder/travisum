"use client";

/**
 * En-tête « v3 » pour les pages autres que l'accueil : reprend le menu de la
 * maquette (TRAVISUM • Visa · Traduction · Légalisation · Tarifs · Comment ça
 * marche · sélecteur FR/EN/NL · « Obtenir un devis »), mais avec des liens qui
 * pointent vers les vraies pages du site. Fixe (80 px) pour rester compatible
 * avec les décalages de bannière existants.
 */

import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/donnees";
import { LOCALES, lien, type Locale } from "@/lib/i18n";

const OUTFIT = { fontFamily: "Outfit, sans-serif" } as const;

const NAV: Record<Locale, { label: string; href: string }[]> = {
  fr: [
    { label: "Visa", href: "/visas/" },
    { label: "e-Visa", href: "/e-visa/" },
    { label: "Traduction", href: "/traductions/" },
    { label: "Légalisation", href: "/legalisations/" },
    { label: "Comment ça marche", href: "/#steps" },
    { label: "Contact", href: "/contact/" },
  ],
  nl: [
    { label: "Visum", href: "/visas/" },
    { label: "e-Visum", href: "/e-visa/" },
    { label: "Vertaling", href: "/traductions/" },
    { label: "Legalisatie", href: "/legalisations/" },
    { label: "Hoe het werkt", href: "/#steps" },
    { label: "Contact", href: "/contact/" },
  ],
  en: [
    { label: "Visas", href: "/visas/" },
    { label: "e-Visa", href: "/e-visa/" },
    { label: "Translation", href: "/traductions/" },
    { label: "Legalisation", href: "/legalisations/" },
    { label: "How it works", href: "/#steps" },
    { label: "Contact", href: "/contact/" },
  ],
};

const CTA: Record<Locale, string> = {
  fr: "Obtenir un devis",
  nl: "Offerte aanvragen",
  en: "Get a quote",
};

const HR: Record<Locale, string> = {
  fr: "Lun–ven, 9 h–17 h",
  nl: "Ma–vr, 9–17 u",
  en: "Mon–Fri, 9am–5pm",
};

const IcTel = (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
  </svg>
);

export default function EnteteV3({
  lang = "fr",
  cheminFr = "/",
  sticky = false,
}: {
  lang?: Locale;
  cheminFr?: string;
  sticky?: boolean;
}) {
  const [ouvert, setOuvert] = useState(false);
  const L = (c: string) => lien(lang, c);
  const items = NAV[lang] ?? NAV.fr;

  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ouvert]);

  return (
    <>
    <div className="bg-primary-container border-b border-white/10">
      <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop h-[38px] flex items-center justify-center min-[600px]:justify-end gap-[18px] text-[12.5px] font-semibold">
        <a href={`tel:${CONTACT.telephone_tel}`} className="inline-flex items-center gap-1.5 text-[#C9A96A] hover:text-[#DFC38C] transition-colors">
          {IcTel}{CONTACT.telephone}
        </a>
        <a href={`mailto:${CONTACT.email}`} className="hidden min-[600px]:inline text-[#C9A96A] hover:text-[#DFC38C] transition-colors">{CONTACT.email}</a>
        <span className="hidden min-[600px]:inline text-white/55 font-medium">{HR[lang] ?? HR.fr}</span>
      </div>
    </div>
    <header className={`${sticky ? "sticky" : "fixed"} top-0 inset-x-0 z-50 bg-primary border-b border-white/10`}>
      <div className="h-20 max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop flex min-[1081px]:grid min-[1081px]:grid-cols-[1fr_auto_1fr] items-center justify-between gap-4">
        <a
          href={L("/")}
          className="flex items-center gap-1.5 text-white text-[16px] font-semibold tracking-[0.22em] shrink-0"
          style={OUTFIT}
          aria-label="Travisum"
        >
          TRAVISUM
          <span className="w-[5px] h-[5px] rounded-full bg-tertiary-fixed-dim mt-0.5" aria-hidden="true" />
        </a>

        <nav className="hidden min-[1081px]:flex items-center gap-8 min-[1081px]:justify-self-center" aria-label="Navigation">
          {items.map((it) => (
            <a
              key={it.label}
              href={L(it.href)}
              className="group relative text-[14px] text-white/85 hover:text-white transition-colors py-1 whitespace-nowrap"
            >
              {it.label}
              <span className="pointer-events-none absolute left-0 -bottom-0.5 h-px w-0 bg-tertiary-fixed-dim transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4 min-[1081px]:justify-self-end">
          <div className="flex bg-white/10 rounded-md p-[3px] gap-[2px]" role="group" aria-label="Langue">
            {LOCALES.map((l) => (
              <a
                key={l}
                href={lien(l, cheminFr)}
                hrefLang={l}
                data-lang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`px-[11px] py-[7px] rounded-[5px] text-[11.5px] font-semibold tracking-[0.06em] transition-colors ${
                  l === lang
                    ? "bg-white/90 text-primary"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </a>
            ))}
          </div>

          <a
            href={L("/contact/")}
            className="hidden sm:inline-flex items-center h-[44px] px-[20px] rounded-sm bg-[#C9A96A] text-[#0B1B2E] text-[13.5px] font-semibold hover:bg-[#DFC38C] hover:-translate-y-px transition whitespace-nowrap"
            style={OUTFIT}
          >
            {CTA[lang] ?? CTA.fr}
          </a>

          <button
            className="min-[1081px]:hidden w-10 h-10 -mr-2 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setOuvert((v) => !v)}
            aria-expanded={ouvert}
            aria-label="Menu"
          >
            <span className={`block w-[22px] h-px bg-white transition-all ${ouvert ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-px bg-white transition-all ${ouvert ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-px bg-white transition-all ${ouvert ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {ouvert && (
        <div className="min-[1081px]:hidden border-t border-white/10 bg-primary px-margin-mobile pb-6 pt-2">
          <nav className="flex flex-col" aria-label="Navigation (mobile)">
            {items.map((it) => (
              <a
                key={it.label}
                href={L(it.href)}
                onClick={() => setOuvert(false)}
                className="py-3.5 border-b border-white/10 text-white text-[16px]"
                style={OUTFIT}
              >
                {it.label}
              </a>
            ))}
          </nav>
          <a
            href={L("/contact/")}
            onClick={() => setOuvert(false)}
            className="mt-5 inline-flex items-center justify-center w-full h-[46px] rounded-sm bg-[#C9A96A] text-[#0B1B2E] text-[14px] font-semibold hover:bg-[#DFC38C] transition-colors"
            style={OUTFIT}
          >
            {CTA[lang] ?? CTA.fr}
          </a>
        </div>
      )}
    </header>
    </>
  );
}
