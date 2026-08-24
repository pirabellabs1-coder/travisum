# -*- coding: utf-8 -*-
"""
Sections de contenu et pied de page.

Le pied de page de la maquette Stitch est sur fond ivoire clair
(`bg-surface-container-low`) : il se confond avec le corps de page et ne
« ferme » rien. Il est refait ici sur fond encre, comme les autres zones
d'autorité du site (en-tete, bandeaux de conversion), conformement à la
section 04 du devis : « L'encre de nuit porte les zones d'autorité :
en-tete, bandeaux d'appel à l'action, pied de page. »
"""

import unicodedata

from donnees import (SLUGS, 
    CONTACT,
    DESTINATIONS,
    DESTINATIONS_PHARES,
    DOCUMENTS_LEGALISATION,
    DOCUMENTS_TRADUCTION,
    INSTANCES,
    PROCEDURE_VISA,
)
from composants import MAXW, carte, cartouche_icone, entete_section, etiquette, icone, section


def aplatir(s):
    return "".join(
        c for c in unicodedata.normalize("NFD", s.lower()) if unicodedata.category(c) != "Mn"
    )

    # ==========================================================================
    #  Pied de page
    # ==========================================================================


def pied_de_page():
    def colonne(titre, liens):
        items = "".join(
            '<li><a class="font-body-md text-body-md text-primary-fixed-dim '
            'hover:text-tertiary-fixed-dim transition-colors" href="{h}">{l}</a></li>'.format(
                h=h, l=l
            )
            for l, h in liens
        )
        return (
            '<div class="flex flex-col">'
            '<h3 class="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase '
            'tracking-widest pb-4 mb-5 border-b border-tertiary-fixed-dim/25">{t}</h3>'
            '<ul class="flex flex-col gap-3">{i}</ul></div>'.format(t=titre, i=items)
        )

    services = colonne(
        "Services",
        [
            ("Traductions assermentées", "traductions.html"),
            ("Traductions libres", "traductions.html"),
            ("Légalisation consulaire", "legalisations.html"),
            ("Apostille de La Haye", "legalisations.html"),
            ("Visas de voyage", "visas.html"),
            ("Tarifs et délais", "tarifs.html"),
        ],
    )

    destinations = colonne(
        "Destinations visa",
        [
            ("Fédération de Russie", "visas.html#destinations"),
            ("République Populaire de Chine", "visas.html#destinations"),
            ("République de l’Inde", "visas.html#destinations"),
            ("États-Unis — ESTA", "visas.html#toutes"),
            ("Les %d destinations" % len(DESTINATIONS), "visas.html#toutes"),
        ],
    )

    ressources = colonne(
        "Ressources",
        [
            ("Guides et articles", "ressources.html"),
            ("Listes de pièces par pays", "ressources.html#documents"),
            ("Questions fréquentes", "ressources.html#faq"),
            ("Le bureau", "a-propos.html"),
            ("Nous contacter", "a-propos.html#contact"),
        ],
    )

    bureau = (
        '<div class="flex flex-col">'
        '<h3 class="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase '
        'tracking-widest pb-4 mb-5 border-b border-tertiary-fixed-dim/25">Le bureau</h3>'
        '<address class="not-italic flex flex-col gap-3 font-body-md text-body-md '
        'text-primary-fixed-dim">'
        "<p>{raison}<br>{rue}<br>{cp} {ville}</p>"
        '<p><a class="hover:text-tertiary-fixed-dim transition-colors" href="tel:{ttel}">{tel}</a>'
        '<br><a class="hover:text-tertiary-fixed-dim transition-colors" href="tel:{mtel}">{mob}</a>'
        '<br><a class="hover:text-tertiary-fixed-dim transition-colors" href="mailto:{mail}">'
        "{mail}</a></p>"
        '<p class="text-[15px]">{horaires}</p>'
        "</address>"
        '<div class="flex gap-3 mt-6">'
        '<a class="w-10 h-10 flex items-center justify-center border '
        "border-tertiary-fixed-dim/30 rounded-sm text-primary-fixed-dim "
        'hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim transition-colors" '
        'href="https://www.facebook.com/travisum" rel="noopener noreferrer" target="_blank" '
        'aria-label="Travisum sur Facebook">' + icone("thumb_up", "text-[18px]", "") + "</a>"
        '<a class="w-10 h-10 flex items-center justify-center border '
        "border-tertiary-fixed-dim/30 rounded-sm text-primary-fixed-dim "
        'hover:border-tertiary-fixed-dim hover:text-tertiary-fixed-dim transition-colors" '
        'href="https://www.google.com/maps/contrib/109558206315936242703/photos" '
        'rel="noopener noreferrer" target="_blank" aria-label="Travisum sur Google Local Guide">'
        + icone("location_on", "text-[18px]", "")
        + "</a>"
        "</div></div>"
    ).format(
        raison=CONTACT["raison"],
        rue=CONTACT["rue"],
        cp=CONTACT["code_postal"],
        ville=CONTACT["ville"],
        ttel=CONTACT["telephone_tel"],
        tel=CONTACT["telephone"],
        mtel=CONTACT["mobile_tel"],
        mob=CONTACT["mobile"],
        mail=CONTACT["email"],
        horaires=CONTACT["horaires"],
    )

    lettre = (
        '<div class="mt-16 pt-12 border-t border-tertiary-fixed-dim/25 grid grid-cols-1 '
        'lg:grid-cols-2 gap-10 items-center">'
        "<div>"
        + etiquette("Lettre d’information", sombre=True)
        + '<p class="font-display-lg text-[22px] md:text-[26px] text-on-primary mt-3 '
        'leading-snug max-w-md">Changements de procédure, délais consulaires, '
        "nouvelles destinations.</p>"
        '<p class="font-body-md text-body-md text-primary-fixed-dim mt-2">'
        "Une fois par trimestre, pas davantage.</p>"
        "</div>"
        '<form class="flex flex-col sm:flex-row gap-3" data-lettre>'
        '<label class="sr-only" for="lettre-email">Votre adresse e-mail</label>'
        '<input class="grow bg-transparent border border-tertiary-fixed-dim/40 rounded-sm '
        "px-4 py-3.5 font-body-md text-on-primary outline-none focus:border-tertiary-fixed-dim "
        'transition-colors placeholder:text-primary-fixed-dim/50" id="lettre-email" '
        'type="email" name="email" placeholder="vous@exemple.be" required>'
        '<button class="shrink-0 bg-tertiary-fixed-dim text-on-tertiary-fixed px-7 py-3.5 '
        "font-label-sm text-label-sm uppercase tracking-widest rounded-sm "
        'hover:bg-white transition-colors" type="submit">S’inscrire</button>'
        "</form></div>"
    )

    bas = (
        '<div class="mt-14 pt-8 border-t border-tertiary-fixed-dim/25 flex flex-col '
        'md:flex-row justify-between items-start md:items-center gap-5">'
        '<p class="font-label-sm text-label-sm text-primary-fixed-dim uppercase '
        'tracking-widest">&copy; 2026 Travisum Louise Office. Tous droits réservés.</p>'
        '<ul class="flex flex-wrap gap-x-8 gap-y-3">'
        + "".join(
            '<li><a class="font-label-sm text-label-sm text-primary-fixed-dim uppercase '
            'tracking-widest hover:text-tertiary-fixed-dim transition-colors" '
            'href="{h}">{l}</a></li>'.format(h=h, l=l)
            for l, h in [
                ("Mentions légales", "mentions-legales.html"),
                ("Confidentialité", "confidentialite.html"),
                ("Conditions générales", "cgv.html"),
                ("Cookies", "cookies.html"),
            ]
        )
        + "</ul></div>"
    )

    return (
        '<footer class="w-full bg-primary text-on-primary relative overflow-hidden '
        'pt-20 md:pt-24 pb-12">'
        '<div class="guilloche absolute inset-0 opacity-[0.06] pointer-events-none" '
        'aria-hidden="true"></div>'
        '<div class="{m} relative z-10">'
        '<img class="h-11 w-auto mb-12" src="assets/img/logo-travisum-clair.svg" '
        'alt="Travisum — Traductions, légalisations et visas" '
        'width="672" height="152">'
        '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-gutter">'
        + services
        + destinations
        + ressources
        + bureau
        + "</div>"
        + lettre
        + bas
        + "</div></footer>"
    ).format(m=MAXW)

    # ==========================================================================
    #  Sections de contenu
    # ==========================================================================



def carte_bureau():
    """Plan d'accès, chargé seulement après clic.

    Un iframe Google Maps dépose des cookies dès l'affichage. La politique
    cookies du site promet qu'aucun traceur n'est déposé avant consentement :
    la carte n'est donc chargée que sur action explicite du visiteur. Tant
    qu'il ne clique pas, il voit l'adresse et un lien vers Maps.
    """
    requete = "Travisum+Louise+Office,+Avenue+Louise+367,+1050+Bruxelles"
    return (
        '<div class="border border-tertiary-fixed-dim/30 rounded-sm overflow-hidden '
        'bg-surface-container-lowest">'
        '<div class="relative aspect-[4/3] bg-primary flex flex-col items-center '
        'justify-center gap-5 text-center px-8" data-carte '
        'data-src="https://www.google.com/maps?q=' + requete + '&amp;output=embed">'
        '<div class="guilloche absolute inset-0 opacity-[0.10] pointer-events-none" '
        'aria-hidden="true"></div>'
        '<div class="relative z-10 flex flex-col items-center gap-4">'
        + icone("map", "text-[32px]", "text-tertiary-fixed-dim")
        + '<p class="font-display-lg text-[21px] text-on-primary">367, avenue Louise</p>'
          '<p class="font-body-md text-[15px] text-primary-fixed-dim max-w-xs">'
          "Le plan est fourni par Google Maps, qui dépose ses propres cookies. "
          "Il ne se charge qu'à votre demande.</p>"
          '<button class="mt-2 bg-tertiary-fixed-dim text-on-tertiary-fixed px-6 py-3 '
          'font-label-sm text-label-sm uppercase tracking-widest rounded-sm '
          'hover:bg-white transition-colors" type="button" data-charger-carte>'
          "Afficher le plan</button>"
          '<a class="font-label-sm text-label-sm uppercase tracking-widest '
          'text-primary-fixed-dim underline decoration-tertiary-fixed-dim '
          'underline-offset-4 hover:text-tertiary-fixed-dim transition-colors" '
          'href="https://maps.app.goo.gl/avsW7i5xRo2qmt2s5" target="_blank" '
          'rel="noopener noreferrer">Ouvrir dans Google Maps</a>'
          "</div></div>"
        '<div class="flex flex-wrap items-center justify-between gap-4 px-6 py-4 '
        'border-t border-tertiary-fixed-dim/25">'
        '<p class="font-body-md text-[15px] text-on-surface-variant">'
        "Métro Louise, trams 8 et 93, bus 54.</p>"
        '<a class="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase '
        'tracking-widest text-primary hover:text-on-tertiary-fixed-variant '
        'transition-colors" href="https://maps.app.goo.gl/avsW7i5xRo2qmt2s5" '
        'target="_blank" rel="noopener noreferrer">Itinéraire'
        + icone("open_in_new", "text-[16px]", "") + "</a></div></div>"
    )


def section_documents(variante="traduction"):
    """Les listes de documents du site actuel, en deux colonnes bordees."""
    if variante == "traduction":
        docs, titre = DOCUMENTS_TRADUCTION, "Les documents que nous traduisons"
        surtitre, chapeau = "Documents traités", (
            "Une expertise couvrant l’ensemble des besoins légaux, commerciaux "
            "et académiques. Si votre document ne figure pas ici, envoyez-le : la "
            "réponse arrive le jour même."
        )
    else:
        docs, titre = DOCUMENTS_LEGALISATION, "Les documents que nous legalisons"
        surtitre, chapeau = "Documents traités", (
            "Cachet officiel, dépôt et récupération auprès des instances belges "
            "et des representations diplomatiques."
        )

    items = "".join(
        '<li class="flex items-start gap-4 py-4 border-b border-tertiary-fixed-dim/20">'
        '<span class="w-4 h-px bg-tertiary-fixed-dim mt-3 shrink-0" aria-hidden="true"></span>'
        '<span class="font-body-md text-body-md text-on-surface">{d}</span></li>'.format(d=d)
        for d in docs
    )

    corps = (
        entete_section(surtitre, titre, chapeau)
        + '<ul class="grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t '
        'border-tertiary-fixed-dim/20">' + items + "</ul>"
    )
    return section(corps, fond="basse", id="documents")


def section_instances():
    """Les douze instances auprès desquelles le bureau se déplace."""
    items = "".join(
        '<li class="flex items-start gap-4 py-4 border-b border-tertiary-fixed-dim/20">'
        + icone("check_circle", "text-[16px] mt-1 shrink-0", "text-secondary")
        + '<span class="font-body-md text-body-md text-on-surface">{i}</span></li>'.format(i=i)
        for i in INSTANCES
    )
    corps = (
        entete_section(
            "Instances couvertes",
            "Où nous nous déplaçons quotidiennement",
            "Notre présence physique quotidienne auprès des instances officielles à "
            "Bruxelles nous permet de raccourcir considérablement les délais de traitement.",
        )
        + '<ul class="grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t '
        'border-tertiary-fixed-dim/20">' + items + "</ul>"
    )
    return section(corps, fond="surface", id="instances")


def section_toutes_destinations():
    """Les 70 destinations du site actuel, avec recherche instantanee."""
    cartes = []
    for pays in DESTINATIONS:
        cartes.append(
            '<a class="group flex items-center justify-between gap-3 px-5 py-4 border '
            "border-tertiary-fixed-dim/25 rounded-sm bg-surface-container-lowest "
            'hover:border-tertiary-fixed-dim transition-colors" '
            'href="visas/' + SLUGS.get(pays, "") + '/" '
            'data-terme="' + aplatir(pays) + '">'
            '<span class="font-body-md text-body-md text-on-surface '
            'group-hover:text-primary transition-colors">'
            + pays
            + "</span>"
            + icone(
                "arrow_forward",
                "text-[16px] opacity-0 group-hover:opacity-100 transition-opacity",
                "text-on-tertiary-fixed-variant",
            )
            + "</a>"
        )

    corps = (
        entete_section(
            "Toutes les destinations",
            "%d pays pris en charge" % len(DESTINATIONS),
            "Pour toute autre destination, prenez contact avec le bureau : nous "
            "traitons également les demandes hors liste.",
        )
        + '<div class="flex flex-col md:flex-row md:items-end gap-6 mb-10">'
        + '<div class="grow max-w-md">'
        '<label class="font-label-sm text-label-sm text-on-surface-variant uppercase '
        'tracking-widest mb-2 block" for="rech-pays">Rechercher un pays</label>'
        '<div class="relative">'
        '<span class="material-symbols-outlined absolute left-0 bottom-2 '
        'text-on-surface-variant/50 text-[18px]" aria-hidden="true">search</span>'
        '<input class="w-full bg-transparent border-b border-tertiary-fixed-dim/40 py-2 '
        "pl-7 font-body-md text-primary outline-none focus:border-primary transition-colors "
        'placeholder:text-on-surface-variant/40" id="rech-pays" type="search" '
        'placeholder="Ex : Chine, Senegal, Qatar…" autocomplete="off" '
        'data-filtre="#grille-pays" data-compteur-cible="#compte-pays">'
        "</div></div>" + '<p class="flex items-baseline gap-3 shrink-0">'
        '<span class="font-display-lg text-headline-md text-primary" id="compte-pays">%d</span>'
        % len(DESTINATIONS)
        + etiquette("destinations affichees")
        + "</p></div>"
        + '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" id="grille-pays">'
        + "".join(cartes)
        + "</div>"
        + '<div class="hidden mt-10" data-aucun-resultat>'
        + carte(
            '<h3 class="font-display-lg text-[21px] text-primary mb-3">'
            "Cette destination n’est pas dans la liste ?</h3>"
            '<p class="font-body-md text-body-md text-on-surface-variant mb-6 max-w-xl">'
            "Le bureau traité également les demandes hors liste. Contactez-nous avec "
            "votre destination et le motif du sejour.</p>"
            '<a class="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 '
            "font-label-sm text-label-sm uppercase tracking-widest rounded-sm "
            'hover:bg-primary-container transition-colors" href="mailto:%s">'
            "Nous ecrire</a>" % CONTACT["email"],
            accent="laiton",
        )
        + "</div>"
    )
    return section(corps, fond="basse", id="toutes")


def section_procedure_visa():
    """Le service de facilitation, texte du site actuel mot pour mot."""
    etapes = []
    for i, texte in enumerate(PROCEDURE_VISA, 1):
        etapes.append(
            '<div class="relative flex flex-col gap-5">'
            '<div class="w-16 h-16 rounded-full bg-primary-container border '
            "border-tertiary-fixed-dim/50 flex items-center justify-center "
            'font-display-lg text-[22px] text-tertiary-fixed-dim shrink-0 relative z-10">'
            "{n:02d}</div>"
            '<p class="font-body-md text-body-md text-primary-fixed-dim max-w-sm">{t}</p>'
            "</div>".format(n=i, t=texte)
        )

    corps = (
        entete_section(
            "Notre service",
            "En quoi consiste notre facilitation d’obtention de visas ?",
            sombre=True,
        )
        + '<div class="relative">'
        '<div class="hidden md:block absolute top-8 left-0 w-full h-px '
        'bg-tertiary-fixed-dim/30" aria-hidden="true"></div>'
        '<div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-gutter relative">'
        + "".join(etapes)
        + "</div></div>"
        + '<div class="mt-16 pt-8 border-t border-tertiary-fixed-dim/25">'
        '<div class="flex items-start gap-4 max-w-3xl">'
        + icone("gavel", "text-[20px] mt-1 shrink-0", "text-tertiary-fixed-dim")
        + '<p class="font-body-md text-body-md text-primary-fixed-dim">'
        '<strong class="text-on-primary font-semibold">La décision appartient au '
        "consulat.</strong> Notre prestation porte sur la conformite et la complétude "
        "du dossier, la prise de rendez-vous, le dépôt et le suivi. Aucun intermédiaire "
        "ne peut garantir la délivrance d’un visa.</p></div></div>"
    )
    return section(corps, fond="encre", id="procedure")


def section_bureau(ancre="bureau"):
    """Bloc de reassurance : adresse, horaires, contact, preuve sociale."""
    infos = [
        (
            "location_on",
            "Adresse",
            "{r}<br>{cp} {v}, {p}".format(
                r=CONTACT["rue"],
                cp=CONTACT["code_postal"],
                v=CONTACT["ville"],
                p=CONTACT["pays"],
            ),
        ),
        ("schedule", "Horaires", CONTACT["horaires"]),
        (
            "call",
            "Telephone",
            '<a class="hover:text-primary transition-colors" href="tel:{a}">{b}</a><br>'
            '<a class="hover:text-primary transition-colors" href="tel:{c}">{d}</a>'.format(
                a=CONTACT["telephone_tel"],
                b=CONTACT["telephone"],
                c=CONTACT["mobile_tel"],
                d=CONTACT["mobile"],
            ),
        ),
        (
            "mail",
            "E-mail",
            '<a class="hover:text-primary transition-colors" href="mailto:{m}">{m}</a>'.format(
                m=CONTACT["email"]
            ),
        ),
    ]
    lignes = "".join(
        '<div class="flex items-start gap-4 py-5 border-b border-tertiary-fixed-dim/20">'
        + icone(ic, "text-[20px] mt-0.5 shrink-0")
        + "<div>"
        '<p class="font-label-sm text-label-sm text-on-surface-variant uppercase '
        'tracking-widest mb-1.5">{t}</p>'
        '<p class="font-body-md text-body-md text-on-surface">{v}</p></div></div>'.format(
            t=t, v=v
        )
        for ic, t, v in infos
    )

    corps = (
        '<div class="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">'
        + "<div>"
        + entete_section(
            "Le bureau",
            "367, avenue Louise",
            "Le bureau recoit du lundi au vendredi pour déposer et récupérer vos "
            "documents. Rendez-vous et conseils personnalises également possibles.",
        )
        + '<a class="inline-flex items-center gap-2 bg-primary text-on-primary px-7 py-4 '
        "font-label-sm text-label-sm uppercase tracking-widest rounded-sm "
        'hover:bg-primary-container transition-colors" href="a-propos.html#contact">'
        + "Prendre rendez-vous"
        + icone("arrow_forward", "text-[16px]", "")
        + "</a>"
        + "</div>"
        + '<div class="border-t border-tertiary-fixed-dim/20">'
        + lignes
        + '<div class="mt-8 p-6 border border-tertiary-fixed-dim/30 rounded-sm '
        'bg-surface-container-lowest flex items-start gap-4">'
        + icone("verified", "text-[22px] shrink-0", plein=True)
        + "<div>"
        '<p class="font-display-lg text-[20px] text-primary leading-snug">4 500 000 vues</p>'
        '<p class="font-body-md text-[15px] text-on-surface-variant mt-1">'
        "sur la fiche Google Local Guide du bureau.</p></div></div>" + "</div></div>"
        + '<div class="mt-14">'
        + carte_bureau()
        + "</div>"
    )
    return section(corps, fond="surface", id=ancre)


def section_destinations_phares(titre="Destinations fréquentes", fond="basse"):
    """Les trois fiches pays de la maquette, en cartes bordees."""
    cartes = []
    for d in DESTINATIONS_PHARES:
        cartes.append(
            '<a class="group relative flex flex-col justify-end min-h-[420px] '
            'border border-tertiary-fixed-dim/30 rounded-sm overflow-hidden bg-primary" '
            'href="{lien}">'
            '<img class="absolute inset-0 w-full h-full object-cover opacity-55 '
            'group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" '
            'src="{image}" alt="{alt}" loading="lazy" width="800" height="1000">'
            '<div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 '
            'to-transparent" aria-hidden="true"></div>'
            '<div class="relative z-10 p-7 flex flex-col gap-4">'
            '<span class="self-start px-3 py-1.5 border border-tertiary-fixed-dim/60 '
            "rounded-sm font-label-sm text-label-sm uppercase tracking-widest "
            'text-tertiary-fixed-dim bg-primary/60">{type}</span>'
            '<h3 class="font-display-lg text-[26px] md:text-[30px] text-on-primary '
            'leading-tight">{nom}</h3>'
            '<div class="grid grid-cols-2 gap-4 pt-4 border-t border-tertiary-fixed-dim/30">'
            "<div>"
            '<p class="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase '
            'tracking-widest mb-1">Délai moyen</p>'
            '<p class="font-body-md text-body-md text-on-primary">{delai}</p></div>'
            "<div>"
            '<p class="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase '
            'tracking-widest mb-1">A partir de</p>'
            '<p class="font-body-md text-body-md text-on-primary">{prix}</p></div>'
            "</div></div></a>".format(**d)
        )

    corps = (
        '<div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">'
        + "<div>"
        + entete_section(
            "Destinations phares",
            titre,
            "Les corridors diplomatiques les plus demandes pour les " "professionnels belges.",
        ).replace("mb-14", "mb-0")
        + "</div>"
        + '<a class="inline-flex items-center gap-2 font-label-sm text-label-sm uppercase '
        "tracking-widest text-primary border-b border-tertiary-fixed-dim pb-1 "
        'hover:text-on-tertiary-fixed-variant transition-colors shrink-0" '
        'href="visas.html#toutes">Toutes les destinations'
        + icone("arrow_downward", "text-[16px]", "")
        + "</a></div>"
        + '<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">'
        + "".join(cartes)
        + "</div>"
    )
    return section(corps, fond=fond, id="destinations")
