import type { Metadata } from "next";
import { LegalisationsVue } from "@/components/vues/Legalisations";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: "Legalisaties, apostilles en officiële neerleggingen",
    description:
      "Volledige legalisatie en Haagse apostille: FOD Justitie, Buitenlandse Zaken, " +
      "rechtbanken van eerste aanleg, ambassades en consulaten. Neerlegging en ophaling bij de bevoegde autoriteiten.",
  },
  en: {
    title: "Legalisations, apostilles and official filings",
    description:
      "Full legalisation and Hague apostille: FPS Justice, Foreign Affairs, courts of " +
      "first instance, embassies and consulates. Filing and collection with the competent authorities.",
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  const m = META[lang];
  return {
    ...(m ? { title: m.title, description: m.description } : {}),
    alternates: { ...alternates("/legalisations/"), canonical: lien(lang, "/legalisations/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <LegalisationsVue lang={lang} cheminFr="/legalisations/" />;
}
