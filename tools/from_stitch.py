# -*- coding: utf-8 -*-
"""
Migration des exports Stitch vers les pages de production.

Les dossiers *_travisum/ contiennent l'export brut de la maquette Stitch
(code.html + screen.png). Ce script en dérive les pages du site, en ne
touchant qu'à ce qui doit l'être :

  - un <head> complet : titre, description, canonique, hreflang, données
    structurées, feuille compilée en lieu et place du CDN Tailwind ;
  - les images du CDN Google remplacées par leurs copies locales ;
  - les liens de navigation et de pied de page câblés sur les vraies pages ;
  - la vignette de profil (photo d'inconnu servie par Stitch) remplacée par
    le sélecteur FR/NL/EN prévu au devis ;
  - un menu mobile, absent des maquettes ;
  - le script de comportement.

Tout le reste du balisage — structure, classes, contenu rédactionnel — est
repris caractère pour caractère. C'est volontaire : la maquette fait foi.

Usage :  python tools/from_stitch.py
"""

import io
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import entete as ENTETE
import rythme
import composants as C
import sections as S
import tableaux as T
import contenu as TXT

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --------------------------------------------------------------------------
# Les quatre écrans livrés par Stitch
# --------------------------------------------------------------------------
PAGES = [
    {
        "source": "accueil_travisum",
        "cle": "accueil",
        "cible": "index.html",
        "actif": None,
        "titre": "Traduction assermentée, légalisation et visa à Bruxelles — Travisum",
        "description": (
            "Travisum, bureau de traduction jurée avenue Louise à Bruxelles : "
            "traductions assermentées, légalisations, apostilles et visas de voyage. "
            "Devis détaillé en moins de 2 heures ouvrables."
        ),
        "canonique": "https://www.travisum.com/",
    },
    {
        "source": "traductions_travisum",
        "cle": "traductions",
        "cible": "traductions.html",
        "actif": "traductions",
        "titre": "Traductions assermentées, jurées et libres à Bruxelles — Travisum",
        "description": (
            "Traductions assermentées reconnues par les autorités belges et "
            "internationales. Actes d'état civil, diplômes, jugements, statuts de "
            "société. Estimation immédiate en ligne."
        ),
        "canonique": "https://www.travisum.com/traductions",
    },
    {
        "source": "l_galisations_travisum",
        "cle": "legalisations",
        "cible": "legalisations.html",
        "actif": "legalisations",
        "titre": "Légalisations, apostilles et dépôts officiels — Travisum Bruxelles",
        "description": (
            "Légalisation complète et apostille de La Haye : SPF Justice, Affaires "
            "étrangères, tribunaux de première instance, ambassades et consulats. "
            "Présence quotidienne à Bruxelles."
        ),
        "canonique": "https://www.travisum.com/legalisations",
    },
    {
        "source": "visas_travisum",
        "cle": "visas",
        "cible": "visas.html",
        "actif": "visas",
        "titre": "Visas, e-visas et ESTA depuis la Belgique — Travisum",
        "description": (
            "Assistance complète pour vos visas consulaires, e-visas et ESTA, pour "
            "plus de 45 destinations. Constitution du dossier, dépôt consulaire, "
            "suivi et retrait."
        ),
        "canonique": "https://www.travisum.com/visas",
    },
]

# Destination de chaque entrée de navigation. Les trois dernières n'ont pas
# encore de maquette Stitch : elles restent inertes plutôt que de pointer
# vers une page inexistante.
NAV = {
    "traductions": "traductions.html",
    "legalisations": "legalisations.html",
    "visas": "visas.html",
    "tarifs": "tarifs.html",
    "ressources": "ressources.html",
    "a-propos": "a-propos.html",
}

# Pied de page : libellé exact de la maquette -> destination
PIED = {
    "Traductions Jurées": "traductions.html",
    "Légalisation Consulaire": "legalisations.html",
    "Apostilles": "legalisations.html",
    "États-Unis": "visas.html",
    "Chine": "visas.html",
    "Arabie Saoudite": "visas.html",
}

DONNEES_STRUCTUREES = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Travisum",
    "description": "Traductions assermentées, légalisations, apostilles et visas de voyage.",
    "url": "https://www.travisum.com/",
    "telephone": ["+3226420025", "+32485948935"],
    "email": "info@travisum.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "367, avenue Louise",
        "postalCode": "1050",
        "addressLocality": "Bruxelles",
        "addressCountry": "BE",
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00",
        }
    ],
    "areaServed": "BE",
    "availableLanguage": ["fr", "nl", "en"],
}


def tete(page):
    """Construit le <head> de production qui remplace celui de Stitch."""
    return """<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titre}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="{canonique}">
<link rel="alternate" hreflang="fr" href="{canonique}">
<link rel="alternate" hreflang="nl" href="{canonique_nl}">
<link rel="alternate" hreflang="en" href="{canonique_en}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_BE">
<meta property="og:title" content="{titre}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{canonique}">
<link rel="icon" href="assets/img/logo-mark.svg" type="image/svg+xml">
<link rel="icon" href="assets/img/favicon/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="assets/img/favicon/favicon-16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="assets/img/favicon/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta name="theme-color" content="#00050e">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&amp;family=Playfair+Display:wght@100..900&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/site.css">
<script type="application/ld+json">
{schema}
</script>
</head>
""".format(
        titre=page["titre"],
        description=page["description"],
        canonique=page["canonique"],
        canonique_nl=page["canonique"].replace("travisum.com/", "travisum.com/nl/"),
        canonique_en=page["canonique"].replace("travisum.com/", "travisum.com/en/"),
        schema=json.dumps(DONNEES_STRUCTUREES, indent=2, ensure_ascii=False),
    )

    # Sélecteur de langue : remplace la vignette de profil de Stitch.
    # Reprend exactement les jetons typographiques de la barre (label-sm, capitales).


SELECTEUR_LANGUE = (
    '<div class="flex items-center gap-3 font-label-sm text-label-sm uppercase">'
    '<a class="text-primary font-bold" href="#" aria-current="true">FR</a>'
    '<span class="text-outline-variant" aria-hidden="true">/</span>'
    '<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">NL</a>'
    '<span class="text-outline-variant" aria-hidden="true">/</span>'
    '<a class="text-on-surface-variant hover:text-primary transition-colors" href="#">EN</a>'
    "</div>"
)

BOUTON_BURGER = (
    '<button class="lg:hidden flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2 shrink-0" '
    'data-bascule-menu aria-expanded="false" aria-controls="menu-mobile" '
    'aria-label="Ouvrir le menu de navigation">'
    '<span class="block w-6 h-px bg-primary transition-transform duration-300"></span>'
    '<span class="block w-6 h-px bg-primary transition-opacity duration-300"></span>'
    '<span class="block w-6 h-px bg-primary transition-transform duration-300"></span>'
    "</button>"
)


def menu_mobile(actif):
    """Panneau plein écran sous 1024 px, dans le langage visuel de la charte."""
    entrees = [
        ("Traductions", "traductions"),
        ("Légalisations", "legalisations"),
        ("Visas", "visas"),
        ("Tarifs & Délais", "tarifs"),
        ("Ressources", "ressources"),
        ("À propos", "a-propos"),
    ]
    lignes = []
    for i, (libelle, cle) in enumerate(entrees, 1):
        href = NAV.get(cle) or "#"
        courant = ' aria-current="page"' if cle == actif else ""
        couleur = "text-tertiary-fixed-dim" if cle == actif else "text-on-primary"
        lignes.append(
            '<li class="border-b border-tertiary-fixed-dim/20">'
            '<a class="flex items-baseline gap-6 py-5 font-display-lg text-[28px] leading-tight {couleur} '
            'hover:text-tertiary-fixed-dim transition-colors" href="{href}"{courant}>'
            '<span class="font-label-sm text-label-sm text-tertiary-fixed-dim">{num:02d}</span>'
            "{libelle}</a></li>".format(
                couleur=couleur, href=href, courant=courant, num=i, libelle=libelle
            )
        )

    return (
        '<div class="menu-mobile lg:hidden fixed inset-0 z-40 bg-primary text-on-primary '
        'overflow-y-auto pt-28 px-margin-mobile pb-16" id="menu-mobile" data-menu-mobile>'
        '<nav aria-label="Navigation principale (mobile)"><ul class="flex flex-col">'
        + "".join(lignes)
        + "</ul></nav>"
        '<div class="mt-12 flex flex-col gap-3 font-body-md text-body-md text-primary-fixed-dim">'
        '<p class="font-label-sm text-label-sm uppercase text-tertiary-fixed-dim">Bureau</p>'
        "<p>Bruxelles, Belgique<br>Avenue Louise 123</p>"
        '<p><a class="hover:text-on-primary transition-colors" href="tel:026420025">02 642 00 25</a></p>'
        '<a class="mt-4 bg-tertiary-fixed-dim text-on-tertiary-fixed px-6 py-4 text-center '
        'font-label-sm text-label-sm uppercase tracking-widest rounded-sm" href="#devis">'
        "Devis en 2 minutes</a>"
        "</div></div>"
    )

    # --------------------------------------------------------------------------
    # Sections ajoutees a chaque page.
    # Les maquettes Stitch ne couvrent qu'une partie du contenu du site actuel :
    # 70 destinations visa, 82 langues, 12 instances, la procedure en 3 etapes et
    # les listes de documents n'y figurent pas. On les reintegre ici, dans le
    # langage visuel de la maquette.
    # --------------------------------------------------------------------------


def sections_ajoutees(cle):
    if cle == "accueil":
        return [
            S.section_documents("traduction"),
            C.grille_langues(
                "82 langues, de l’albanais au wolof",
                chapeau="Nous traduisons à partir et vers toute autre langue. "
                "Les langues signalées disposent d’un traducteur juré.",
            ),
            S.section_destinations_phares(),
            S.section_bureau(),
            C.faq("Les questions que l’on nous pose le plus", TXT.FAQ_GENERALE),
            C.bandeau_conversion(
                "Un prix et un délai, sans appel téléphonique.",
                "Envoyez le scan de vos documents : la proposition détaillée arrive "
                "en moins de 2 heures ouvrables.",
            ),
        ]

    if cle == "traductions":
        return [
            C.grille_langues(
                "Les 82 langues que nous traduisons",
                chapeau="Assermentée ou libre, à partir et vers toute autre langue.",
            ),
            T.section_tarifs_apercu(
                TXT.TARIFS_TRADUCTION,
                "Délais et tarifs de traduction",
                chapeau="Trois niveaux d’urgence, du standard à l’express 24 heures.",
            ),
            C.faq("Questions sur la traduction", TXT.FAQ_TRADUCTION),
            C.bandeau_conversion(
                "Faites estimer votre traduction.",
                "Un scan lisible suffit pour obtenir un prix ferme et un délai.",
            ),
        ]

    if cle == "legalisations":
        return [
            S.section_documents("legalisation"),
            S.section_instances(),
            T.section_tarifs_apercu(
                TXT.TARIFS_LEGALISATION,
                "Délais et frais par instance",
                chapeau="Les frais officiels réclamés par l’administration sont "
                "distingues des honoraires du bureau.",
                fond="basse",
            ),
            C.faq("Questions sur la légalisation", TXT.FAQ_LEGALISATION),
        ]

    if cle == "visas":
        return [
            S.section_toutes_destinations(),
            S.section_procedure_visa(),
            T.section_tarifs_apercu(
                TXT.TARIFS_VISA,
                "Délais et tarifs par destination",
                chapeau="Honoraires du bureau, hors frais consulaires.",
                fond="basse",
            ),
            C.faq("Questions sur les visas", TXT.FAQ_VISA),
            C.bandeau_conversion(
                "Preparez votre dossier de visa.",
                "Indiquez votre destination et le motif du sejour : nous vérifions "
                "les conditions applicables et la liste des pièces.",
            ),
        ]
    return []


def transformer(page, images):
    src = os.path.join(RACINE, page["source"], "code.html")
    html = io.open(src, encoding="utf-8").read()

    # ---- 1. Le corps seulement : on jette la tête produite par Stitch -----
    corps = html[html.index("<body") :]
    corps = corps.replace("</html>", "").rstrip()

    # ---- 2. Images du CDN Google -> copies locales ------------------------
    for url, local in images.items():
        corps = corps.replace(url, local)

        # ---- 3. En-tete reconstruit de bout en bout ---------------------------
        # Celui de Stitch ne tient pas la largeur (chevauchements logo / menu /
        # telephone) et n'offre aucune navigation sous 1024 px. Il est remplace
        # par la barre + mega-menu definis dans tools/entete.py, a jetons de
        # charte identiques. Voir l'ecran 12 du devis.
    corps, n = re.subn(
        r"<header[ >].*?</header>",
        lambda m: ENTETE.entete(page["actif"]),
        corps,
        count=1,
        flags=re.S,
    )
    assert n == 1, "en-tete introuvable dans %s" % page["source"]

    # ---- 5 bis. Textes alternatifs ----------------------------------------
    # Les images des fiches pays n'ont aucun attribut `alt` : Stitch range le
    # prompt de generation dans `data-alt`, en anglais et decrivant un rendu
    # photographique. On le convertit en vrai texte alternatif francais et on
    # supprime le prompt, qui n'a rien a faire dans la page livree.
    ALTS = [
        ("Red Square in Moscow", "Place Rouge à Moscou — visa pour la Fédération de Russie"),
        (
            "modern skyline in Shanghai",
            "Ligne d’horizon de Shanghai — visa pour la République " "Populaire de Chine",
        ),
        ("Taj Mahal", "Taj Mahal — visa pour la République de l’Inde"),
    ]

    def convertir_alt(m):
        prompt = m.group(1)
        for repere, legende in ALTS:
            if repere in prompt:
                return ' alt="%s"' % legende
        return ""  # prompt non reconnu : image decorative, alt vide

    corps = re.sub(r'\sdata-alt="([^"]*)"', convertir_alt, corps)

    # ---- 6. Liens du pied de page ----------------------------------------
    for libelle, cible in PIED.items():
        corps = corps.replace(
            '<a class="text-body-md text-on-surface-variant hover:text-primary" href="#">%s</a>'
            % libelle,
            '<a class="text-body-md text-on-surface-variant hover:text-primary" href="%s">%s</a>'
            % (cible, libelle),
        )

        # ---- 6 bis. Points d'accroche pour le comportement --------------------
        # Stitch ne pose ni id ni name sur ses formulaires. Plutôt que de faire
        # reposer le JS sur des sélecteurs de classes Tailwind (fragiles), on
        # marque explicitement les quelques éléments pilotés.
    accroches = [
        # Vérificateur de conditions de visa
        (
            '<form class="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">',
            '<form class="grid grid-cols-1 md:grid-cols-4 gap-6 items-end" data-visa-checker>',
        ),
        (
            '<input class="w-full bg-transparent border-b border-tertiary-fixed-dim/40 py-2 pl-7 pr-0 '
            "font-body-md text-primary outline-none focus:border-primary transition-colors "
            'placeholder:text-on-surface-variant/30" placeholder="Ex: Chine, Inde..." type="text"/>',
            '<input class="w-full bg-transparent border-b border-tertiary-fixed-dim/40 py-2 pl-7 pr-0 '
            "font-body-md text-primary outline-none focus:border-primary transition-colors "
            'placeholder:text-on-surface-variant/30" placeholder="Ex: Chine, Inde..." type="text" '
            'name="destination" data-champ="destination" autocomplete="off">',
        ),
    ]
    for avant, apres in accroches:
        corps = corps.replace(avant, apres)

        # La grille des destinations sert de cible au vérificateur
    corps = corps.replace(
        "<!-- FEATURED DESTINATIONS -->",
        '<!-- FEATURED DESTINATIONS -->\n<span id="destinations" data-destinations aria-hidden="true"></span>',
        1,
    )

    # L'ancre #all-destinations de la maquette ne correspond a aucune section :
    # on la redirige vers la grille des 70 destinations effectivement publiee.
    corps = corps.replace('href="#all-destinations"', 'href="#toutes"')

    # ---- 6 ter. Cartes des trois metiers -----------------------------------
    # Stitch enferme les trois cartes dans un seul cadre a filets internes, et
    # laisse leurs liens « Decouvrir » sur href="#". On donne a chaque carte
    # sa propre bordure et on cable les liens vers les pages piliers.
    if page["cle"] == "accueil":
        corps = corps.replace(
            '<div class="grid grid-cols-1 md:grid-cols-3 gap-0 '
            'border border-tertiary-fixed-dim/20 bg-surface-container-lowest">',
            '<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">',
            1,
        )
        # chaque carte devient autonome : bordure propre, angle adouci
        corps = corps.replace(
            'class="p-8 md:p-12 flex flex-col h-full border-b md:border-b-0 '
            'md:border-r border-tertiary-fixed-dim/20 hover:bg-surface-container-low',
            'class="p-8 md:p-10 flex flex-col h-full border border-tertiary-fixed-dim/30 '
            'rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim '
            'hover:bg-surface-container-low',
        )
        corps = corps.replace(
            'class="p-8 md:p-12 flex flex-col h-full hover:bg-surface-container-low',
            'class="p-8 md:p-10 flex flex-col h-full border border-tertiary-fixed-dim/30 '
            'rounded-sm bg-surface-container-lowest hover:border-tertiary-fixed-dim '
            'hover:bg-surface-container-low',
        )

        # Les trois liens « Decouvrir », dans l'ordre des cartes
        for cible in ("traductions.html", "legalisations.html", "visas.html"):
            corps = corps.replace(
                '<a class="inline-flex items-center gap-2 font-label-sm text-label-sm '
                'text-primary uppercase tracking-widest group-hover:text-on-tertiary-fixed-variant '
                'transition-colors" href="#">',
                '<a class="inline-flex items-center gap-2 font-label-sm text-label-sm '
                'text-primary uppercase tracking-widest group-hover:text-on-tertiary-fixed-variant '
                'transition-colors" href="' + cible + '">',
                1,
            )

    # ---- 6 quater. Hierarchie typographique --------------------------------
    # Dans la maquette, les titres de section utilisent la meme taille que le
    # h1 de banniere (display-lg). A 64 px cela passait encore ; l'echelle
    # ayant ete reduite, on leur donne un palier propre (headline-lg, 38 px)
    # pour retablir une hierarchie lisible entre h1 et h2.
    corps = corps.replace(
        "text-headline-md md:text-display-lg", "text-headline-md md:text-headline-lg"
    )

    # ---- 7. Menu mobile, inséré juste après l'en-tête ---------------------
    fin_entete = corps.index("</header>") + len("</header>")
    corps = corps[:fin_entete] + ENTETE.menu_mobile(page["actif"]) + corps[fin_entete:]

    # ---- 9. Sections ajoutees et pied de page sombre ----------------------
    blocs = sections_ajoutees(page["cle"])
    if blocs:
        # Sur Legalisations, la maquette place son bandeau de conversion en fin
        # de page. Inserer apres lui reléguerait l'appel a l'action au milieu du
        # parcours, suivi de quatre sections : on insere donc juste avant.
        marqueur = "<!-- CTA -->"
        i = corps.index(marqueur) if marqueur in corps else corps.rindex("</main>")
        corps = corps[:i] + "".join(blocs) + corps[i:]

        # Le pied de page de Stitch est sur fond ivoire clair : il ne ferme pas la
        # page. Remplace par la version encre (section 04 du devis).
    corps, n = re.subn(
        r"<footer[ >].*?</footer>", lambda m: S.pied_de_page(), corps, count=1, flags=re.S
    )
    assert n == 1, "pied de page introuvable dans %s" % page["source"]

    # ---- 8. Comportement --------------------------------------------------
    corps = corps.replace("</body>", '<script src="assets/js/site.js"></script>\n</body>')

    # ---- 10. Rythme des fonds ---------------------------------------------
    # Les sections de la maquette et celles ajoutees ici ne connaissent pas
    # leurs voisines : sans cette passe, deux sections de meme fond se
    # succedent et le decoupage de la page disparait.
    return tete(page) + rythme.rythmer(corps) + "\n</html>\n"


def main():
    chemin_map = os.path.join(RACINE, "assets/img/photos/_map.json")
    images = json.load(io.open(chemin_map, encoding="utf-8"))

    for page in PAGES:
        sortie = transformer(page, images)
        dest = os.path.join(RACINE, page["cible"])
        with io.open(dest, "w", encoding="utf-8", newline="\n") as f:
            f.write(sortie)
        print("%-22s -> %-20s %6d octets" % (page["source"], page["cible"], len(sortie)))

        # Aucune référence au CDN ne doit subsister
    restes = []
    for page in PAGES:
        t = io.open(os.path.join(RACINE, page["cible"]), encoding="utf-8").read()
        if "lh3.googleusercontent.com" in t:
            restes.append(page["cible"])
        if "cdn.tailwindcss.com" in t:
            restes.append(page["cible"] + " (CDN Tailwind)")
    if restes:
        print("\nATTENTION, références externes restantes :", restes)
        return 1
    print("\nAucune dépendance au CDN Stitch ne subsiste.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
