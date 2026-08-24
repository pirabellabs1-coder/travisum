import type { Metadata } from "next";
import Page from "@/components/Page";
import { Icone, MAXW } from "@/components/ui";

/**
 * Page 404 — écran 13 du devis : « graphisme de tampon "document introuvable",
 * liens de secours vers les trois services et la recherche ».
 */

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

const SECOURS = [
  ["translate", "Traductions", "/traductions/"],
  ["verified", "Légalisations", "/legalisations/"],
  ["airplane_ticket", "Visas de voyage", "/visas/"],
];

export default function Introuvable() {
  return (
    <Page sansRythme>
      <section className="w-full bg-surface relative overflow-hidden -mt-20 pt-40 pb-24 min-h-[80vh] flex items-center">
        <div
          className="guilloche absolute inset-0 opacity-[0.08] pointer-events-none"
          aria-hidden="true"
        />
        <div className={`${MAXW} relative z-10 max-w-2xl`}>
          {/* Tampon « document introuvable » */}
          <div className="relative inline-flex items-center justify-center mb-10">
            <span
              className="absolute inset-0 -m-4 rounded-full border-2 border-error/40 rotate-[-8deg]"
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 -m-1 rounded-full border border-error/25 rotate-[6deg]"
              aria-hidden="true"
            />
            <span className="flex flex-col items-center justify-center w-32 h-32 rounded-full border-2 border-error/60 text-error rotate-[-8deg]">
              <Icone nom="gpp_bad" taille="text-[34px]" couleur="text-error" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest mt-1">
                404
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-tertiary-fixed-dim" />
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed-variant">
              Document introuvable
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight mb-6">
            Cette page n’existe pas, ou plus.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
            L’adresse est peut-être erronée, ou la page a été déplacée lors de la refonte du
            site. Voici par où reprendre.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {SECOURS.map(([ic, libelle, href]) => (
              <a
                key={href}
                className="group flex flex-col gap-3 p-6 border border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim transition-colors"
                href={href}
              >
                <Icone nom={ic} taille="text-[22px]" />
                <span className="font-display-lg text-[19px] text-primary group-hover:text-on-tertiary-fixed-variant transition-colors">
                  {libelle}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-7 py-4 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
              href="/"
            >
              <Icone nom="home" taille="text-[16px]" couleur="" />
              Retour à l’accueil
            </a>
            <a
              className="inline-flex items-center gap-2 border border-tertiary-fixed-dim text-primary px-7 py-4 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-tertiary-fixed-dim/10 transition-colors"
              href="/visas/#toutes"
            >
              Chercher une destination
            </a>
          </div>
        </div>
      </section>
    </Page>
  );
}
