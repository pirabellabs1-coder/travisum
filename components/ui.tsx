/**
 * Primitives de mise en page.
 *
 * Vocabulaire visuel repris de la maquette Stitch (thème Official Editorial) :
 * fonds ivoire / ivoire sourd / encre, filets de laiton de 1 px, étiquettes
 * 12 px en capitales à 0,18 em, titres Playfair, angles à 2 px.
 *
 * Le devis (section 04) interdit les ombres portées : la séparation vient
 * toujours d'un filet, jamais d'une élévation.
 */

import type { ReactNode } from "react";

export const MAXW = "max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop";

export type Fond = "surface" | "basse" | "encre";

const FONDS: Record<Fond, string> = {
  surface: "bg-surface",
  basse: "bg-surface-container-low",
  encre: "bg-primary text-on-primary",
};

// --------------------------------------------------------------------------
export function Icone({
  nom,
  taille = "text-2xl",
  couleur = "text-on-tertiary-fixed-variant",
  plein = false,
}: {
  nom: string;
  taille?: string;
  couleur?: string;
  plein?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined ${taille} ${couleur}`}
      style={plein ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden="true"
    >
      {nom}
    </span>
  );
}

export function Etiquette({
  children,
  sombre = false,
}: {
  children: ReactNode;
  sombre?: boolean;
}) {
  return (
    <span
      className={`font-label-sm text-label-sm uppercase tracking-widest ${
        sombre ? "text-tertiary-fixed-dim" : "text-on-tertiary-fixed-variant"
      }`}
    >
      {children}
    </span>
  );
}

export function CartoucheIcone({ nom, marge = true }: { nom: string; marge?: boolean }) {
  return (
    <div
      className={`w-12 h-12 ${
        marge ? "mb-7" : ""
      } bg-surface-container border border-tertiary-fixed-dim/30 flex items-center justify-center rounded-sm shrink-0`}
    >
      <Icone nom={nom} plein />
    </div>
  );
}

// --------------------------------------------------------------------------
export function EnteteSection({
  surtitre,
  titre,
  chapeau,
  sombre = false,
  centre = false,
  sansMarge = false,
}: {
  surtitre: string;
  titre: ReactNode;
  chapeau?: ReactNode;
  sombre?: boolean;
  centre?: boolean;
  sansMarge?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${sansMarge ? "" : "mb-14"} ${
        centre ? "items-center text-center" : "items-start"
      }`}
    >
      <div className="flex items-center gap-4">
        {!centre && <span className="w-8 h-px bg-tertiary-fixed-dim" />}
        <Etiquette sombre={sombre}>{surtitre}</Etiquette>
        {centre && <span className="w-8 h-px bg-tertiary-fixed-dim" />}
      </div>
      <h2
        className={`font-display-lg text-headline-md md:text-headline-lg leading-tight max-w-3xl ${
          sombre ? "text-on-primary" : "text-primary"
        }`}
      >
        {titre}
      </h2>
      {chapeau && (
        <p
          className={`font-body-lg text-body-lg max-w-2xl ${
            sombre ? "text-primary-fixed-dim" : "text-on-surface-variant"
          }`}
        >
          {chapeau}
        </p>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
export function Section({
  children,
  fond = "surface",
  id,
  filetBas = true,
  guilloche = false,
}: {
  children: ReactNode;
  fond?: Fond;
  id?: string;
  filetBas?: boolean;
  guilloche?: boolean;
}) {
  const classes = [
    "w-full py-20 md:py-28",
    FONDS[fond],
    filetBas ? "border-b border-tertiary-fixed-dim/20" : "",
    guilloche ? "relative overflow-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id={id}>
      {guilloche && (
        <div
          className="guilloche absolute inset-0 opacity-[0.07] pointer-events-none"
          aria-hidden="true"
        />
      )}
      <div className={`${MAXW}${guilloche ? " relative z-10" : ""}`}>{children}</div>
    </section>
  );
}

// --------------------------------------------------------------------------
export function Carte({
  children,
  accent,
  className = "",
}: {
  children: ReactNode;
  accent?: "laiton" | "vert" | "rouge";
  className?: string;
}) {
  const bords = {
    laiton: "border-l-2 border-l-tertiary-fixed-dim",
    vert: "border-l-2 border-l-secondary",
    rouge: "border-l-2 border-l-error",
  };
  return (
    <div
      className={`bg-surface-container-lowest border border-tertiary-fixed-dim/30 ${
        accent ? bords[accent] : ""
      } rounded-sm p-7 md:p-8 transition-colors duration-300 hover:border-tertiary-fixed-dim/70 ${className}`}
    >
      {children}
    </div>
  );
}

// --------------------------------------------------------------------------
export function BoutonPrincipal({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-7 py-4 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}

export function BoutonLaiton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 bg-tertiary-fixed-dim text-on-tertiary-fixed px-7 py-4 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-white transition-colors ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}

export function LienFleche({
  href,
  children,
  sombre = false,
}: {
  href: string;
  children: ReactNode;
  sombre?: boolean;
}) {
  return (
    <a
      className={`inline-flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest border-b border-tertiary-fixed-dim pb-1 transition-colors ${
        sombre
          ? "text-on-primary hover:text-tertiary-fixed-dim"
          : "text-primary hover:text-on-tertiary-fixed-variant"
      }`}
      href={href}
    >
      {children}
      <Icone nom="arrow_forward" taille="text-[16px]" couleur="" />
    </a>
  );
}
