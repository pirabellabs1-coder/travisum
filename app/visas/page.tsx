import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { DESTINATIONS } from "@/lib/donnees";
import { VisasVue } from "@/components/vues/Visas";

export const metadata: Metadata = {
  title: "Visas, e-visas et ESTA depuis la Belgique",
  description:
    `Assistance complète pour vos visas consulaires, e-visas et ESTA, pour ` +
    `${DESTINATIONS.length} destinations. Constitution du dossier, dépôt consulaire, ` +
    `suivi et retrait.`,
  alternates: alternates("/visas/"),
};

export default function Visas() {
  return <VisasVue />;
}
