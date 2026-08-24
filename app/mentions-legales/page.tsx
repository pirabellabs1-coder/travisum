import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import PageLegale from "@/components/PageLegale";
import { MENTIONS } from "@/lib/textes-legaux";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site travisum.com : éditeur, directeur de la publication, " +
    "hébergement, propriété intellectuelle et limitation de responsabilité.",
  alternates: alternates("/mentions-legales/"),
};

export default function Mentions() {
  return (
    <PageLegale
      courante="/mentions-legales/"
      titre="Mentions légales"
      chapeau="Qui édite ce site, qui l’héberge, et dans quelles limites les informations qui y figurent engagent le bureau."
      articles={MENTIONS}
    />
  );
}
