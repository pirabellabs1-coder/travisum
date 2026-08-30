import type { Metadata } from "next";
import { EVisaPaysVue } from "@/components/vues/EVisaPays";
import { EVISA_PAYS, evisaParSlug } from "@/lib/evisa-contenu";
import { alternates } from "@/lib/i18n";

export function generateStaticParams() {
  return EVISA_PAYS.map((p) => ({ pays: p.evSlug }));
}

export function generateMetadata({ params }: { params: { pays: string } }): Metadata {
  const p = evisaParSlug(params.pays);
  if (!p) return {};
  return {
    title: p.seoTitre,
    description: p.seoDesc,
    alternates: alternates(`/e-visa/${p.evSlug}/`),
  };
}

export default function EVisaPaysPage({ params }: { params: { pays: string } }) {
  return <EVisaPaysVue slug={params.pays} lang="fr" cheminFr={`/e-visa/${params.pays}/`} />;
}
