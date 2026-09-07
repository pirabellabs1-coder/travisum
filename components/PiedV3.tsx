"use client";

/**
 * Pied de page « v3 » (mêmes colonnes que l'accueil), pour les pages internes
 * migrées. Rendu à l'intérieur du conteneur `.v3` : les classes footer/.fgrid/
 * .fcol/.fbot sont fournies par lib/v3-styles.
 */

import { CONTACT } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";

const T: Record<Locale, any> = {
  fr: {
    services: "Services", visa: "Visa", evisa: "e-Visa", trad: "Traduction", legal: "Légalisation", tarifs: "Tarifs",
    apropos: "À propos", cmt: "Comment ça marche", contact: "Contact", faq: "FAQ",
    infosLeg: "Informations légales", ml: "Mentions légales", conf: "Politique de confidentialité", cgv: "Conditions générales", cookies: "Cookies",
    horaires: "Horaires", hr: "Du lundi au vendredi<br>9h00 – 17h00, sans interruption",
    bce: "Numéro d’entreprise (BCE) : [à compléter]",
    cp: "© 2026 Travisum. Tous droits réservés.",
    dis: "Travisum n’est pas une autorité consulaire. Les informations fournies sont indicatives.",
  },
  nl: {
    services: "Diensten", visa: "Visum", evisa: "e-Visum", trad: "Vertaling", legal: "Legalisatie", tarifs: "Tarieven",
    apropos: "Over ons", cmt: "Hoe het werkt", contact: "Contact", faq: "FAQ",
    infosLeg: "Juridische informatie", ml: "Wettelijke vermeldingen", conf: "Privacybeleid", cgv: "Algemene voorwaarden", cookies: "Cookies",
    horaires: "Openingsuren", hr: "Van maandag tot vrijdag<br>9u00 – 17u00, doorlopend",
    bce: "Ondernemingsnummer (KBO): [aan te vullen]",
    cp: "© 2026 Travisum. Alle rechten voorbehouden.",
    dis: "Travisum is geen consulaire overheid. De verstrekte informatie is indicatief.",
  },
  en: {
    services: "Services", visa: "Visas", evisa: "e-Visa", trad: "Translation", legal: "Legalisation", tarifs: "Pricing",
    apropos: "About", cmt: "How it works", contact: "Contact", faq: "FAQ",
    infosLeg: "Legal information", ml: "Legal notice", conf: "Privacy policy", cgv: "Terms and conditions", cookies: "Cookies",
    horaires: "Opening hours", hr: "Monday to Friday<br>9:00 – 17:00, no lunch break",
    bce: "Company number (BCE): [to be completed]",
    cp: "© 2026 Travisum. All rights reserved.",
    dis: "Travisum is not a consular authority. The information provided is indicative.",
  },
};

export default function PiedV3({ lang = "fr" }: { lang?: Locale }) {
  const d = T[lang] ?? T.fr;
  const L = (c: string) => lien(lang, c);
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div className="fcol fbrand">
            <a href={L("/")} className="flogo">
              TRAVISUM<i />
            </a>
            <p>{CONTACT.rue}</p>
            <p>
              {CONTACT.code_postal} {CONTACT.ville}, {lang === "nl" ? "België" : lang === "en" ? "Belgium" : "Belgique"}
            </p>
            <p className="hi">
              <a href={`mailto:${CONTACT.email}`} style={{ color: "inherit", textDecoration: "none" }}>
                {CONTACT.email}
              </a>
            </p>
            <p className="hi">
              <a href={`tel:${CONTACT.telephone_tel}`} style={{ color: "inherit", textDecoration: "none" }}>
                {CONTACT.telephone}
              </a>
            </p>
          </div>
          <div className="fcol">
            <h4>{d.services}</h4>
            <a href={L("/visas/")}>{d.visa}</a>
            <a href={L("/e-visa/")}>{d.evisa}</a>
            <a href={L("/traductions/")}>{d.trad}</a>
            <a href={L("/legalisations/")}>{d.legal}</a>
          </div>
          <div className="fcol">
            <h4>Travisum</h4>
            <a href={L("/a-propos/")}>{d.apropos}</a>
            <a href={L("/#steps")}>{d.cmt}</a>
            <a href={L("/contact/")}>{d.contact}</a>
            <a href={L("/ressources/#faq")}>{d.faq}</a>
          </div>
          <div className="fcol">
            <h4>{d.infosLeg}</h4>
            <a href={L("/mentions-legales/")}>{d.ml}</a>
            <a href={L("/confidentialite/")}>{d.conf}</a>
            <a href={L("/cgv/")}>{d.cgv}</a>
            <a href={L("/cookies/")}>{d.cookies}</a>
          </div>
          <div className="fcol">
            <h4>{d.horaires}</h4>
            <p dangerouslySetInnerHTML={{ __html: d.hr }} />
          </div>
        </div>
        <div className="fbot">
          <span>{d.cp}</span>
          <span>{d.dis}</span>
        </div>
      </div>
    </footer>
  );
}
