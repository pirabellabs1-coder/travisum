import PageV3 from "@/components/PageV3";
import { PAYS } from "@/lib/donnees";
import { faqL } from "@/lib/data-i18n";
import { lien, type Locale } from "@/lib/i18n";
import { tp } from "@/lib/tpages";

export function RessourcesVue({ lang = "fr", cheminFr = "/ressources/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  const d = tp(lang);
  const faq = faqL(lang);
  const guides: [string, string, string, string][] = [
    ["01", d.re_g1h, d.re_g1p, L("/traductions/")],
    ["02", d.re_g2h, d.re_g2p, L("/legalisations/")],
    ["03", d.re_g3h, d.re_g3p, L("/visas/")],
  ];

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      <section className="dark hero-lite">
        <div className="wrap hgrid-lite">
          <div>
            <div className="eb">{d.re_eb}</div>
            <h1>{d.re_h1a} <span className="g">{d.re_h1g}</span></h1>
            <p className="sub">{d.re_sub}</p>
            <div className="cta">
              <a className="btn btn-p" href={L("/contact/")}>{d.cta_devis} <span className="ar">→</span></a>
              <a className="btn btn-out" href={L("/contact/")}>{d.cta_contact}</a>
            </div>
          </div>
          <div className="statbox">
            <span className="k">{PAYS.length}</span>
            <span className="l">{d.re_stat}</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="eb">{d.re_g_eb}</div>
          <h2 className="sec-h">{d.re_g_h}</h2>
          <div className="cards3">
            {guides.map(([n, t, p, href]) => (
              <a key={n} className="card" href={href}>
                <div className="num">{n}</div>
                <h3>{t}</h3>
                <p>{p}</p>
                <span className="more">{d.re_g_more} <span className="ar">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <div className="eb">{d.re_l_eb}</div>
          <h2 className="sec-h">{d.re_l_h}</h2>
          <p className="sec-p">{d.re_l_p.replace("{n}", String(PAYS.length))}</p>
          <a className="btn btn-out-d" href={L("/visas/")}>{d.re_l_btn} <span className="ar">→</span></a>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <div className="eb">{d.q_freq}</div>
          <h2 className="sec-h">{d.re_faq_h}</h2>
          <div className="v3faq" style={{ marginTop: 12 }}>
            {faq.generale.map(([q, a], i) => (<details key={i}><summary>{q}</summary><p>{a}</p></details>))}
          </div>
        </div>
      </section>

      <section className="dark final">
        <div className="wrap">
          <div className="rule" />
          <h2>{d.re_cta_h}</h2>
          <p>{d.re_cta_p}</p>
          <div className="cta">
            <a className="btn btn-p" href="mailto:info@travisum.com">info@travisum.com</a>
            <a className="btn btn-out" href={L("/contact/")}>{d.cta_ecrire}</a>
          </div>
        </div>
      </section>
    </PageV3>
  );
}
