import type { Metadata } from "next";
import { EVisaPaysVue } from "@/components/vues/EVisaPays";
import { EVISA_PAYS, evisaParSlug, evisaNom } from "@/lib/evisa-contenu";
import { LOCALES, alternates, estLocale, lien, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  const langs = LOCALES.filter((l) => l !== "fr");
  return langs.flatMap((lang) => EVISA_PAYS.map((p) => ({ lang, pays: p.evSlug })));
}

function metaLocalisee(lang: "nl" | "en", nom: string): { title: string; description: string } {
  if (lang === "nl") {
    return {
      title: `e-Visum ${nom} vanuit België en Europa | Online aanvraag`,
      description: `Vraag uw e-Visum voor ${nom} aan vanuit België of Europa: documenten, procedure, termijnen en begeleiding voor toerisme of zaken.`,
    };
  }
  return {
    title: `${nom} e-Visa from Belgium and Europe | Apply online`,
    description: `Apply for your ${nom} e-Visa from Belgium or Europe: documents, procedure, timelines and support for tourism or business.`,
  };
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; pays: string };
}): Metadata {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  const p = evisaParSlug(params.pays);
  if (!p) return {};
  const chemin = `/e-visa/${p.evSlug}/`;
  const m = lang === "fr" ? { title: p.seoTitre, description: p.seoDesc } : metaLocalisee(lang, evisaNom(p, lang));
  return {
    title: m.title,
    description: m.description,
    alternates: { ...alternates(chemin), canonical: lien(lang, chemin) },
  };
}

export default function EVisaPaysLocalise({
  params,
}: {
  params: { lang: string; pays: string };
}) {
  const lang = (estLocale(params.lang) ? params.lang : "fr") as Locale;
  return <EVisaPaysVue slug={params.pays} lang={lang} cheminFr={`/e-visa/${params.pays}/`} />;
}
