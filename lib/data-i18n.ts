/**
 * Traductions NL/EN des données FAQ et TARIFS. Le français vient de lib/donnees.
 * Aucun prix chiffré : tout est « Sur devis / Op offerte / On quote ».
 */

import { FAQ, TARIFS, type BlocTarifaire, type Question } from "./donnees";
import type { Locale } from "./i18n";

type FaqSet = { traduction: Question[]; legalisation: Question[]; visa: Question[]; generale: Question[] };
type TarSet = { traduction: BlocTarifaire; legalisation: BlocTarifaire; visa: BlocTarifaire };

/* -------------------------------------------------------------- FAQ · NL */
const FAQ_NL: FaqSet = {
  traduction: [
    ["Wat is het verschil tussen een beëdigde en een vrije vertaling?",
     "Een beëdigde vertaling wordt gemaakt door een vertaler-expert die erkend is door een Belgische rechtbank van eerste aanleg. Ze draagt zijn handtekening, stempel en verklaring van juistheid, wat haar juridische waarde geeft. Een vrije vertaling, gemaakt door een professionele vertaler, heeft die officiële waarde niet: ze is geschikt voor bedrijfscommunicatie, websites, technische handleidingen en interne documenten."],
    ["Wordt mijn vertaling door de administratie aanvaard?",
     "Voor elk document bestemd voor een officiële overheid — gemeente, rechtbank, universiteit, consulaat — is een beëdigde vertaling vereist. Onze vertalers zijn ingeschreven bij de Belgische rechtbanken en hun vertalingen worden erkend door de Belgische en internationale autoriteiten. Afhankelijk van het land van bestemming kan een legalisatie of apostille bijkomen: wij melden dit vanaf de offerte."],
    ["In hoeveel talen vertaalt u?",
     "Het kantoor dekt meer dan 80 talen, van Albanees tot Wolof, van en naar elke andere taal. Beëdiging is niet in alle talen beschikbaar: de lijst geeft aan voor welke een beëdigd vertaler beschikbaar is."],
    ["Hoe krijg ik snel een offerte?",
     "Stuur de scan van uw documenten, in de best mogelijke kwaliteit, naar info@travisum.com. U ontvangt een gedetailleerd voorstel — vaste prijs en termijn — binnen 2 werkuren. U kunt uw documenten ook op kantoor afgeven, Louizalaan 367, van maandag tot vrijdag."],
    ["Moet ik het origineel van mijn document bezorgen?",
     "Voor de vertaling alleen volstaat een leesbare scan. Als een legalisatie of apostille nodig is, wordt het origineel meestal vereist: het kan op kantoor worden afgegeven of opgestuurd. Toevertrouwde originelen verlaten het kantoor nooit zonder traceerbaarheid."],
    ["Wat gebeurt er met de kopieën van mijn documenten?",
     "De bezorgde documenten worden vertrouwelijk behandeld en worden niet meegedeeld of hergebruikt. De digitale kopieën worden verwijderd zodra het dossier is afgesloten."],
  ],
  legalisation: [
    ["Apostille of volledige legalisatie: hoe weet ik het?",
     "Dat hangt uitsluitend af van het land van bestemming. Heeft het land het Verdrag van Den Haag ondertekend, dan volstaat een eenvoudige apostille van de FOD Buitenlandse Zaken en is geen gang naar de ambassade nodig. Zo niet, dan geldt de volledige procedure, met een eindlegalisatie door de ambassade of het consulaat van het betrokken land."],
    ["Welke instanties dekt u?",
     "FOD Justitie, FOD Buitenlandse Zaken, rechtbank van eerste aanleg, hoven van beroep van Brussel, Luik, Namen, Bergen, Nijvel en Antwerpen, ambassades en consulaten, en kamers van koophandel."],
    ["Hoe lang duurt een legalisatie?",
     "De authenticatie bij de rechtbank is vaak onmiddellijk. De FOD Justitie en Buitenlandse Zaken vragen doorgaans elk 1 tot 2 werkdagen. De consulaire legalisatie varieert sterk per land: van 2 tot 14 dagen. De totale termijn wordt u vanaf de offerte meegedeeld."],
    ["Moet het document vertaald worden vóór de legalisatie?",
     "Meestal wel: de beëdigde vertaling gebeurt eerst, daarna wordt de handtekening van de vertaler geauthenticeerd door de griffie van de rechtbank, vóór de federale en consulaire stappen. Die volgorde vermijdt heen-en-weer."],
    ["Verplaatst u zich zelf naar de administraties?",
     "Ja. Onze dagelijkse fysieke aanwezigheid bij de Brusselse instanties laat toe de termijnen in te korten. Wij bieden ook bezorgdiensten aan in Brussel en elders."],
  ],
  visa: [
    ["Kunt u de verkrijging van mijn visum garanderen?",
     "Nee, en geen enkele tussenpersoon kan dat: de beslissing ligt uitsluitend bij het consulaat van het land van bestemming. Onze dienst betreft de conformiteit en volledigheid van het dossier, de afspraak, de indiening en de opvolging — dus alles wat het risico op weigering om een administratieve reden vermindert."],
    ["Waaruit bestaat uw dienst precies?",
     "Uit drie zaken: wij informeren u duidelijk over de procedure voor uw bestemming, wij controleren alle bezorgde documenten vóór indiening bij het consulaat, en zodra het visum is afgegeven, bezorgen wij u uw paspoort op de plaats van uw keuze."],
    ["Welke bestemmingen behandelt u?",
     "Het kantoor behandelt bijna 70 bestemmingen, van Algerije tot Zimbabwe, e-visa inbegrepen. Voor elke bestemming buiten de lijst neemt u contact op met het kantoor: wij behandelen ook die aanvragen."],
    ["Wat is het verschil tussen een consulair visum en een e-visum?",
     "Een consulair visum vereist de fysieke indiening van het paspoort bij de diplomatieke post. Een e-visum wordt elektronisch afgegeven, zonder indiening van het paspoort. De toepasselijke procedure hangt af van het land van bestemming en uw nationaliteit."],
    ["Moet ik mij persoonlijk verplaatsen?",
     "Dat hangt af van het consulaat: sommige vereisen een persoonlijke verschijning of biometrie, andere niet. Wij verduidelijken dit vanaf de analyse van het dossier en maken de afspraak in uw plaats wanneer dat mogelijk is."],
    ["Hoeveel op voorhand moet ik beginnen?",
     "Zo vroeg mogelijk. De aangekondigde termijnen lopen vanaf de indiening van een volledig dossier en houden geen rekening met piekperiodes of lokale feestdagen, die ze aanzienlijk kunnen verlengen."],
  ],
  generale: [
    ["Waar bevindt het kantoor zich en wanneer is het open?",
     "Travisum Louise Office, Louizalaan 367, 1050 Brussel. Het kantoor is open van maandag tot vrijdag, van 9 u 00 tot 17 u 00 doorlopend, om uw documenten af te geven en op te halen. Afspraken en persoonlijk advies ook mogelijk."],
    ["Hoe kan ik u bereiken?",
     "Telefonisch op 02 642 00 25 of 0485 948 935, per e-mail op info@travisum.com, of door langs te komen op kantoor. Voor een snelle offerte blijft het efficiëntst de scan van uw documenten per e-mail te sturen."],
    ["Behandelt u de drie diensten samen?",
     "Ja, en dat is het voordeel van één aanspreekpunt: eenzelfde aanvraag kan de beëdigde vertaling, de legalisatie bij de Belgische instanties en de consulaire indiening aaneenschakelen, zonder dat u drie dienstverleners hoeft te coördineren."],
    ["Kan ik mijn documenten laten bezorgen?",
     "Ja. Het kantoor biedt bezorgdiensten aan in Brussel en elders, en bezorgt u uw paspoort op de plaats van uw keuze na afgifte van het visum."],
  ],
};

/* -------------------------------------------------------------- FAQ · EN */
const FAQ_EN: FaqSet = {
  traduction: [
    ["What is the difference between a sworn and a standard translation?",
     "A sworn translation is produced by an expert translator approved by a Belgian Court of First Instance. It carries their signature, stamp and declaration of accuracy, which gives it legal value. A standard translation, produced by a professional translator, does not have that official value: it suits corporate communication, websites, technical manuals and internal documents."],
    ["Will my translation be accepted by the administration?",
     "For any document intended for an official authority — municipality, court, university, consulate — a sworn translation is required. Our translators are registered with the Belgian courts and their translations are recognised by Belgian and international authorities. Depending on the destination country, a legalisation or apostille may be added: we flag it from the quote."],
    ["How many languages do you translate?",
     "The office covers more than 80 languages, from Albanian to Wolof, from and into any other language. Sworn certification is not available in every language: the list shows those for which a sworn translator is available."],
    ["How do I get a quote quickly?",
     "Send the scan of your documents, at the best possible quality, to info@travisum.com. You receive a detailed proposal — firm price and timeline — within 2 working hours. You can also drop off your documents at the office, 367 avenue Louise, Monday to Friday."],
    ["Do I have to provide the original of my document?",
     "For translation alone, a legible scan is enough. If a legalisation or apostille is needed, the original is generally required: it can be dropped off at the office or posted. Originals entrusted to us never leave the office without traceability."],
    ["What happens to the copies of my documents?",
     "Documents provided are treated as confidential and are neither disclosed nor reused. Digital copies are deleted once the file is closed."],
  ],
  legalisation: [
    ["Apostille or full legalisation: how do I know?",
     "It depends solely on the destination country. If the country has signed the Hague Convention, a single apostille issued by the FPS Foreign Affairs is enough and no embassy visit is required. Otherwise, the full procedure applies, with a final legalisation by the embassy or consulate of the country concerned."],
    ["Which authorities do you cover?",
     "FPS Justice, FPS Foreign Affairs, Court of First Instance, Courts of Appeal of Brussels, Liège, Namur, Mons, Nivelles and Antwerp, embassies and consulates, and chambers of commerce."],
    ["How long does a legalisation take?",
     "Authentication at the court is often immediate. The FPS Justice and Foreign Affairs generally each require 1 to 2 working days. Consular legalisation varies greatly by country: from 2 to 14 days. The total timeline is given to you from the quote."],
    ["Does the document have to be translated before being legalised?",
     "Usually yes: the sworn translation comes first, then the translator's signature is authenticated by the court registry, before the federal and consular steps. That order avoids back-and-forth."],
    ["Do you go to the administrations yourselves?",
     "Yes. Our daily physical presence with the Brussels authorities is what makes it possible to shorten the timelines. We also offer delivery services in Brussels and elsewhere."],
  ],
  visa: [
    ["Can you guarantee I will obtain my visa?",
     "No, and no intermediary can: the decision rests solely with the consulate of the destination country. Our service covers the compliance and completeness of the file, the appointment, the submission and the follow-up — that is, everything that reduces the risk of refusal for an administrative reason."],
    ["What exactly does your service consist of?",
     "Three things: we clearly inform you about the procedure applicable to your destination, we check all the documents provided before submitting them to the consulate, then, once the visa is issued, we deliver your passport to the place of your choice."],
    ["Which destinations do you handle?",
     "The office handles nearly 70 destinations, from Algeria to Zimbabwe, e-visas included. For any destination outside the list, contact the office: we handle those requests too."],
    ["What is the difference between a consular visa and an e-visa?",
     "A consular visa requires the physical submission of the passport to the diplomatic mission. An e-visa is issued electronically, without submitting the passport. The applicable procedure depends on the destination country and your nationality."],
    ["Do I have to appear in person?",
     "It depends on the consulate: some require a personal appearance or biometrics, others do not. We specify this from the analysis of the file, and we book the appointment on your behalf when possible."],
    ["How far in advance should I start?",
     "As early as possible. The announced timelines run from the submission of a complete file and do not take into account peak periods or local public holidays, which can lengthen them significantly."],
  ],
  generale: [
    ["Where is the office and when is it open?",
     "Travisum Louise Office, 367 avenue Louise, 1050 Brussels. The office is open Monday to Friday, from 9:00 to 17:00 with no lunch break, to drop off and collect your documents. Appointments and personalised advice are also available."],
    ["How can I reach you?",
     "By phone at +32 2 642 00 25 or +32 485 948 935, by email at info@travisum.com, or by visiting the office. For a quick quote, the most efficient way remains sending the scan of your documents by email."],
    ["Do you handle the three services together?",
     "Yes, and that is the benefit of a single point of contact: one request can chain the sworn translation, the legalisation with the Belgian authorities and the consular submission, without you having to coordinate three providers."],
    ["Can I have my documents delivered?",
     "Yes. The office offers delivery services in Brussels and elsewhere, and delivers your passport to the place of your choice after the visa is issued."],
  ],
};

/* ----------------------------------------------------------- TARIFS · NL */
const TAR_NL: TarSet = {
  traduction: {
    colonnes: ["Prestatie", "Tarief"],
    lignes: [
      ["Beëdigde vertaling, per document", "Op offerte"],
      ["Vrije vertaling, per document", "Op offerte"],
      ["Nalezing van een bestaande vertaling", "Op offerte"],
      ["Bijkomend eensluidend afschrift", "Op offerte"],
    ],
    note: "Het tarief van een vertaling hangt af van het aantal tekens, de taal en de technische aard van het document: het wordt op offerte bepaald. Stuur ons een scan voor een vaste en gratis offerte.",
  },
  legalisation: {
    colonnes: ["Instantie", "Gemiddelde termijn", "Officiële kosten", "Honoraria"],
    lignes: [
      ["Rechtbank van eerste aanleg", "1 tot 2 weken", "Volgens officieel tarief", "Op offerte"],
      ["FOD Justitie", "1 tot 2 weken", "Volgens officieel tarief", "Op offerte"],
      ["FOD Buitenlandse Zaken — apostille", "1 tot 2 weken", "Volgens officieel tarief", "Op offerte"],
      ["Volledige consulaire keten", "2 tot 4 weken", "Volgens consulaat", "Op offerte"],
      ["Kamer van Koophandel (BECI)", "1 tot 2 weken", "Volgens officieel tarief", "Op offerte"],
    ],
    note: "De honoraria van het kantoor worden per dossier op offerte bepaald. De officiële kosten van de administratie of het consulaat worden tegen kostprijs doorgerekend, op voorlegging van bewijs.",
  },
  visa: {
    colonnes: ["Bestemming", "Type procedure", "Gemiddelde termijn", "Tarief"],
    lignes: [
      ["Russische Federatie", "Consulair visum", "2 tot 3 weken", "Op offerte"],
      ["Volksrepubliek China", "Consulair visum / e-visum", "2 tot 3 weken", "Op offerte"],
      ["Republiek India", "e-visum", "1 tot 2 weken", "Op offerte"],
      ["Andere bestemmingen", "Volgens het land", "2 tot 3 weken", "Op offerte"],
    ],
    note: "Alle tarieven worden op offerte bepaald, exclusief consulaire kosten. Voor elke bestemming maken wij een persoonlijke offerte op.",
  },
};

/* ----------------------------------------------------------- TARIFS · EN */
const TAR_EN: TarSet = {
  traduction: {
    colonnes: ["Service", "Rate"],
    lignes: [
      ["Sworn translation, per document", "On quote"],
      ["Standard translation, per document", "On quote"],
      ["Proofreading an existing translation", "On quote"],
      ["Additional certified copy", "On quote"],
    ],
    note: "The rate for a translation depends on the number of characters, the language and the technicality of the document: it is set on quote. Send us a scan for a firm, free quote.",
  },
  legalisation: {
    colonnes: ["Authority", "Average timeline", "Official fees", "Our fee"],
    lignes: [
      ["Court of First Instance", "1 to 2 weeks", "Per official rate", "On quote"],
      ["FPS Justice", "1 to 2 weeks", "Per official rate", "On quote"],
      ["FPS Foreign Affairs — apostille", "1 to 2 weeks", "Per official rate", "On quote"],
      ["Full consular chain", "2 to 4 weeks", "Depends on consulate", "On quote"],
      ["Chamber of Commerce (BECI)", "1 to 2 weeks", "Per official rate", "On quote"],
    ],
    note: "The office fees are set per file, on quote. Official fees charged by the administration or consulate are billed at cost, against receipt.",
  },
  visa: {
    colonnes: ["Destination", "Procedure type", "Average timeline", "Rate"],
    lignes: [
      ["Russian Federation", "Consular visa", "2 to 3 weeks", "On quote"],
      ["People's Republic of China", "Consular visa / e-visa", "2 to 3 weeks", "On quote"],
      ["Republic of India", "e-Visa", "1 to 2 weeks", "On quote"],
      ["Other destinations", "Depends on country", "2 to 3 weeks", "On quote"],
    ],
    note: "All rates are set on quote, excluding consular charges. We draw up a personalised quote for every destination.",
  },
};

export function faqL(lang: Locale): FaqSet {
  return lang === "nl" ? FAQ_NL : lang === "en" ? FAQ_EN : (FAQ as FaqSet);
}

export function tarifsL(lang: Locale): TarSet {
  return lang === "nl" ? TAR_NL : lang === "en" ? TAR_EN : (TARIFS as TarSet);
}
