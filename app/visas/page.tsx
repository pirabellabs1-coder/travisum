import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { VisasVue } from "@/components/vues/Visas";

export const metadata: Metadata = {
  title: "Demande de visa et formalités de voyage",
  description:
    "Travisum vous accompagne dans vos demandes de visa, e-visa et carte touristique. " +
    "Consultez les formalités par destination et faites vérifier votre dossier.",
  alternates: alternates("/visas/"),
};

export default function Visas() {
  return <VisasVue />;
}
