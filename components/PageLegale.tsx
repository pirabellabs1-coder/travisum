/**
 * Gabarit des pages légales.
 *
 * Ces textes ont leur propre régime : longs, consultés délibérément,
 * adressables par une URL stable et accessibles depuis chaque page. D'où
 * quatre pages autonomes plutôt que des blocs ancrés dans « À propos ».
 */

import type { ReactNode } from "react";
import Page from "./Page";
import { Icone, MAXW } from "./ui";
import { pagesLegales } from "@/lib/navigation";
import type { Locale } from "@/lib/i18n";

export type Article = {
  ancre: string;
  titre: string;
  contenu: ReactNode;
};

export function Liste({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2.5 mb-5 max-w-3xl">
      {items.map((x, i) => (
        <li
          key={i}
          className="flex items-start gap-3 font-body-md text-body-md text-on-surface-variant"
        >
          <span className="w-4 h-px bg-tertiary-fixed-dim mt-3 shrink-0" aria-hidden="true" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mb-4">
      {children}
    </p>
  );
}

export function Encart({
  titre,
  children,
  ton = "laiton",
}: {
  titre: string;
  children: ReactNode;
  ton?: "laiton" | "rouge";
}) {
  return (
    <div
      className={`my-6 p-6 border border-tertiary-fixed-dim/30 border-l-2 ${
        ton === "rouge" ? "border-l-error" : "border-l-tertiary-fixed-dim"
      } rounded-sm bg-surface-container-lowest flex items-start gap-4 max-w-3xl`}
    >
      <Icone
        nom={ton === "rouge" ? "warning" : "info"}
        taille="text-[20px] mt-0.5 shrink-0"
        couleur={ton === "rouge" ? "text-error" : "text-on-tertiary-fixed-variant"}
      />
      <div>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
          {titre}
        </p>
        <div className="font-body-md text-body-md text-on-surface-variant">{children}</div>
      </div>
    </div>
  );
}

export function Lien({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      className="underline decoration-tertiary-fixed-dim underline-offset-4 hover:text-primary transition-colors"
      href={href}
    >
      {children}
    </a>
  );
}

export default function PageLegale({
  courante,
  lang = "fr",
  surtitre = "Informations légales",
  titre,
  chapeau,
  maj = "24 août 2026",
  articles,
}: {
  courante: string;
  lang?: Locale;
  surtitre?: string;
  titre: string;
  chapeau: string;
  maj?: string;
  articles: Article[];
}) {
  return (
    <Page sansRythme lang={lang} cheminFr={courante}>
      {/* ---------------------------------------------------------- BANNIÈRE */}
      <section className="w-full bg-surface relative overflow-hidden -mt-20 pt-40 pb-16 md:pb-20 border-b border-tertiary-fixed-dim/20">
        <div
          className="guilloche absolute inset-0 opacity-[0.08] pointer-events-none"
          aria-hidden="true"
        />
        <div className={`${MAXW} relative z-10 max-w-4xl`}>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant">
              {surtitre}
            </span>
            <span className="h-px bg-tertiary-fixed-dim grow max-w-[120px]" />
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight mb-6">
            {titre}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {chapeau}
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mt-8 pt-6 border-t border-tertiary-fixed-dim/25">
            Dernière mise à jour : {maj}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ CORPS */}
      <section className="w-full bg-surface py-16 md:py-20">
        <div className={`${MAXW} max-w-4xl`}>
          <nav
            className="border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest p-7 mb-14"
            aria-label="Sommaire"
          >
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest pb-4 mb-3 border-b border-tertiary-fixed-dim/30">
              Sommaire
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {articles.map((a, i) => (
                <li key={a.ancre}>
                  <a
                    className="flex items-baseline gap-3 py-2 font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
                    href={`#${a.ancre}`}
                  >
                    <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {a.titre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {articles.map((a, i) => (
            <article
              key={a.ancre}
              id={a.ancre}
              className="py-10 border-b border-tertiary-fixed-dim/20 last:border-b-0"
            >
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-label-sm text-label-sm text-on-tertiary-fixed-variant shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display-lg text-headline-md text-primary leading-snug">
                  {a.titre}
                </h2>
              </div>
              <div className="pl-0 md:pl-10">{a.contenu}</div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ AUTRES TEXTES */}
      <section className="w-full bg-surface-container-low py-16 md:py-20 border-t border-tertiary-fixed-dim/20">
        <div className={MAXW}>
          <p className="font-label-sm text-label-sm text-on-tertiary-fixed-variant uppercase tracking-widest mb-6">
            Les autres textes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {pagesLegales(lang).filter(([, href]) => href !== courante).map(([libelle, href]) => (
              <a
                key={href}
                className="group flex items-center justify-between gap-4 p-6 border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim transition-colors"
                href={href}
              >
                <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">
                  {libelle}
                </span>
                <Icone nom="arrow_forward" taille="text-[16px]" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
