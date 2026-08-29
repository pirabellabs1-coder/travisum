import type { Metadata } from "next";
import { alternates } from "@/lib/i18n";
import { ContactVue } from "@/components/vues/Contact";

export const metadata: Metadata = {
  title: "Contact et prise de rendez-vous",
  description:
    "Contactez le bureau Travisum à Bruxelles : téléphone, e-mail, adresse et " +
    "formulaire de prise de rendez-vous pour vos visas, traductions et légalisations.",
  alternates: alternates("/contact/"),
};

export default function Contact() {
  return <ContactVue />;
}
