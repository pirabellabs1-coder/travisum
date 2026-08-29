"use client";

/**
 * Formulaire de prise de rendez-vous de la page Contact. Poste vers la fonction
 * serverless /api/rdv/ (envoi e-mail via Resend). Si Resend n'est pas encore
 * configuré, l'API renvoie un lien « mailto » de repli que l'on propose.
 */

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

export type RdvLabels = {
  nom: string; email: string; tel: string; service: string; services: string[];
  date: string; datePh: string; msg: string; submit: string; sending: string;
  okTitre: string; okTexte: string; mailIntro: string; mailBtn: string;
  err: string; required: string;
};

export default function ContactForm({ lang, t }: { lang: Locale; t: RdvLabels }) {
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "mailto">("idle");
  const [mailto, setMailto] = useState("");
  const [err, setErr] = useState("");

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
      setErr(t.required);
      return;
    }
    setErr("");
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
        setErr(data?.message || t.required);
        setEtat("idle");
      }
    } catch {
      setErr(t.err);
      setEtat("idle");
    }
  }

  if (etat === "ok") {
    return (
      <div className="cx-ok" role="status">
        <span className="cx-ok-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
        </span>
        <h3>{t.okTitre}</h3>
        <p>{t.okTexte}</p>
      </div>
    );
  }

  if (etat === "mailto") {
    return (
      <div className="cx-ok" role="status">
        <p>{t.mailIntro}</p>
        <a className="cx-btn cx-btn-p" href={mailto}>{t.mailBtn}</a>
      </div>
    );
  }

  return (
    <form className="cx-form" onSubmit={soumettre} noValidate>
      <div className="cx-field">
        <label htmlFor="rdv-nom">{t.nom}</label>
        <input id="rdv-nom" name="nom" required autoComplete="name" />
      </div>
      <div className="cx-row">
        <div className="cx-field">
          <label htmlFor="rdv-email">{t.email}</label>
          <input id="rdv-email" name="email" type="email" autoComplete="email" />
        </div>
        <div className="cx-field">
          <label htmlFor="rdv-tel">{t.tel}</label>
          <input id="rdv-tel" name="telephone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="cx-row">
        <div className="cx-field">
          <label htmlFor="rdv-service">{t.service}</label>
          <select id="rdv-service" name="service" defaultValue={t.services[0]}>
            {t.services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="cx-field">
          <label htmlFor="rdv-date">{t.date}</label>
          <input id="rdv-date" name="date" type="text" placeholder={t.datePh} />
        </div>
      </div>
      <div className="cx-field">
        <label htmlFor="rdv-msg">{t.msg}</label>
        <textarea id="rdv-msg" name="message" rows={4} />
      </div>

      {err && <p className="cx-err" role="alert">{err}</p>}

      <button type="submit" className="cx-btn cx-btn-p cx-submit" disabled={etat === "envoi"}>
        {etat === "envoi" ? t.sending : t.submit}
      </button>
    </form>
  );
}
