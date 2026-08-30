/**
 * Contenu des quatre pages légales.
 *
 * AVERTISSEMENT — Ces textes sont une trame de travail, pas un avis
 * juridique. Chaque mention « à compléter » doit être renseignée par le
 * bureau, et l'ensemble relu par son conseil avant mise en ligne. Le métier
 * — recevoir des copies de passeports, d'actes d'état civil et de diplômes —
 * place le bureau en position de responsable de traitement au sens du RGPD.
 */

import { Encart, Lien, Liste, P, type Article } from "@/components/PageLegale";
import { CONTACT } from "./donnees";

const A_COMPLETER = "à compléter par le bureau";
const ADRESSE = `${CONTACT.rue}, ${CONTACT.code_postal} ${CONTACT.ville}, ${CONTACT.pays}`;
const Mail = () => <Lien href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Lien>;

// --------------------------------------------------------------------------
export const MENTIONS: Article[] = [
  {
    ancre: "editeur",
    titre: "Éditeur du site",
    contenu: (
      <>
        <P>
          Le présent site est édité par <strong>{CONTACT.raison}</strong>, bureau de
          traduction jurée, de légalisation de documents et d’assistance aux demandes de
          visa.
        </P>
        <Liste
          items={[
            `Adresse : ${ADRESSE}`,
            <>
              Courriel : <Mail />
            </>,
            `Forme juridique : ${A_COMPLETER}`,
            `Numéro d’entreprise (BCE) : ${A_COMPLETER}`,
            `Numéro de TVA intracommunautaire : ${A_COMPLETER}`,
          ]}
        />
        <Encart titre="À renseigner avant mise en ligne" ton="rouge">
          La forme juridique, le numéro d’entreprise et le numéro de TVA sont obligatoires
          pour une entreprise établie en Belgique.
        </Encart>
      </>
    ),
  },
  {
    ancre: "publication",
    titre: "Directeur de la publication",
    contenu: (
      <>
        <P>
          Le directeur de la publication est {A_COMPLETER}, en qualité de représentant légal
          de {CONTACT.raison}.
        </P>
        <P>
          Toute demande relative au contenu éditorial du site peut être adressée à <Mail />.
        </P>
      </>
    ),
  },
  {
    ancre: "hebergement",
    titre: "Hébergement",
    contenu: (
      <>
        <P>Le site est hébergé par {A_COMPLETER}.</P>
        <P>
          Les coordonnées complètes de l’hébergeur (raison sociale, adresse, téléphone)
          seront précisées ici lors de la mise en production.
        </P>
      </>
    ),
  },
  {
    ancre: "propriete",
    titre: "Propriété intellectuelle",
    contenu: (
      <>
        <P>
          L’ensemble des éléments du site — structure, textes, mise en page, identité
          visuelle, illustrations et code source — est protégé par le droit d’auteur. Toute
          reproduction ou représentation, totale ou partielle, sans autorisation écrite
          préalable est interdite.
        </P>
        <P>
          Les dénominations et logos des administrations et institutions citées (SPF
          Justice, SPF Affaires étrangères, tribunaux, chambres de commerce, représentations
          diplomatiques) appartiennent à leurs titulaires respectifs et ne sont mentionnés
          qu’à titre informatif.
        </P>
      </>
    ),
  },
  {
    ancre: "responsabilite",
    titre: "Limitation de responsabilité",
    contenu: (
      <>
        <P>
          Les informations publiées — délais, procédures, listes de pièces, tarifs — sont
          fournies à titre d’information générale. Elles décrivent des pratiques
          administratives qui évoluent, parfois sans préavis, et qui dépendent du pays de
          destination, de la nationalité du demandeur et de la nature du document.
        </P>
        <P>
          Elles ne constituent ni un engagement contractuel, ni un conseil juridique. Seul
          le devis nominatif remis par le bureau engage celui-ci.
        </P>
        <Encart titre="La décision appartient à l’autorité saisie">
          Le bureau assure la conformité et la complétude des dossiers. La délivrance d’un
          visa, l’acceptation d’une traduction ou l’apposition d’une légalisation relèvent
          exclusivement de l’administration ou du consulat concerné.
        </Encart>
      </>
    ),
  },
  {
    ancre: "liens",
    titre: "Liens vers des sites tiers",
    contenu: (
      <P>
        Le site peut renvoyer vers des sites d’administrations, de consulats ou
        d’institutions. Ces liens sont proposés pour la commodité du visiteur ; le bureau
        n’exerce aucun contrôle sur leur contenu et ne saurait en être tenu responsable.
      </P>
    ),
  },
  {
    ancre: "droit",
    titre: "Droit applicable",
    contenu: (
      <P>
        Les présentes mentions sont régies par le droit belge. Tout litige relatif à leur
        interprétation ou à leur exécution relève, à défaut de résolution amiable, de la
        compétence des tribunaux de l’arrondissement judiciaire de Bruxelles.
      </P>
    ),
  },
];

// --------------------------------------------------------------------------
export const CONFIDENTIALITE: Article[] = [
  {
    ancre: "responsable",
    titre: "Responsable du traitement",
    contenu: (
      <>
        <P>
          {CONTACT.raison}, {ADRESSE}, est responsable du traitement des données
          personnelles collectées dans le cadre de ses prestations.
        </P>
        <P>
          Pour toute question relative à vos données : <Mail />.
        </P>
      </>
    ),
  },
  {
    ancre: "donnees",
    titre: "Quelles données sont collectées",
    contenu: (
      <>
        <P>
          Le métier du bureau suppose la manipulation de documents sensibles. Les catégories
          suivantes sont susceptibles d’être traitées :
        </P>
        <Liste
          items={[
            <>
              <strong>Données d’identification</strong> : nom, prénom, date et lieu de
              naissance, nationalité, adresse.
            </>,
            <>
              <strong>Données de contact</strong> : adresse électronique, numéro de
              téléphone, éventuellement société.
            </>,
            <>
              <strong>Copies de documents officiels</strong> : passeport, carte d’identité,
              acte de naissance, acte de mariage, diplôme, extrait de casier judiciaire,
              acte notarié.
            </>,
            <>
              <strong>Données relatives au dossier</strong> : destination, motif du séjour,
              langue source et cible, échanges liés au traitement.
            </>,
          ]}
        />
        <Encart titre="Données particulières">
          Certains documents (certificat médical, extrait de casier judiciaire) contiennent
          des données relevant de catégories particulières au sens de l’article 9 du RGPD.
          Ils ne sont traités que sur votre demande expresse, pour la seule exécution de la
          prestation.
        </Encart>
        <Encart titre="Assistant en ligne et prise de rendez-vous">
          Le site propose un assistant de discussion : le contenu des messages que vous y
          saisissez est transmis à un prestataire technique d’intelligence artificielle
          (Anthropic) dans le seul but de générer une réponse. N’y communiquez ni pièces
          d’identité ni données sensibles. Le formulaire « Prendre rendez-vous » transmet
          les coordonnées que vous indiquez, par courrier électronique et via un prestataire
          d’envoi d’e-mails, au bureau afin qu’il vous recontacte. Ces échanges ne servent
          qu’à traiter votre demande.
        </Encart>
      </>
    ),
  },
  {
    ancre: "finalites",
    titre: "À quoi elles servent",
    contenu: (
      <>
        <Liste
          items={[
            "Établir un devis et exécuter la prestation demandée — base légale : exécution du contrat ou mesures précontractuelles.",
            "Transmettre les pièces aux administrations, tribunaux et représentations diplomatiques compétents — base légale : exécution du contrat.",
            "Respecter les obligations comptables et fiscales du bureau — base légale : obligation légale.",
            "Répondre à vos demandes d’information — base légale : intérêt légitime.",
          ]}
        />
        <P>
          Vos données ne sont utilisées ni à des fins de prospection commerciale, ni de
          profilage, et ne font l’objet d’aucune décision automatisée.
        </P>
      </>
    ),
  },
  {
    ancre: "destinataires",
    titre: "Qui y a accès",
    contenu: (
      <>
        <P>
          Les données ne sont communiquées qu’aux personnes et organismes dont
          l’intervention est nécessaire à la prestation :
        </P>
        <Liste
          items={[
            "Les collaborateurs et traducteurs jurés du bureau, tenus au secret professionnel.",
            "Les administrations belges compétentes : SPF Justice, SPF Affaires étrangères, tribunaux de première instance, cours d’appel, communes, chambres de commerce.",
            "Les ambassades et consulats du pays de destination, lorsque la démarche l’exige.",
          ]}
        />
        <P>
          Aucune donnée n’est vendue, louée ou cédée à des tiers à des fins commerciales.
        </P>
      </>
    ),
  },
  {
    ancre: "transferts",
    titre: "Transferts hors Union européenne",
    contenu: (
      <>
        <P>
          Le dépôt d’un dossier de visa implique, par nature, la transmission de pièces à la
          représentation diplomatique du pays de destination, qui peut se situer hors de
          l’Espace économique européen.
        </P>
        <P>
          Ce transfert est nécessaire à l’exécution du contrat que vous concluez avec le
          bureau, au sens de l’article 49 du RGPD. Il ne peut être évité sans renoncer à la
          démarche elle-même.
        </P>
      </>
    ),
  },
  {
    ancre: "conservation",
    titre: "Combien de temps elles sont conservées",
    contenu: (
      <>
        <Liste
          items={[
            `Copies numériques des documents : supprimées après clôture du dossier, dans un délai de ${A_COMPLETER}.`,
            "Documents originaux : restitués au client ; ils ne sont jamais conservés au-delà de la remise.",
            "Données de facturation : conservées le temps imposé par la législation comptable belge.",
            `Demandes d’information sans suite : ${A_COMPLETER}.`,
          ]}
        />
        <Encart titre="À arrêter avec le bureau" ton="rouge">
          Les durées exactes de conservation doivent être fixées par le bureau et inscrites
          dans son registre des traitements.
        </Encart>
      </>
    ),
  },
  {
    ancre: "securite",
    titre: "Comment elles sont protégées",
    contenu: (
      <Liste
        items={[
          "Les documents originaux confiés au bureau font l’objet d’un suivi et ne quittent jamais les locaux sans traçabilité.",
          "Les échanges électroniques transitent par une connexion chiffrée.",
          "L’accès aux dossiers est restreint aux personnes qui en ont besoin pour exécuter la prestation.",
          "Les copies numériques sont supprimées à l’issue du délai de conservation.",
        ]}
      />
    ),
  },
  {
    ancre: "droits",
    titre: "Vos droits",
    contenu: (
      <>
        <P>
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification,
          d’effacement, de limitation, d’opposition et de portabilité sur les données qui
          vous concernent.
        </P>
        <P>
          Ces droits s’exercent par courriel à <Mail /> ou par courrier à l’adresse du
          bureau. Une pièce justificative d’identité pourra être demandée.
        </P>
        <P>
          Le droit à l’effacement ne peut s’exercer sur les données dont la conservation est
          imposée par la loi, notamment en matière comptable.
        </P>
        <P>
          Vous pouvez introduire une réclamation auprès de l’Autorité de protection des
          données, rue de la Presse 35, 1000 Bruxelles.
        </P>
      </>
    ),
  },
];

// --------------------------------------------------------------------------
export const CGV: Article[] = [
  {
    ancre: "objet",
    titre: "Objet",
    contenu: (
      <>
        <P>
          Les présentes conditions régissent les prestations de traduction assermentée et
          libre, de légalisation et d’apostille, et d’assistance aux demandes de visa
          fournies par {CONTACT.raison}.
        </P>
        <P>
          Toute commande implique l’acceptation sans réserve des présentes conditions.
        </P>
      </>
    ),
  },
  {
    ancre: "devis",
    titre: "Devis et commande",
    contenu: (
      <>
        <P>
          Chaque prestation fait l’objet d’un devis préalable, établi sur la base des
          documents transmis. Le devis précise le prix, le délai et, le cas échéant, la
          chaîne de légalisation applicable.
        </P>
        <P>
          Le devis est valable trente jours. La commande est réputée ferme à compter de son
          acceptation écrite par le client.
        </P>
        <P>
          Les tarifs publiés sur le site sont indicatifs et hors TVA. Seul le devis nominatif
          fait foi.
        </P>
      </>
    ),
  },
  {
    ancre: "obligations",
    titre: "Obligations du client",
    contenu: (
      <>
        <Liste
          items={[
            "Fournir des documents lisibles, complets et non tronqués.",
            "Signaler toute exigence particulière de l’autorité destinataire (format, mention, délai impératif) au moment de la commande.",
            "Communiquer l’orthographe exacte des noms propres telle qu’elle figure sur le passeport ou la carte d’identité.",
            "Garantir qu’il détient le droit de faire traduire ou légaliser les documents transmis.",
          ]}
        />
        <Encart titre="Orthographe des noms propres">
          Une divergence entre l’orthographe portée sur la traduction et celle du document
          d’identité est le motif de rejet le plus fréquent au guichet. La vérification
          incombe au client.
        </Encart>
      </>
    ),
  },
  {
    ancre: "delais",
    titre: "Délais",
    contenu: (
      <>
        <P>
          Les délais annoncés courent à compter de la réception d’un dossier complet et du
          règlement de l’acompte éventuel.
        </P>
        <P>
          Ils ne comprennent pas les délais propres aux administrations, tribunaux et
          consulats, sur lesquels le bureau n’a aucune prise, ni les périodes de fermeture,
          jours fériés locaux et périodes de forte affluence.
        </P>
        <P>
          Un dépassement de délai imputable à une autorité tierce ne peut donner lieu à
          indemnité.
        </P>
      </>
    ),
  },
  {
    ancre: "prix",
    titre: "Prix et paiement",
    contenu: (
      <>
        <P>
          Les prix s’entendent hors TVA. Les frais officiels réclamés par les administrations
          et les consulats sont distincts des honoraires du bureau et refacturés à l’euro
          près, sur justificatif.
        </P>
        <P>
          Le règlement intervient à la remise des documents, sauf accord particulier pour les
          clients professionnels et les dossiers récurrents.
        </P>
      </>
    ),
  },
  {
    ancre: "responsabilite",
    titre: "Responsabilité",
    contenu: (
      <>
        <P>
          Le bureau est tenu d’une obligation de moyens. Il répond de la fidélité de la
          traduction et de la régularité formelle des démarches qu’il accomplit.
        </P>
        <P>Il ne peut en revanche être tenu responsable :</P>
        <Liste
          items={[
            "du refus d’un visa, dont la décision appartient exclusivement au consulat ;",
            "du refus d’un document par une autorité pour un motif tenant à sa forme d’origine ou à son contenu ;",
            "des conséquences d’une information erronée ou incomplète fournie par le client ;",
            "des retards imputables aux administrations ou aux services postaux.",
          ]}
        />
        <P>
          En tout état de cause, la responsabilité du bureau est limitée au montant des
          honoraires perçus pour la prestation concernée.
        </P>
      </>
    ),
  },
  {
    ancre: "reclamation",
    titre: "Réclamations",
    contenu: (
      <>
        <P>
          Toute réclamation relative à une traduction doit être formulée par écrit dans les
          quinze jours suivant la remise, en indiquant précisément les passages contestés.
        </P>
        <P>
          Une erreur avérée imputable au bureau est corrigée sans frais et dans les meilleurs
          délais. Une divergence d’appréciation stylistique ne constitue pas une erreur.
        </P>
      </>
    ),
  },
  {
    ancre: "retractation",
    titre: "Droit de rétractation",
    contenu: (
      <>
        <P>
          Le consommateur dispose en principe d’un délai de quatorze jours pour se rétracter
          d’un contrat conclu à distance.
        </P>
        <P>
          Ce droit ne s’applique pas aux prestations pleinement exécutées avant l’expiration
          du délai, ni aux biens confectionnés selon les spécifications du consommateur — ce
          qui est le cas d’une traduction établie sur un document personnel.
        </P>
      </>
    ),
  },
  {
    ancre: "confidentialite",
    titre: "Confidentialité",
    contenu: (
      <>
        <P>
          Toutes les informations et tous les documents transmis dans le cadre d’un dossier
          sont traités comme confidentiels. Ils ne sont ni communiqués à des tiers autres que
          les autorités concernées, ni réutilisés à d’autres fins.
        </P>
        <P>
          Les modalités détaillées figurent dans la{" "}
          <Lien href="/confidentialite/">politique de confidentialité</Lien>.
        </P>
      </>
    ),
  },
  {
    ancre: "droit",
    titre: "Droit applicable et juridiction",
    contenu: (
      <>
        <P>Les présentes conditions sont régies par le droit belge.</P>
        <P>
          En cas de litige, les parties rechercheront une solution amiable avant toute action
          judiciaire. À défaut, les tribunaux de l’arrondissement judiciaire de Bruxelles
          sont seuls compétents.
        </P>
        <Encart titre="Trame à valider" ton="rouge">
          Ce texte est une trame de travail. Il doit être relu et adapté par le conseil
          juridique du bureau avant publication, notamment sur les clauses de responsabilité
          et de rétractation.
        </Encart>
      </>
    ),
  },
];

// --------------------------------------------------------------------------
export const COOKIES: Article[] = [
  {
    ancre: "principe",
    titre: "Le principe retenu",
    contenu: (
      <>
        <P>
          Ce site n’utilise aucun traceur publicitaire, aucun réseau social embarqué et aucun
          outil de profilage.
        </P>
        <P>
          Seuls sont susceptibles d’être déposés des cookies strictement nécessaires au
          fonctionnement du site, et, sous réserve de votre consentement, un outil de mesure
          d’audience.
        </P>
      </>
    ),
  },
  {
    ancre: "necessaires",
    titre: "Cookies strictement nécessaires",
    contenu: (
      <>
        <P>
          Ces cookies assurent le fonctionnement de base du site : mémorisation de votre
          choix en matière de cookies, et de la langue d’affichage.
        </P>
        <P>
          Ils ne nécessitent pas votre consentement, car le site ne peut fonctionner
          correctement sans eux. Ils ne permettent pas de vous identifier.
        </P>
      </>
    ),
  },
  {
    ancre: "tiers",
    titre: "Contenus tiers : le plan d’accès",
    contenu: (
      <>
        <P>
          La page « Le bureau » propose un plan fourni par Google Maps. Ce service dépose ses
          propres cookies dès son affichage.
        </P>
        <P>
          Pour cette raison, le plan <strong>n’est pas chargé automatiquement</strong> : il
          n’apparaît qu’après un clic explicite de votre part sur « Afficher le plan ». Tant
          que vous ne cliquez pas, aucune requête n’est adressée à Google.
        </P>
      </>
    ),
  },
  {
    ancre: "mesure",
    titre: "Mesure d’audience",
    contenu: (
      <>
        <P>
          Un outil de mesure d’audience pourra être mis en place afin de connaître le nombre
          de visiteurs et les pages consultées. Il ne sera activé qu’après votre consentement
          explicite.
        </P>
        <P>
          Le refus sera aussi simple et aussi accessible que l’acceptation, et aucun traceur
          ne sera déposé avant votre choix.
        </P>
        <Encart titre="À compléter lors de la mise en place" ton="rouge">
          L’outil retenu, sa durée de conservation et l’éventuel transfert de données hors
          Union européenne devront être précisés ici.
        </Encart>
      </>
    ),
  },
  {
    ancre: "gestion",
    titre: "Gérer vos préférences",
    contenu: (
      <>
        <P>
          Vous pouvez modifier votre choix à tout moment depuis le bandeau de consentement,
          ou en supprimant les cookies via les réglages de votre navigateur.
        </P>
        <P>
          La suppression des cookies strictement nécessaires peut altérer le fonctionnement
          du site, sans jamais empêcher la consultation de son contenu.
        </P>
      </>
    ),
  },
  {
    ancre: "duree",
    titre: "Durée de conservation",
    contenu: (
      <P>
        Le consentement est conservé six mois au maximum. À l’expiration de ce délai, votre
        choix vous est à nouveau demandé.
      </P>
    ),
  },
];
