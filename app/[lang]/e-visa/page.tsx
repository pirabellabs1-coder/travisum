import type { Metadata } from "next";
import { EVisaVue } from "@/components/vues/EVisa";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== "fr").map((lang) => ({ lang }));
}

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: "e-Visum — elektronisch visum online aanvragen",
    description:
      "Vraag uw e-Visum (elektronisch visum) aan vanuit België en Europa: India, Malawi, " +
      "Tsjaad, Benin, Egypte, Vietnam… Documenten, termijnen en begeleiding, toerisme of zaken.",
  },
  en: {
    title: "e-Visa — apply for an electronic visa online",
    description:
      "Apply for your e-Visa (electronic visa) from Belgium and Europe: India, Malawi, " +
      "Chad, Benin, Egypt, Vietnam… Documents, timelines and support, tourism or business.",
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  const m = META[lang];
  return {
    ...(m ? { title: m.title, description: m.description } : {}),
    alternates: { ...alternates("/e-visa/"), canonical: lien(lang, "/e-visa/") },
  };
}

export default function Localise({ params }: { params: { lang: string } }) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <EVisaVue lang={lang} cheminFr="/e-visa/" />;
}
