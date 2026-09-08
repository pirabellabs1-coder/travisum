import type { Metadata } from "next";
import type { ReactNode } from "react";
import { URL_SITE } from "@/lib/donnees";
import BandeauCookies from "@/components/Cookies";
import AutoLangue from "@/components/AutoLangue";
import SchemaLocalBusiness from "@/components/SchemaLocalBusiness";
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
    default: "Traduction assermentée, légalisation et visa — Travisum",
    template: "%s — Travisum",
  },
  description:
    "Travisum : traductions assermentées, légalisations, apostilles et visas de voyage. " +
    "Devis en moins de 2 heures ouvrables.",
  keywords: [
    "traduction assermentée",
    "traduction jurée",
    "traducteur juré",
    "traduction officielle",
    "légalisation de documents",
    "apostille",
    "visa",
    "e-visa",
    "demande de visa",
    "Travisum",
  ],
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
    alternateLocale: ["nl_BE", "en_GB"],
    url: URL_SITE,
    siteName: "Travisum",
    images: [
      {
        url: "/assets/img/photos/hero-avenue-louise.jpg",
        alt: "Travisum — traduction assermentée, légalisation et visa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/img/photos/hero-avenue-louise.jpg"],
  },
};

export const viewport = {
  themeColor: "#0b1f33",
  width: "device-width",
  initialScale: 1,
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Outfit:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface">
        <SchemaLocalBusiness />
        <AutoLangue />
        {children}
        <BandeauCookies />
      </body>
    </html>
  );
}
