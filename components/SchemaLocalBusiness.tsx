import { CONTACT, URL_SITE } from "@/lib/donnees";

/**
 * Données structurées locales (JSON-LD) — SEO « geo » / local.
 * Décrit le bureau (nom, adresse, téléphone, horaires) pour Google Business /
 * résultats locaux. Rendu dans le layout racine → présent sur toutes les pages.
 * On garde la géo ICI (données structurées), pas dans les titres.
 */
export default function SchemaLocalBusiness() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${URL_SITE}/#business`,
    name: CONTACT.raison,
    url: URL_SITE,
    image: `${URL_SITE}/assets/img/photos/hero-avenue-louise.jpg`,
    telephone: CONTACT.telephone_tel,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.rue,
      postalCode: CONTACT.code_postal,
      addressLocality: CONTACT.ville,
      addressCountry: "BE",
    },
    areaServed: { "@type": "Country", name: "Belgique" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    sameAs: ["https://maps.app.goo.gl/avsW7i5xRo2qmt2s5"],
    description:
      "Bureau de traduction jurée, de légalisation (apostille) et de visas de voyage. Devis en moins de 2 heures ouvrables.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
