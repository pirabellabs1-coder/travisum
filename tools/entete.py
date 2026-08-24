# -*- coding: utf-8 -*-
"""
En-tête et méga-menu Travisum.

L'en-tête livré par Stitch ne tient pas la largeur : à 1280 px les six
entrées de navigation, le numéro de téléphone et le bouton d'appel à
l'action se chevauchent (visible sur les captures de référence, où
« Traductions » mord sur le logo et « À propos » percute le numéro).
Il est donc reconstruit ici, à jetons de charte constants :

  - même barre ivoire translucide, même filet de laiton, même logo serif ;
  - même bouton primaire encre, mêmes étiquettes 12 px en capitales ;
  - interlettrage de navigation ramené de 0,18 em à 0,1 em — les 0,18 em
    de la charte restent la règle pour les étiquettes de section, mais
    appliqués à six entrées de menu ils débordent mécaniquement ;
  - un méga-menu pour les trois métiers, conforme à l'écran 12 du devis.

Règle de l'écran 12 : « le clic sur une entrée à méga-menu mène à la page
pilier correspondante ; le menu ne doit jamais bloquer la navigation ni
casser le maillage interne. » Les entrées restent donc de vrais liens.
"""

# --------------------------------------------------------------------------
# Contenu des panneaux, repris de l'écran 12 du devis TRV-2026-01
# --------------------------------------------------------------------------
MEGA = {
    "traductions": {
        "colonnes": [
            (
                "Par type",
                [
                    ("Traduction assermentée", "traductions.html"),
                    ("Traduction libre", "traductions.html"),
                    ("Traduction technique", "traductions.html"),
                    ("Traduction de site web", "traductions.html"),
                ],
            ),
            (
                "Par document",
                [
                    ("Acte de naissance", "traductions.html"),
                    ("Acte de mariage", "traductions.html"),
                    ("Diplôme et relevé de notes", "traductions.html"),
                    ("Jugement et acte notarié", "traductions.html"),
                    ("Statuts de société", "traductions.html"),
                ],
            ),
            (
                "Langues les plus demandées",
                [
                    ("Néerlandais", "traductions.html"),
                    ("Anglais", "traductions.html"),
                    ("Allemand", "traductions.html"),
                    ("Arabe", "traductions.html"),
                    ("Espagnol", "traductions.html"),
                    ("Mandarin", "traductions.html"),
                ],
            ),
        ],
        "carte": {
            "surtitre": "Estimation immédiate",
            "titre": "Un prix et un délai, sans appel téléphonique.",
            "action": ("Estimer ma traduction", "traductions.html"),
        },
    },
    "legalisations": {
        "colonnes": [
            (
                "Prestations",
                [
                    ("Légalisation complète", "legalisations.html"),
                    ("Apostille de La Haye", "legalisations.html"),
                    ("Dépôt SPF Justice", "legalisations.html"),
                    ("Affaires étrangères", "legalisations.html"),
                ],
            ),
            (
                "Instances couvertes",
                [
                    ("Tribunal de 1re instance", "legalisations.html"),
                    ("Cours d’appel", "legalisations.html"),
                    ("Notaires", "legalisations.html"),
                    ("Chambre de commerce (BECI)", "legalisations.html"),
                    ("Ambassades et consulats", "legalisations.html"),
                ],
            ),
            (
                "Comprendre",
                [
                    ("Le parcours d’un document", "legalisations.html"),
                    ("Apostille ou légalisation ?", "legalisations.html"),
                    ("Délais et frais officiels", "legalisations.html"),
                ],
            ),
        ],
        "carte": {
            "surtitre": "En trois secondes",
            "titre": "L’apostille suffit-elle pour votre pays ?",
            "action": ("Vérifier", "legalisations.html"),
        },
    },
    "visas": {
        "colonnes": [
            (
                "Destinations phares",
                [
                    ("Fédération de Russie", "visas.html"),
                    ("République Populaire de Chine", "visas.html"),
                    ("République de l’Inde", "visas.html"),
                    ("États-Unis — ESTA", "visas.html"),
                ],
            ),
            (
                "Par motif",
                [
                    ("Tourisme", "visas.html"),
                    ("Affaires", "visas.html"),
                    ("Études", "visas.html"),
                    ("Transit", "visas.html"),
                ],
            ),
            (
                "Types de procédure",
                [
                    ("Visa consulaire", "visas.html"),
                    ("e-Visa", "visas.html"),
                    ("ESTA", "visas.html"),
                ],
            ),
        ],
        "carte": {
            "surtitre": "Vérificateur",
            "titre": "Ai-je besoin d’un visa pour ce voyage ?",
            "action": ("Vérifier mes conditions", "visas.html"),
        },
    },
}

# Ordre de la barre. `mega` indique si l'entrée déploie un panneau.
ENTREES = [
    ("Traductions", "traductions", "traductions.html", True),
    ("Légalisations", "legalisations", "legalisations.html", True),
    ("Visas", "visas", "visas.html", True),
    ("Tarifs & Délais", "tarifs", "tarifs.html", False),
    ("Ressources", "ressources", "ressources.html", False),
    ("À propos", "a-propos", "a-propos.html", False),
]

LOGO = (
    '<a class="flex items-center shrink-0" href="index.html" '
    'aria-label="Travisum — accueil">'
    '<img class="h-10 w-auto" src="assets/img/logo-travisum.svg" '
    'alt="Travisum — Traductions, légalisations et visas" '
    'width="672" height="152">'
    "</a>"
)


def _panneau(cle):
    """Panneau de méga-menu : trois colonnes de liens + une carte de conversion."""
    bloc = MEGA[cle]
    colonnes = []
    for titre, liens in bloc["colonnes"]:
        items = "".join(
            '<li><a class="block py-1.5 font-body-md text-body-md text-on-surface-variant '
            'hover:text-primary hover:translate-x-1 transition-all duration-200" href="{href}">{lib}</a></li>'.format(
                href=href, lib=lib
            )
            for lib, href in liens
        )
        colonnes.append(
            '<div class="col-span-12 md:col-span-3">'
            '<p class="font-label-sm text-label-sm uppercase text-on-tertiary-fixed-variant '
            'pb-3 mb-3 border-b border-tertiary-fixed-dim/40">{titre}</p>'
            '<ul class="flex flex-col">{items}</ul>'
            "</div>".format(titre=titre, items=items)
        )

    carte = bloc["carte"]
    colonnes.append(
        '<div class="col-span-12 md:col-span-3">'
        '<div class="h-full bg-primary text-on-primary p-6 flex flex-col gap-4 rounded-sm">'
        '<p class="font-label-sm text-label-sm uppercase text-tertiary-fixed-dim">{surtitre}</p>'
        '<p class="font-display-lg text-[20px] leading-snug">{titre}</p>'
        '<a class="mt-auto inline-flex items-center justify-center gap-2 bg-tertiary-fixed-dim '
        "text-on-tertiary-fixed px-5 py-3 font-label-sm text-label-sm uppercase tracking-widest "
        'rounded-sm hover:bg-white transition-colors" href="{href}">{lib}</a>'
        "</div></div>".format(
            surtitre=carte["surtitre"],
            titre=carte["titre"],
            href=carte["action"][1],
            lib=carte["action"][0],
        )
    )

    return (
        '<div class="mega absolute left-0 right-0 top-full bg-surface '
        'border-t border-tertiary-fixed-dim/30 shadow-xl" data-mega-panneau>'
        '<div class="max-w-max-width mx-auto px-margin-desktop py-10 grid grid-cols-12 gap-gutter">'
        + "".join(colonnes)
        + "</div></div>"
    )


def entete(actif):
    """Barre de navigation complète pour la page dont la clé est `actif`."""
    items = []
    for libelle, cle, href, a_mega in ENTREES:
        courant = cle == actif
        classes = (
            "relative inline-flex items-center h-20 font-label-sm text-label-sm uppercase "
            "tracking-[0.1em] whitespace-nowrap transition-colors "
            + (
                "text-primary font-bold"
                if courant
                else "text-on-surface-variant hover:text-primary"
            )
        )
        attrs = ' aria-current="page"' if courant else ""
        if href is None:
            attrs += ' aria-disabled="true" title="Page à venir"'
            cible = "#"
        else:
            cible = href

            # Filet de laiton sous l'entrée active ou survolée
        soulignement = (
            '<span class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-primary '
            "origin-left transition-transform duration-300 "
            + ("scale-x-100" if courant else "scale-x-0 group-hover:scale-x-100")
            + '"></span>'
        )

        lien = (
            '<a class="{classes} group" data-path="{cle}" href="{cible}"{attrs}>{libelle}'
            "{soulignement}</a>".format(
                classes=classes,
                cle=cle,
                cible=cible,
                attrs=attrs,
                libelle=libelle,
                soulignement=soulignement,
            )
        )

        if a_mega:
            items.append(
                '<li class="group" data-mega>{lien}{panneau}</li>'.format(
                    lien=lien, panneau=_panneau(cle)
                )
            )
        else:
            items.append('<li class="group">{lien}</li>'.format(lien=lien))

            # Selecteur de langue compact. La forme « FR · NL · EN » deployee coutait
            # ~90 px dans une barre deja saturee ; un bouton + liste deroulante rend
            # la meme fonction en 48 px et supporte l'ajout d'autres langues.
    langues = (
        '<div class="relative shrink-0" data-langues>'
        '<button class="flex items-center gap-1 font-label-sm text-label-sm uppercase '
        'tracking-[0.1em] text-primary hover:text-on-tertiary-fixed-variant transition-colors" '
        'data-bascule-langues aria-expanded="false" aria-haspopup="true" '
        'aria-label="Changer de langue - francais selectionne">FR'
        '<span class="material-symbols-outlined text-[16px] transition-transform duration-200" '
        'aria-hidden="true">expand_more</span></button>'
        '<ul class="hidden absolute right-0 top-full mt-3 min-w-[112px] bg-surface '
        'border border-tertiary-fixed-dim/40 shadow-xl rounded-sm py-1" data-liste-langues>'
        '<li><a class="block px-4 py-2 font-label-sm text-label-sm uppercase text-primary '
        'font-bold bg-surface-container-low" href="#" aria-current="true">Francais</a></li>'
        '<li><a class="block px-4 py-2 font-label-sm text-label-sm uppercase '
        "text-on-surface-variant hover:text-primary hover:bg-surface-container-low "
        'transition-colors" href="#" aria-disabled="true" title="Version néerlandaise à venir">Nederlands</a></li>'
        '<li><a class="block px-4 py-2 font-label-sm text-label-sm uppercase '
        "text-on-surface-variant hover:text-primary hover:bg-surface-container-low "
        'transition-colors" href="#" aria-disabled="true" title="English version coming soon">English</a></li>'
        "</ul></div>"
    )

    burger = (
        '<button class="xl:hidden flex flex-col justify-center gap-[5px] w-10 h-10 shrink-0 -mr-2" '
        'data-bascule-menu aria-expanded="false" aria-controls="menu-mobile" '
        'aria-label="Ouvrir le menu de navigation">'
        '<span class="block w-6 h-px bg-primary transition-all duration-300"></span>'
        '<span class="block w-6 h-px bg-primary transition-all duration-300"></span>'
        '<span class="block w-6 h-px bg-primary transition-all duration-300"></span>'
        "</button>"
    )

    return (
        '<header class="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md '
        'border-b border-tertiary-fixed-dim/30 transition-all duration-300" data-entete>'
        '<div class="h-20 max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop '
        'flex items-center gap-6 2xl:gap-10">'
        + LOGO
        + '<nav class="hidden xl:block ml-auto" aria-label="Navigation principale" '
        'data-active-classes="text-primary font-bold">'
        '<ul class="flex items-stretch gap-6 2xl:gap-8">'
        + "".join(items)
        + "</ul></nav>"
        + '<div class="hidden xl:flex items-center gap-4 shrink-0">'
        '<a class="hidden 2xl:inline font-label-sm text-label-sm text-primary uppercase '
        'tracking-[0.1em] whitespace-nowrap hover:text-on-tertiary-fixed-variant transition-colors" '
        'href="tel:026420025">02 642 00 25</a>'
        + langues
        + '<a class="bg-primary text-on-primary px-5 py-3 font-label-sm text-label-sm uppercase '
        'tracking-[0.1em] whitespace-nowrap hover:bg-primary-container transition-all rounded-sm" '
        'href="traductions.html">Devis en 2 minutes</a>'
        "</div>" + '<div class="xl:hidden ml-auto flex items-center gap-4">'
        '<a class="hidden sm:inline font-label-sm text-label-sm text-primary uppercase '
        'tracking-[0.1em] whitespace-nowrap" href="tel:026420025">02 642 00 25</a>'
        + burger
        + "</div>"
        + "</div></header>"
    )


def menu_mobile(actif):
    """Panneau plein ecran sous 1024 px, avec sous-menus en accordeon."""
    lignes = []

    for i, (libelle, cle, href, a_mega) in enumerate(ENTREES, 1):
        courant = cle == actif
        couleur = "text-tertiary-fixed-dim" if courant else "text-on-primary"
        cible = href or "#"
        attrs = ' aria-current="page"' if courant else ""
        if href is None:
            attrs += ' aria-disabled="true" title="Page à venir"'

        lien = (
            '<a class="flex items-baseline gap-5 py-4 font-display-lg text-[26px] leading-tight '
            '{couleur} hover:text-tertiary-fixed-dim transition-colors grow" href="{cible}"{attrs}>'
            '<span class="font-label-sm text-label-sm text-tertiary-fixed-dim">{num:02d}</span>'
            "{libelle}</a>"
        ).format(couleur=couleur, cible=cible, attrs=attrs, num=i, libelle=libelle)

        if not a_mega:
            lignes.append('<li class="border-b border-tertiary-fixed-dim/20">' + lien + "</li>")
            continue

            # Sous-menu depliable : reprend les colonnes du mega-menu
        contenu = []
        for titre, entrees in MEGA[cle]["colonnes"]:
            contenu.append(
                '<p class="font-label-sm text-label-sm uppercase text-tertiary-fixed-dim '
                'mt-5 mb-2 first:mt-0">{t}</p>'.format(t=titre)
            )
            contenu.append(
                '<ul class="flex flex-col">'
                + "".join(
                    '<li><a class="block py-1.5 font-body-md text-body-md text-primary-fixed-dim '
                    'hover:text-on-primary transition-colors" href="{h}">{l}</a></li>'.format(
                        h=h, l=l
                    )
                    for l, h in entrees
                )
                + "</ul>"
            )

        bascule = (
            '<button class="shrink-0 w-11 h-11 flex items-center justify-center text-tertiary-fixed-dim" '
            'data-bascule-sous aria-expanded="false" aria-label="Deplier le sous-menu {lib}">'
            '<span class="material-symbols-outlined transition-transform duration-300" '
            'aria-hidden="true">expand_more</span>'
            "</button>"
        ).format(lib=libelle)

        lignes.append(
            '<li class="border-b border-tertiary-fixed-dim/20">'
            '<div class="flex items-center gap-2">' + lien + bascule + "</div>"
            '<div class="hidden pb-5 pl-9" data-sous-menu>' + "".join(contenu) + "</div>"
            "</li>"
        )

    return (
        '<div class="menu-mobile xl:hidden fixed inset-0 z-40 bg-primary text-on-primary '
        'overflow-y-auto pt-24 px-margin-mobile pb-16" id="menu-mobile" data-menu-mobile>'
        '<img class="h-9 w-auto mb-10" src="assets/img/logo-travisum-clair.svg" '
        'alt="Travisum" width="672" height="152">'
        '<nav aria-label="Navigation principale (mobile)"><ul class="flex flex-col">'
        + "".join(lignes)
        + "</ul></nav>"
        '<div class="mt-10 flex flex-col gap-3 font-body-md text-body-md text-primary-fixed-dim">'
        '<p class="font-label-sm text-label-sm uppercase text-tertiary-fixed-dim">Bureau</p>'
        "<p>Bruxelles, Belgique<br>Avenue Louise 123</p>"
        '<p><a class="hover:text-on-primary transition-colors" href="tel:026420025">02 642 00 25</a></p>'
        '<div class="flex items-center gap-3 font-label-sm text-label-sm uppercase mt-2">'
        '<a class="text-tertiary-fixed-dim font-bold" href="#">FR</a>'
        '<span aria-hidden="true">.</span><a class="hover:text-on-primary" href="#" aria-disabled="true" title="Version néerlandaise à venir">NL</a>'
        '<span aria-hidden="true">.</span><a class="hover:text-on-primary" href="#" aria-disabled="true" title="English version coming soon">EN</a>'
        "</div>"
        '<a class="mt-4 bg-tertiary-fixed-dim text-on-tertiary-fixed px-6 py-4 text-center '
        "font-label-sm text-label-sm uppercase tracking-widest rounded-sm "
        'hover:bg-white transition-colors" href="traductions.html">Devis en 2 minutes</a>'
        "</div></div>"
    )
