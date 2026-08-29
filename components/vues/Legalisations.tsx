import PageV3 from "@/components/PageV3";
import { INSTANCES } from "@/lib/donnees";
import { faqL, tarifsL } from "@/lib/data-i18n";
import { trData } from "@/lib/translate-data";
import { lien, type Locale } from "@/lib/i18n";
import { tp } from "@/lib/tpages";

export function LegalisationsVue({ lang = "fr", cheminFr = "/legalisations/" }: { lang?: Locale; cheminFr?: string }) {
  const L = (c: string) => lien(lang, c);
  const d = tp(lang);
  const tar = tarifsL(lang);
  const faq = faqL(lang);
  const chaine: [string, string][] = [
    [d.lg_s1, d.lg_s1p], [d.lg_s2, d.lg_s2p], [d.lg_s3, d.lg_s3p], [d.lg_s4, d.lg_s4p],
  ];

  return (
    <PageV3 lang={lang} cheminFr={cheminFr}>
      <section className="dark hero-lite">
        <div className="wrap hgrid-lite">
          <div>
            <div className="eb">{d.lg_eb}</div>
            <h1>{d.lg_h1a} <span className="g">{d.lg_h1g}</span></h1>
            <p className="sub">{d.lg_sub}</p>
            <div className="cta">
              <a className="btn btn-p" href={L("/contact/")}>{d.cta_devis} <span className="ar">→</span></a>
              <a className="btn btn-out" href="tel:026420025">{d.cta_conseiller}</a>
            </div>
          </div>
          <div className="statbox">
            <span className="k">{INSTANCES.length}</span>
            <span className="l">{d.lg_stat}</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="eb">{d.lg_two_eb}</div>
          <h2 className="sec-h">{d.lg_two_h}</h2>
          <div className="cards3" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            <div className="card"><div className="num">A</div><h3>{d.lg_c1h}</h3><p>{d.lg_c1p}</p></div>
            <div className="card"><div className="num">B</div><h3>{d.lg_c2h}</h3><p>{d.lg_c2p}</p></div>
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <div className="eb">{d.lg_ch_eb}</div>
          <h2 className="sec-h">{d.lg_ch_h}</h2>
          <p className="sec-p">{d.lg_ch_p}</p>
          <div className="steps" style={{ marginTop: 12 }}>
            {chaine.map(([t, p], i) => (
              <div key={i} className="step">
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wide">
          <div className="eb">{d.lg_inst_eb}</div>
          <h2 className="sec-h">{d.lg_inst_h}</h2>
          <div className="langs">
            {INSTANCES.map((n) => (<span key={n} className="lchip">{trData(lang, n)}</span>))}
          </div>
        </div>
      </section>

      <section className="tint">
        <div className="wrap">
          <div className="eb">{d.tarifs_delais}</div>
          <h2 className="sec-h">{d.lg_tar_h}</h2>
          <p className="sec-p">{d.lg_tar_p}</p>
          <div className="tscroll">
            <table className="ptable">
              <thead><tr>{tar.legalisation.colonnes.map((c) => (<th key={c}>{c}</th>))}</tr></thead>
              <tbody>
                {tar.legalisation.lignes.map((r, i) => (
                  <tr key={i}>{r.map((cell, j) => (<td key={j}>{j === r.length - 1 ? <span className="pph">{cell}</span> : cell}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          {tar.legalisation.note && <p className="tnote">{tar.legalisation.note}</p>}
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="eb">{d.q_freq}</div>
          <h2 className="sec-h">{d.lg_faq_h}</h2>
          <div className="v3faq" style={{ marginTop: 12 }}>
            {faq.legalisation.map(([q, a], i) => (<details key={i}><summary>{q}</summary><p>{a}</p></details>))}
          </div>
        </div>
      </section>

      <section className="dark final">
        <div className="wrap">
          <div className="rule" />
          <h2>{d.lg_cta_h}</h2>
          <p>{d.lg_cta_p}</p>
          <div className="cta">
            <a className="btn btn-p" href={L("/contact/")}>{d.cta_devis} <span className="ar">→</span></a>
            <a className="btn btn-out" href={L("/contact/")}>{d.cta_contact}</a>
          </div>
        </div>
      </section>
    </PageV3>
  );
}
