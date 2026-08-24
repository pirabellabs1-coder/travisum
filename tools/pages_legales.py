# -*- coding: utf-8 -*-
"""
Les quatre pages légales : mentions, confidentialité, conditions générales
et cookies.

Elles étaient d'abord de simples blocs ancrés dans « À propos ». C'est une
erreur de structure : ces textes ont leur propre régime — ils sont longs, ils
sont consultés délibérément, ils doivent être adressables par une URL stable,
et le règlement impose qu'ils soient accessibles depuis chaque page. D'où
quatre pages autonomes, liées depuis le pied de page.

AVERTISSEMENT
Ces textes sont une trame de travail, pas un avis juridique. Les mentions
marquées « à compléter » doivent être renseignées par le bureau, et
l'ensemble relu par son conseil avant mise en ligne. Le métier — recevoir
des copies de passeports, d'actes d'état civil et de diplômes — place le
bureau dans une position de responsable de traitement au sens du RGPD.

Usage :  python tools/pages_legales.py
"""

import io
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import composants as C
import rythme
import sections as S
import entete as ENTETE
from composants import MAXW, etiquette, icone
from donnees import CONTACT
from from_stitch import tete

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

A_COMPLETER = (
    "à compléter par le bureau"
)


def banniere_legale(surtitre, titre, chapeau, maj="24 août 2026"):
    return (
        '<section class="w-full bg-surface relative overflow-hidden -mt-20 pt-40 pb-16 '
        'md:pb-20 border-b border-tertiary-fixed-dim/20">'
        '<div class="guilloche absolute inset-0 opacity-[0.08] pointer-events-none" '
        'aria-hidden="true"></div>'
        '<div class="' + MAXW + ' relative z-10 max-w-4xl">'
        '<div class="flex items-center gap-4 mb-6">'
        + etiquette(surtitre)
        + '<span class="h-px bg-tertiary-fixed-dim grow max-w-[120px]"></span></div>'
        '<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg '
        'text-primary leading-tight mb-6">' + titre + "</h1>"
        '<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">'
        + chapeau + "</p>"
        '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
        'tracking-widest mt-8 pt-6 border-t border-tertiary-fixed-dim/25">'
        "Dernière mise à jour : " + maj + "</p>"
        "</div></section>"
    )


def sommaire(articles):
    """Sommaire ancré, en tête de page."""
    liens = "".join(
        '<li><a class="flex items-baseline gap-3 py-2 font-body-md text-body-md '
        'text-on-surface-variant hover:text-primary transition-colors" href="#{a}">'
        '<span class="font-label-sm text-label-sm text-on-tertiary-fixed-variant '
        'shrink-0">{n:02d}</span>{t}</a></li>'.format(a=a, n=i, t=t)
        for i, (a, t, _) in enumerate(articles, 1)
    )
    return (
        '<nav class="border border-tertiary-fixed-dim/30 rounded-sm '
        'bg-surface-container-lowest p-7 mb-14" aria-label="Sommaire">'
        '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
        'tracking-widest pb-4 mb-3 border-b border-tertiary-fixed-dim/30">Sommaire</p>'
        '<ul class="grid grid-cols-1 md:grid-cols-2 gap-x-10">' + liens + "</ul></nav>"
    )


def corps_articles(articles):
    blocs = []
    for i, (ancre, titre, paragraphes) in enumerate(articles, 1):
        contenu = "".join(
            p if p.lstrip().startswith("<")
            else '<p class="font-body-md text-body-md text-on-surface-variant '
                 'max-w-3xl mb-4">' + p + "</p>"
            for p in paragraphes
        )
        blocs.append(
            '<article class="py-10 border-b border-tertiary-fixed-dim/20 '
            'last:border-b-0" id="' + ancre + '">'
            '<div class="flex items-baseline gap-4 mb-5">'
            '<span class="font-label-sm text-label-sm text-on-tertiary-fixed-variant '
            'shrink-0">{n:02d}</span>'.format(n=i)
            + '<h2 class="font-display-lg text-headline-md text-primary '
              'leading-snug">' + titre + "</h2></div>"
            + '<div class="pl-0 md:pl-10">' + contenu + "</div></article>"
        )
    return "".join(blocs)


def liste(items):
    return (
        '<ul class="flex flex-col gap-2.5 mb-5 max-w-3xl">'
        + "".join(
            '<li class="flex items-start gap-3 font-body-md text-body-md '
            'text-on-surface-variant">'
            '<span class="w-4 h-px bg-tertiary-fixed-dim mt-3 shrink-0" '
            'aria-hidden="true"></span><span>' + x + "</span></li>"
            for x in items
        )
        + "</ul>"
    )


def encart(titre, texte, ton="laiton"):
    couleur = {"laiton": "border-l-tertiary-fixed-dim",
               "rouge": "border-l-error"}[ton]
    ic = {"laiton": "info", "rouge": "warning"}[ton]
    return (
        '<div class="my-6 p-6 border border-tertiary-fixed-dim/30 border-l-2 ' + couleur
        + ' rounded-sm bg-surface-container-lowest flex items-start gap-4 max-w-3xl">'
        + icone(ic, "text-[20px] mt-0.5 shrink-0",
                "text-error" if ton == "rouge" else "text-on-tertiary-fixed-variant")
        + "<div>"
          '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
          'tracking-widest mb-2">' + titre + "</p>"
          '<p class="font-body-md text-body-md text-on-surface-variant">' + texte + "</p>"
          "</div></div>"
    )


def autres_pages(courante):
    pages = [
        ("mentions-legales.html", "Mentions légales"),
        ("confidentialite.html", "Politique de confidentialité"),
        ("cgv.html", "Conditions générales"),
        ("cookies.html", "Politique cookies"),
    ]
    cartes = "".join(
        '<a class="group flex items-center justify-between gap-4 p-6 border '
        'border-tertiary-fixed-dim/30 rounded-sm bg-surface-container-lowest '
        'hover:border-tertiary-fixed-dim transition-colors" href="' + h + '">'
        '<span class="font-body-md text-body-md text-on-surface '
        'group-hover:text-primary transition-colors">' + t + "</span>"
        + icone("arrow_forward", "text-[16px]") + "</a>"
        for h, t in pages if h != courante
    )
    return (
        '<section class="w-full bg-surface-container-low py-16 md:py-20 '
        'border-t border-tertiary-fixed-dim/20">'
        '<div class="' + MAXW + '">'
        '<p class="font-label-sm text-label-sm text-on-tertiary-fixed-variant uppercase '
        'tracking-widest mb-6">Les autres textes</p>'
        '<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">' + cartes + "</div>"
        "</div></section>"
    )


def assembler(meta, corps):
    return (
        tete(meta)
        + '<body class="bg-surface font-body-md text-on-surface">'
        + '<div class="brass-progress"></div>'
        + ENTETE.entete(None)
        + ENTETE.menu_mobile(None)
        + '<main class="w-full pt-20 bg-surface">' + rythme.rythmer(corps) + "</main>"
        + S.pied_de_page()
        + '<script src="assets/js/site.js"></script></body>\n</html>\n'
    )


def page(fichier, meta, surtitre, titre, chapeau, articles):
    corps = (
        banniere_legale(surtitre, titre, chapeau)
        + '<section class="w-full bg-surface py-16 md:py-20">'
        + '<div class="' + MAXW + ' max-w-4xl">'
        + sommaire(articles)
        + corps_articles(articles)
        + "</div></section>"
        + autres_pages(fichier)
    )
    return assembler(meta, corps)


# ==========================================================================
ADRESSE = "{r}, {cp} {v}, {p}".format(
    r=CONTACT["rue"], cp=CONTACT["code_postal"], v=CONTACT["ville"], p=CONTACT["pays"]
)


def mentions():
    articles = [
        ("editeur", "Éditeur du site", [
            "Le présent site est édité par <strong>Travisum Louise Office</strong>, "
            "bureau de traduction jurée, de légalisation de documents et "
            "d’assistance aux demandes de visa.",
            liste([
                "Adresse : " + ADRESSE,
                "Téléphone : " + CONTACT["telephone"] + " — " + CONTACT["mobile"],
                "Courriel : " + CONTACT["email"],
                "Forme juridique : " + A_COMPLETER,
                "Numéro d’entreprise (BCE) : " + A_COMPLETER,
                "Numéro de TVA intracommunautaire : " + A_COMPLETER,
            ]),
            encart("À renseigner avant mise en ligne",
                   "La forme juridique, le numéro d’entreprise et le numéro de TVA "
                   "sont obligatoires pour une entreprise établie en Belgique. Ils "
                   "doivent être renseignés par le bureau.", "rouge"),
        ]),
        ("publication", "Directeur de la publication", [
            "Le directeur de la publication est " + A_COMPLETER + ", en qualité de "
            "représentant légal de Travisum Louise Office.",
            "Toute demande relative au contenu éditorial du site peut être adressée "
            "à <a class=\"underline decoration-tertiary-fixed-dim underline-offset-4 "
            "hover:text-primary\" href=\"mailto:" + CONTACT["email"] + "\">"
            + CONTACT["email"] + "</a>.",
        ]),
        ("hebergement", "Hébergement", [
            "Le site est hébergé par " + A_COMPLETER + ".",
            "Les coordonnées complètes de l’hébergeur (raison sociale, adresse, "
            "téléphone) seront précisées ici lors de la mise en production.",
        ]),
        ("propriete", "Propriété intellectuelle", [
            "L’ensemble des éléments du site — structure, textes, mise en page, "
            "identité visuelle, illustrations et code source — est protégé par le "
            "droit d’auteur. Toute reproduction ou représentation, totale ou "
            "partielle, sans autorisation écrite préalable est interdite.",
            "Les dénominations et logos des administrations et institutions citées "
            "(SPF Justice, SPF Affaires étrangères, tribunaux, chambres de commerce, "
            "représentations diplomatiques) appartiennent à leurs titulaires "
            "respectifs et ne sont mentionnés qu’à titre informatif, pour décrire "
            "les démarches prises en charge par le bureau.",
        ]),
        ("responsabilite", "Limitation de responsabilité", [
            "Les informations publiées sur ce site — délais, procédures, listes de "
            "pièces, tarifs indicatifs — sont fournies à titre d’information "
            "générale. Elles décrivent des pratiques administratives qui évoluent, "
            "parfois sans préavis, et qui dépendent du pays de destination, de la "
            "nationalité du demandeur et de la nature du document.",
            "Elles ne constituent ni un engagement contractuel, ni un conseil "
            "juridique. Seul le devis nominatif remis par le bureau engage celui-ci.",
            encart("La décision appartient à l’autorité saisie",
                   "Le bureau assure la conformité et la complétude des dossiers. La "
                   "délivrance d’un visa, l’acceptation d’une traduction ou "
                   "l’apposition d’une légalisation relèvent exclusivement de "
                   "l’administration ou du consulat concerné."),
        ]),
        ("liens", "Liens vers des sites tiers", [
            "Le site peut renvoyer vers des sites d’administrations, de consulats "
            "ou d’institutions. Ces liens sont proposés pour la commodité du "
            "visiteur ; le bureau n’exerce aucun contrôle sur leur contenu et ne "
            "saurait en être tenu responsable.",
        ]),
        ("droit", "Droit applicable", [
            "Les présentes mentions sont régies par le droit belge. Tout litige "
            "relatif à leur interprétation ou à leur exécution relève, à défaut de "
            "résolution amiable, de la compétence des tribunaux de l’arrondissement "
            "judiciaire de Bruxelles.",
        ]),
    ]
    meta = {
        "actif": None,
        "titre": "Mentions légales — Travisum Louise Office",
        "description": "Mentions légales du site travisum.com : éditeur, directeur de "
                       "la publication, hébergement, propriété intellectuelle et "
                       "limitation de responsabilité.",
        "canonique": "https://www.travisum.com/mentions-legales",
    }
    return page("mentions-legales.html", meta, "Informations légales", "Mentions légales",
                "Qui édite ce site, qui l’héberge, et dans quelles limites les "
                "informations qui y figurent engagent le bureau.", articles)


def confidentialite():
    articles = [
        ("responsable", "Responsable du traitement", [
            "Travisum Louise Office, " + ADRESSE + ", est responsable du traitement "
            "des données personnelles collectées dans le cadre de ses prestations.",
            "Pour toute question relative à vos données : "
            "<a class=\"underline decoration-tertiary-fixed-dim underline-offset-4 "
            "hover:text-primary\" href=\"mailto:" + CONTACT["email"] + "\">"
            + CONTACT["email"] + "</a>.",
        ]),
        ("donnees", "Quelles données sont collectées", [
            "Le métier du bureau suppose la manipulation de documents sensibles. "
            "Les catégories suivantes sont susceptibles d’être traitées :",
            liste([
                "<strong>Données d’identification</strong> : nom, prénom, date et "
                "lieu de naissance, nationalité, adresse.",
                "<strong>Données de contact</strong> : adresse électronique, numéro "
                "de téléphone, éventuellement société.",
                "<strong>Copies de documents officiels</strong> : passeport, carte "
                "d’identité, acte de naissance, acte de mariage, diplôme, extrait "
                "de casier judiciaire, acte notarié.",
                "<strong>Données relatives au dossier</strong> : destination, motif "
                "du séjour, langue source et cible, échanges liés au traitement.",
            ]),
            encart("Données particulières",
                   "Certains documents (certificat médical, extrait de casier "
                   "judiciaire) contiennent des données relevant de catégories "
                   "particulières au sens de l’article 9 du RGPD. Ils ne sont traités "
                   "que sur votre demande expresse, pour la seule exécution de la "
                   "prestation, et ne font l’objet d’aucune exploitation ultérieure."),
        ]),
        ("finalites", "À quoi elles servent", [
            liste([
                "Établir un devis et exécuter la prestation demandée — base légale : "
                "exécution du contrat ou mesures précontractuelles.",
                "Transmettre les pièces aux administrations, tribunaux et "
                "représentations diplomatiques compétents — base légale : exécution "
                "du contrat.",
                "Respecter les obligations comptables et fiscales du bureau — base "
                "légale : obligation légale.",
                "Répondre à vos demandes d’information — base légale : intérêt "
                "légitime du bureau à traiter les sollicitations reçues.",
            ]),
            "Vos données ne sont utilisées ni à des fins de prospection commerciale, "
            "ni de profilage, et ne font l’objet d’aucune décision automatisée.",
        ]),
        ("destinataires", "Qui y a accès", [
            "Les données ne sont communiquées qu’aux personnes et organismes dont "
            "l’intervention est nécessaire à la prestation :",
            liste([
                "Les collaborateurs et traducteurs jurés du bureau, tenus au secret "
                "professionnel.",
                "Les administrations belges compétentes : SPF Justice, SPF Affaires "
                "étrangères, tribunaux de première instance, cours d’appel, communes, "
                "chambres de commerce.",
                "Les ambassades et consulats du pays de destination, lorsque la "
                "démarche l’exige.",
            ]),
            "Aucune donnée n’est vendue, louée ou cédée à des tiers à des fins "
            "commerciales.",
        ]),
        ("transferts", "Transferts hors Union européenne", [
            "Le dépôt d’un dossier de visa implique, par nature, la transmission de "
            "pièces à la représentation diplomatique du pays de destination, qui peut "
            "se situer hors de l’Espace économique européen.",
            "Ce transfert est nécessaire à l’exécution du contrat que vous concluez "
            "avec le bureau, au sens de l’article 49 du RGPD. Il ne peut être évité "
            "sans renoncer à la démarche elle-même.",
        ]),
        ("conservation", "Combien de temps elles sont conservées", [
            liste([
                "Copies numériques des documents : supprimées après clôture du "
                "dossier, dans un délai de " + A_COMPLETER + ".",
                "Documents originaux : restitués au client ; ils ne sont jamais "
                "conservés au-delà de la remise.",
                "Données de facturation : conservées le temps imposé par la "
                "législation comptable belge.",
                "Demandes d’information sans suite : " + A_COMPLETER + ".",
            ]),
            encart("À arrêter avec le bureau",
                   "Les durées exactes de conservation doivent être fixées par le "
                   "bureau et inscrites dans son registre des traitements. Elles ne "
                   "peuvent pas être décidées à sa place.", "rouge"),
        ]),
        ("securite", "Comment elles sont protégées", [
            liste([
                "Les documents originaux confiés au bureau font l’objet d’un suivi "
                "et ne quittent jamais les locaux sans traçabilité.",
                "Les échanges électroniques transitent par une connexion chiffrée.",
                "L’accès aux dossiers est restreint aux personnes qui en ont besoin "
                "pour exécuter la prestation.",
                "Les copies numériques sont supprimées à l’issue du délai de "
                "conservation.",
            ]),
        ]),
        ("droits", "Vos droits", [
            "Conformément au RGPD, vous disposez d’un droit d’accès, de "
            "rectification, d’effacement, de limitation, d’opposition et de "
            "portabilité sur les données qui vous concernent.",
            "Ces droits s’exercent par courriel à "
            "<a class=\"underline decoration-tertiary-fixed-dim underline-offset-4 "
            "hover:text-primary\" href=\"mailto:" + CONTACT["email"] + "\">"
            + CONTACT["email"] + "</a> ou par courrier à l’adresse du bureau. Une "
            "pièce justificative d’identité pourra être demandée.",
            "Le droit à l’effacement ne peut s’exercer sur les données dont la "
            "conservation est imposée par la loi, notamment en matière comptable.",
            "Vous pouvez introduire une réclamation auprès de l’Autorité de "
            "protection des données, rue de la Presse 35, 1000 Bruxelles.",
        ]),
    ]
    meta = {
        "actif": None,
        "titre": "Politique de confidentialité — Travisum",
        "description": "Comment Travisum traite les copies de passeports, actes d’état "
                       "civil et diplômes qui lui sont confiés : finalités, "
                       "destinataires, durées de conservation et vos droits.",
        "canonique": "https://www.travisum.com/confidentialite",
    }
    return page("confidentialite.html", meta, "Informations légales",
                "Politique de confidentialité",
                "Le bureau reçoit des copies de passeports, d’actes de naissance et "
                "de diplômes. Voici précisément ce qu’elles deviennent.", articles)


def cgv():
    articles = [
        ("objet", "Objet", [
            "Les présentes conditions régissent les prestations de traduction "
            "assermentée et libre, de légalisation et d’apostille, et d’assistance "
            "aux demandes de visa fournies par Travisum Louise Office.",
            "Toute commande implique l’acceptation sans réserve des présentes "
            "conditions.",
        ]),
        ("devis", "Devis et commande", [
            "Chaque prestation fait l’objet d’un devis préalable, établi sur la base "
            "des documents transmis. Le devis précise le prix, le délai et, le cas "
            "échéant, la chaîne de légalisation applicable.",
            "Le devis est valable trente jours. La commande est réputée ferme à "
            "compter de son acceptation écrite par le client.",
            "Les tarifs publiés sur le site sont indicatifs et hors TVA. Seul le "
            "devis nominatif fait foi.",
        ]),
        ("obligations", "Obligations du client", [
            liste([
                "Fournir des documents lisibles, complets et non tronqués.",
                "Signaler toute exigence particulière de l’autorité destinataire "
                "(format, mention, délai impératif) au moment de la commande.",
                "Communiquer l’orthographe exacte des noms propres telle qu’elle "
                "figure sur le passeport ou la carte d’identité.",
                "Garantir qu’il détient le droit de faire traduire ou légaliser les "
                "documents transmis.",
            ]),
            encart("Orthographe des noms propres",
                   "Une divergence entre l’orthographe portée sur la traduction et "
                   "celle du document d’identité est le motif de rejet le plus "
                   "fréquent au guichet. La vérification incombe au client."),
        ]),
        ("delais", "Délais", [
            "Les délais annoncés courent à compter de la réception d’un dossier "
            "complet et du règlement de l’acompte éventuel.",
            "Ils ne comprennent pas les délais propres aux administrations, "
            "tribunaux et consulats, sur lesquels le bureau n’a aucune prise, ni les "
            "périodes de fermeture, jours fériés locaux et périodes de forte "
            "affluence.",
            "Un dépassement de délai imputable à une autorité tierce ne peut donner "
            "lieu à indemnité.",
        ]),
        ("prix", "Prix et paiement", [
            "Les prix s’entendent hors TVA. Les frais officiels réclamés par les "
            "administrations et les consulats sont distincts des honoraires du "
            "bureau et refacturés à l’euro près, sur justificatif.",
            "Le règlement intervient à la remise des documents, sauf accord "
            "particulier pour les clients professionnels et les dossiers récurrents.",
            "Les moyens de paiement acceptés sont le virement bancaire et le "
            "règlement sur place.",
        ]),
        ("responsabilite", "Responsabilité", [
            "Le bureau est tenu d’une obligation de moyens. Il répond de la fidélité "
            "de la traduction et de la régularité formelle des démarches qu’il "
            "accomplit.",
            "Il ne peut en revanche être tenu responsable :",
            liste([
                "du refus d’un visa, dont la décision appartient exclusivement au "
                "consulat ;",
                "du refus d’un document par une autorité pour un motif tenant à sa "
                "forme d’origine ou à son contenu ;",
                "des conséquences d’une information erronée ou incomplète fournie "
                "par le client ;",
                "des retards imputables aux administrations ou aux services postaux.",
            ]),
            "En tout état de cause, la responsabilité du bureau est limitée au "
            "montant des honoraires perçus pour la prestation concernée.",
        ]),
        ("reclamation", "Réclamations", [
            "Toute réclamation relative à une traduction doit être formulée par "
            "écrit dans les quinze jours suivant la remise, en indiquant précisément "
            "les passages contestés.",
            "Une erreur avérée imputable au bureau est corrigée sans frais et dans "
            "les meilleurs délais. Une divergence d’appréciation stylistique ne "
            "constitue pas une erreur.",
        ]),
        ("retractation", "Droit de rétractation", [
            "Le consommateur dispose en principe d’un délai de quatorze jours pour "
            "se rétracter d’un contrat conclu à distance.",
            "Ce droit ne s’applique pas aux prestations pleinement exécutées avant "
            "l’expiration du délai, ni aux biens confectionnés selon les "
            "spécifications du consommateur — ce qui est le cas d’une traduction "
            "établie sur un document personnel. En demandant l’exécution immédiate, "
            "le client renonce à son droit de rétractation pour la part exécutée.",
        ]),
        ("confidentialite", "Confidentialité", [
            "Toutes les informations et tous les documents transmis dans le cadre "
            "d’un dossier sont traités comme confidentiels. Ils ne sont ni "
            "communiqués à des tiers autres que les autorités concernées, ni "
            "réutilisés à d’autres fins.",
            "Les modalités détaillées figurent dans la "
            "<a class=\"underline decoration-tertiary-fixed-dim underline-offset-4 "
            "hover:text-primary\" href=\"confidentialite.html\">politique de "
            "confidentialité</a>.",
        ]),
        ("droit", "Droit applicable et juridiction", [
            "Les présentes conditions sont régies par le droit belge.",
            "En cas de litige, les parties rechercheront une solution amiable avant "
            "toute action judiciaire. À défaut, les tribunaux de l’arrondissement "
            "judiciaire de Bruxelles sont seuls compétents.",
            encart("Trame à valider",
                   "Ce texte est une trame de travail. Il doit être relu et adapté "
                   "par le conseil juridique du bureau avant publication, notamment "
                   "sur les clauses de responsabilité et de rétractation.", "rouge"),
        ]),
    ]
    meta = {
        "actif": None,
        "titre": "Conditions générales de vente — Travisum",
        "description": "Conditions générales applicables aux prestations de traduction "
                       "assermentée, de légalisation et d’assistance visa de Travisum "
                       "Louise Office.",
        "canonique": "https://www.travisum.com/cgv",
    }
    return page("cgv.html", meta, "Informations légales",
                "Conditions générales de vente",
                "Ce qui est dû de part et d’autre : devis, délais, prix, "
                "responsabilité et réclamations.", articles)


def cookies():
    articles = [
        ("principe", "Le principe retenu", [
            "Ce site n’utilise aucun traceur publicitaire, aucun réseau social "
            "embarqué et aucun outil de profilage.",
            "Seuls sont susceptibles d’être déposés des cookies strictement "
            "nécessaires au fonctionnement du site, et, sous réserve de votre "
            "consentement, un outil de mesure d’audience.",
        ]),
        ("necessaires", "Cookies strictement nécessaires", [
            "Ces cookies assurent le fonctionnement de base du site : mémorisation "
            "de votre choix en matière de cookies, et de la langue d’affichage.",
            "Ils ne nécessitent pas votre consentement, car le site ne peut "
            "fonctionner correctement sans eux. Ils ne permettent pas de vous "
            "identifier.",
        ]),
        ("mesure", "Mesure d’audience", [
            "Un outil de mesure d’audience pourra être mis en place afin de "
            "connaître le nombre de visiteurs et les pages consultées. Il ne sera "
            "activé qu’après votre consentement explicite.",
            "Le refus sera aussi simple et aussi accessible que l’acceptation, et "
            "aucun traceur ne sera déposé avant votre choix.",
            encart("À compléter lors de la mise en place",
                   "L’outil retenu, sa durée de conservation et l’éventuel transfert "
                   "de données hors Union européenne devront être précisés ici.",
                   "rouge"),
        ]),
        ("gestion", "Gérer vos préférences", [
            "Vous pouvez modifier votre choix à tout moment depuis le bandeau de "
            "consentement, ou en supprimant les cookies via les réglages de votre "
            "navigateur.",
            "La suppression des cookies strictement nécessaires peut altérer le "
            "fonctionnement du site, sans jamais empêcher la consultation de son "
            "contenu.",
        ]),
        ("duree", "Durée de conservation", [
            "Le consentement est conservé six mois au maximum. À l’expiration de "
            "ce délai, votre choix vous est à nouveau demandé.",
        ]),
    ]
    meta = {
        "actif": None,
        "titre": "Politique cookies — Travisum",
        "description": "Quels cookies ce site dépose, dans quel but, et comment "
                       "modifier votre choix à tout moment.",
        "canonique": "https://www.travisum.com/cookies",
    }
    return page("cookies.html", meta, "Informations légales", "Politique cookies",
                "Aucun traceur publicitaire. Voici ce que le site dépose "
                "réellement, et comment revenir sur votre choix.", articles)


def main():
    pages = [
        ("mentions-legales.html", mentions),
        ("confidentialite.html", confidentialite),
        ("cgv.html", cgv),
        ("cookies.html", cookies),
    ]
    for nom, fabrique in pages:
        html = fabrique()
        with io.open(os.path.join(RACINE, nom), "w", encoding="utf-8", newline="\n") as f:
            f.write(html)
        print("%-26s %6d octets" % (nom, len(html)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
