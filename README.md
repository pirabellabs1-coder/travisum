# Travisum — site web

Refonte du site travisum.com, développée à partir des maquettes Stitch
(projet *Travisum Design System & Platform*, thème **Official Editorial**),
du devis **TRV-2026-01** et du **contenu intégral du site actuel**.

---

## Démarrer

Aucune dépendance à installer pour consulter le site : du HTML, une feuille
CSS compilée et un fichier JavaScript.

```bash
python -m http.server 8123
```

Puis ouvrir <http://localhost:8123>.

---

## Les 81 pages

| Page | Origine | Sections |
|------|---------|----------|
| `index.html` | maquette *accueil* + contenu ajouté | 9 |
| `traductions.html` | maquette *traductions* + contenu ajouté | 7 |
| `legalisations.html` | maquette *légalisations* + contenu ajouté | 8 |
| `visas.html` | maquette *visas* + contenu ajouté | 7 |
| `tarifs.html` | **nouveau gabarit** | 6 |
| `ressources.html` | **nouveau gabarit** | 5 |
| `a-propos.html` | **nouveau gabarit** | 6 |
| `mentions-legales.html` | **page légale** | 3 |
| `confidentialite.html` | **page légale** | 3 |
| `cgv.html` | **page légale** | 3 |
| `cookies.html` | **page légale** | 3 |

| `visas/<slug>/` × 70 | **fiches pays**, données du site actuel | 8 |

Les quatre pages légales sont autonomes et liées depuis le pied de page de
chaque page : ces textes sont longs, consultés délibérément, et doivent être
adressables par une URL stable. Chacune ouvre sur un sommaire ancré.

### Les 70 fiches pays

Écran 05 du devis — « le gabarit le plus important pour le référencement ».
Chaque fiche fusionne en une page ce que le site actuel éclate en trois ou
quatre sous-pages : visa tourisme, visa affaires, e-visa le cas échéant, et
informations générales (délai, tarifs, livraison).

**Les URL sont conservées à l'identique** (`/visas/inde/`) : les positions
acquises sur Google sont préservées sans plan de redirection. Les sous-pages,
dont les adresses suivaient trois schémas incohérents, sont absorbées dans la
fiche — c'est là qu'un plan de redirection reste à écrire.

Volume repris : **200 sous-pages, 1 124 documents, avec leurs listes de pièces
et leurs tableaux de tarifs**, relevés par quatre agents en parallèle.

Les trois nouveaux gabarits sont composés à partir des mêmes briques que les
quatre issues de la maquette : même bandeau clair à trame guilloche, même
étiquette « Service NN », mêmes cartes bordées, même pied de page encre.

---

## Contenu repris du site actuel

Le site en ligne a été relevé page par page ; les copies brutes sont dans
`reference/site-actuel/`. Tout ce qui y figurait a été réintégré :

- **82 langues** de traduction (la maquette n'en montrait que 10 en bandeau) ;
- **70 destinations visa** (la maquette n'en montrait que 3) ;
- **12 instances** de légalisation, du SPF Justice à la Communauté flamande ;
- les **listes de documents** traduits et légalisés ;
- la **procédure de facilitation de visa** en 3 étapes, mot pour mot ;
- le **second numéro** (0485 948 935), absent de la maquette.

Ces listes sont dans `tools/donnees.py`, générées depuis le relevé. Le devis
(section 14) prévoit qu'elles soient reprises telles quelles : elles ne
doivent pas être réécrites sans validation du bureau.

---

## Arborescence

```
.
├── index.html … cookies.html       les 11 pages
├── assets/
│   ├── css/site.css                feuille compilée (ne pas éditer)
│   ├── js/site.js                  comportements
│   └── img/photos/                 images de la maquette, rapatriées
├── src/input.css                   source de la feuille de style
├── tailwind.config.js              config extraite de la maquette Stitch
├── tools/
│   ├── donnees.py                  contenu relevé sur travisum.com
│   ├── contenu.py                  FAQ et grilles tarifaires
│   ├── composants.py               briques : sections, cartes, FAQ, langues
│   ├── sections.py                 pied de page et sections de contenu
│   ├── tableaux.py                 tableaux tarifaires et onglets
│   ├── entete.py                   en-tête, méga-menu, menu mobile
│   ├── from_stitch.py              maquettes -> 4 pages
│   ├── nouvelles_pages.py          3 gabarits supplémentaires
│   └── accents.py                  restauration des accents (voir plus bas)
├── reference/site-actuel/          relevé texte du site en ligne
├── reference/pays/                 70 fiches JSON extraites du site
├── official_editorial/             design system Stitch
└── *_travisum/                     export Stitch brut
```

---

## Reconstruire

```bash
python tools/from_stitch.py
python tools/nouvelles_pages.py
python tools/pages_legales.py
python tools/pays.py
npx tailwindcss@3 -c tailwind.config.js -i src/input.css -o assets/css/site.css --minify
```

`tools/accents.py` est un utilitaire ponctuel : il restaure les accents dans
les chaînes de prose des modules, sans toucher au code. Il opère par
`tokenize`, ne considère que les jetons `STRING` contenant au moins deux
mots, et masque au passage les URL, noms de fichiers et attributs — un
remplacement naïf casserait `donnees` (nom de module), `telephone` (clé de
dictionnaire) ou `legalisations.html` (nom de fichier).

---

## Fidélité à la maquette

Le contenu des quatre écrans Stitch est repris **caractère pour caractère**.
Un contrôle automatique compare le texte visible de chaque maquette à celui
de la page produite : **zéro ligne perdue**.

Les écarts sont volontaires et documentés dans le code :

1. **En-tête reconstruit.** Celui de Stitch ne tient pas la largeur : sur les
   captures de référence « Traductions » mord sur le logo et « À propos »
   percute le numéro de téléphone. Refait à jetons de charte identiques, avec
   **méga-menu** sur les trois métiers (écran 12 du devis), bascule desktop à
   1280 px et sélecteur de langue compact.
2. **Interlettrage de navigation** ramené de 0,18 em à 0,1 em. Les 0,18 em de
   la charte restent la règle pour les étiquettes de section ; appliqués à six
   entrées de menu ils débordent mécaniquement.
3. **Menu mobile** avec sous-menus en accordéon : sous 1280 px la maquette
   n'offrait aucune navigation.
4. **Pied de page en encre.** Celui de la maquette est sur fond ivoire clair
   et ne ferme pas la page. Le devis (section 04) réserve l'encre de nuit aux
   zones d'autorité : en-tête, bandeaux d'appel à l'action, **pied de page**.
5. **Vignette de profil supprimée** : Stitch place la photo d'une inconnue
   servie par son CDN. Remplacée par le sélecteur FR/NL/EN prévu au devis.
6. **Textes alternatifs réécrits** : Stitch range le prompt de génération
   dans `data-alt` et ne pose aucun `alt`.
7. **Barre de défilement conservée** : la maquette la masque, ce qui est
   commode pour une capture et coûteux sur des pages longues.
8. **Filet de progression rendu fonctionnel** : figé à 100 % dans la maquette.

---

## Hiérarchie et rythme

**Échelle typographique réduite.** La maquette donnait 64 px au `h1` *et* aux
titres de section : à taille égale, plus de hiérarchie. L'échelle a été
resserrée et un palier intermédiaire ajouté.

| | maquette | site |
|---|---|---|
| `h1` bannière | 64 px | **52 px** |
| `h2` section | 64 px | **38 px** (`headline-lg`, nouveau) |
| `h3` carte | 32 px | **26 px** |

**Alternance des fonds.** Plusieurs pages enchaînaient deux ou trois sections
de même fond : sans changement de valeur, le découpage disparaît et les
titres flottent. `tools/rythme.py` repasse sur le HTML produit et impose
l'alternance ivoire / ivoire sourd, les sections encre servant d'ancres.
Contrôle automatique : **zéro section consécutive de même fond** sur les
onze pages.

**Bandeau de conversion repositionné.** Sur Légalisations, la maquette place
son appel à l'action en fin de page ; les sections ajoutées atterrissaient
après lui, reléguant le bandeau au milieu du parcours avec quatre sections à
sa suite. Les ajouts s'insèrent désormais avant.

---

## Identité et référencement technique

- **Logo** reconstitué en SVG d'après le fichier fourni : faisceau d'ondes
  entrelacées en dégradé spectral + logotype. Trois variantes — lockup
  horizontal, variante claire pour les fonds encre, marque seule.
- **Favicon** dérivé de la marque : SVG, PNG 16/32/48/180/192/512,
  `favicon.ico` multi-résolutions, `apple-touch-icon`, `site.webmanifest`.
  La marque est réduite de onze à sept brins : à 16 px, onze traits
  deviennent illisibles.
- **`sitemap.xml`** : les 81 URL, avec priorités par famille de page.
- **`robots.txt`** : exclut les exports de maquette et les relevés de travail.
- **Plan d'accès Google Maps** en chargement différé : l'iframe dépose des
  cookies dès l'affichage, or la politique cookies promet qu'aucun traceur
  n'est déposé avant consentement. La carte ne se charge qu'au clic.

---

## Ce qui fonctionne réellement

- **Estimateur de traduction** — curseur de pages, prix en direct.
- **Vérificateur de visa** — retrouve la destination parmi les fiches
  publiées ; une destination sans fiche renvoie au devis plutôt que
  d'inventer une réponse.
- **Recherche instantanée** — 82 langues et 70 destinations, tolérante aux
  accents (« guinee » trouve les quatre Guinées, « thailande » trouve
  Thaïlande) avec compteur en direct et carte de repli à zéro résultat.
- **Grille tarifaire à onglets** — traduction / légalisation / visa, sans
  rechargement.
- **FAQ** — accordéon, une réponse ouverte à la fois, balisée en
  `FAQPage` pour l'affichage enrichi Google.
- **Méga-menu** — délai d'intention, accessible au clavier, fermeture à
  `Échap` et au défilement.
- **Menu mobile** — panneau plein écran, sous-menus dépliables.

Toutes les animations respectent `prefers-reduced-motion`.

---

## Points en attente de votre arbitrage

- **L'adresse diverge** : les maquettes indiquent « Avenue Louise 123 », le
  devis et le site actuel « **367, avenue Louise** ». Le site retient 367,
  y compris dans les données structurées. À confirmer.
- **Les horaires divergent** dans vos propres pages : l'accueil annonce
  9 h – 17 h, la page Légalisation 9 h – 18 h. Le site retient 9 h – 17 h.
- **Le bandeau annonce « 30+ langues »** (texte de la maquette) alors que le
  site en liste 82. Le chiffre de la maquette a été conservé sur la bannière,
  mais la section Langues affiche bien les 82.
- **Deux régimes de tarifs cohabitent, à unifier.** Contrairement à ce que
  laissaient croire les quatre pages principales, le site actuel **publie bien
  des prix** : les rubriques « Les tarifs » des fiches pays contiennent de
  vrais tableaux (frais consulaires et frais de service, par type de
  demandeur). Ces tableaux sont repris tels quels dans les 70 fiches. En
  revanche, la grille de la page Tarifs (traduction, légalisation) reste
  indicative : ces montants-là ne figurent nulle part sur le site actuel.
  **À arbitrer : publier les vrais tarifs traduction/légalisation, ou retirer
  la grille indicative.**
- **Pages légales à compléter et à faire relire.** Les quatre textes sont
  rédigés et structurés, mais chaque mention « à compléter par le bureau »
  doit être renseignée : forme juridique, numéro d'entreprise, numéro de TVA,
  directeur de la publication, hébergeur, durées de conservation. L'ensemble
  est une trame de travail, à relire par votre conseil juridique — en
  particulier les clauses de responsabilité et de rétractation.
- **Photographies** : les six images sont des rendus génératifs issus de
  Stitch. À remplacer par les prises de vue réelles du bureau et de l'avenue
  Louise.
- **Traduction NL et EN** : la structure (`hreflang`, sélecteur, adresses
  distinctes) est en place, le contenu rédactionnel est à fournir.
- **Aucun back-office** : les formulaires n'envoient rien.

---

## Défauts du site actuel corrigés au passage

Relevés lors de l'analyse et traités dans la refonte :

- les deux **liens internes cassés** de l'accueil (`Travisum.com/traduction`
  et `Travisum.com/legalisation`, sans barre oblique initiale) ;
- le bouton de recherche libellé **« Buscar »** (espagnol) ;
- l'absence de tarifs, de délais et de formulaire de devis ;
- l'absence de mentions légales et de politique de confidentialité ;
- les listes de documents **dupliquées** sur trois pages, désormais issues
  d'une source unique.
