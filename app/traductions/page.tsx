import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { TraductionsVue } from "@/components/vues/Traductions";

export const metadata: Metadata = {
  title: "Traductions assermentées, jurées et libres à Bruxelles",
  description:
    "Traductions assermentées reconnues par les autorités belges et internationales. " +
    "Actes d'état civil, diplômes, jugements, statuts de société. Estimation immédiate.",
  alternates: alternates("/traductions/"),
};

export default function Traductions() {
  return <TraductionsVue />;
}
