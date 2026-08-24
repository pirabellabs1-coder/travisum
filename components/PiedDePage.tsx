/**
 * Pied de page — sur fond encre (section 04 du devis : l'encre porte les
 * zones d'autorité, dont le pied de page).
 *
 * Libellés localisés via le dictionnaire ; liens préfixés par la locale.
 * Le contenu éditorial (colonnes de liens) reste en français en attendant la
 * traduction, mais les destinations restent dans la bonne locale.
 */

import { CONTACT, DESTINATIONS } from "@/lib/donnees";
import { pagesLegales } from "@/lib/navigation";
import { lien, t, type Locale } from "@/lib/i18n";
import { Icone, MAXW } from "./ui";

function Colonne({ titre, liens }: { titre: string; liens: [string, string][] }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest pb-4 mb-5 border-b border-tertiary-fixed-dim/25">
        {titre}
      </h3>
      <ul className="flex flex-col gap-3">
        {liens.map(([libelle, href]) => (
          <li key={libelle}>
            <a
              className="font-body-md text-body-md text-primary-fixed-dim hover:text-tertiary-fixed-dim transition-colors"
              href={href}
            >
              {libelle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PiedDePage({ lang = "fr" }: { lang?: Locale }) {
  const d = t(lang).pied;
  const L = (c: string) => lien(lang, c);

  return (
    <footer className="w-full bg-primary text-on-primary relative overflow-hidden pt-20 md:pt-24 pb-12">
      <div
        className="guilloche absolute inset-0 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      />

      <div className={`${MAXW} relative z-10`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-11 w-auto mb-12"
          src="/assets/img/logo-travisum-clair.svg"
          alt="Travisum — Traductions, légalisations et visas"
          width={672}
          height={152}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-gutter">
          <Colonne
            titre={d.services}
            liens={[
              ["Traductions assermentées", L("/traductions/")],
              ["Traductions libres", L("/traductions/")],
              ["Légalisation consulaire", L("/legalisations/")],
              ["Apostille de La Haye", L("/legalisations/")],
              ["Visas de voyage", L("/visas/")],
              ["Tarifs et délais", L("/tarifs/")],
            ]}
          />

          <Colonne
            titre={d.destinations}
            liens={[
              ["Fédération de Russie", L("/visas/russie/")],
              ["République Populaire de Chine", L("/visas/chine/")],
              ["République de l’Inde", L("/visas/inde/")],
              ["États-Unis — ESTA", L("/visas/etats-unis-2/")],
              [d.toutes_destinations.replace("{n}", String(DESTINATIONS.length)), L("/visas/#toutes")],
            ]}
          />

          <Colonne
            titre={d.ressources}
            liens={[
              ["Guides et articles", L("/ressources/")],
              ["Listes de pièces par pays", L("/ressources/#documents")],
              ["Questions fréquentes", L("/ressources/#faq")],
              ["Le bureau", L("/a-propos/")],
              ["Nous contacter", L("/a-propos/#contact")],
            ]}
          />

          <div className="flex flex-col">
            <h3 className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest pb-4 mb-5 border-b border-tertiary-fixed-dim/25">
              {d.bureau}
            </h3>
            <address className="not-italic flex flex-col gap-3 font-body-md text-body-md text-primary-fixed-dim">
              <p>
                {CONTACT.raison}
                <br />
                {CONTACT.rue}
                <br />
                {CONTACT.code_postal} {CONTACT.ville}
              </p>
              <p>
                <a
                  className="hover:text-tertiary-fixed-dim transition-colors"
                  href={`tel:${CONTACT.telephone_tel}`}
                >
                  {CONTACT.telephone}
                </a>
                <br />
                <a
                  className="hover:text-tertiary-fixed-dim transition-colors"
                  href={`tel:${CONTACT.mobile_tel}`}
                >
                  {CONTACT.mobile}
                </a>
                <br />
                <a
                  className="hover:text-tertiary-fixed-dim transition-colors"
                  href={`mailto:${CONTACT.email}`}
                >
                  {CONTACT.email}
                </a>
              </p>
              <p className="text-[15px]">{CONTACT.horaires}</p>
            </address>

            <div className="flex gap-3 mt-6">
              <a
                className="w-10 h-10 flex items-center justify-center border border-tertiary-fixed-dim/30 rounded-sm text-primary-fixed-dim hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim transition-colors"
                href="https://www.facebook.com/travisum"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Facebook"
              >
                <Icone nom="thumb_up" taille="text-[18px]" couleur="" />
              </a>
              <a
                className="w-10 h-10 flex items-center justify-center border border-tertiary-fixed-dim/30 rounded-sm text-primary-fixed-dim hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim transition-colors"
                href="https://maps.app.goo.gl/avsW7i5xRo2qmt2s5"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Google Maps"
              >
                <Icone nom="location_on" taille="text-[18px]" couleur="" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-tertiary-fixed-dim/25 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim">
              {d.lettre_accroche}
            </span>
            <p className="font-display-lg text-[22px] md:text-[26px] text-on-primary mt-3 leading-snug max-w-md">
              {d.lettre_titre}
            </p>
            <p className="font-body-md text-body-md text-primary-fixed-dim mt-2">
              {d.lettre_note}
            </p>
          </div>

          <form className="flex flex-col sm:flex-row gap-3">
            <label className="sr-only" htmlFor="lettre-email">
              {d.email_placeholder}
            </label>
            <input
              className="grow bg-transparent border border-tertiary-fixed-dim/40 rounded-sm px-4 py-3.5 font-body-md text-on-primary outline-none focus:border-tertiary-fixed-dim transition-colors placeholder:text-primary-fixed-dim/50"
              id="lettre-email"
              type="email"
              name="email"
              placeholder={d.email_placeholder}
              required
            />
            <button
              className="shrink-0 bg-tertiary-fixed-dim text-on-tertiary-fixed px-7 py-3.5 font-label-sm text-label-sm uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
              type="submit"
            >
              {d.inscrire}
            </button>
          </form>
        </div>

        <div className="mt-14 pt-8 border-t border-tertiary-fixed-dim/25 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <p className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-widest">
            &copy; 2026 Travisum Louise Office. {d.droits}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {pagesLegales(lang).map(([libelle, href]) => (
              <li key={href}>
                <a
                  className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-widest hover:text-tertiary-fixed-dim transition-colors"
                  href={href}
                >
                  {libelle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
