/* ==========================================================================
   Travisum — comportements
   Complète les maquettes Stitch, qui sont statiques : elles montrent l'état
   large et au repos, sans navigation mobile ni interaction réelle.
   ========================================================================== */
(function () {
  "use strict";

  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, racine) {
    return (racine || document).querySelector(sel);
  }
  function $$(sel, racine) {
    return Array.prototype.slice.call((racine || document).querySelectorAll(sel));
  }

  /* ------------------------------------------------------------------
     Filet de progression de lecture
     Figé à 100 % dans la maquette ; ici il suit le défilement.
     ------------------------------------------------------------------ */
  function progression() {
    var filet = $(".brass-progress");
    if (!filet) return;
    var enAttente = false;

    function peindre() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var y = window.scrollY || window.pageYOffset;
      filet.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + "%";
      enAttente = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (enAttente) return;
        enAttente = true;
        window.requestAnimationFrame(peindre);
      },
      { passive: true }
    );
    window.addEventListener("resize", peindre, { passive: true });
    peindre();
  }

  /* ------------------------------------------------------------------
     Menu mobile
     ------------------------------------------------------------------ */
  function menuMobile() {
    var bouton = $("[data-bascule-menu]");
    var panneau = $("[data-menu-mobile]");
    if (!bouton || !panneau) return;

    var barres = $$("span", bouton);

    function definir(ouvert) {
      bouton.setAttribute("aria-expanded", String(ouvert));
      bouton.setAttribute(
        "aria-label",
        ouvert ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"
      );
      document.body.style.overflow = ouvert ? "hidden" : "";

      if (ouvert) panneau.setAttribute("data-ouvert", "");
      else panneau.removeAttribute("data-ouvert");

      /* Le bouton devient une croix, et passe en ivoire au-dessus du panneau */
      if (barres.length === 3) {
        barres[0].style.transform = ouvert ? "translateY(6px) rotate(45deg)" : "";
        barres[1].style.opacity = ouvert ? "0" : "";
        barres[2].style.transform = ouvert ? "translateY(-6px) rotate(-45deg)" : "";
        barres.forEach(function (b) {
          b.classList.toggle("bg-on-primary", ouvert);
          b.classList.toggle("bg-primary", !ouvert);
        });
      }
    }

    bouton.addEventListener("click", function () {
      definir(bouton.getAttribute("aria-expanded") !== "true");
    });

    $$("a", panneau).forEach(function (a) {
      a.addEventListener("click", function () {
        definir(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && bouton.getAttribute("aria-expanded") === "true") {
        definir(false);
        bouton.focus();
      }
    });

    /* Repasser au-dessus de 1280 px doit toujours rendre la page utilisable */
    window.matchMedia("(min-width: 1280px)").addEventListener("change", function (e) {
      if (e.matches) definir(false);
    });
  }

  /* ------------------------------------------------------------------
     Méga-menu (écran 12 du devis)

     Ouverture au survol avec délai d'intention, pour qu'un simple passage
     du curseur en diagonale vers une autre entrée ne déclenche pas trois
     panneaux au passage. Accessible au clavier : le panneau s'ouvre au
     focus et se referme quand le focus quitte l'entrée.

     L'entrée de premier niveau reste un lien vers la page pilier — le
     devis l'impose explicitement.
     ------------------------------------------------------------------ */
  function megaMenu() {
    var entrees = $$("[data-mega]");
    if (!entrees.length) return;

    var minuterie = null;

    function fermerTout(sauf) {
      entrees.forEach(function (e) {
        if (e !== sauf) e.removeAttribute("data-ouvert");
      });
    }

    entrees.forEach(function (entree) {
      var lien = $("a", entree);

      function ouvrir(immediat) {
        window.clearTimeout(minuterie);
        minuterie = window.setTimeout(
          function () {
            fermerTout(entree);
            entree.setAttribute("data-ouvert", "");
            if (lien) lien.setAttribute("aria-expanded", "true");
          },
          immediat ? 0 : 110
        );
      }

      function fermer(immediat) {
        window.clearTimeout(minuterie);
        minuterie = window.setTimeout(
          function () {
            entree.removeAttribute("data-ouvert");
            if (lien) lien.setAttribute("aria-expanded", "false");
          },
          immediat ? 0 : 170
        );
      }

      if (lien) {
        lien.setAttribute("aria-expanded", "false");
        lien.setAttribute("aria-haspopup", "true");
      }

      entree.addEventListener("mouseenter", function () {
        ouvrir(false);
      });
      entree.addEventListener("mouseleave", function () {
        fermer(false);
      });

      /* Clavier : le focus entrant ouvre, le focus sortant referme */
      entree.addEventListener("focusin", function () {
        ouvrir(true);
      });
      entree.addEventListener("focusout", function (e) {
        if (!entree.contains(e.relatedTarget)) fermer(true);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var ouvert = $("[data-mega][data-ouvert]");
      if (!ouvert) return;
      ouvert.removeAttribute("data-ouvert");
      var lien = $("a", ouvert);
      if (lien) {
        lien.setAttribute("aria-expanded", "false");
        lien.focus();
      }
    });

    /* Un défilement referme le panneau : il reste sinon suspendu au-dessus
       du contenu pendant que la page bouge sous lui. */
    window.addEventListener(
      "scroll",
      function () {
        if ($("[data-mega][data-ouvert]")) fermerTout(null);
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------
     Selecteur de langue
     ------------------------------------------------------------------ */
  function selecteurLangues() {
    var enveloppe = $("[data-langues]");
    if (!enveloppe) return;
    var bouton = $("[data-bascule-langues]", enveloppe);
    var liste = $("[data-liste-langues]", enveloppe);
    var chevron = $("span", bouton);
    if (!bouton || !liste) return;

    function definir(ouvert) {
      bouton.setAttribute("aria-expanded", String(ouvert));
      liste.classList.toggle("hidden", !ouvert);
      if (chevron) chevron.style.transform = ouvert ? "rotate(180deg)" : "";
    }

    bouton.addEventListener("click", function (e) {
      e.stopPropagation();
      definir(bouton.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("click", function (e) {
      if (!enveloppe.contains(e.target)) definir(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && bouton.getAttribute("aria-expanded") === "true") {
        definir(false);
        bouton.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Sous-menus du panneau mobile, en accordéon
     ------------------------------------------------------------------ */
  function sousMenusMobile() {
    $$("[data-bascule-sous]").forEach(function (bouton) {
      var ligne = bouton.closest("li");
      if (!ligne) return;
      var panneau = $("[data-sous-menu]", ligne);
      var chevron = $("span", bouton);
      if (!panneau) return;

      bouton.addEventListener("click", function () {
        var ouvert = bouton.getAttribute("aria-expanded") === "true";
        bouton.setAttribute("aria-expanded", String(!ouvert));
        panneau.classList.toggle("hidden", ouvert);
        if (chevron) chevron.style.transform = ouvert ? "" : "rotate(180deg)";
      });
    });
  }

  /* ------------------------------------------------------------------
     Recherche instantanee (langues, destinations)
     Tolerante aux accents : « neerlandais » trouve « Neerlandais »,
     « senegal » trouve « Senegal ».
     ------------------------------------------------------------------ */
  function rechercheInstantanee() {
    $$("[data-filtre]").forEach(function (champ) {
      var conteneur = $(champ.getAttribute("data-filtre"));
      if (!conteneur) return;

      var elements = $$("[data-terme]", conteneur);
      var cibleCompteur = champ.getAttribute("data-compteur-cible");
      var compteur = cibleCompteur ? $(cibleCompteur) : null;
      var section = champ.closest("section");
      var vide = section ? $("[data-aucun-resultat]", section) : null;

      function appliquer() {
        var q = aplatir(champ.value);
        var visibles = 0;

        elements.forEach(function (el) {
          var ok = !q || aplatir(el.getAttribute("data-terme")).indexOf(q) !== -1;
          el.classList.toggle("hidden", !ok);
          if (ok) visibles++;
        });

        if (compteur) compteur.textContent = visibles;
        if (vide) vide.classList.toggle("hidden", visibles !== 0);
      }

      champ.addEventListener("input", appliquer);
      appliquer();
    });
  }

  /* ------------------------------------------------------------------
     Accordeon des questions frequentes
     ------------------------------------------------------------------ */
  function accordeonFaq() {
    $$("[data-faq]").forEach(function (groupe) {
      $$("[data-faq-tete]", groupe).forEach(function (tete) {
        var item = tete.closest("[data-faq-item]");
        var corps = $("[data-faq-corps]", item);
        var signe = $("span.material-symbols-outlined", tete);
        if (!corps) return;

        if (!corps.id) corps.id = "faq-" + Math.random().toString(36).slice(2, 9);
        tete.setAttribute("aria-controls", corps.id);

        tete.addEventListener("click", function () {
          var ouvert = tete.getAttribute("aria-expanded") === "true";

          /* Une seule reponse ouverte a la fois : la liste reste lisible */
          $$("[data-faq-tete]", groupe).forEach(function (autre) {
            if (autre === tete) return;
            autre.setAttribute("aria-expanded", "false");
            var c = $("[data-faq-corps]", autre.closest("[data-faq-item]"));
            if (c) c.style.gridTemplateRows = "0fr";
            var sg = $("span.material-symbols-outlined", autre);
            if (sg) { sg.textContent = "add"; sg.style.transform = ""; }
          });

          tete.setAttribute("aria-expanded", String(!ouvert));
          corps.style.gridTemplateRows = ouvert ? "0fr" : "1fr";
          if (signe) {
            signe.textContent = ouvert ? "add" : "remove";
            signe.style.transform = ouvert ? "" : "rotate(180deg)";
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Bascule des grilles tarifaires, sans rechargement de page
     ------------------------------------------------------------------ */
  function ongletsTarifs() {
    var barre = $("[data-onglets-tarifs]");
    var panneaux = $("[data-onglets-panneaux]");
    if (!barre || !panneaux) return;

    var boutons = $$("[data-onglet]", barre);

    boutons.forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        var cle = bouton.getAttribute("data-onglet");

        boutons.forEach(function (b) {
          var actif = b === bouton;
          if (actif) b.setAttribute("data-actif", "");
          else b.removeAttribute("data-actif");
          b.setAttribute("aria-selected", String(actif));
        });

        $$("[data-panneau]", panneaux).forEach(function (p) {
          p.classList.toggle("hidden", p.getAttribute("data-panneau") !== cle);
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     Plan d'accès — chargement différé
     L'iframe Google Maps dépose ses cookies dès l'affichage. La politique
     cookies promet qu'aucun traceur n'est déposé avant consentement : la
     carte n'est donc insérée qu'après un clic explicite.
     ------------------------------------------------------------------ */
  function planAcces() {
    $$("[data-charger-carte]").forEach(function (bouton) {
      var zone = bouton.closest("[data-carte]");
      if (!zone) return;

      bouton.addEventListener("click", function () {
        var cadre = document.createElement("iframe");
        cadre.src = zone.getAttribute("data-src");
        cadre.title = "Plan d\u2019accès au bureau, 367 avenue Louise à Bruxelles";
        cadre.loading = "lazy";
        cadre.referrerPolicy = "no-referrer-when-downgrade";
        cadre.className = "absolute inset-0 w-full h-full border-0";
        cadre.setAttribute("allowfullscreen", "");
        zone.textContent = "";
        zone.appendChild(cadre);
      });
    });
  }

  /* ------------------------------------------------------------------
     Liens inertes — gabarits pas encore maquettés
     Ils ne doivent ni recharger la page ni faire croire à une destination.
     ------------------------------------------------------------------ */
  function liensInertes() {
    $$('a[aria-disabled="true"]').forEach(function (a) {
      a.classList.add("cursor-not-allowed", "opacity-60");
      a.addEventListener("click", function (e) {
        e.preventDefault();
      });
    });
  }

  /* ------------------------------------------------------------------
     Vérificateur de conditions de visa (page Visas)
     Sans back-office, il fait ce qu'il peut faire honnêtement : retrouver
     la destination parmi les fiches publiées, y amener le visiteur et la
     signaler. Une destination inconnue renvoie vers la demande de devis
     plutôt que d'inventer une réponse.
     ------------------------------------------------------------------ */
  function aplatir(s) {
    return s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .trim();
  }

  function verificateurVisa() {
    var form = $("[data-visa-checker]");
    if (!form) return;

    var champ = $('[data-champ="destination"]', form);
    var ancre = $("[data-destinations]");
    if (!champ || !ancre) return;

    /* Les fiches pays publiées, relevées dans le DOM plutôt que codées en dur.
       On ne retient que les titres situés APRÈS l'ancre : sans ce filtre, le
       titre de la barre de recherche elle-même (« Vérifier les conditions »)
       entrerait dans le jeu de correspondances. */
    var fiches = $$("h3")
      .filter(function (h) {
        return !!(ancre.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING);
      })
      .map(function (titre) {
        return {
          titre: titre,
          texte: aplatir(titre.textContent),
          carte: titre.closest("a, div"),
        };
      });

    var message = document.createElement("p");
    message.className =
      "md:col-span-4 font-body-md text-body-md mt-2 hidden";
    message.setAttribute("role", "status");
    form.appendChild(message);

    function annoncer(texte, erreur) {
      message.textContent = texte;
      message.classList.remove("hidden");
      message.classList.toggle("text-error", !!erreur);
      message.classList.toggle("text-on-surface-variant", !erreur);
    }

    function consulter() {
      var q = aplatir(champ.value);
      if (!q) {
        annoncer("Indiquez une destination pour vérifier les conditions.", true);
        champ.focus();
        return;
      }

      var trouve = fiches.filter(function (f) {
        return f.texte.indexOf(q) !== -1 || q.indexOf(f.texte) !== -1;
      })[0];

      /* Repli : correspondance sur un mot entier (« chine » -> « République
         Populaire de Chine ») */
      if (!trouve) {
        trouve = fiches.filter(function (f) {
          return f.texte.split(/\s+/).some(function (mot) {
            return mot.length > 2 && mot.indexOf(q) === 0;
          });
        })[0];
      }

      if (!trouve) {
        annoncer(
          "Cette destination ne fait pas encore l'objet d'une fiche publiée. " +
            "Demandez un devis : la réponse arrive sous 2 heures ouvrables.",
          false
        );
        return;
      }

      annoncer("Fiche trouvée : " + trouve.titre.textContent.trim() + ".", false);

      trouve.titre.scrollIntoView({
        behavior: reduit ? "auto" : "smooth",
        block: "center",
      });

      if (trouve.carte) {
        trouve.carte.classList.add("ring-2", "ring-tertiary-fixed-dim", "ring-offset-2");
        window.setTimeout(function () {
          trouve.carte.classList.remove("ring-2", "ring-tertiary-fixed-dim", "ring-offset-2");
        }, 2400);
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      consulter();
    });

    var bouton = $('button[type="button"]', form);
    if (bouton) bouton.addEventListener("click", consulter);
  }

  /* ------------------------------------------------------------------
     Mise en route
     ------------------------------------------------------------------ */
  function demarrer() {
    progression();
    menuMobile();
    megaMenu();
    selecteurLangues();
    sousMenusMobile();
    liensInertes();
    rechercheInstantanee();
    accordeonFaq();
    ongletsTarifs();
    planAcces();
    verificateurVisa();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
