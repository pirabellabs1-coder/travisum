/**
 * Contenu de la page e-Visa (FR). Organisé par région, avec le détail par pays,
 * puis des sections explicatives générales. Les `slug` renvoient vers la fiche
 * pays correspondante quand elle existe. Aucune donnée inventée : reprise du
 * brief fourni. Les conditions restent indicatives (décision aux autorités).
 */

export type EVisaPays = {
  nom: string;
  slug?: string; // fiche /visas/{slug}/ si disponible
  intro: string;
  nationalites?: string; // note « Nationalités européennes » propre au pays
  tourisme?: string;
  affaires?: string;
  documents?: string[];
  delai?: string;
  validite?: string;
};

export type EVisaRegion = { region: string; pays: EVisaPays[] };

export const EVISA_REGIONS: EVisaRegion[] = [
  {
    region: "Afrique",
    pays: [
      {
        nom: "Malawi",
        slug: "malawi",
        intro: "Le Malawi dispose d’un système officiel de visa électronique permettant d’introduire une demande avant le voyage.",
        nationalites: "Procédure disponible selon la catégorie de nationalité. Les voyageurs éligibles au visa à l’arrivée sont également encouragés par les autorités à demander leur visa en ligne avant le départ.",
        tourisme: "Oui.",
        affaires: "Oui, selon le motif du séjour.",
        documents: ["Passeport en cours de validité", "Photographie d’identité", "Informations personnelles", "Dates et itinéraire du voyage", "Justificatif d’hébergement", "Billet ou réservation de transport", "Documents professionnels ou invitation si nécessaire"],
        delai: "Variable selon le dossier. Une demande anticipée est recommandée.",
        validite: "Dépend de la catégorie de visa accordée et du nombre d’entrées.",
      },
      {
        nom: "Tchad",
        slug: "tchad",
        intro: "Le Tchad a développé une procédure électronique permettant d’effectuer les formalités de visa en ligne.",
        nationalites: "Ressortissants européens soumis à l’obligation de visa, selon leur nationalité.",
        tourisme: "Oui selon catégorie.",
        affaires: "Oui.",
        documents: ["Passeport valide", "Photographie récente", "Justificatif de profession", "Informations concernant le séjour", "Réservation ou adresse d’hébergement", "Pour les affaires : ordre de mission et/ou lettre d’invitation", "Documents de l’entreprise invitante lorsque requis"],
        delai: "Jusqu’à environ 10 jours ouvrables en procédure standard ; des traitements accélérés peuvent être proposés.",
        validite: "Selon le visa accordé : court séjour ou autres catégories disponibles.",
      },
      {
        nom: "Guinée",
        slug: "guinee-republique",
        intro: "La République de Guinée propose une procédure électronique pour les voyageurs soumis à visa.",
        nationalites: "Selon le passeport utilisé et les règles d’entrée applicables.",
        tourisme: "Oui.",
        affaires: "Oui.",
        documents: ["Passeport valable au moins six mois", "Photographie", "Copie du passeport", "Billet aller-retour ou de continuation", "Hébergement", "Certificat de vaccination contre la fièvre jaune lorsque requis", "Invitation ou documents professionnels pour un déplacement d’affaires"],
        delai: "Variable ; introduction suffisamment avant le départ recommandée.",
        validite: "Selon la catégorie délivrée.",
      },
      {
        nom: "Bénin",
        slug: "benin",
        intro: "Le Bénin possède une plateforme gouvernementale entièrement dédiée aux demandes d’e-Visa.",
        nationalites: "Nombreuses nationalités étrangères éligibles ; vérification selon le passeport.",
        tourisme: "Oui.",
        affaires: "Oui selon le motif déclaré.",
        documents: ["Passeport", "Adresse e-mail", "Informations personnelles", "Dates du séjour", "Informations relatives au voyage", "Documents complémentaires lorsque demandés"],
        delai: "Généralement rapide, sous réserve du contrôle des autorités.",
        validite: "Plusieurs durées et possibilités d’entrée selon la demande.",
      },
      {
        nom: "Togo",
        slug: "togo",
        intro: "Le Togo a digitalisé ses formalités d’immigration et ses demandes de visa via la plateforme Togo Voyage. Les voyages pour réunions, salons, séminaires ou conférences peuvent entrer dans les catégories prévues par les autorités.",
        tourisme: "Oui.",
        affaires: "Oui.",
        documents: ["Formulaire électronique", "Copie du passeport", "Photographie", "Informations concernant le voyage", "Hébergement", "Justificatifs supplémentaires selon le motif"],
        delai: "La demande doit être introduite au moins 5 jours avant l’arrivée.",
        validite: "1 à 15 jours, 16 à 30 jours, ou jusqu’à 90 jours selon la catégorie et le nombre d’entrées.",
      },
      {
        nom: "Éthiopie",
        slug: "ethiopie",
        intro: "L’Éthiopie possède l’un des systèmes d’e-Visa les plus développés d’Afrique. Le visa touristique électronique est ouvert aux ressortissants de tous les pays sous réserve du respect des conditions.",
        tourisme: "Oui — généralement environ 3 jours de traitement.",
        affaires: "Oui, avec des catégories professionnelles spécifiques.",
        documents: ["Tourisme : passeport valable au moins 6 mois, photographie récente, copie couleur du passeport", "Business : passeport, photo, relevé bancaire selon catégorie, profil de l’entreprise, lettre de demande, justificatifs professionnels"],
        delai: "Tourisme : généralement environ 3 jours.",
        validite: "Tourisme : 30 jours (entrée unique) ou 90 jours (entrée unique). Business : 30 jours et certaines formules 90 jours selon la catégorie.",
      },
      {
        nom: "Tanzanie",
        slug: "tanzanie",
        intro: "La Tanzanie dispose d’un système officiel permettant d’introduire les demandes de visa en ligne (Tanzanie continentale et Zanzibar).",
        nationalites: "Selon la nationalité et le régime d’entrée applicable.",
        tourisme: "Oui.",
        affaires: "Catégories spécifiques disponibles.",
        documents: ["Passeport", "Photographie", "Informations personnelles", "Informations de voyage", "Hébergement", "Billet retour ou continuation", "Justificatifs professionnels pour certaines catégories"],
        delai: "Prévoir plusieurs jours et introduire la demande suffisamment tôt.",
        validite: "Selon la catégorie accordée.",
      },
      {
        nom: "Ouganda",
        slug: "ouganda",
        intro: "L’Ouganda propose une procédure électronique pour les voyageurs ayant besoin d’un visa.",
        tourisme: "Oui.",
        affaires: "Selon le motif et la catégorie.",
        documents: ["Passeport valide", "Photographie", "Certificat de vaccination contre la fièvre jaune", "Informations concernant le voyage", "Justificatif d’hébergement", "Documents complémentaires selon le motif"],
        delai: "Variable.",
        validite: "Dépend du visa accordé.",
      },
      {
        nom: "Zambie",
        slug: "zambie",
        intro: "La Zambie propose des services électroniques d’immigration pour les voyageurs soumis à visa.",
        tourisme: "Oui lorsque le visa est requis.",
        affaires: "Oui selon catégorie.",
        documents: ["Passeport", "Photographie", "Itinéraire", "Hébergement", "Billet retour", "Lettre d’invitation ou documents professionnels si applicable"],
        delai: "Variable selon la nationalité et la catégorie.",
        validite: "Variable selon la nationalité et la catégorie.",
      },
      {
        nom: "Zimbabwe",
        slug: "zimbabwe",
        intro: "Le Zimbabwe propose une procédure électronique pour les nationalités éligibles.",
        tourisme: "Oui.",
        affaires: "Selon catégorie et motif.",
        documents: ["Passeport", "Photographie", "Coordonnées personnelles", "Réservation d’hébergement", "Itinéraire", "Invitation professionnelle lorsque nécessaire"],
        delai: "Variable.",
        validite: "Selon la catégorie et le nombre d’entrées autorisées.",
      },
      {
        nom: "Mozambique",
        slug: "mozambique",
        intro: "Le Mozambique a lancé sa nouvelle plateforme officielle e-Visa en février 2026. Catégories disponibles : tourisme, affaires, investissement, sport, culture, assistance humanitaire et autres activités spécifiques.",
        tourisme: "Oui.",
        affaires: "Oui, plusieurs catégories professionnelles existent.",
        documents: ["Passeport", "Photo", "Informations du voyage", "Hébergement", "Documents correspondant au motif du séjour"],
        delai: "Demande en ligne, téléchargement des justificatifs, paiement puis réception du document électronique.",
        validite: "Variable selon la catégorie sélectionnée.",
      },
      {
        nom: "Cameroun",
        slug: "cameroun",
        intro: "Le Cameroun utilise une procédure électronique pour les demandes de visa.",
        tourisme: "Oui.",
        affaires: "Oui.",
        documents: ["Passeport", "Photo", "Billet ou réservation de voyage", "Justificatif d’hébergement", "Invitation ou ordre de mission pour un voyage professionnel", "Justificatifs supplémentaires selon la catégorie"],
        delai: "Variable selon le dossier.",
        validite: "Court ou long séjour selon la catégorie délivrée.",
      },
      {
        nom: "Nigeria",
        slug: "nigeria",
        intro: "Le Nigeria a développé une procédure e-Visa comprenant différentes catégories professionnelles et de visite. Pour certains visas business électroniques, les activités autorisées peuvent comprendre réunions, conférences, négociations de contrats, marketing, ventes, formations et salons professionnels.",
        tourisme: "Selon la catégorie applicable.",
        affaires: "Oui, particulièrement adapté aux voyageurs professionnels.",
        documents: ["Passeport valable au moins 6 mois", "Photographie", "Lettre d’invitation de la société nigériane", "Documents d’enregistrement de l’entreprise invitante", "Billet retour", "Hôtel ou adresse de l’hôte"],
        delai: "Certaines catégories électroniques annoncent un traitement pouvant être très rapide lorsque le dossier répond aux conditions.",
        validite: "Certaines catégories business sont valables 90 jours avec séjour maximal de 30 jours par visite.",
      },
      {
        nom: "Égypte",
        slug: "egypte",
        intro: "L’Égypte dispose d’un portail gouvernemental de visa électronique. Les passeports belge, français, néerlandais, luxembourgeois, allemand et espagnol figurent parmi les nationalités pouvant utiliser le système.",
        tourisme: "Oui.",
        documents: ["Passeport valable au moins 6 mois à l’arrivée", "Impression de l’e-Visa", "Itinéraire", "Réservation d’hôtel", "Justificatifs concernant le séjour", "Lettre d’entreprise ou invitation lorsqu’elle est pertinente"],
        validite: "Visa touristique à entrée unique ou entrées multiples selon la demande.",
      },
    ],
  },
  {
    region: "Asie",
    pays: [
      {
        nom: "Inde",
        slug: "inde",
        intro: "L’Inde constitue l’une des destinations e-Visa les plus importantes pour les voyageurs européens. Les titulaires de passeports belges, français et allemands, ainsi qu’un très grand nombre d’autres nationalités, figurent sur la liste officielle des nationalités éligibles. Catégories : e-Tourist, e-Business, e-Medical, e-Medical Attendant, e-Conference et autres.",
        tourisme: "Oui.",
        affaires: "Oui.",
        documents: ["Tourisme : passeport, photographie d’identité au format requis, copie numérique de la page d’identité, informations sur le séjour", "Business : passeport, photo, documents professionnels, informations de la société, invitation ou carte professionnelle selon la catégorie"],
        delai: "Prévoir plusieurs jours avant le voyage.",
        validite: "Plusieurs formules selon le type d’e-Visa.",
      },
      {
        nom: "Vietnam",
        slug: "vietnam",
        intro: "Le Vietnam dispose d’un système national de visa électronique largement accessible aux titulaires de passeports étrangers répondant aux conditions.",
        tourisme: "Oui.",
        affaires: "Possible via le système électronique selon le motif et les règles applicables.",
        documents: ["Passeport", "Photographie", "Copie de la page d’identité", "Informations personnelles", "Dates d’entrée et de sortie", "Point d’entrée prévu"],
        validite: "Jusqu’à 90 jours — entrée unique ou entrées multiples.",
      },
      {
        nom: "Cambodge",
        slug: "cambodge-2",
        intro: "Le Cambodge propose une procédure électronique pour les voyageurs éligibles.",
        tourisme: "Oui.",
        affaires: "Vérifier la catégorie exacte avant la demande : toutes les formules électroniques ne couvrent pas les mêmes activités.",
        documents: ["Passeport", "Photographie", "Informations personnelles", "Adresse d’hébergement", "Dates du séjour", "Point d’entrée"],
        delai: "Généralement quelques jours.",
        validite: "Selon le visa délivré et la durée de séjour autorisée.",
      },
      {
        nom: "Indonésie",
        slug: "indonesie",
        intro: "L’Indonésie a fortement digitalisé ses procédures d’immigration et propose différentes catégories de visas électroniques.",
        tourisme: "Oui.",
        affaires: "Oui pour certaines activités et catégories.",
        documents: ["Passeport", "Photographie", "Informations personnelles", "Billet ou itinéraire", "Hébergement", "Justificatifs professionnels selon le motif"],
        validite: "Dépend de la catégorie électronique sélectionnée.",
      },
      {
        nom: "Laos",
        slug: "laos",
        intro: "Le Laos dispose d’un portail gouvernemental officiel e-Visa.",
        tourisme: "Oui.",
        affaires: "L’e-Visa standard vise surtout les catégories autorisées ; vérifier les voyages professionnels séparément.",
        documents: ["Passeport", "Photographie", "Copie du passeport", "Informations de voyage"],
        delai: "Environ 3 jours ouvrables lorsque le dossier est complet.",
      },
      {
        nom: "Pakistan",
        slug: "pakistan",
        intro: "Le Pakistan dispose d’un système de visa en ligne couvrant différentes catégories.",
        tourisme: "Oui selon nationalité.",
        affaires: "Oui.",
        documents: ["Passeport", "Photographie", "Informations personnelles", "Hébergement", "Itinéraire", "Invitation ou documents d’entreprise pour les voyages professionnels"],
        delai: "Variable selon la catégorie et la nationalité.",
        validite: "Variable selon la catégorie et la nationalité.",
      },
      {
        nom: "Myanmar",
        slug: "birmanie-myanmar",
        intro: "Le Myanmar possède un système officiel proposant des e-Visas touristiques et business. Attention : les conditions d’accès et la disponibilité de certaines catégories peuvent évoluer rapidement — une vérification avant toute demande est indispensable.",
        affaires: "e-Visa business disponible pour les nationalités éligibles.",
        documents: ["Business : photo numérique, copie du passeport, lettre d’invitation, lettre de demande business, enregistrement de l’entreprise, extrait de société, justificatifs annuels requis"],
        delai: "Demande en ligne, paiement, réception de la lettre d’approbation puis formalités à l’arrivée.",
      },
    ],
  },
  {
    region: "Moyen-Orient et Caucase",
    pays: [
      {
        nom: "Azerbaïdjan",
        intro: "L’Azerbaïdjan dispose du système officiel ASAN Visa. Les titulaires de passeports belges, français, allemands, espagnols, néerlandais et luxembourgeois figurent parmi les nationalités éligibles.",
        tourisme: "Oui.",
        affaires: "Possible selon l’objet autorisé et les conditions du visa.",
        documents: ["Passeport", "Données personnelles", "Informations du voyage", "Copie numérique des documents requis"],
        delai: "Standard : demande au moins 3 jours ouvrables avant l’arrivée. Urgent : traitement pouvant être effectué en environ 3 heures.",
      },
      {
        nom: "Arabie saoudite",
        slug: "arabie-saoudite",
        intro: "L’Arabie saoudite propose un e-Visa touristique aux ressortissants de nombreux pays (passeports belge, français, allemand, espagnol, néerlandais et luxembourgeois parmi les nationalités éligibles). Il permet tourisme, loisirs, événements, visite de famille ou de proches, et Omra hors Hajj sous réserve des règles applicables. Il ne doit pas être confondu avec un visa de travail ou professionnel.",
        tourisme: "Oui.",
        validite: "1 an, entrées multiples. Séjour jusqu’à 90 jours selon les conditions applicables.",
      },
      {
        nom: "Oman",
        slug: "oman",
        intro: "Le Sultanat d’Oman dispose d’un portail officiel e-Visa géré par la Royal Oman Police. Le système distingue notamment : visa touristique non sponsorisé, visa touristique sponsorisé, visas pour résidents GCC, visas express et autres catégories de visite.",
        tourisme: "Oui pour les voyageurs ayant besoin d’un visa et remplissant les conditions.",
        affaires: "Catégories sponsorisées ou spécifiques selon le déplacement.",
        documents: ["Passeport", "Photo couleur récente", "Justificatifs affichés par le système selon la catégorie", "Documents du sponsor lorsque nécessaire"],
        validite: "Dépend de la catégorie ; certaines formules non sponsorisées doivent être utilisées dans le mois suivant leur délivrance.",
      },
      {
        nom: "Bahreïn",
        intro: "Bahreïn dispose d’un système officiel de visas électroniques permettant aux nationalités éligibles de demander leur visa à distance.",
        tourisme: "Oui selon nationalité.",
        affaires: "Oui selon la catégorie choisie.",
        documents: ["Passeport", "Informations de voyage", "Hébergement", "Billet retour ou continuation", "Justificatifs supplémentaires selon le visa"],
        delai: "Variable selon la catégorie et le nombre d’entrées.",
        validite: "Variable selon la catégorie et le nombre d’entrées.",
      },
      {
        nom: "Irak",
        intro: "L’Irak dispose désormais d’une plateforme officielle de visa électronique du ministère de l’Intérieur.",
        tourisme: "Catégories disponibles selon la nationalité et le motif.",
        affaires: "Vérifier la catégorie correspondant exactement au déplacement professionnel.",
        documents: ["Passeport", "Photographie", "Informations personnelles", "Détails du voyage", "Justificatifs correspondant à la catégorie demandée", "Documents professionnels lorsque nécessaires"],
        delai: "Selon la catégorie délivrée.",
        validite: "Selon la catégorie délivrée.",
      },
    ],
  },
];

export const EVISA_ETAPES: { titre: string; texte: string }[] = [
  { titre: "Vérification de l’éligibilité", texte: "Nous vérifions votre nationalité, le type de passeport, votre destination, la durée du séjour et le motif du voyage." },
  { titre: "Préparation des documents", texte: "Selon le pays : copie couleur du passeport, photo d’identité numérique, réservation des vols, hébergement, invitation privée ou professionnelle, ordre de mission, documents de l’entreprise invitante, preuve de ressources, certificat de vaccination, et autres justificatifs exigés." },
  { titre: "Préparation de la demande", texte: "Les informations sont vérifiées avant l’introduction afin d’éviter les erreurs susceptibles de retarder le traitement." },
  { titre: "Introduction électronique", texte: "La demande est introduite conformément à la procédure officielle du pays de destination." },
  { titre: "Réception de l’e-Visa", texte: "Après approbation, le document électronique est transmis au voyageur. Selon la destination, il devra être imprimé ou conservé sous format électronique pendant le voyage." },
];

export const EVISA_BUSINESS_MOTIFS = [
  "Rencontrer un client ou un fournisseur",
  "Participer à une réunion",
  "Assister à une conférence",
  "Participer à un salon professionnel",
  "Négocier un contrat",
  "Effectuer une mission professionnelle",
  "Visiter un partenaire commercial",
];

// --------------------------------------------------------------------------
// Métadonnées par pays pour les pages dédiées `/e-visa/{evSlug}/`.
// Clé = `nom` exact tel qu'il figure dans EVISA_REGIONS. `seoTitre`/`seoDesc`
// sont repris tels quels du brief (FR). `nomLoc` donne le nom localisé quand
// il diffère du français (utilisé dans les titres NL/EN).
// --------------------------------------------------------------------------
export type EVisaMeta = {
  evSlug: string;
  seoTitre: string;
  seoDesc: string;
  nomLoc?: { nl?: string; en?: string };
};

export const EVISA_META: Record<string, EVisaMeta> = {
  Malawi: {
    evSlug: "malawi",
    seoTitre: "E-Visa Malawi depuis la Belgique et l’Europe | Demande en ligne",
    seoDesc: "Demandez votre e-Visa pour le Malawi depuis la Belgique ou l’Europe. Documents, procédure, délais et accompagnement pour tourisme ou voyage professionnel.",
  },
  Tchad: {
    evSlug: "tchad",
    seoTitre: "E-Visa Tchad en ligne | Visa tourisme et affaires depuis l’Europe",
    seoDesc: "Besoin d’un e-Visa pour le Tchad ? Assistance pour votre demande depuis la Belgique et l’Europe : documents, invitation professionnelle, délais et procédure.",
    nomLoc: { nl: "Tsjaad", en: "Chad" },
  },
  "Guinée": {
    evSlug: "guinee",
    seoTitre: "E-Visa Guinée depuis la Belgique | Demande de visa électronique",
    seoDesc: "Préparez votre e-Visa Guinée depuis la Belgique ou l’Europe. Visa touristique ou professionnel, documents nécessaires et assistance à la demande.",
    nomLoc: { nl: "Guinee", en: "Guinea" },
  },
  "Bénin": {
    evSlug: "benin",
    seoTitre: "E-Visa Bénin en ligne | Visa depuis la Belgique et l’Europe",
    seoDesc: "Demandez votre e-Visa Bénin en ligne. Assistance depuis la Belgique, la France, le Luxembourg, les Pays-Bas, l’Allemagne et l’Espagne.",
    nomLoc: { nl: "Benin", en: "Benin" },
  },
  Togo: {
    evSlug: "togo",
    seoTitre: "E-Visa Togo | Demande de visa Togo en ligne depuis l’Europe",
    seoDesc: "Obtenez votre e-Visa Togo depuis la Belgique et l’Europe. Tourisme, affaires, documents, durée du visa et accompagnement de votre demande.",
  },
  "Éthiopie": {
    evSlug: "ethiopie",
    seoTitre: "E-Visa Éthiopie | Tourisme et Business depuis la Belgique",
    seoDesc: "Demandez votre e-Visa Éthiopie depuis la Belgique ou l’Europe. Visa 30 ou 90 jours, tourisme et affaires, documents et procédure en ligne.",
    nomLoc: { nl: "Ethiopië", en: "Ethiopia" },
  },
  Tanzanie: {
    evSlug: "tanzanie",
    seoTitre: "E-Visa Tanzanie depuis la Belgique | Visa en ligne",
    seoDesc: "Demande d’e-Visa Tanzanie pour tourisme ou affaires. Vérification des documents et accompagnement depuis la Belgique et l’Europe.",
    nomLoc: { nl: "Tanzania", en: "Tanzania" },
  },
  Ouganda: {
    evSlug: "ouganda",
    seoTitre: "E-Visa Ouganda | Demande depuis la Belgique et l’Europe",
    seoDesc: "Préparez votre e-Visa Ouganda en ligne : documents, passeport, vaccination, tourisme et voyages professionnels depuis la Belgique et l’Europe.",
    nomLoc: { nl: "Oeganda", en: "Uganda" },
  },
  Zambie: {
    evSlug: "zambie",
    seoTitre: "E-Visa Zambie | Visa électronique depuis l’Europe",
    seoDesc: "Assistance pour votre e-Visa Zambie depuis la Belgique et l’Europe. Documents, tourisme, business et procédure de demande en ligne.",
    nomLoc: { nl: "Zambia", en: "Zambia" },
  },
  Zimbabwe: {
    evSlug: "zimbabwe",
    seoTitre: "E-Visa Zimbabwe en ligne | Belgique et Europe",
    seoDesc: "Vérifiez votre éligibilité et préparez votre e-Visa Zimbabwe depuis la Belgique ou l’Europe pour tourisme ou déplacement professionnel.",
  },
  Mozambique: {
    evSlug: "mozambique",
    seoTitre: "E-Visa Mozambique 2026 | Nouvelle procédure en ligne",
    seoDesc: "Nouvelle procédure e-Visa Mozambique. Demande depuis la Belgique et l’Europe pour tourisme, affaires ou investissement : documents et accompagnement.",
  },
  Cameroun: {
    evSlug: "cameroun",
    seoTitre: "E-Visa Cameroun depuis la Belgique | Tourisme et Affaires",
    seoDesc: "Demandez votre e-Visa Cameroun depuis la Belgique et l’Europe. Assistance pour tourisme, affaires, invitations et constitution du dossier.",
    nomLoc: { nl: "Kameroen", en: "Cameroon" },
  },
  Nigeria: {
    evSlug: "nigeria",
    seoTitre: "E-Visa Nigeria Business | Visa d’affaires depuis la Belgique",
    seoDesc: "Voyage professionnel au Nigeria ? Assistance e-Visa Nigeria pour réunions, conférences et affaires depuis la Belgique et l’Europe.",
  },
  "Égypte": {
    evSlug: "egypte",
    seoTitre: "E-Visa Égypte depuis la Belgique | Demande en ligne",
    seoDesc: "Demandez votre e-Visa Égypte depuis la Belgique ou l’Europe. Passeports belge, français, néerlandais, allemand, espagnol et luxembourgeois.",
    nomLoc: { nl: "Egypte", en: "Egypt" },
  },
  Inde: {
    evSlug: "inde",
    seoTitre: "E-Visa Inde depuis la Belgique | Tourisme et Business",
    seoDesc: "Demandez votre e-Visa Inde depuis la Belgique ou l’Europe. Visa touristique et business, documents, photo, passeport et assistance complète.",
    nomLoc: { nl: "India", en: "India" },
  },
  Vietnam: {
    evSlug: "vietnam",
    seoTitre: "E-Visa Vietnam 90 jours | Visa Vietnam depuis la Belgique",
    seoDesc: "Demandez votre e-Visa Vietnam jusqu’à 90 jours, simple ou multiples entrées. Assistance depuis la Belgique, France, Luxembourg et Europe.",
  },
  Cambodge: {
    evSlug: "cambodge",
    seoTitre: "E-Visa Cambodge | Demande de visa en ligne depuis l’Europe",
    seoDesc: "Préparez votre e-Visa Cambodge depuis la Belgique ou l’Europe. Documents, délais, validité et assistance pour votre demande en ligne.",
    nomLoc: { nl: "Cambodja", en: "Cambodia" },
  },
  "Indonésie": {
    evSlug: "indonesie",
    seoTitre: "E-Visa Indonésie | Visa Bali et Indonésie depuis la Belgique",
    seoDesc: "Demandez votre e-Visa Indonésie ou Bali depuis la Belgique et l’Europe. Tourisme, business, documents et accompagnement de votre dossier.",
    nomLoc: { nl: "Indonesië", en: "Indonesia" },
  },
  Laos: {
    evSlug: "laos",
    seoTitre: "E-Visa Laos | Demande en ligne depuis la Belgique",
    seoDesc: "Obtenez votre e-Visa Laos en ligne. Documents, délai indicatif de 3 jours ouvrables et accompagnement depuis la Belgique et l’Europe.",
  },
  Pakistan: {
    evSlug: "pakistan",
    seoTitre: "E-Visa Pakistan | Tourisme et Business depuis l’Europe",
    seoDesc: "Assistance pour votre e-Visa Pakistan depuis la Belgique et l’Europe : tourisme, affaires, invitation professionnelle et documents nécessaires.",
  },
  Myanmar: {
    evSlug: "myanmar",
    seoTitre: "E-Visa Myanmar | Business et voyage depuis l’Europe",
    seoDesc: "Vérifiez les conditions actuelles de l’e-Visa Myanmar. Assistance pour les demandes business et les formalités électroniques depuis l’Europe.",
  },
  "Azerbaïdjan": {
    evSlug: "azerbaidjan",
    seoTitre: "E-Visa Azerbaïdjan | ASAN Visa depuis la Belgique",
    seoDesc: "Demandez votre e-Visa Azerbaïdjan depuis la Belgique ou l’Europe. ASAN Visa standard ou urgent, documents et assistance en ligne.",
    nomLoc: { nl: "Azerbeidzjan", en: "Azerbaijan" },
  },
  "Arabie saoudite": {
    evSlug: "arabie-saoudite",
    seoTitre: "E-Visa Arabie saoudite | Visa en ligne depuis la Belgique",
    seoDesc: "Demandez votre e-Visa Arabie saoudite depuis la Belgique et l’Europe. Visa touristique 1 an, entrées multiples et séjour jusqu’à 90 jours.",
    nomLoc: { nl: "Saoedi-Arabië", en: "Saudi Arabia" },
  },
  Oman: {
    evSlug: "oman",
    seoTitre: "E-Visa Oman | Visa électronique depuis la Belgique et l’Europe",
    seoDesc: "Préparez votre e-Visa Oman en ligne. Tourisme, visa sponsorisé, documents et vérification de l’éligibilité depuis la Belgique et l’Europe.",
  },
  "Bahreïn": {
    evSlug: "bahrein",
    seoTitre: "E-Visa Bahreïn | Tourisme et Business depuis l’Europe",
    seoDesc: "Demandez votre e-Visa Bahreïn depuis la Belgique ou l’Europe. Tourisme et affaires : éligibilité, documents, validité et procédure en ligne.",
    nomLoc: { nl: "Bahrein", en: "Bahrain" },
  },
  Irak: {
    evSlug: "irak",
    seoTitre: "E-Visa Irak | Nouvelle demande de visa électronique",
    seoDesc: "Demandez votre e-Visa Irak en ligne. Vérification de l’éligibilité, documents, tourisme ou voyage professionnel depuis la Belgique et l’Europe.",
    nomLoc: { en: "Iraq" },
  },
};

export type EVisaPaysComplet = EVisaPays & EVisaMeta & { region: string };

/** Liste à plat des pays e-Visa (jointure REGIONS × META), pour les routes. */
export const EVISA_PAYS: EVisaPaysComplet[] = EVISA_REGIONS.flatMap((r) =>
  r.pays
    .filter((p) => EVISA_META[p.nom])
    .map((p) => ({ ...p, ...EVISA_META[p.nom], region: r.region }))
);

export const EVISA_SLUGS: string[] = EVISA_PAYS.map((p) => p.evSlug);

export function evisaParSlug(slug: string): EVisaPaysComplet | undefined {
  return EVISA_PAYS.find((p) => p.evSlug === slug);
}

/** Nom du pays dans la langue demandée (repli sur le français). */
export function evisaNom(p: EVisaPaysComplet, lang: "fr" | "nl" | "en"): string {
  if (lang === "fr") return p.nom;
  return p.nomLoc?.[lang] ?? p.nom;
}
