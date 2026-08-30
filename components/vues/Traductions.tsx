import PageV3 from "@/components/PageV3";
import { DOCUMENTS_TRADUCTION, LANGUES } from "@/lib/donnees";
import { faqL } from "@/lib/data-i18n";
import { trData } from "@/lib/translate-data";
import { lien, type Locale } from "@/lib/i18n";
import { tp } from "@/lib/tpages";

export function TraductionsVue({ lang = "fr", cheminFr = "/traductions/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  const d = tp(lang);
  const faq = faqL(lang);

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      <section className="dark hero-lite">
        <div className="wrap hgrid-lite">
          <div>
            <div className="eb">{d.tr_eb}</div>
            <h1>{d.tr_h1a} <span className="g">{d.tr_h1g}</span></h1>
            <p className="sub">{d.tr_sub}</p>
            <div className="cta">
              <a className="btn btn-p" href={L("/contact/")}>{d.cta_devis} <span className="ar">→</span></a>
              <a className="btn btn-out" href="mailto:info@travisum.com">{d.cta_conseiller}</a>
            </div>
          </div>
          <div className="statbox">
            <span className="k">{LANGUES.length}</span>
            <span className="l">{d.tr_stat}</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="facts">
            <div><span className="k">{LANGUES.length}</span><h3>{d.tr_f1}</h3><p>{d.tr_f1p}</p></div>
            <div><span className="k">Jurés</span><h3>{d.tr_f2}</h3><p>{d.tr_f2p}</p></div>
            <div><span className="k">Express</span><h3>{d.tr_f3}</h3><p>{d.tr_f3p}</p></div>
            <div><span className="k">Louise</span><h3>{d.tr_f4}</h3><p>{d.tr_f4p}</p></div>
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <div className="eb">{d.tr_two_eb}</div>
          <h2 className="sec-h">{d.tr_two_h}</h2>
          <div className="cards3" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            <div className="card"><div className="num">01</div><h3>{d.tr_c1h}</h3><p>{d.tr_c1p}</p><a className="more" href={L("/contact/")}>{d.cta_devis} <span className="ar">→</span></a></div>
            <div className="card"><div className="num">02</div><h3>{d.tr_c2h}</h3><p>{d.tr_c2p}</p><a className="more" href={L("/contact/")}>{d.cta_devis} <span className="ar">→</span></a></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wide">
          <div className="eb">{d.tr_doc_eb}</div>
          <h2 className="sec-h">{d.tr_doc_h}</h2>
          <p className="sec-p">{d.tr_doc_p}</p>
          <div className="dest">
            {DOCUMENTS_TRADUCTION.map((doc) => (
              <div key={doc} className="dcard" style={{ cursor: "default" }}>
                <b style={{ fontWeight: 600, fontSize: 13.5 }}>{trData(lang, doc)}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tint" id="langues">
        <div className="wide">
          <div className="eb">{d.tr_lang_eb}</div>
          <h2 className="sec-h">{d.tr_lang_h.replace("{n}", String(LANGUES.length))}</h2>
          <p className="sec-p">{d.tr_lang_p}</p>
          <div className="langs">
            {LANGUES.map((l) => (<span key={l} className="lchip">{l}</span>))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="eb">{d.tr_proc_eb}</div>
          <h2 className="sec-h">{d.tr_proc_h}</h2>
          <p className="sec-p">{d.tr_proc_p}</p>
          <div className="cards3" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: 18 }}>
            <div className="card"><div className="num">01</div><h3>{d.tr_proc_n_h}</h3><p>{d.tr_proc_n_p}</p></div>
            <div className="card"><div className="num">02</div><h3>{d.tr_proc_e_h}</h3><p>{d.tr_proc_e_p}</p></div>
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <div className="eb">{d.q_freq}</div>
          <h2 className="sec-h">{d.tr_faq_h}</h2>
          <div className="v3faq" style={{ marginTop: 12 }}>
            {faq.traduction.map(([q, a], i) => (<details key={i}><summary>{q}</summary><p>{a}</p></details>))}
          </div>
        </div>
      </section>

      <section className="dark final">
        <div className="wrap">
          <div className="rule" />
          <h2>{d.tr_cta_h}</h2>
          <p>{d.tr_cta_p}</p>
          <div className="cta">
            <a className="btn btn-p" href={L("/contact/")}>{d.cta_devis} <span className="ar">→</span></a>
            <a className="btn btn-out" href={L("/contact/")}>{d.cta_contact}</a>
          </div>
        </div>
      </section>
    </PageV3>
  );
}
