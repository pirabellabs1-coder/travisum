import type { Metadata } from "next";
import { VisasVue } from "@/components/vues/Visas";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: "Visumaanvraag en reisformaliteiten",
    description:
      "Travisum begeleidt u bij uw aanvragen voor een visum, e-visum en toeristenkaart. " +
      "Bekijk de formaliteiten per bestemming en laat uw dossier controleren.",
  },
  en: {
    title: "Visa application and travel formalities",
    description:
      "Travisum supports you with your visa, e-visa and travel-card applications. " +
      "Check the requirements by destination and have your file reviewed.",
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  const m = META[lang];
  return {
    ...(m ? { title: m.title, description: m.description } : {}),
    alternates: { ...alternates("/visa/"), canonical: lien(lang, "/visa/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <VisasVue lang={lang} cheminFr="/visa/" />;
}
