import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { EVisaVue } from "@/components/vues/EVisa";

export const metadata: Metadata = {
  title: "e-Visa — demande de visa électronique en ligne",
  description:
    "Demandez votre e-Visa (visa électronique) depuis la Belgique et l’Europe : Inde, " +
    "Malawi, Tchad, Bénin, Égypte, Vietnam… Documents, délais et accompagnement, tourisme ou affaires.",
  alternates: alternates("/e-visa/"),
};

export default function EVisa() {
  return <EVisaVue />;
}
