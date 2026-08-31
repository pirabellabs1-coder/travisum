/**
 * Styles partagés de la famille e-Visa (index `/e-visa/` + pages pays
 * `/e-visa/{slug}/`). Scopé sous `.ev`, aligné sur la charte (bleu nuit + or),
 * aucune fuite globale. Importé par components/vues/EVisa.tsx et EVisaPays.tsx.
 */
export const EVISA_CSS = String.raw`
.ev{--nuit:#0B1B2E;--nuit-2:#0F2438;--or:#C9A96A;--or-d:#A8863F;--or-l:#DFC38C;--clair:#F7F3EA;--bg:#F7F8FA;--ink:#16202C;--ink2:#6B7785;--bord:#E4E8EC;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,sans-serif}
.ev *{box-sizing:border-box}
.ev h1,.ev h2,.ev h3{font-family:Outfit,Inter,sans-serif;color:var(--nuit);letter-spacing:-.02em;line-height:1.15;margin:0}
.ev p{margin:0}
.ev a{color:inherit;text-decoration:none}
.ev-wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.ev-eb{display:inline-block;font:600 11px/1 Inter;letter-spacing:.16em;text-transform:uppercase;color:var(--or);margin-bottom:14px}
.ev-h2{font-size:clamp(22px,3vw,30px);margin-bottom:8px}

.ev-bread{background:var(--nuit)}
.ev-bread .ev-wrap{display:flex;align-items:center;gap:9px;padding:16px 24px 4px;font-size:13px;color:rgba(255,255,255,.5);flex-wrap:wrap}
.ev-bread a{color:rgba(255,255,255,.72)}.ev-bread a:hover{color:var(--or)}
.ev-bread .cur{color:#fff;font-weight:600}

.ev-hero{background:linear-gradient(135deg,#0B1B2E 0%,#0F2438 60%,#16314A 100%);color:#fff;padding:52px 0 56px}
.ev-hero h1{color:#fff;font-size:clamp(26px,3.8vw,40px);margin-bottom:16px;max-width:20ch}
.ev-lead{color:rgba(255,255,255,.86);font-size:16.5px;line-height:1.65;max-width:75ch;margin-bottom:14px}
.ev-nat{color:rgba(255,255,255,.72);font-size:14.5px;line-height:1.6;max-width:75ch;margin-bottom:18px}
.ev-warn{display:flex;gap:11px;align-items:flex-start;background:rgba(201,169,106,.12);border:1px solid rgba(201,169,106,.4);border-radius:12px;padding:14px 16px;max-width:75ch;font-size:14px;line-height:1.55;color:#fff}
.ev-warn-ic{flex:none;width:22px;height:22px;border-radius:50%;background:var(--or);color:var(--nuit);font:800 14px Inter;display:flex;align-items:center;justify-content:center}

.ev-sec{padding:56px 0}
.ev-tint{background:var(--clair)}
.ev-region{margin-top:30px}
.ev-region-h{font-size:15px;text-transform:uppercase;letter-spacing:.1em;color:var(--or-d);margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid var(--bord)}
.ev-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ev-card{background:#fff;border:1px solid var(--bord);border-radius:12px;overflow:hidden}
.ev-card summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px}
.ev-card summary::-webkit-details-marker{display:none}
.ev-card summary::after{content:"+";color:var(--or);font-size:22px;line-height:1;font-weight:400;flex:none}
.ev-card[open] summary::after{content:"–"}
.ev-card[open] summary{border-bottom:1px solid var(--bord)}
.ev-cname{font:600 16px Outfit;color:var(--nuit)}
.ev-badges{display:flex;gap:6px;margin-left:auto}
.ev-b{font:600 10px Inter;letter-spacing:.03em;border-radius:999px;padding:3px 8px}
.ev-b-t{color:var(--or-d);background:var(--clair);border:1px solid #EADFC9}
.ev-b-a{color:#365a86;background:#eef3f9;border:1px solid #d8e4f0}
.ev-body{padding:16px 18px 18px}
.ev-body>p{font-size:14.5px;line-height:1.6;color:var(--ink);margin-bottom:14px}
.ev-natline{font-size:13.5px;line-height:1.55;color:var(--ink2);background:var(--clair);border-left:3px solid var(--or);border-radius:0 8px 8px 0;padding:9px 12px;margin:0 0 14px!important}
.ev-natline strong{color:var(--or-d);font-weight:600}
.ev-meta{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0 0 14px}
.ev-meta dt{font:600 12px Inter;color:var(--or-d);text-transform:uppercase;letter-spacing:.05em;padding-top:1px}
.ev-meta dd{margin:0;font-size:13.5px;color:var(--ink);line-height:1.5}
.ev-docs-h{font:600 12px Inter;color:var(--or-d);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}
.ev-docs ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px}
.ev-docs li,.ev-motifs li{display:flex;gap:9px;align-items:flex-start;font-size:13.5px;color:var(--ink);line-height:1.5}
.ev-docs svg,.ev-motifs svg{color:var(--or-d);flex:none;margin-top:1px}
.ev-flink{display:inline-block;margin-top:14px;font:600 13.5px Inter;color:var(--or-d)}
.ev-flink:hover{color:var(--nuit)}

/* index : cartes-liens vers les pages pays dédiées */
.ev-lcard{display:flex;flex-direction:column;gap:9px;background:#fff;border:1px solid var(--bord);border-radius:12px;padding:16px 18px;color:var(--ink);transition:border-color .15s,box-shadow .15s,transform .15s}
.ev-lcard:hover{border-color:var(--or);box-shadow:0 10px 26px rgba(11,27,46,.09);transform:translateY(-2px)}
.ev-lc-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.ev-lc-teaser{font-size:13px;line-height:1.5;color:var(--ink2);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.ev-lc-go{margin-top:2px;font:600 13px Inter;color:var(--or-d)}
.ev-lcard:hover .ev-lc-go{color:var(--nuit)}

.ev-steps{list-style:none;padding:0;margin:22px 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px}
.ev-steps li{background:#fff;border:1px solid var(--bord);border-radius:12px;padding:20px}
.ev-num{font:700 12px Inter;color:var(--or);letter-spacing:.1em}
.ev-steps h3{font-size:16px;margin:10px 0 8px}
.ev-steps p{font-size:13.5px;line-height:1.55;color:var(--ink2)}

.ev-two{display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:start}
.ev-panel{background:#fff;border:1px solid var(--bord);border-radius:14px;padding:26px}
.ev-panel-b{border-top:3px solid var(--or)}
.ev-panel h3{font-size:19px;margin-bottom:10px}
.ev-panel p{font-size:14.5px;line-height:1.6;color:var(--ink)}
.ev-motifs-h{font-weight:600;margin:16px 0 10px!important;color:var(--nuit)}
.ev-motifs{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px}

.ev-info{display:grid;grid-template-columns:1fr 1fr 1fr;gap:26px}
.ev-info h3{font-size:17px;margin-bottom:10px}
.ev-info p{font-size:14px;line-height:1.6;color:var(--ink2)}

/* page pays dédiée */
.evp-back{display:inline-flex;align-items:center;gap:6px;font:600 13.5px Inter;color:var(--or)}
.evp-back:hover{color:#fff}
.evp-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px}
.evp-badges .ev-b{font-size:12px;padding:5px 12px}
.evp-grid{display:grid;grid-template-columns:1.35fr .65fr;gap:22px;align-items:start}
.evp-aside{position:sticky;top:90px}
.evp-aside .ev-meta{margin-bottom:18px}
.evp-links{display:flex;flex-direction:column;gap:10px;margin-top:4px}
.evp-backrow{margin-top:34px}

.ev-final{background:linear-gradient(135deg,#16314A,#0B1B2E);color:#fff;padding:64px 0;text-align:center}
.ev-final-ic{display:inline-flex;width:52px;height:52px;border-radius:50%;background:rgba(201,169,106,.15);border:1px solid rgba(201,169,106,.4);align-items:center;justify-content:center;color:var(--or);margin-bottom:18px}
.ev-final h2{color:#fff;font-size:clamp(24px,3vw,32px);margin-bottom:12px}
.ev-final>.ev-wrap>p{color:rgba(255,255,255,.82);font-size:16px;line-height:1.6;max-width:60ch;margin:0 auto 24px}
.ev-cta{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:26px}
.ev .ev-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 24px;border-radius:11px;font:600 15px Inter;cursor:pointer;border:1px solid transparent;transition:.15s}
.ev .ev-btn-p{background:var(--or);color:var(--nuit)}.ev .ev-btn-p:hover{background:var(--or-l);transform:translateY(-1px)}
.ev .ev-btn-out{background:transparent;color:#fff;border-color:rgba(255,255,255,.35)}.ev .ev-btn-out:hover{background:rgba(255,255,255,.1)}
.ev .ev-btn-s{background:var(--nuit);color:#fff;justify-content:center}.ev .ev-btn-s:hover{background:var(--nuit-2)}
.ev .ev-btn-so{background:#fff;color:var(--nuit);border-color:var(--bord);justify-content:center}.ev .ev-btn-so:hover{border-color:var(--or)}
.ev-disc{color:rgba(255,255,255,.55);font-size:12.5px;line-height:1.6;max-width:80ch;margin:0 auto}

@media(max-width:820px){
  .ev-cards,.ev-two,.ev-info,.evp-grid{grid-template-columns:1fr}
  .evp-aside{position:static}
}
@media(prefers-reduced-motion:reduce){.ev *{transition:none!important}}
`;
