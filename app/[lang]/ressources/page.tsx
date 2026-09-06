import type { Metadata } from "next";
import { RessourcesVue } from "@/components/vues/Ressources";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: "Gidsen, procedures en documentenlijsten",
    description:
      "Praktische gidsen over beëdigde vertaling, legalisatie, de Haagse apostille en " +
      "visumaanvragen vanuit België. Downloadbare documentenlijsten.",
  },
  en: {
    title: "Guides, procedures and document checklists",
    description:
      "Practical guides on sworn translation, legalisation, the Hague apostille and visa " +
      "applications from Belgium. Downloadable document checklists.",
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  const m = META[lang];
  return {
    ...(m ? { title: m.title, description: m.description } : {}),
    alternates: { ...alternates("/ressources/"), canonical: lien(lang, "/ressources/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <RessourcesVue lang={lang} cheminFr="/ressources/" />;
}
