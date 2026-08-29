"use client";

/**
 * Assistant Travisum — widget de discussion + prise de rendez-vous.
 *
 * Le site est un export statique ; ce widget vit côté navigateur et appelle deux
 * fonctions serverless (/api/chat, /api/rdv). Tant que les clés ne sont pas
 * configurées côté Vercel, il se dégrade proprement (message + repli mailto).
 */

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icone } from "./ui";
import type { Locale } from "@/lib/i18n";

type Message = { role: "user" | "assistant"; content: string };

const T = {
  fr: {
    ouvrir: "Discuter avec nous",
    titre: "Assistant Travisum",
    sous_titre: "Traductions · Légalisations · Visas",
    onglet_chat: "Discussion",
    onglet_rdv: "Prendre rendez-vous",
    accueil:
      "Bonjour 👋 Je suis l'assistant du bureau Travisum. Une question sur une traduction, une légalisation ou un visa ? Je peux aussi vous aider à demander un rendez-vous.",
    placeholder: "Écrivez votre message…",
    envoyer: "Envoyer",
    ecrit: "L'assistant écrit…",
    avis: "Réponses indicatives — la décision visa appartient au consulat.",
    // RDV
    rdv_intro: "Laissez vos coordonnées : le bureau vous recontacte pour confirmer.",
    nom: "Nom et prénom",
    email: "E-mail",
    tel: "Téléphone",
    service: "Concerne",
    date: "Date souhaitée (indicative)",
    msg: "Votre demande",
    envoyer_rdv: "Envoyer la demande",
    envoi: "Envoi…",
    ok: "Merci ! Votre demande est bien envoyée. Le bureau vous recontacte rapidement.",
    ko_mail: "L'envoi automatique n'est pas encore activé. Cliquez ci-dessous pour envoyer votre demande par e-mail :",
    ko_lien: "Ouvrir l'e-mail pré-rempli",
    requis: "Indiquez au moins votre nom et un moyen de contact.",
    services: ["Traduction", "Légalisation / Apostille", "Visa", "Autre"],
  },
  nl: {
    ouvrir: "Chat met ons",
    titre: "Travisum-assistent",
    sous_titre: "Vertalingen · Legalisaties · Visa",
    onglet_chat: "Gesprek",
    onglet_rdv: "Afspraak maken",
    accueil:
      "Hallo 👋 Ik ben de assistent van kantoor Travisum. Een vraag over een vertaling, legalisatie of visum? Ik help u ook een afspraak aan te vragen.",
    placeholder: "Typ uw bericht…",
    envoyer: "Versturen",
    ecrit: "De assistent typt…",
    avis: "Indicatieve antwoorden — de visumbeslissing ligt bij het consulaat.",
    rdv_intro: "Laat uw gegevens achter: het kantoor neemt contact op ter bevestiging.",
    nom: "Naam en voornaam",
    email: "E-mail",
    tel: "Telefoon",
    service: "Betreft",
    date: "Gewenste datum (indicatief)",
    msg: "Uw aanvraag",
    envoyer_rdv: "Aanvraag versturen",
    envoi: "Versturen…",
    ok: "Bedankt! Uw aanvraag is verstuurd. Het kantoor neemt snel contact op.",
    ko_mail: "Automatische verzending is nog niet actief. Klik hieronder om per e-mail te versturen:",
    ko_lien: "Vooraf ingevulde e-mail openen",
    requis: "Vermeld minstens uw naam en een contactmogelijkheid.",
    services: ["Vertaling", "Legalisatie / Apostille", "Visum", "Andere"],
  },
  en: {
    ouvrir: "Chat with us",
    titre: "Travisum Assistant",
    sous_titre: "Translations · Legalisations · Visas",
    onglet_chat: "Chat",
    onglet_rdv: "Book an appointment",
    accueil:
      "Hello 👋 I'm the Travisum office assistant. A question about a translation, legalisation or visa? I can also help you request an appointment.",
    placeholder: "Type your message…",
    envoyer: "Send",
    ecrit: "The assistant is typing…",
    avis: "Indicative answers — the visa decision rests with the consulate.",
    rdv_intro: "Leave your details: the office will contact you to confirm.",
    nom: "Full name",
    email: "Email",
    tel: "Phone",
    service: "Regarding",
    date: "Preferred date (indicative)",
    msg: "Your request",
    envoyer_rdv: "Send request",
    envoi: "Sending…",
    ok: "Thank you! Your request has been sent. The office will contact you shortly.",
    ko_mail: "Automatic sending isn't enabled yet. Click below to send your request by email:",
    ko_lien: "Open pre-filled email",
    requis: "Please provide at least your name and one contact detail.",
    services: ["Translation", "Legalisation / Apostille", "Visa", "Other"],
  },
} as const;

/**
 * Rend proprement le Markdown léger renvoyé par l'assistant (gras, italique,
 * listes, liens) — et garantit qu'aucun astérisque brut ne s'affiche. Le HTML
 * du modèle est d'abord échappé, donc pas d'injection possible.
 */
function mdToHtml(src: string): string {
  const inline = (x: string) =>
    x
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/__([^_]+)__/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      .replace(/\*/g, ""); // filet de sécurité : plus aucun astérisque résiduel
  const lignes = src.replace(/\r/g, "").split("\n");
  let html = "";
  let liste: "ul" | "ol" | null = null;
  const fermer = () => {
    if (liste) {
      html += `</${liste}>`;
      liste = null;
    }
  };
  for (const brute of lignes) {
    const l = brute.trimEnd();
    const puce = l.match(/^\s*[-*•]\s+(.*)$/);
    const num = l.match(/^\s*\d+[.)]\s+(.*)$/);
    if (puce) {
      if (liste !== "ul") {
        fermer();
        html += "<ul>";
        liste = "ul";
      }
      html += `<li>${inline(puce[1])}</li>`;
    } else if (num) {
      if (liste !== "ol") {
        fermer();
        html += "<ol>";
        liste = "ol";
      }
      html += `<li>${inline(num[1])}</li>`;
    } else if (!l.trim()) {
      fermer();
    } else {
      fermer();
      html += `<p>${inline(l)}</p>`;
    }
  }
  fermer();
  return html;
}

export default function Chat({ lang = "fr" }: { lang?: Locale }) {
  const d = T[lang] ?? T.fr;
  const [ouvert, setOuvert] = useState(false);
  const [onglet, setOnglet] = useState<"chat" | "rdv">("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [saisie, setSaisie] = useState("");
  const [charge, setCharge] = useState(false);
  const [tape, setTape] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ouvert && messages.length === 0) {
      setMessages([{ role: "assistant", content: d.accueil }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ouvert]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, charge, onglet]);

  async function envoyer(e?: FormEvent) {
    e?.preventDefault();
    const texte = saisie.trim();
    if (!texte || charge || tape) return;
    const suite = [...messages, { role: "user" as const, content: texte }];
    setMessages(suite);
    setSaisie("");
    setCharge(true);
    let reply = "";
    try {
      const r = await fetch("/api/chat/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: suite.filter((m) => m.role !== "assistant" || m.content !== d.accueil), lang }),
      });
      const data = await r.json().catch(() => ({}));
      reply = (data && data.reply && String(data.reply)) || "";
    } catch {
      reply = "Connexion impossible pour le moment. Téléphone : 02 642 00 25 — e-mail : info@travisum.com.";
    }
    if (!reply)
      reply = "Désolé, une erreur est survenue. Vous pouvez appeler le 02 642 00 25 ou écrire à info@travisum.com.";
    setCharge(false);
    await taperMessage(reply);
  }

  // Révèle le message de l'assistant mot à mot, comme une saisie en direct.
  function taperMessage(texte: string) {
    return new Promise<void>((resolve) => {
      const mots = texte.split(/(\s+)/);
      const pas = Math.max(8, Math.min(28, Math.round(1500 / Math.max(1, mots.length))));
      setTape(true);
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      let i = 0;
      let acc = "";
      const etape = () => {
        if (i >= mots.length) {
          setTape(false);
          resolve();
          return;
        }
        acc += mots[i];
        i += 1;
        setMessages((m) => {
          const c = m.slice();
          c[c.length - 1] = { role: "assistant", content: acc };
          return c;
        });
        window.setTimeout(etape, pas);
      };
      window.setTimeout(etape, pas);
    });
  }

  return (
    <>
      {/* Lanceur */}
      {!ouvert && (
        <button
          type="button"
          onClick={() => setOuvert(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 bg-primary text-on-primary pl-4 pr-5 py-3.5 rounded-full shadow-xl border border-tertiary-fixed-dim/40 hover:bg-primary-container transition-colors"
          aria-label={d.ouvrir}
        >
          <Icone nom="forum" plein taille="text-[20px]" couleur="text-tertiary-fixed-dim" />
          <span className="font-label-sm text-[12px] uppercase tracking-widest hidden sm:inline">
            {d.ouvrir}
          </span>
        </button>
      )}

      {/* Fenêtre */}
      {ouvert && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] max-w-[380px] h-[72vh] max-h-[580px] flex flex-col bg-surface border border-tertiary-fixed-dim/40 rounded-sm shadow-2xl overflow-hidden">
          {/* En-tête */}
          <div className="shrink-0 bg-primary text-on-primary px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Icone nom="forum" plein taille="text-[20px]" couleur="text-tertiary-fixed-dim" />
              <div className="min-w-0">
                <p className="font-display-lg text-[14px] leading-tight truncate">{d.titre}</p>
                <p className="font-body-md text-[11px] text-primary-fixed-dim truncate">{d.sous_titre}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOuvert(false)}
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <Icone nom="close" taille="text-[20px]" couleur="" />
            </button>
          </div>

          {/* Onglets */}
          <div className="shrink-0 grid grid-cols-2 border-b border-tertiary-fixed-dim/25 bg-surface-container-lowest">
            {(["chat", "rdv"] as const).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => setOnglet(o)}
                className={`py-2.5 font-label-sm text-[11px] uppercase tracking-widest transition-colors ${
                  onglet === o
                    ? "text-primary border-b-2 border-tertiary-fixed-dim"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {o === "chat" ? d.onglet_chat : d.onglet_rdv}
              </button>
            ))}
          </div>

          {onglet === "chat" ? (
            <>
              <div className="grow overflow-y-auto px-4 py-4 flex flex-col gap-3">
                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div
                      key={i}
                      className="max-w-[86%] px-3.5 py-2 rounded-2xl rounded-br-sm font-body-md text-[13.5px] leading-relaxed whitespace-pre-wrap self-end bg-primary text-on-primary shadow-sm"
                    >
                      {m.content}
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="max-w-[86%] px-3.5 py-2 rounded-2xl rounded-bl-sm font-body-md text-[13.5px] leading-relaxed self-start bg-surface-container-low text-on-surface border border-tertiary-fixed-dim/20 shadow-sm [&_p]:m-0 [&_p+p]:mt-1.5 [&_ul]:my-1.5 [&_ul]:pl-5 [&_ul]:list-disc [&_ol]:my-1.5 [&_ol]:pl-5 [&_ol]:list-decimal [&_li]:mb-0.5 [&_strong]:font-semibold [&_a]:underline [&_code]:font-mono"
                      dangerouslySetInnerHTML={{ __html: mdToHtml(m.content) }}
                    />
                  ),
                )}
                {charge && (
                  <div
                    className="self-start px-3.5 py-3 rounded-2xl rounded-bl-sm bg-surface-container-low border border-tertiary-fixed-dim/20 shadow-sm flex items-center gap-1.5"
                    aria-label={d.ecrit}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/60 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/60 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                )}
                <div ref={finRef} />
              </div>

              <form
                onSubmit={envoyer}
                className="shrink-0 border-t border-tertiary-fixed-dim/25 p-3 flex items-end gap-2"
              >
                <textarea
                  className="grow resize-none bg-surface-container-lowest border border-tertiary-fixed-dim/30 rounded-sm px-3 py-2 font-body-md text-[13.5px] text-on-surface outline-none focus:border-tertiary-fixed-dim transition-colors max-h-24"
                  rows={1}
                  value={saisie}
                  onChange={(e) => setSaisie(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      envoyer();
                    }
                  }}
                  placeholder={d.placeholder}
                  aria-label={d.placeholder}
                />
                <button
                  type="submit"
                  disabled={!saisie.trim() || charge || tape}
                  className="shrink-0 w-10 h-10 flex items-center justify-center bg-tertiary-fixed-dim text-on-tertiary-fixed rounded-sm hover:bg-white disabled:opacity-40 transition-colors"
                  aria-label={d.envoyer}
                >
                  <Icone nom="send" taille="text-[18px]" couleur="" />
                </button>
              </form>
              <p className="shrink-0 px-3 pb-2 -mt-1 font-body-md text-[10.5px] text-on-surface-variant/70 text-center">
                {d.avis}
              </p>
            </>
          ) : (
            <FormulaireRdv d={d} lang={lang} />
          )}
        </div>
      )}
    </>
  );
}

// --------------------------------------------------------------------------
function FormulaireRdv({ d, lang }: { d: (typeof T)[Locale]; lang: Locale }) {
  const [etat, setEtat] = useState<"saisie" | "envoi" | "ok" | "mailto">("saisie");
  const [mailto, setMailto] = useState<string>("");
  const [erreur, setErreur] = useState("");

  async function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const charge = {
      nom: String(f.get("nom") || ""),
      email: String(f.get("email") || ""),
      telephone: String(f.get("telephone") || ""),
      service: String(f.get("service") || ""),
      date: String(f.get("date") || ""),
      message: String(f.get("message") || ""),
      lang,
    };
    if (!charge.nom.trim() || (!charge.email.trim() && !charge.telephone.trim())) {
      setErreur(d.requis);
      return;
    }
    setErreur("");
    setEtat("envoi");
    try {
      const r = await fetch("/api/rdv/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(charge),
      });
      const data = await r.json().catch(() => ({}));
      if (data?.ok) {
        setEtat("ok");
      } else if (data?.mailto) {
        setMailto(data.mailto);
        setEtat("mailto");
      } else {
        setErreur(d.requis);
        setEtat("saisie");
      }
    } catch {
      setEtat("saisie");
      setErreur("Connexion impossible. Réessayez ou appelez le 02 642 00 25.");
    }
  }

  if (etat === "ok") {
    return (
      <div className="grow overflow-y-auto px-5 py-8 flex flex-col items-center text-center gap-4">
        <span className="w-14 h-14 rounded-full bg-seal/10 border border-seal/40 flex items-center justify-center">
          <Icone nom="check_circle" plein taille="text-[28px]" couleur="text-seal" />
        </span>
        <p className="font-body-md text-[14px] text-on-surface">{d.ok}</p>
      </div>
    );
  }

  if (etat === "mailto") {
    return (
      <div className="grow overflow-y-auto px-5 py-8 flex flex-col items-center text-center gap-4">
        <p className="font-body-md text-[13.5px] text-on-surface">{d.ko_mail}</p>
        <a
          href={mailto}
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 font-label-sm text-[11px] uppercase tracking-widest rounded-sm hover:bg-primary-container transition-colors"
        >
          <Icone nom="mail" taille="text-[16px]" couleur="" />
          {d.ko_lien}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={soumettre} className="grow overflow-y-auto px-4 py-4 flex flex-col gap-3">
      <p className="font-body-md text-[13px] text-on-surface-variant">{d.rdv_intro}</p>

      <Champ label={d.nom}>
        <input name="nom" required className={CHAMP} autoComplete="name" />
      </Champ>
      <div className="grid grid-cols-2 gap-3">
        <Champ label={d.email}>
          <input name="email" type="email" className={CHAMP} autoComplete="email" />
        </Champ>
        <Champ label={d.tel}>
          <input name="telephone" type="tel" className={CHAMP} autoComplete="tel" />
        </Champ>
      </div>
      <Champ label={d.service}>
        <select name="service" className={CHAMP} defaultValue={d.services[0]}>
          {d.services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Champ>
      <Champ label={d.date}>
        <input name="date" type="text" placeholder="ex. 12/09, matin" className={CHAMP} />
      </Champ>
      <Champ label={d.msg}>
        <textarea name="message" rows={3} className={`${CHAMP} resize-none`} />
      </Champ>

      {erreur && <p className="font-body-md text-[12px] text-error">{erreur}</p>}

      <button
        type="submit"
        disabled={etat === "envoi"}
        className="mt-1 bg-tertiary-fixed-dim text-on-tertiary-fixed px-5 py-3 font-label-sm text-[11px] uppercase tracking-widest rounded-sm hover:bg-white disabled:opacity-50 transition-colors"
      >
        {etat === "envoi" ? d.envoi : d.envoyer_rdv}
      </button>
    </form>
  );
}

const CHAMP =
  "w-full bg-surface-container-lowest border border-tertiary-fixed-dim/30 rounded-sm px-3 py-2 font-body-md text-[13.5px] text-on-surface outline-none focus:border-tertiary-fixed-dim transition-colors";

function Champ({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">
        {label}
      </span>
      {children}
    </label>
  );
}
