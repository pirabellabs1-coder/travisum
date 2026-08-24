import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { TarifsVue } from "@/components/vues/Tarifs";

export const metadata: Metadata = {
  title: "Tarifs et délais de traduction, légalisation et visa",
  description:
    "Grille tarifaire publique : traduction assermentée et libre, légalisation et " +
    "apostille, visas. Délais standard, prioritaire 48 h et express 24 h.",
  alternates: alternates("/tarifs/"),
};

export default function Tarifs() {
  return <TarifsVue />;
}
