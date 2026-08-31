import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import AccueilV3 from "@/components/vues/AccueilV3";

export const metadata: Metadata = {
  title: "Traduction assermentée, légalisation et visa",
  description:
    "Travisum, bureau de traduction jurée : traductions assermentées, légalisations, " +
    "apostilles et visas de voyage. Devis détaillé en moins de 2 heures ouvrables.",
  alternates: alternates("/"),
};

export default function Accueil() {
  return <AccueilV3 />;
}
