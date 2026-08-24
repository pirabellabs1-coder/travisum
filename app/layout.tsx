import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CONTACT, URL_SITE } from "@/lib/donnees";
import BandeauCookies from "@/components/Cookies";
import "./globals.css";

/**
 * Gabarit racine.
 *
 * Les polices restent servies par Google Fonts, comme dans la maquette. Les
 * Material Symbols sont conservés : c'est la police d'icônes utilisée par
 * Stitch, et la remplacer aurait fait dériver le rendu.
 */

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: {
    default: "Traduction assermentée, légalisation et visa à Bruxelles — Travisum",
    template: "%s — Travisum",
  },
  description:
    "Travisum Louise Office, 367 avenue Louise à Bruxelles : traductions assermentées, " +
    "légalisations, apostilles et visas de voyage. Devis en moins de 2 heures ouvrables.",
  applicationName: "Travisum",
  authors: [{ name: "Travisum Louise Office" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/img/logo-mark.svg", type: "image/svg+xml" },
      { url: "/assets/img/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/img/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/img/favicon/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: "Travisum",
  },
};

export const viewport = {
  themeColor: "#00050e",
  width: "device-width",
  initialScale: 1,
};

/** Données structurées de l'établissement, présentes sur toutes les pages. */
const ETABLISSEMENT = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: CONTACT.raison,
  description:
    "Traductions assermentées, légalisations, apostilles et visas de voyage.",
  url: `${URL_SITE}/`,
  telephone: [CONTACT.telephone_tel, CONTACT.mobile_tel],
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.rue,
    postalCode: CONTACT.code_postal,
    addressLocality: CONTACT.ville,
    addressCountry: "BE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  areaServed: "BE",
  availableLanguage: ["fr", "nl", "en"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ETABLISSEMENT) }}
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface">
        {children}
        <BandeauCookies />
      </body>
    </html>
  );
}
