# -*- coding: utf-8 -*-
"""
Les trois gabarits absents des maquettes Stitch : Tarifs & Délais,
Ressources, A propos.

Ils sont composes à partir des mêmes briques que les quatre pages issues de
la maquette (tools/composants.py, tools/sections.py, tools/tableaux.py), de
sorte qu'ils partagent exactement le même vocabulaire visuel : bandeau clair
à trame guilloche, etiquette « Service NN », titre Playfair, sections
séparées par des filets de laiton, pied de page encre.

Usage :  python tools/nouvelles_pages.py
"""

import io
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import composants as C
import contenu as TXT
import entete as ENTETE
import rythme
import sections as S
import tableaux as T
from composants import MAXW, carte, entete_section, etiquette, icone, section
from donnees import CONTACT, DESTINATIONS, LANGUES
from from_stitch import tete

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# ==========================================================================
#  Banniere de page — reprise de l'ecran Legalisations (fond clair, guilloche)
# ==========================================================================
def banniere(surtitre, titre, chapeau, encart=None):
    bloc_encart = ""
    if encart:
        bloc_encart = (
            '<div class="shrink-0 border border-tertiary-fixed-dim/60 rounded-sm '
            'px-8 py-6 text-center bg-surface-container-lowest">'
            '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
            'tracking-widest mb-2">{h}</p>'
            '<p class="font-display-lg text-headline-md text-on-tertiary-fixed-variant">{v}</p>'
            '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
            'tracking-widest mt-2">{b}</p></div>'
        ).format(h=encart[0], v=encart[1], b=encart[2])

    return (
        '<section class="w-full bg-surface relative overflow-hidden -mt-20 pt-40 pb-20 '
        'md:pb-28 border-b border-tertiary-fixed-dim/20">'
        '<div class="guilloche absolute inset-0 opacity-[0.10] pointer-events-none" '
        'aria-hidden="true"></div>'
        '<div class="{m} relative z-10 flex flex-col lg:flex-row lg:items-end '
        'justify-between gap-10">'
        '<div class="flex flex-col gap-6 max-w-3xl">'
        '<div class="flex items-center gap-4">'
        + etiquette(surtitre)
        + '<span class="h-px bg-tertiary-fixed-dim grow max-w-[120px]"></span></div>'
        + '<h1 class="font-display-lg text-display-lg-mobile md:text-display-lg '
        'text-primary leading-tight">{t}</h1>'
        + '<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{c}</p>'
        + "</div>"
        + bloc_encart
        + "</div></section>"
    ).format(m=MAXW, t=titre, c=chapeau)


def assembler(meta, corps):
    """Colle tete + en-tete + menu mobile + corps + pied + script."""
    return (
        tete(meta)
        + '<body class="bg-surface font-body-md text-on-surface">'
        + '<div class="brass-progress"></div>'
        + ENTETE.entete(meta["actif"])
        + ENTETE.menu_mobile(meta["actif"])
        + '<main class="w-full pt-20 bg-surface">'
        + rythme.rythmer(corps)
        + "</main>"
        + S.pied_de_page()
        + '<script src="assets/js/site.js"></script>'
        + "</body>\n</html>\n"
    )

    # ==========================================================================
    #  Tarifs & Delais
    # ==========================================================================


def page_tarifs():
    meta = {
        "actif": "tarifs",
        "titre": "Tarifs et délais de traduction, légalisation et visa — Travisum",
        "description": (
            "Grille tarifaire publique : traduction assermentée et libre, légalisation "
            "et apostille, visas. Délais standard, prioritaire 48 h et express 24 h. "
            "Devis ferme sous 2 heures ouvrables."
        ),
        "canonique": "https://www.travisum.com/tarifs",
    }

    # Les trois niveaux d'urgence, en cartes bordees
    niveaux = [
        (
            "schedule",
            "Standard",
            "3 à 5 jours ouvrables",
            "Le rythme normal du bureau. Convient à toute démarche planifiee : mariage, "
            "inscription universitaire, constitution de société.",
        ),
        (
            "bolt",
            "Prioritaire",
            "48 heures",
            "Le dossier passe devant. Utile lorsqu’un rendez-vous consulaire ou une "
            "échéance administrative est déjà fixe.",
        ),
        (
            "priority_high",
            "Express",
            "24 heures",
            "Traitement le jour même lorsque le document est recu avant midi. Soumis à "
            "disponibilité du traducteur juré pour la langue concernee.",
        ),
    ]
    cartes_niveaux = "".join(
        carte(
            C.cartouche_icone(ic)
            + '<h3 class="font-display-lg text-[24px] text-primary mb-2">{t}</h3>'
            '<p class="font-label-sm text-label-sm text-on-tertiary-fixed-variant '
            'uppercase tracking-widest mb-4">{d}</p>'
            '<p class="font-body-md text-body-md text-on-surface-variant">{x}</p>'.format(
                t=t, d=d, x=x
            ),
            accent="laiton",
        )
        for ic, t, d, x in niveaux
    )

    inclus = [
        (
            "Compris dans le prix",
            [
                "La traduction et sa relecture systematique",
                "Le cachet, la signature et la déclaration du traducteur juré",
                "Une copie certifiée du document",
                "Le conseil sur la chaîne de légalisation applicable",
                "Le suivi du dossier jusqu’à la remise",
            ],
            "check_circle",
            "text-secondary",
        ),
        (
            "Facture en supplement",
            [
                "Les frais officiels réclamés par les administrations et consulats",
                "Les copies certifiées au-dela de la première",
                "L’envoi recommandé ou la livraison à domicile",
                "Les traitements prioritaire et express",
            ],
            "add_circle",
            "text-on-tertiary-fixed-variant",
        ),
    ]
    cartes_inclus = "".join(
        carte(
            '<h3 class="font-display-lg text-[22px] text-primary mb-5 pb-4 '
            'border-b border-tertiary-fixed-dim/30">{t}</h3>'.format(t=t)
            + '<ul class="flex flex-col gap-3">'
            + "".join(
                '<li class="flex items-start gap-3">'
                + icone(ic, "text-[16px] mt-1 shrink-0", couleur)
                + '<span class="font-body-md text-body-md text-on-surface-variant">'
                "{x}</span></li>".format(x=x)
                for x in items
            )
            + "</ul>"
        )
        for t, items, ic, couleur in inclus
    )

    corps = (
        banniere(
            "Service 04",
            "Tarifs et délais, publiés.",
            "Le bureau publié ses prix. C’est la première question de tout visiteur, "
            "et la réponse ne devrait pas exiger un appel téléphonique.",
            encart=("Devis ferme en", "2 h", "ouvrables"),
        )
        + T.section_tarifs_onglets()
        + section(
            entete_section(
                "Niveaux d’urgence",
                "Trois rythmes de traitement",
                "Le même travail, la même valeur juridique : seule la place dans la file "
                "change.",
            )
            + '<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">'
            + cartes_niveaux
            + "</div>",
            fond="basse",
            id="delais",
        )
        + section(
            entete_section(
                "Ce que couvre le prix",
                "Sans mauvaise surprise",
                "Les frais officiels sont refacturés à l’euro près, sur justificatif. "
                "Le bureau ne prend aucune marge dessus.",
            )
            + '<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">'
            + cartes_inclus
            + "</div>",
            fond="surface",
            id="inclus",
        )
        + C.faq(
            "Questions sur les tarifs",
            [
                (
                    "Pourquoi un devis plutot qu’un prix fixe ?",
                    "Parce que le prix dépend de facteurs reels : la langue, le nombre de "
                    "pages, la technicité du texte, la lisibilité du document source et la "
                    "chaîne de légalisation exigée par le pays de destination. Un tarif "
                    "unique serait soit trop cher pour les dossiers simples, soit intenable "
                    "pour les dossiers complexes.",
                ),
                (
                    "Les frais officiels sont-ils inclus ?",
                    "Non. Les montants réclamés par le SPF Justice, les Affaires étrangères "
                    "ou les consulats sont distincts des honoraires du bureau. Ils vous sont "
                    "refacturés à l’euro près, sur justificatif.",
                ),
                (
                    "Les prix affiches sont-ils TVA comprise ?",
                    "Non, les montants sont indiques hors TVA. Le devis nominatif précise le "
                    "montant TVA comprise.",
                ),
                (
                    "Comment régler ?",
                    "Par virement bancaire ou sur place au bureau. Le règlement intervient à "
                    "la remise des documents, sauf accord particulier pour les dossiers "
                    "recurrents et les clients professionnels.",
                ),
            ],
        )
        + C.bandeau_conversion(
            "Un chiffre ferme, pas une fourchette.",
            "Envoyez le scan de vos documents et la destination : vous recevez le "
            "detail poste par poste, frais officiels distingues des honoraires.",
            action="Demander mon devis",
            href="mailto:" + CONTACT["email"],
        )
    )
    return meta, corps

    # ==========================================================================
    #  Ressources
    # ==========================================================================


def page_ressources():
    meta = {
        "actif": "ressources",
        "titre": "Guides, procédures et listes de pièces — Travisum",
        "description": (
            "Guides pratiques sur la traduction assermentée, la légalisation, "
            "l’apostille de La Haye et les demandes de visa depuis la Belgique. "
            "Listes de pièces téléchargeables par pays."
        ),
        "canonique": "https://www.travisum.com/ressources",
    }

    articles = [
        (
            "Legalisation",
            "translate",
            "Apostille ou légalisation complète : le tableau de décision",
            "La Convention de La Haye supprime la chaîne consulaire pour les pays "
            "signataires. Comment savoir dans quel cas se trouve votre document, et ce que "
            "cela change en délai comme en cout.",
            "legalisations.html",
        ),
        (
            "Traduction",
            "gavel",
            "Traduction jurée : ce que l’administration vérifie vraiment",
            "Signature, cachet, déclaration d’exactitude, inscription au registre du "
            "tribunal. Les quatre éléments qui font qu’une traduction est acceptée, ou "
            "refusée au guichet.",
            "traductions.html",
        ),
        (
            "Visas",
            "flight_takeoff",
            "Constituer un dossier de visa qui ne sera pas refusé",
            "La majorite des refus tiennent à des motifs administratifs, pas au fond du "
            "dossier. Les pièces qui manquent le plus souvent, et l’ordre dans lequel "
            "les rassembler.",
            "visas.html",
        ),
        (
            "Belgique",
            "account_balance",
            "Faire reconnaitre un diplôme étranger en Belgique",
            "Traduction jurée, légalisation, équivalence : les trois étapes distinctes que "
            "l’on confond souvent, et l’ordre dans lequel les mener.",
            "traductions.html",
        ),
        (
            "International",
            "public",
            "Se marier à l’étranger : les documents à préparer",
            "Acte de naissance, certificat de célibat, composition de menage. Ce que "
            "reclament les administrations les plus fréquemment sollicitees.",
            "legalisations.html",
        ),
        (
            "Traduction",
            "corporate_fare",
            "Statuts de société : traduire pour l’export",
            "Extrait BCE, statuts, procurations. Les documents que reclament les chambres "
            "de commerce étrangères et le circuit de légalisation associe.",
            "traductions.html",
        ),
    ]

    cartes_articles = "".join(
        (
            '<a class="group flex flex-col border border-tertiary-fixed-dim/30 rounded-sm '
            "bg-surface-container-lowest p-7 hover:border-tertiary-fixed-dim "
            'transition-colors" href="' + h + '">'
            '<div class="flex items-center justify-between mb-6">'
            '<span class="px-3 py-1.5 border border-tertiary-fixed-dim/40 rounded-sm '
            "font-label-sm text-label-sm uppercase tracking-widest "
            'text-on-tertiary-fixed-variant">'
            + cat
            + "</span>"
            + icone(ic, "text-[20px]")
            + "</div>"
            '<h3 class="font-display-lg text-[21px] text-primary leading-snug mb-3 '
            'group-hover:text-on-tertiary-fixed-variant transition-colors">' + t + "</h3>"
            '<p class="font-body-md text-body-md text-on-surface-variant grow">' + r + "</p>"
            '<span class="inline-flex items-center gap-2 mt-6 pt-5 border-t '
            "border-tertiary-fixed-dim/20 font-label-sm text-label-sm uppercase "
            'tracking-widest text-primary">Lire le guide'
            + icone(
                "arrow_forward",
                "text-[16px] group-hover:translate-x-1 transition-transform",
                "",
            )
            + "</span></a>"
        )
        for cat, ic, t, r, h in articles
    )

    telechargements = [
        (
            "description",
            "Liste de pièces — visa touristique",
            "Le socle commun demande par la majorite des consulats, à compléter selon la "
            "destination.",
        ),
        (
            "description",
            "Liste de pièces — visa d’affaires",
            "Lettre d’invitation, ordre de mission, extrait BCE : le dossier type pour "
            "un déplacement professionnel.",
        ),
        (
            "description",
            "Préparer un document à légaliser",
            "L’ordre des étapes, de la traduction jurée au cachet consulaire, avec les "
            "délais à prévoir.",
        ),
    ]
    cartes_dl = "".join(
        carte(
            '<div class="flex items-start gap-5">'
            + icone(ic, "text-[24px] shrink-0 mt-1")
            + "<div>"
            '<h3 class="font-display-lg text-[20px] text-primary mb-2">' + t + "</h3>"
            '<p class="font-body-md text-body-md text-on-surface-variant mb-5">' + d + "</p>"
            '<a class="inline-flex items-center gap-2 font-label-sm text-label-sm '
            "uppercase tracking-widest text-primary border-b border-tertiary-fixed-dim "
            'pb-1 hover:text-on-tertiary-fixed-variant transition-colors" '
            'href="mailto:' + CONTACT["email"] + '?subject=Demande%20de%20liste%20de%20pieces">'
            "Recevoir par e-mail"
            + icone("arrow_forward", "text-[16px]", "")
            + "</a></div></div>"
        )
        for ic, t, d in telechargements
    )

    corps = (
        banniere(
            "Service 05",
            "Guides, procédures et listes de pièces.",
            "Les réponses aux questions qui reviennent le plus au téléphone, ecrites "
            "une fois pour toutes. Consultables à toute heure, y compris quand le bureau "
            "est ferme.",
        )
        + section(
            entete_section(
                "Guides",
                "Comprendre avant de se déplacer",
                "Six guides pratiques sur les démarches les plus fréquentes.",
            )
            + '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">'
            + cartes_articles
            + "</div>",
            fond="surface",
            id="guides",
        )
        + section(
            entete_section(
                "Listes de pièces",
                "Savoir exactement quoi rassembler",
                "Les listes sont adressees par e-mail et adaptées à votre destination "
                "et au motif de votre sejour.",
            )
            + '<div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">'
            + cartes_dl
            + "</div>",
            fond="basse",
            id="documents",
        )
        + C.faq("Questions fréquentes", TXT.FAQ_GENERALE)
        + C.bandeau_conversion(
            "Une question que ces guides ne couvrent pas ?",
            "Le bureau repond de maniere claire et rapide, du lundi au vendredi de "
            "9 h à 17 h sans interruption.",
            action="Nous ecrire",
            href="mailto:" + CONTACT["email"],
        )
    )
    return meta, corps

    # ==========================================================================
    #  A propos
    # ==========================================================================


def page_a_propos():
    meta = {
        "actif": "a-propos",
        "titre": "Le bureau — Travisum Louise Office, 367 avenue Louise à Bruxelles",
        "description": (
            "Travisum Louise Office, bureau de traduction jurée, de légalisation et de "
            "visas au 367 avenue Louise à Bruxelles. Ouvert du lundi au vendredi de 9 h "
            "a 17 h sans interruption."
        ),
        "canonique": "https://www.travisum.com/a-propos",
    }

    chiffres = [
        (str(len(LANGUES)), "Langues traitées"),
        (str(len(DESTINATIONS)), "Destinations visa"),
        ("4,5 M", "Vues Google Local Guide"),
        ("9h–17h", "Sans interruption"),
    ]
    bloc_chiffres = "".join(
        '<div class="flex flex-col gap-2 px-6 first:pl-0 border-l '
        'border-tertiary-fixed-dim/30 first:border-l-0">'
        '<span class="font-display-lg text-headline-md text-on-tertiary-fixed-variant">'
        "{v}</span>"
        '<span class="font-label-sm text-label-sm text-on-surface-variant uppercase '
        'tracking-widest">{l}</span></div>'.format(v=v, l=l)
        for v, l in chiffres
    )

    engagements = [
        (
            "verified_user",
            "Traducteurs jurés",
            "Les traductions assermentées sont réalisées par des traducteurs experts agréés "
            "par un Tribunal de première instance belge, et reconnues par les autorités "
            "belges et internationales.",
        ),
        (
            "directions_walk",
            "Présence quotidienne",
            "Le bureau se déplace chaque jour auprès des instances bruxelloises. C’est "
            "ce qui permet de raccourcir des délais que la voie postale allongerait.",
        ),
        (
            "lock",
            "Confidentialité",
            "Les documents transmis sont traités comme confidentiels, ne sont ni "
            "communiqués ni réutilisés, et les copies numériques sont supprimées une fois "
            "le dossier clôture.",
        ),
        (
            "hub",
            "Un seul interlocuteur",
            "Traduction, légalisation et visa dans la même maison : une demande peut "
            "enchaîner les trois sans que vous ayez à coordonner trois prestataires.",
        ),
    ]
    cartes_engagements = "".join(
        carte(
            C.cartouche_icone(ic)
            + '<h3 class="font-display-lg text-[21px] text-primary mb-3">'
            + t
            + "</h3>"
            + '<p class="font-body-md text-body-md text-on-surface-variant">'
            + d
            + "</p>"
        )
        for ic, t, d in engagements
    )

    # Les textes legaux ont leur propre page : ils sont longs, consultes
    # deliberement, et doivent etre adressables par une URL stable. « A propos »
    # n'en garde qu'un renvoi.
    LEGALES = [
        ("mentions-legales.html", "gavel", "Mentions légales",
         "Éditeur, directeur de la publication, hébergement et limites de "
         "responsabilité."),
        ("confidentialite.html", "lock", "Politique de confidentialité",
         "Ce que deviennent les copies de passeports, actes et diplômes que "
         "vous nous confiez."),
        ("cgv.html", "description", "Conditions générales",
         "Devis, délais, prix, responsabilité et réclamations."),
        ("cookies.html", "cookie", "Politique cookies",
         "Aucun traceur publicitaire. Ce que le site dépose réellement."),
    ]
    cartes_legales = "".join(
        '<a class="group flex flex-col gap-3 p-7 border border-tertiary-fixed-dim/30 '
        'rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim '
        'transition-colors" href="' + h + '">'
        + icone(ic, "text-[22px]")
        + '<h3 class="font-display-lg text-[20px] text-primary '
          'group-hover:text-on-tertiary-fixed-variant transition-colors">' + t + "</h3>"
        + '<p class="font-body-md text-[15px] text-on-surface-variant">' + d + "</p>"
        + '<span class="inline-flex items-center gap-2 mt-2 font-label-sm text-label-sm '
          'uppercase tracking-widest text-primary">Consulter'
        + icone("arrow_forward", "text-[16px] group-hover:translate-x-1 transition-transform", "")
        + "</span></a>"
        for h, ic, t, d in LEGALES
    )

    corps = (
        banniere(
            "Service 06",
            "Le bureau, avenue Louise.",
            "Travisum Louise Office accompagne particuliers et entreprises dans leurs "
            "démarches documentaires internationales : traduction jurée, légalisation "
            "et visas de voyage.",
            encart=("Vues Google", "4,5 M", "Local Guide"),
        )
        + section(
            '<div class="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">'
            + "<div>"
            + entete_section(
                "Notre metier",
                "Supprimer la corvee administrative",
                None,
            )
            + '<div class="flex flex-col gap-5 font-body-lg text-body-lg '
            'text-on-surface-variant max-w-2xl">'
            "<p>Faire traduire, légaliser puis déposer un document auprès d’un "
            "consulat suppose de connaitre l’ordre exact des étapes, les guichets "
            "compétents et les pièces attendues. Une erreur au debut de la chaîne se "
            "paie à la fin, en semaines perdues.</p>"
            "<p>Le bureau prend cette chaîne en charge de bout en bout. Vous confiez "
            "un document ; vous récupérez un dossier conforme, dans un délai annoncé "
            "d’avance.</p>"
            "<p>C’est un metier de précision et de présence : nos traducteurs sont "
            "assermentés près les tribunaux belges, et le bureau se rend chaque jour "
            "auprès des administrations bruxelloises.</p>"
            "</div></div>" + '<div class="border border-tertiary-fixed-dim/30 rounded-sm '
            'bg-surface-container-lowest p-8">'
            '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
            'tracking-widest mb-6">En chiffres</p>'
            '<div class="flex flex-wrap gap-y-8">' + bloc_chiffres + "</div></div>" + "</div>",
            fond="surface",
            id="manifeste",
        )
        + section(
            entete_section(
                "Nos engagements",
                "Ce sur quoi nous nous engageons",
                "Le client confie des originaux : acte de naissance, diplôme, passeport. "
                "Cela impose un niveau d’exigence particulier.",
            )
            + '<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">'
            + cartes_engagements
            + "</div>",
            fond="basse",
            id="engagements",
        )
        + S.section_bureau(ancre="contact")
        + section(
            entete_section(
                "Informations légales",
                "Mentions, conditions et confidentialité",
                "Quatre textes distincts, consultables à tout moment et accessibles "
                "depuis le pied de page de chaque page du site.",
            )
            + '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">'
            + cartes_legales
            + "</div>",
            fond="surface",
            id="legal",
            filet_bas=False,
        )
        + C.bandeau_conversion(
            "Passez au bureau, ou envoyez un scan.",
            "367 avenue Louise, du lundi au vendredi de 9 h à 17 h sans interruption. "
            "Rendez-vous et conseils personnalises également possibles.",
            action="Nous contacter",
            href="mailto:" + CONTACT["email"],
        )
    )
    return meta, corps

    # ==========================================================================


def main():
    pages = [
        ("tarifs.html", page_tarifs),
        ("ressources.html", page_ressources),
        ("a-propos.html", page_a_propos),
    ]
    for nom, fabrique in pages:
        meta, corps = fabrique()
        html = assembler(meta, corps)
        chemin = os.path.join(RACINE, nom)
        with io.open(chemin, "w", encoding="utf-8", newline="\n") as f:
            f.write(html)
        print("%-18s %7d octets" % (nom, len(html)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
