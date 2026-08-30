import PageV3 from "@/components/PageV3";
import { CONTACT } from "@/lib/donnees";
import { lien, type Locale } from "@/lib/i18n";
import { tp } from "@/lib/tpages";

export function AProposVue({ lang = "fr", cheminFr = "/a-propos/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  const d = tp(lang);
  const eng: [string, string, string][] = [
    ["01", d.ap_e1h, d.ap_e1p], ["02", d.ap_e2h, d.ap_e2p], ["03", d.ap_e3h, d.ap_e3p],
  ];

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      <section className="dark hero-lite">
        <div className="wrap hgrid-lite">
          <div>
            <div className="eb">{d.ap_eb}</div>
            <h1>{d.ap_h1a} <span className="g">{d.ap_h1g}</span></h1>
            <p className="sub">{d.ap_sub.replace("{r}", CONTACT.raison)}</p>
            <div className="cta">
              <a className="btn btn-p" href="#contact">{d.ap_visite} <span className="ar">→</span></a>
              <a className="btn btn-out" href="mailto:info@travisum.com">{d.cta_conseiller}</a>
            </div>
          </div>
          <div className="statbox">
            <span className="k">4,5 M</span>
            <span className="l">{d.ap_stat}</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2 className="lead-h">{d.ap_lead}</h2>
          <div className="split">
            <div>
              <div className="eb">{d.ap_metier}</div>
              <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 16 }}>{d.ap_metier1}</p>
              <p style={{ color: "var(--muted)", fontSize: 16 }}>{d.ap_metier2}</p>
            </div>
            <div className="holder">
              <span className="hlab">{d.ap_ph_lab}</span>
              <h3>{d.ap_ph_h}</h3>
              <p>{d.ap_ph_p}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <div className="eb">{d.ap_eng_eb}</div>
          <h2 className="sec-h">{d.ap_eng_h}</h2>
          <div className="cards3">
            {eng.map(([n, t, p]) => (
              <div key={n} className="card"><div className="num">{n}</div><h3>{t}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="dark conf">
        <div className="narrow">
          <div className="eb ctr">{d.ap_conf_eb}</div>
          <h2 style={{ fontSize: "clamp(26px,2.8vw,36px)", marginBottom: 18 }}>{d.ap_conf_h}</h2>
          <p className="intro">{d.ap_conf_p}</p>
          <ul>
            <li><b>✓</b><span>{d.ap_conf1}</span></li>
            <li><b>✓</b><span>{d.ap_conf2}</span></li>
            <li><b>✓</b><span>{d.ap_conf3}</span></li>
            <li><b>✓</b><span>{d.ap_conf4}</span></li>
          </ul>
        </div>
      </section>

      <section className="tint">
        <div className="wrap split">
          <div>
            <div className="eb">{d.ap_gg_eb}</div>
            <h2 className="sec-h">{d.ap_gg_h}</h2>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 22 }}>{d.ap_gg_p}</p>
            <a className="btn btn-out-d" href="https://maps.app.goo.gl/avsW7i5xRo2qmt2s5" target="_blank" rel="noopener noreferrer">{d.ap_gg_btn} <span className="ar">→</span></a>
          </div>
          <div className="ggbox">
            <span className="hlab">{d.ap_gg_lab}</span>
            <b>4,5 M</b>
            <span>{d.ap_gg_sub}</span>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap split">
          <div>
            <div className="eb">{d.ap_ct_eb}</div>
            <h2 className="sec-h">{CONTACT.rue}.</h2>
            <p className="sec-p">{CONTACT.code_postal} {CONTACT.ville}. {CONTACT.horaires}</p>
            <p style={{ marginBottom: 8 }}>
              <strong>{d.ap_ct_mail}</strong> —{" "}
              <a className="more-l" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p style={{ marginBottom: 20 }}>
              <strong>{d.ap_ct_acces}</strong> — {d.ap_ct_acces_v}
            </p>
            <a className="btn btn-out-d" href="https://maps.app.goo.gl/avsW7i5xRo2qmt2s5" target="_blank" rel="noopener noreferrer">{d.ap_ct_maps} <span className="ar">→</span></a>
          </div>
          <iframe
            className="mapframe"
            title="Plan — 367 avenue Louise, 1050 Bruxelles"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Travisum%20Louise%20Office%2C%20367%20Avenue%20Louise%2C%201050%20Bruxelles&z=16&output=embed"
          />
        </div>
      </section>

      <section className="dark final">
        <div className="wrap">
          <div className="rule" />
          <h2>{d.ap_cta_h}</h2>
          <p>{d.ap_cta_p}</p>
          <div className="cta">
            <a className="btn btn-p" href={L("/contact/")}>{d.cta_devis} <span className="ar">→</span></a>
            <a className="btn btn-out" href={`mailto:${CONTACT.email}`}>{d.cta_ecrire}</a>
          </div>
        </div>
      </section>
    </PageV3>
  );
}
