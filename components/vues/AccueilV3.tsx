"use client";

/**
 * Page d'accueil — maquette « v3 » reproduite à l'identique.
 *
 * Le CSS, le HTML et le JavaScript proviennent directement de la maquette
 * fournie. Ils sont injectés tels quels : le style dans une balise <style>,
 * le corps via dangerouslySetInnerHTML (donc présent dans le HTML statique,
 * bon pour le référencement), et le script d'origine est exécuté dans un
 * effet client. Aucune modification du contenu de la maquette.
 */

import { useEffect } from "react";
import Chat from "@/components/Chat";
import type { Locale } from "@/lib/i18n";

const CSS = String.raw`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
:root{
  --night:#0B1B2E;--night-2:#0F2438;--night-3:#16314A;
  --white:#fff;--tint:#F5F7F9;
  --gold:#C9A96A;--gold-l:#DFC38C;--gold-d:#A8863F;
  --blue:#2F7FF0;
  --ink:#16202C;--muted:#6B7785;--muted-d:#93A3B5;
  --hair:#E4E8EC;--hair-d:rgba(255,255,255,.10);
  --r:12px;--rb:8px;--maxw:1200px;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:Inter,system-ui,sans-serif;color:var(--ink);background:#fff;font-size:16px;line-height:1.7;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:Outfit,sans-serif;letter-spacing:-.025em;line-height:1.1;font-weight:600}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 32px}
.wide{max-width:1480px;margin:0 auto;padding:0 32px}
.narrow{max-width:660px;margin:0 auto;padding:0 32px}
section{padding:112px 0}
.tint{background:var(--tint)}
.dark{background:linear-gradient(168deg,var(--night) 0%,var(--night-2) 100%);color:#fff}
.dark h2,.dark h3,.dark h4{color:#fff}
.dark .ac h3,.dark .ac h4{color:var(--ink)}

.eb{display:flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:20px}
.eb::before{content:"";width:26px;height:1px;background:var(--gold);flex:none}
.eb.ctr{justify-content:center}

.btn{display:inline-flex;align-items:center;gap:9px;height:46px;padding:0 22px;border-radius:var(--rb);
  font:600 14.5px Inter;text-decoration:none;cursor:pointer;border:1px solid transparent;transition:.18s ease;white-space:nowrap}
.btn:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.btn-p{background:var(--gold);color:var(--night)}
.btn-p:hover{background:var(--gold-l);transform:translateY(-1px)}
.btn-out{background:transparent;color:#fff;border-color:rgba(255,255,255,.28)}
.btn-out:hover{background:rgba(255,255,255,.07)}
.btn-out-d{background:#fff;color:var(--ink);border-color:var(--hair)}
.btn-out-d:hover{border-color:#c3ccd4}
.ar{transition:transform .18s}.btn:hover .ar{transform:translateX(3px)}

header{position:sticky;top:0;z-index:60;background:var(--night);border-bottom:1px solid var(--hair-d)}
header.stuck{box-shadow:0 8px 30px rgba(0,0,0,.3)}
.nav{display:flex;align-items:center;gap:30px;height:74px;position:relative}
.logo{font:600 16px Outfit;letter-spacing:.22em;color:#fff;text-decoration:none;display:flex;align-items:center;gap:6px}
.logo i{width:5px;height:5px;border-radius:50%;background:var(--gold);margin-top:2px}
.nav ul{display:flex;gap:24px;list-style:none;position:absolute;left:50%;transform:translateX(-50%)}
.nav a.lk{color:rgba(255,255,255,.82);text-decoration:none;font-size:14.5px;position:relative;padding:4px 0}
.nav a.lk::after{content:"";position:absolute;left:0;bottom:0;height:1px;width:0;background:var(--gold);transition:width .22s}
.nav a.lk:hover{color:#fff}.nav a.lk:hover::after{width:100%}
.spacer{flex:1}
.lang{display:flex;background:rgba(255,255,255,.08);border-radius:7px;padding:3px;gap:2px}
.lang button{border:0;background:transparent;color:rgba(255,255,255,.6);font:600 11.5px/1 Inter;letter-spacing:.06em;padding:7px 11px;border-radius:5px;cursor:pointer}
.lang button[aria-pressed="true"]{background:rgba(255,255,255,.92);color:var(--night)}
.burger{display:none;background:none;border:0;cursor:pointer;padding:8px}
.burger span{display:block;width:22px;height:1.5px;background:#fff;margin:5px 0;transition:transform .22s,opacity .22s}
#hd.open .burger span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
#hd.open .burger span:nth-child(2){opacity:0}
#hd.open .burger span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}

/* HERO */
.hero{padding:88px 0 100px}
.hgrid{display:grid;grid-template-columns:1fr 1.02fr;gap:64px;align-items:start}
.hero h1{font-size:clamp(36px,4.2vw,56px);font-weight:700;color:#fff;margin-bottom:22px}
.hero h1 .g{color:var(--gold);display:block}
.hero .sub{color:var(--muted-d);font-size:17px;max-width:450px;margin-bottom:26px}
.hero .cta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:30px}
.priv{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;color:var(--muted-d);max-width:420px;line-height:1.6}
.priv b{color:var(--gold);font-size:13px}

/* LIVE ASSISTANT */
.ac{background:#fff;border-radius:var(--r);color:var(--ink);box-shadow:0 26px 64px rgba(0,0,0,.32);overflow:hidden;display:flex;flex-direction:column;min-height:472px}
.ac .hd{display:flex;align-items:center;gap:9px;padding:15px 24px;border-bottom:1px solid var(--hair);flex:none}
.ac .hd i{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:pulse 2.4s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
.ac .hd span{font:600 11px Inter;letter-spacing:.16em;text-transform:uppercase}
.ac .hd .re{margin-left:auto;border:0;background:none;color:var(--muted);font:500 12px Inter;cursor:pointer;display:none}
.ac .hd .re:hover{color:var(--ink)}
.ac .bd{padding:24px;flex:1;display:flex;flex-direction:column}
.ac h3{font-size:22px;margin-bottom:8px}
.ac .lead{color:var(--muted);font-size:14.5px;margin-bottom:16px;line-height:1.6}
.ac textarea{width:100%;height:78px;border:1px solid var(--hair);border-radius:10px;background:#F8FAFB;padding:13px 15px;font:400 14.5px/1.6 Inter;color:var(--ink);resize:none}
.ac textarea:focus{outline:0;border-color:var(--gold);background:#fff;box-shadow:0 0 0 3px rgba(201,169,106,.18)}
.chips{display:flex;flex-direction:column;gap:7px;margin:13px 0 16px}
.chip{border:1px solid var(--hair);background:#fff;border-radius:8px;padding:9px 13px;font:400 13px Inter;color:var(--muted);cursor:pointer;transition:.16s;text-align:left}
.chip:hover{border-color:var(--gold);color:var(--ink);background:#FDFBF6}
.ac .go{width:100%;justify-content:center}
.chatform{display:flex;gap:8px;margin-top:12px}
.chatform input{flex:1;min-width:0;border:1px solid var(--hair);border-radius:8px;padding:10px 13px;font:400 14px Inter;color:var(--ink);background:#F8FAFB}
.chatform input:focus{outline:0;border-color:var(--gold);background:#fff;box-shadow:0 0 0 3px rgba(201,169,106,.18)}
.chatform .send{width:46px;padding:0;flex:none}

/* conversation dans la carte */
.conv{flex:1;display:flex;flex-direction:column;gap:9px;overflow-y:auto;max-height:330px;padding-right:4px}
.conv::-webkit-scrollbar{width:4px}.conv::-webkit-scrollbar-thumb{background:var(--hair);border-radius:4px}
.msg{max-width:82%;padding:10px 14px;border-radius:13px;font-size:14px;line-height:1.55;opacity:0;transform:translateY(7px);animation:pop .3s ease forwards}
@keyframes pop{to{opacity:1;transform:none}}
.msg.a{background:#F1F4F7;color:var(--ink);align-self:flex-start;border-bottom-left-radius:4px}
.msg.u{background:var(--blue);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.msg p{margin:0}.msg p+p,.msg ul,.msg ol{margin-top:7px}.msg ul,.msg ol{padding-left:19px}.msg ul{list-style:disc}.msg ol{list-style:decimal}.msg li{margin:2px 0}.msg strong{font-weight:600}.msg a{color:inherit;text-decoration:underline}.msg code{font-family:ui-monospace,monospace;font-size:.92em}
.msg.typing::after{content:"▍";margin-left:1px;color:var(--muted);animation:caret .9s step-end infinite}
@keyframes caret{50%{opacity:0}}
.typ{display:flex;gap:4px;padding:13px 14px;background:#F1F4F7;border-radius:13px;align-self:flex-start;border-bottom-left-radius:4px}
.typ i{width:5px;height:5px;border-radius:50%;background:#9AA7B4;animation:bl 1.1s infinite}
.typ i:nth-child(2){animation-delay:.18s}.typ i:nth-child(3){animation-delay:.36s}
@keyframes bl{0%,60%,100%{opacity:.25}30%{opacity:1}}
.res{border-top:1px solid var(--hair);margin-top:14px;padding-top:16px;opacity:0;transform:translateY(9px);transition:.5s ease}
.res.on{opacity:1;transform:none}
.res .lab{font:600 10.5px Inter;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:8px}
.res h4{font-size:18px;margin-bottom:12px}
.res ul{list-style:none;display:flex;flex-direction:column;gap:6px;margin-bottom:12px}
.res li{font-size:13px;color:var(--ink);display:flex;gap:8px}
.res li b{color:var(--gold-d)}
.res .disc{font-size:11.5px;color:var(--muted);line-height:1.5;margin-bottom:14px}
.res .btn{width:100%;justify-content:center}

/* FAITS */
.facts{display:grid;grid-template-columns:repeat(4,1fr)}
.facts>div{padding:0 28px;border-left:1px solid var(--hair)}
.facts>div:first-child{padding-left:0;border-left:0}
.facts .k{font:700 30px Outfit;letter-spacing:-.03em;display:block;margin-bottom:6px}
.facts h3{font:600 15px Inter;letter-spacing:0;margin-bottom:5px}
.facts p{font-size:13.5px;color:var(--muted);line-height:1.55}
.lead-h{font-size:clamp(24px,2.4vw,32px);max-width:540px;padding-bottom:38px;border-bottom:1px solid var(--hair);margin-bottom:42px}

.sec-h{font-size:clamp(28px,3vw,40px);max-width:640px;margin-bottom:46px}
.cards3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.card{background:#fff;border:1px solid var(--hair);border-radius:var(--r);padding:32px 28px;transition:.22s;display:flex;flex-direction:column}
.card:hover{transform:translateY(-4px);border-color:#d3dae0;box-shadow:0 14px 34px rgba(11,27,46,.07)}
.num{font:600 11px Inter;letter-spacing:.18em;color:var(--gold);margin-bottom:18px}
.card h3{font-size:24px;margin-bottom:12px}
.card p{font-size:14.5px;color:var(--muted);margin-bottom:24px;flex:1}
.card a.more{color:var(--ink);font:600 14px Inter;text-decoration:none;display:inline-flex;gap:6px;align-items:center}
.card a.more:hover{color:var(--gold-d)}
.card a.more:hover .ar{transform:translateX(3px)}

/* TARIFS */
.tabs{display:flex;gap:6px;margin-bottom:26px;flex-wrap:wrap}
.tab{border:1px solid var(--hair);background:#fff;border-radius:20px;padding:8px 18px;font:600 13px Inter;color:var(--muted);cursor:pointer;transition:.16s}
.tab[aria-selected="true"]{background:var(--night);color:#fff;border-color:var(--night)}
.ptable{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--hair);border-radius:var(--r);overflow:hidden}
.ptable th,.ptable td{padding:16px 20px;text-align:left;font-size:14px;border-bottom:1px solid var(--hair)}
.ptable thead th{background:var(--night);color:#fff;font:600 12px Inter;letter-spacing:.06em;text-transform:uppercase}
.ptable tbody tr:last-child td{border-bottom:0}
.ptable td:first-child{font-weight:600}
.ptable .d{color:var(--muted);font-size:13px;display:block;font-weight:400}
.pph{color:var(--gold-d);font-weight:600;border-bottom:1px dashed var(--gold);padding-bottom:1px}
.tnote{margin-top:18px;font-size:13px;color:var(--muted);max-width:760px}

/* STEPS */
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
.step{padding-top:20px;border-top:1px solid var(--hair);position:relative}
.step::before{content:"";position:absolute;top:-1px;left:0;width:34px;height:2px;background:var(--gold)}
.step h3{font:600 15.5px Inter;letter-spacing:0;margin-bottom:8px;line-height:1.45}
.step p{font-size:13.5px;color:var(--muted);line-height:1.6}

/* MAILLAGE */
.dest{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:44px}
.dcard{border:1px solid var(--hair);border-radius:10px;padding:14px 15px;text-decoration:none;color:var(--ink);transition:.16s;background:#fff}
.dcard:hover{border-color:var(--gold);background:#FDFBF6;transform:translateY(-2px)}
.dcard b{display:block;font:600 14px Inter}
.dcard span{font-size:11.5px;color:var(--muted)}
.langs{display:flex;flex-wrap:wrap;gap:7px}
.lchip{border:1px solid var(--hair);border-radius:16px;padding:5px 12px;font-size:12.5px;color:var(--muted);text-decoration:none;background:#fff;transition:.14s}
.lchip:hover{border-color:var(--gold);color:var(--ink)}
.more-l{color:var(--gold-d);font:600 12.5px Inter;text-decoration:none;padding:5px 4px}
.subh{font:600 12px Inter;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:16px}

/* CONFIDENTIALITÉ — respiration */
.conf{text-align:center}
.conf h2{font-size:clamp(26px,2.8vw,36px);margin-bottom:18px}
.conf p{color:var(--muted-d);font-size:16px;margin-bottom:30px}
.conf ul{list-style:none;display:flex;flex-direction:column;gap:12px;text-align:left;max-width:470px;margin:0 auto}
.conf li{display:flex;gap:12px;font-size:14.5px;color:#D9E2EA;line-height:1.6}
.conf li b{color:var(--gold);flex:none}

/* ÉQUIPE */
.team{display:grid;grid-template-columns:1fr 1.1fr;gap:60px;align-items:center}
.team h2{font-size:clamp(26px,2.9vw,36px);margin-bottom:16px}
.team p{color:var(--muted);font-size:15.5px}
.holder{border:1.5px dashed var(--gold);border-radius:var(--r);background:#FAFBFC;aspect-ratio:16/10;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:36px;gap:8px}
.team-photo{border-radius:var(--r);overflow:hidden;aspect-ratio:16/11;box-shadow:0 20px 48px rgba(11,27,46,.16);background:var(--tint)}
.team-photo img{width:100%;height:100%;object-fit:cover;display:block}
.holder .lab{font:600 11px Inter;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.holder h3{font-size:18px}.holder p{font-size:13.5px;color:var(--muted);max-width:320px}

/* GOOGLE */
.gg{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:center;background:#fff;border:1px solid var(--hair);border-radius:var(--r);padding:44px}
.gg h2{font-size:clamp(24px,2.6vw,32px);margin-bottom:14px}
.gg p{color:var(--muted);font-size:15px;margin-bottom:22px}
.ggbox{border:1px solid var(--gold);border-radius:10px;background:#FDFBF6;padding:28px;text-align:center}
.ggbox .lab{font:600 11px Inter;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:12px}
.ggbox b{display:block;font:700 26px Outfit;letter-spacing:-.03em;margin-bottom:4px}
.ggbox span{font-size:13.5px;color:var(--muted)}

/* FINAL */
.final{text-align:center}
.final .rule{width:34px;height:1px;background:rgba(255,255,255,.4);margin:0 auto 24px}
.final h2{font-size:clamp(30px,3.6vw,46px);margin-bottom:14px}
.final p{color:var(--muted-d);font-size:16.5px;margin-bottom:30px}
.final .cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

footer{background:var(--night);color:#fff;padding:74px 0 32px}
.fgrid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.1fr 1fr;gap:38px}
.fcol h4{font:600 11px Inter;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:17px}
.fcol a,.fcol p{display:block;color:rgba(255,255,255,.72);text-decoration:none;font-size:14px;margin-bottom:10px}
.fcol a:hover{color:#fff}
.fbrand .logo{margin-bottom:18px}
.fbrand .hi{color:#fff;font-weight:500}
.fbrand .bce{color:var(--muted-d);font-size:12.5px;margin-top:14px}
.fbot{border-top:1px solid var(--hair-d);margin-top:44px;padding-top:20px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:12.5px;color:var(--muted-d)}

/* CARTE pleine largeur (bas de page) */
.mapwrap{background:#fff}
.mapwrap .head{padding:64px 0 26px}
.mapfull{display:block;width:100%;height:480px;border:0;border-top:1px solid var(--hair)}
@media(max-width:720px){.mapfull{height:380px}.mapwrap .head{padding:52px 0 20px}}

.rv{opacity:0;transform:translateY(20px)}
.rv.in{opacity:1;transform:none;transition:opacity .7s cubic-bezier(.2,.7,.3,1),transform .7s cubic-bezier(.2,.7,.3,1)}

@media(max-width:1080px){
  .hgrid,.team,.gg{grid-template-columns:1fr;gap:44px}
  .facts{grid-template-columns:1fr 1fr;gap:28px 0}
  .facts>div:nth-child(3){padding-left:0;border-left:0}
  .cards3,.steps{grid-template-columns:1fr 1fr;gap:20px}
  .dest{grid-template-columns:repeat(3,1fr)}
  .fgrid{grid-template-columns:1fr 1fr 1fr}
}
@media(max-width:720px){
  section{padding:70px 0}.wrap,.wide,.narrow{padding:0 20px}
  .nav ul,.spacer{display:none}
  .nav{justify-content:space-between;gap:10px;height:62px}
  .burger{display:block;order:3}.lang{order:2;margin-left:auto}
  .nav .btn{display:none}
  #hd.open .nav ul{display:flex;flex-direction:column;gap:0;position:fixed;top:62px;left:0;right:0;transform:none;background:var(--night-2);border-top:1px solid rgba(255,255,255,.12);padding:6px 0;box-shadow:0 24px 44px rgba(0,0,0,.45);max-height:calc(100dvh - 62px);overflow:auto;z-index:59}
  #hd.open .nav ul li{width:100%}
  #hd.open .nav a.lk{display:block;padding:16px 20px;font-size:16px;color:#fff}
  #hd.open .nav a.lk::after{display:none}
  .cards3,.steps,.facts,.fgrid{grid-template-columns:1fr}
  .facts>div{padding:0;border-left:0}
  .dest{grid-template-columns:1fr 1fr}
  .ptable{display:block;overflow-x:auto}
  body{padding-bottom:68px}
  .mbar{display:flex}
}
.mbar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:70;background:var(--night);border-top:1px solid var(--hair-d);padding:10px 14px;gap:8px}
.mbar a{flex:1;height:44px;border-radius:var(--rb);display:flex;align-items:center;justify-content:center;font:600 13px Inter;text-decoration:none}
.mbar .m1{background:var(--gold);color:var(--night)}
.mbar .m2{background:rgba(255,255,255,.09);color:#fff}
.mbar .m3{background:rgba(255,255,255,.09);color:#fff}

@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv,.msg,.res{opacity:1!important;transform:none!important}html{scroll-behavior:auto}}
`;

const BODY = String.raw`
<header id="hd">
  <div class="wrap nav">
    <a href="/" class="logo">TRAVISUM<i></i></a>
    <ul>
      <li><a class="lk" href="/visas/" data-i="nav1">Visa</a></li>
      <li><a class="lk" href="/e-visa/" data-i="navEvisa">e-Visa</a></li>
      <li><a class="lk" href="/traductions/" data-i="nav2">Traduction</a></li>
      <li><a class="lk" href="/legalisations/" data-i="nav3">Légalisation</a></li>
      <li><a class="lk" href="/#steps" data-i="nav4">Comment ça marche</a></li>
      <li><a class="lk" href="/contact/" data-i="navContact">Contact</a></li>
    </ul>
    <div class="spacer"></div>
    <div class="lang" role="group" aria-label="Langue">
      <button data-l="fr" aria-pressed="true">FR</button>
      <button data-l="en" aria-pressed="false">EN</button>
      <button data-l="nl" aria-pressed="false">NL</button>
    </div>
    <a href="/contact/" class="btn btn-p"><span data-i="navcta">Obtenir un devis</span></a>
    <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>

<section class="dark hero" id="hero">
  <div class="wrap hgrid">
    <div>
      <div class="eb" data-i="heroEb">Bruxelles · Démarches internationales</div>
      <h1><span data-i="h1a">Vos démarches internationales,</span><span class="g" data-i="h1b">sans les complications.</span></h1>
      <p class="sub" data-i="heroSub">Visa, traduction et légalisation de documents. Décrivez votre situation en une phrase : l'assistant identifie la démarche, nos experts la vérifient.</p>
      <div class="cta">
        <a href="/contact/" class="btn btn-p"><span data-i="heroC1">Demander un devis</span><span class="ar">→</span></a>
        <a href="tel:026420025" class="btn btn-out"><span data-i="heroC2">Parler à un conseiller</span></a>
      </div>
      <div class="priv"><b>⌂</b><span data-i="heroPriv">Vos documents sont traités de façon confidentielle, consultés uniquement par l'équipe en charge du dossier, et les copies sont supprimées après traitement.</span></div>
    </div>

    <div class="ac rv" id="ac">
      <div class="hd"><i></i><span>Travisum Assistant</span><button class="re" id="re" data-i="restart">↻ Recommencer</button></div>
      <div class="bd" id="acbd">
        <h3 data-i="acH">De quoi avez-vous besoin ?</h3>
        <p class="lead" data-i="acP">Décrivez simplement votre situation. Nous vous indiquons la démarche et les documents nécessaires.</p>
        <textarea id="ta" data-ip="acPh" placeholder="Ex. Je pars au Congo pour travailler pendant 2 mois..."></textarea>
        <div class="chips" id="chips"></div>
        <button class="btn btn-p go" id="go"><span data-i="acBtn">Commencer</span><span class="ar">→</span></button>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <h2 class="lead-h rv" data-i="factH">Un accompagnement humain, renforcé par la technologie.</h2>
    <div class="facts rv">
      <div><span class="k" data-i="f1k">82</span><h3 data-i="f1h">langues traitées</h3><p data-i="f1p">Traductions libres et assermentées.</p></div>
      <div><span class="k" data-i="f2k">70</span><h3 data-i="f2h">destinations visa</h3><p data-i="f2p">Tourisme, affaires, études, transit.</p></div>
      <div><span class="k">9h–17h</span><h3 data-i="f3h">sans interruption</h3><p data-i="f3p">Du lundi au vendredi, dépôt et retrait.</p></div>
      <div><span class="k" data-i="f4k">Louise</span><h3 data-i="f4h">bureau à Bruxelles</h3><p data-i="f4p">367 avenue Louise, 1050 Bruxelles.</p></div>
    </div>
  </div>
</section>

<section class="tint" id="services">
  <div class="wrap">
    <div class="rv">
      <div class="eb" data-i="svEb">Nos services</div>
      <h2 class="sec-h" data-i="svH">Une seule équipe pour toutes vos démarches.</h2>
    </div>
    <div class="cards3 rv">
      <div class="card"><div class="num">01</div><h3 data-i="s1h">Visa</h3><p data-i="s1p">Visa touristique, affaires, études et transit. Constitution du dossier, rendez-vous consulaire, dépôt et récupération.</p><a class="more" href="/visas/"><span data-i="s1a">Découvrir les visas</span><span class="ar">→</span></a></div>
      <div class="card"><div class="num">02</div><h3 data-i="s2h">Traduction</h3><p data-i="s2p">Traductions libres et assermentées, reconnues par les administrations belges et étrangères.</p><a class="more" href="/traductions/"><span data-i="s2a">Voir les tarifs</span><span class="ar">→</span></a></div>
      <div class="card"><div class="num">03</div><h3 data-i="s3h">Légalisation</h3><p data-i="s3p">Apostille, légalisation et dépôts auprès du SPF Justice, des Affaires étrangères, des tribunaux et des ambassades.</p><a class="more" href="/legalisations/"><span data-i="s3a">Comprendre la procédure</span><span class="ar">→</span></a></div>
    </div>
  </div>
</section>

<section id="tarifs">
  <div class="wrap">
    <div class="rv">
      <div class="eb" data-i="prEb">Tarifs et délais</div>
      <h2 class="sec-h" data-i="prH">Les prix, avant de décrocher le téléphone.</h2>
    </div>
    <div class="rv">
      <div class="tabs" role="tablist">
        <button class="tab" role="tab" aria-selected="true" data-t="0" data-i="nav2">Traduction</button>
        <button class="tab" role="tab" aria-selected="false" data-t="1" data-i="nav3">Légalisation</button>
        <button class="tab" role="tab" aria-selected="false" data-t="2" data-i="nav1">Visa</button>
      </div>
      <table class="ptable">
        <thead><tr>
          <th data-i="prC1">Formule</th><th data-i="prC2">Délai</th><th data-i="prC3">Tarif indicatif</th><th data-i="prC4">Ce qui est compris</th>
        </tr></thead>
        <tbody id="ptb"></tbody>
      </table>
      <p class="tnote" data-i="prNote">Les frais officiels reversés aux administrations et aux consulats sont facturés séparément, au montant exact et sur justificatif. Montants à confirmer avec vous avant mise en ligne.</p>
    </div>
  </div>
</section>

<section class="tint" id="steps">
  <div class="wrap">
    <div class="rv">
      <div class="eb" data-i="stEb">Le déroulement</div>
      <h2 class="sec-h" data-i="stH">Simple. Clair. Accompagné.</h2>
    </div>
    <div class="steps rv">
      <div class="step"><div class="num">01</div><h3 data-i="p1h">Vous expliquez votre situation</h3><p data-i="p1p">En quelques phrases, à l'assistant ou à un conseiller.</p></div>
      <div class="step"><div class="num">02</div><h3 data-i="p2h">Nous vérifions les démarches nécessaires</h3><p data-i="p2p">Type de dossier, documents, délais, autorité compétente.</p></div>
      <div class="step"><div class="num">03</div><h3 data-i="p3h">Vous transmettez vos documents</h3><p data-i="p3p">En ligne ou à notre bureau de l'avenue Louise.</p></div>
      <div class="step"><div class="num">04</div><h3 data-i="p4h">Nous vous accompagnons jusqu'à la finalisation</h3><p data-i="p4p">Dépôt, suivi et remise du dossier ou du passeport.</p></div>
    </div>
  </div>
</section>

<section id="dest">
  <div class="wide">
    <div class="rv" style="text-align:center">
      <div class="eb" data-i="dsEb" style="justify-content:center">Destinations et langues</div>
      <h2 class="sec-h" data-i="dsH">Chaque destination et chaque langue a sa page.</h2>
    </div>
    <p class="subh rv" data-i="dsSub1">Destinations les plus demandées</p>
    <div class="dest rv" id="destgrid"></div>
    <div class="rv">
      <p class="subh" data-i="dsSub2">Langues de traduction</p>
      <div class="langs" id="langgrid"></div>
    </div>
  </div>
</section>

<section class="dark conf">
  <div class="narrow rv">
    <div class="eb ctr" data-i="cfEb">Confidentialité</div>
    <h2 data-i="cfH">Vous nous confiez des originaux. Nous le prenons au sérieux.</h2>
    <p data-i="cfP">Passeports, actes de naissance, diplômes : ce sont des documents que l'on ne confie pas à la légère.</p>
    <ul>
      <li><b>✓</b><span data-i="cf1">Documents traités de manière confidentielle par notre équipe.</span></li>
      <li><b>✓</b><span data-i="cf2">Accès limité à l'équipe en charge de votre dossier.</span></li>
      <li><b>✓</b><span data-i="cf3">Suppression des copies numériques après traitement.</span></li>
      <li><b>✓</b><span data-i="cf4">Originaux conservés au bureau, remis en main propre ou par envoi recommandé.</span></li>
    </ul>
  </div>
</section>

<section>
  <div class="wrap team rv">
    <div>
      <div class="eb" data-i="tmEb">L'équipe</div>
      <h2 data-i="tmH">Derrière chaque dossier, une équipe.</h2>
      <p data-i="tmP">Les technologies nous permettent d'aller plus vite. Nos experts restent au cœur de chaque dossier : ce sont eux qui vérifient, qui déposent et qui répondent au téléphone.</p>
    </div>
    <div class="team-photo">
      <img src="/assets/img/photos/hero-avenue-louise.jpg" alt="Le bureau Travisum, 367 avenue Louise à Bruxelles" loading="lazy" />
    </div>
  </div>
</section>

<section class="tint">
  <div class="wrap rv">
    <div class="gg">
      <div>
        <div class="eb" data-i="ggEb">Avis clients</div>
        <h2 data-i="ggH">Notre fiche Google est déjà là. Le site va enfin s'y connecter.</h2>
        <p data-i="ggP">Les avis publiés sur la fiche Google Business Profile de Travisum Louise Office s'afficheront ici automatiquement, avec la note et le nombre d'avis réels. Aucun témoignage ne sera rédigé.</p>
        <a class="btn btn-out-d" href="https://maps.app.goo.gl/avsW7i5xRo2qmt2s5" target="_blank" rel="noopener noreferrer"><span data-i="ggBtn">Voir la fiche Google</span><span class="ar">→</span></a>
      </div>
      <div class="ggbox">
        <b data-i="ggNum">4,5 M</b>
        <span data-i="ggLab">vues cumulées sur la fiche Google Local Guide du bureau</span>
      </div>
    </div>
  </div>
</section>

<section class="dark final">
  <div class="wrap rv">
    <div class="rule"></div>
    <h2 data-i="fH">Vous ne savez pas par où commencer ?</h2>
    <p data-i="fP">Expliquez-nous votre situation. Nous vous indiquons la prochaine étape.</p>
    <div class="cta">
      <a href="#hero" class="btn btn-p"><span data-i="fC1">Commencer avec l'assistant</span><span class="ar">→</span></a>
      <a href="tel:026420025" class="btn btn-out"><span data-i="fC2">02 642 00 25</span></a>
    </div>
  </div>
</section>

<div class="mapwrap" id="carte">
  <div class="wrap head">
    <div class="eb" data-i="mapEb">Nous trouver</div>
    <h2 class="sec-h" style="margin-bottom:0" data-i="mapH">367, avenue Louise · 1050 Bruxelles.</h2>
  </div>
  <iframe class="mapfull" title="Plan — 367 avenue Louise, 1050 Bruxelles" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Travisum%20Louise%20Office%2C%20367%20Avenue%20Louise%2C%201050%20Bruxelles&z=16&hl=fr&output=embed"></iframe>
</div>

<footer>
  <div class="wrap">
    <div class="fgrid">
      <div class="fcol fbrand">
        <a href="/" class="logo">TRAVISUM<i></i></a>
        <p>367, avenue Louise</p>
        <p data-i="fAddr">1050 Bruxelles, Belgique</p>
        <p class="hi">02 642 00 25</p>
        <p class="hi">info@travisum.com</p>
        <p class="bce" data-i="fBce">Numéro d'entreprise (BCE) : [à compléter]</p>
      </div>
      <div class="fcol"><h4 data-i="fS">Services</h4>
        <a href="/visas/" data-i="nav1">Visa</a><a href="/e-visa/" data-i="navEvisa">e-Visa</a><a href="/traductions/" data-i="nav2">Traduction</a><a href="/legalisations/" data-i="nav3">Légalisation</a></div>
      <div class="fcol"><h4>Travisum</h4>
        <a href="/a-propos/" data-i="nav5">À propos</a><a href="#steps" data-i="nav4">Comment ça marche</a><a href="/contact/" data-i="fCt">Contact</a><a href="/ressources/#faq">FAQ</a></div>
      <div class="fcol"><h4 data-i="fL">Informations légales</h4>
        <a href="/mentions-legales/" data-i="fL1">Mentions légales</a><a href="/confidentialite/" data-i="fL2">Politique de confidentialité</a><a href="/cgv/" data-i="fL3">Conditions générales</a><a href="/cookies/" data-i="fL4">Cookies</a></div>
      <div class="fcol"><h4 data-i="fH2">Horaires</h4>
        <p data-i="fHr">Du lundi au vendredi<br>9h00 – 17h00, sans interruption</p></div>
    </div>
    <div class="fbot">
      <span data-i="fCp">© 2026 Travisum. Tous droits réservés.</span>
      <span data-i="fDis">Travisum n'est pas une autorité consulaire. Les informations fournies sont indicatives.</span>
    </div>
  </div>
</footer>

<nav class="mbar">
  <a href="#hero" class="m1" data-i="mb1">Assistant</a>
  <a href="/contact/" class="m2" data-i="mb2">Devis</a>
  <a href="tel:026420025" class="m3" data-i="mb3">Appeler</a>
</nav>
`;

const DEST: [string, string, string][] = [
  ["Inde", "e-Visa", "inde"], ["Russie", "Visa", "russie"], ["Chine", "Visa", "chine"], ["Congo RD", "Visa", "republique-democratique-du-congo"], ["Égypte", "Visa", "egypte"],
  ["Arabie Saoudite", "e-Visa", "arabie-saoudite"], ["Cameroun", "Visa", "cameroun"], ["Bénin", "e-Visa", "benin"], ["Burkina Faso", "Visa", "burkina-faso"], ["Angola", "Visa", "angola"], ["Éthiopie", "e-Visa", "ethiopie"],
];
const LANGS = ["Néerlandais", "Anglais", "Arabe", "Espagnol", "Mandarin", "Russe", "Portugais", "Italien", "Allemand", "Polonais", "Roumain", "Turc", "Persan", "Ukrainien", "Swahili", "Lingala", "Wolof", "Albanais", "Hébreu", "Japonais"];

const T: Record<string, any> = {
  fr: { nav1: "Visa", nav2: "Traduction", nav3: "Légalisation", nav4: "Comment ça marche", nav5: "À propos", nav6: "Tarifs", navcta: "Obtenir un devis",
    heroEb: "Bruxelles · Démarches internationales", h1a: "Vos démarches internationales,", h1b: "sans les complications.",
    heroSub: "Visa, traduction et légalisation de documents. Décrivez votre situation en une phrase : l'assistant identifie la démarche, nos experts la vérifient.",
    heroC1: "Demander un devis", heroC2: "Parler à un conseiller",
    heroPriv: "Vos documents sont traités de façon confidentielle, consultés uniquement par l'équipe en charge du dossier, et les copies sont supprimées après traitement.",
    acH: "De quoi avez-vous besoin ?", acP: "Décrivez simplement votre situation. Nous vous indiquons la démarche et les documents nécessaires.",
    acPh: "Ex. Je pars au Congo pour travailler pendant 2 mois...", acBtn: "Commencer", restart: "↻ Recommencer",
    factH: "Un accompagnement humain, renforcé par la technologie.",
    f1k: "80+", f1h: "langues traitées", f1p: "Traductions libres et assermentées.",
    f2k: "45", f2h: "destinations visa", f2p: "Tourisme, affaires, études, transit.",
    f3h: "sans interruption", f3p: "Du lundi au vendredi, dépôt et retrait.",
    f4k: "Louise", f4h: "bureau à Bruxelles", f4p: "367 avenue Louise, 1050 Bruxelles.",
    svEb: "Nos services", svH: "Une seule équipe pour toutes vos démarches.",
    s1h: "Visa", s1p: "Visa touristique, affaires, études et transit. Constitution du dossier, rendez-vous consulaire, dépôt et récupération.", s1a: "Découvrir les visas",
    s2h: "Traduction", s2p: "Traductions libres et assermentées, reconnues par les administrations belges et étrangères.", s2a: "Voir les tarifs",
    s3h: "Légalisation", s3p: "Apostille, légalisation et dépôts auprès du SPF Justice, des Affaires étrangères, des tribunaux et des ambassades.", s3a: "Comprendre la procédure",
    navContact: "Contact", navEvisa: "e-Visa",
    prEb: "Délais & prestations", prH: "Nos prestations et délais, en toute clarté.",
    prC1: "Formule", prC2: "Délai", prC3: "Tarif indicatif", prC4: "Ce qui est compris",
    prNote: "Les frais officiels reversés aux administrations et aux consulats sont facturés séparément, au montant exact et sur justificatif. Montants à confirmer avec vous avant mise en ligne.",
    stEb: "Le déroulement", stH: "Simple. Clair. Accompagné.",
    p1h: "Vous expliquez votre situation", p1p: "En quelques phrases, à l'assistant ou à un conseiller.",
    p2h: "Nous vérifions les démarches nécessaires", p2p: "Type de dossier, documents, délais, autorité compétente.",
    p3h: "Vous transmettez vos documents", p3p: "En ligne ou à notre bureau de l'avenue Louise.",
    p4h: "Nous vous accompagnons jusqu'à la finalisation", p4p: "Dépôt, suivi et remise du dossier ou du passeport.",
    dsEb: "Destinations et langues", dsH: "Chaque destination et chaque langue a sa page.",
    dsSub1: "Destinations les plus demandées", dsSub2: "Langues de traduction", dsMore: "Voir les 80 langues →", dsMoreD: "Voir les 45 destinations →",
    cfEb: "Confidentialité", cfH: "Vous nous confiez des originaux. Nous le prenons au sérieux.",
    cfP: "Passeports, actes de naissance, diplômes : ce sont des documents que l'on ne confie pas à la légère.",
    cf1: "Documents traités de manière confidentielle par notre équipe.", cf2: "Accès limité à l'équipe en charge de votre dossier.",
    cf3: "Suppression des copies numériques après traitement.", cf4: "Originaux conservés au bureau, remis en main propre ou par envoi recommandé.",
    tmEb: "L'équipe", tmH: "Derrière chaque dossier, une équipe.",
    tmP: "Les technologies nous permettent d'aller plus vite. Nos experts restent au cœur de chaque dossier : ce sont eux qui vérifient, qui déposent et qui répondent au téléphone.",
    phH: "Photo de l'équipe Travisum à intégrer", phP: "Photo professionnelle réelle, prise au bureau de l'avenue Louise. Format recommandé : 1600 × 1000 px.",
    ggEb: "Avis clients", ggH: "Notre fiche Google est déjà là. Le site va enfin s'y connecter.",
    ggP: "Les avis publiés sur la fiche Google Business Profile de Travisum Louise Office s'afficheront ici automatiquement, avec la note et le nombre d'avis réels. Aucun témoignage ne sera rédigé.",
    ggBtn: "Voir la fiche Google", ggNum: "4,5 M", ggLab: "vues cumulées sur la fiche Google Local Guide du bureau",
    fH: "Vous ne savez pas par où commencer ?", fP: "Expliquez-nous votre situation. Nous vous indiquons la prochaine étape.",
    fC1: "Commencer avec l'assistant", fC2: "02 642 00 25",
    fAddr: "1050 Bruxelles, Belgique", fBce: "Numéro d'entreprise (BCE) : [à compléter]", fS: "Services", fCt: "Contact",
    fL: "Informations légales", fL1: "Mentions légales", fL2: "Politique de confidentialité", fL3: "Conditions générales", fL4: "Cookies",
    fH2: "Horaires", fHr: "Du lundi au vendredi<br>9h00 – 17h00, sans interruption",
    fCp: "© 2026 Travisum. Tous droits réservés.", fDis: "Travisum n'est pas une autorité consulaire. Les informations fournies sont indicatives.",
    mb1: "Assistant", mb2: "Devis", mb3: "Appeler",
    prices: [
      [["Traduction assermentée (jurée)", "Selon le volume", "Sur devis", "Traduction, relecture et cachet du traducteur juré"],
       ["Traduction libre", "Selon le volume", "Sur devis", "Traduction professionnelle, sans cachet"]],
      [["Apostille", "1 à 2 semaines", "[montant] € / document", "Dépôt et récupération auprès de l'instance compétente"],
       ["Légalisation complète", "2 à 4 semaines", "[montant] € / document", "Chaîne complète jusqu'à l'ambassade concernée"],
       ["Passage en ambassade", "Selon le consulat", "[montant] € / document", "Prise de rendez-vous, dépôt et suivi"]],
      [["Visa touristique", "2 à 3 semaines", "[montant] € + frais consulaires", "Constitution du dossier, dépôt, récupération"],
       ["Visa affaires", "2 à 3 semaines", "[montant] € + frais consulaires", "Vérification de la lettre d'invitation incluse"],
       ["e-Visa", "1 à 2 semaines", "[montant] €", "Saisie, vérification et suivi de la demande"]]],
    sc: [
      { chip: "Je pars en Inde dans trois semaines…",
        msgs: [["u", "Je vais en Inde pour 15 jours de vacances."], ["a", "Très bien. Quelle est votre nationalité ?"], ["u", "Belge"], ["a", "Et quand prévoyez-vous de partir ?"], ["u", "Dans trois semaines"]],
        lab: "Démarche identifiée", h: "e-Visa touristique pour l'Inde.",
        li: ["Délai indicatif : 3 à 5 jours ouvrés", "6 documents à préparer", "Frais consulaires facturés séparément"],
        disc: "Informations indicatives — les exigences consulaires peuvent évoluer. Votre dossier sera vérifié par un expert Travisum avant tout dépôt.",
        btn: "Faire vérifier mon dossier" },
      { chip: "Je dois faire traduire mon acte de naissance…",
        msgs: [["u", "Je dois faire traduire mon acte de naissance."], ["a", "Pour quelle administration ou quel pays ?"], ["u", "Pour un mariage en Belgique"], ["a", "Dans quelle langue est le document d'origine ?"], ["u", "En arabe"]],
        lab: "Démarche identifiée", h: "Traduction assermentée arabe → français.",
        li: ["Délai standard : 3 à 5 jours ouvrés", "Cachet du traducteur juré inclus", "Légalisation possible en complément"],
        disc: "Informations indicatives — le service de l'état civil peut exiger une légalisation supplémentaire. Nous le vérifions avec vous.",
        btn: "Demander mon devis" },
      { chip: "Je dois légaliser mon diplôme…",
        msgs: [["u", "Je dois légaliser mon diplôme."], ["a", "Pour quel pays de destination ?"], ["u", "Pour le Canada"], ["a", "Le diplôme a-t-il déjà été traduit ?"], ["u", "Non, pas encore"]],
        lab: "Démarche identifiée", h: "Apostille de La Haye + traduction assermentée.",
        li: ["Le Canada accepte l'apostille depuis 2024", "Traduction à réaliser avant l'apostille", "Délai indicatif : 5 à 8 jours ouvrés"],
        disc: "Informations indicatives — l'ordre des étapes conditionne la validité du document. Un expert Travisum confirme la procédure avant traitement.",
        btn: "Lancer ma démarche" }] },

  en: { nav1: "Visas", nav2: "Translation", nav3: "Legalisation", nav4: "How it works", nav5: "About", nav6: "Pricing", navcta: "Get a quote",
    heroEb: "Brussels · International formalities", h1a: "Your international paperwork,", h1b: "without the complications.",
    heroSub: "Visas, document translation and legalisation. Describe your situation in one sentence: the assistant identifies the procedure, our experts verify it.",
    heroC1: "Get a quote", heroC2: "Speak to an adviser",
    heroPriv: "Your documents are handled confidentially, seen only by the team handling your file, and copies are deleted after processing.",
    acH: "What do you need?", acP: "Describe your situation in plain words. We tell you which procedure applies and which documents you need.",
    acPh: "E.g. I'm going to Congo to work for two months...", acBtn: "Start", restart: "↻ Start over",
    factH: "Human guidance, backed by technology.",
    f1k: "80+", f1h: "languages handled", f1p: "Standard and sworn translations.",
    f2k: "45", f2h: "visa destinations", f2p: "Tourism, business, study, transit.",
    f3h: "no lunch break", f3p: "Monday to Friday, drop-off and collection.",
    f4k: "Louise", f4h: "office in Brussels", f4p: "367 avenue Louise, 1050 Brussels.",
    svEb: "Our services", svH: "One team for every formality.",
    s1h: "Visas", s1p: "Tourist, business, study and transit visas. File preparation, consular appointment, submission and collection.", s1a: "Explore visas",
    s2h: "Translation", s2p: "Standard and sworn translations, accepted by Belgian and foreign authorities.", s2a: "See pricing",
    s3h: "Legalisation", s3p: "Apostille, legalisation and submissions to the FPS Justice, Foreign Affairs, courts and embassies.", s3a: "Understand the process",
    navContact: "Contact", navEvisa: "e-Visa",
    prEb: "Timelines & services", prH: "Our services and timelines, clearly.",
    prC1: "Option", prC2: "Timeline", prC3: "Indicative price", prC4: "What's included",
    prNote: "Official fees paid to authorities and consulates are billed separately, at cost and against receipt. Amounts to be confirmed with you before going live.",
    stEb: "The process", stH: "Simple. Clear. Guided.",
    p1h: "You explain your situation", p1p: "In a few sentences, to the assistant or an adviser.",
    p2h: "We identify the required steps", p2p: "File type, documents, timelines, competent authority.",
    p3h: "You send your documents", p3p: "Online or at our avenue Louise office.",
    p4h: "We stay with you to completion", p4p: "Submission, follow-up and return of the file or passport.",
    dsEb: "Destinations and languages", dsH: "Every destination and every language has its own page.",
    dsSub1: "Most requested destinations", dsSub2: "Translation languages", dsMore: "See all 80 languages →", dsMoreD: "See all 45 destinations →",
    cfEb: "Confidentiality", cfH: "You hand us originals. We treat that seriously.",
    cfP: "Passports, birth certificates, diplomas: these are not documents you hand over lightly.",
    cf1: "Documents handled confidentially by our team.", cf2: "Access limited to the team handling your file.",
    cf3: "Digital copies deleted after processing.", cf4: "Originals kept at the office, returned in person or by registered post.",
    tmEb: "The team", tmH: "Behind every file, a team.",
    tmP: "Technology lets us move faster. Our experts remain at the heart of every file: they check, they submit, and they answer the phone.",
    phH: "Travisum team photo to be added", phP: "Real professional photograph, taken at the avenue Louise office. Recommended format: 1600 × 1000 px.",
    ggEb: "Client reviews", ggH: "Our Google profile already exists. The site will finally connect to it.",
    ggP: "Reviews published on the Google Business Profile of Travisum Louise Office will appear here automatically, with the real rating and review count. No testimonial will be written.",
    ggBtn: "View the Google profile", ggNum: "4.5 M", ggLab: "cumulative views on the office's Google Local Guide profile",
    fH: "Not sure where to start?", fP: "Just tell us your situation. We'll tell you the next step.",
    fC1: "Start with the assistant", fC2: "+32 2 642 00 25",
    fAddr: "1050 Brussels, Belgium", fBce: "Company number (BCE): [to be completed]", fS: "Services", fCt: "Contact",
    fL: "Legal information", fL1: "Legal notice", fL2: "Privacy policy", fL3: "Terms and conditions", fL4: "Cookies",
    fH2: "Opening hours", fHr: "Monday to Friday<br>9:00 – 17:00, no lunch break",
    fCp: "© 2026 Travisum. All rights reserved.", fDis: "Travisum is not a consular authority. The information provided is indicative.",
    mb1: "Assistant", mb2: "Quote", mb3: "Call",
    prices: [
      [["Sworn translation", "Depends on length", "On quote", "Translation, proofreading and sworn translator's stamp"],
       ["Standard translation", "Depends on length", "On quote", "Professional translation, no stamp"]],
      [["Apostille", "1 to 2 weeks", "[amount] € / document", "Submission and collection at the competent authority"],
       ["Full legalisation", "2 to 4 weeks", "[amount] € / document", "Full chain up to the relevant embassy"],
       ["Embassy submission", "Depends on consulate", "[amount] € / document", "Appointment booking, submission and follow-up"]],
      [["Tourist visa", "2 to 3 weeks", "[amount] € + consular fees", "File preparation, submission, collection"],
       ["Business visa", "2 to 3 weeks", "[amount] € + consular fees", "Invitation letter check included"],
       ["e-Visa", "1 to 2 weeks", "[amount] €", "Filing, verification and follow-up"]]],
    sc: [
      { chip: "I'm travelling to India in three weeks…",
        msgs: [["u", "I'm going to India for 15 days on holiday."], ["a", "Good. What is your nationality?"], ["u", "Belgian"], ["a", "And when do you plan to travel?"], ["u", "In three weeks"]],
        lab: "Procedure identified", h: "Tourist e-Visa for India.",
        li: ["Indicative timeline: 3 to 5 working days", "6 documents to prepare", "Consular fees billed separately"],
        disc: "Indicative information — consular requirements may change. Your file will be checked by a Travisum expert before any submission.",
        btn: "Have my file checked" },
      { chip: "I need my birth certificate translated…",
        msgs: [["u", "I need my birth certificate translated."], ["a", "For which authority or country?"], ["u", "For a marriage in Belgium"], ["a", "What language is the original document in?"], ["u", "Arabic"]],
        lab: "Procedure identified", h: "Sworn translation, Arabic → French.",
        li: ["Standard timeline: 3 to 5 working days", "Sworn translator's stamp included", "Legalisation available as an add-on"],
        disc: "Indicative information — the civil registry may require additional legalisation. We check that with you.",
        btn: "Request my quote" },
      { chip: "I need my diploma legalised…",
        msgs: [["u", "I need my diploma legalised."], ["a", "For which destination country?"], ["u", "For Canada"], ["a", "Has the diploma already been translated?"], ["u", "Not yet"]],
        lab: "Procedure identified", h: "Hague apostille + sworn translation.",
        li: ["Canada has accepted the apostille since 2024", "Translation must come before the apostille", "Indicative timeline: 5 to 8 working days"],
        disc: "Indicative information — the order of steps determines the document's validity. A Travisum expert confirms the procedure before processing.",
        btn: "Start my procedure" }] },

  nl: { nav1: "Visum", nav2: "Vertaling", nav3: "Legalisatie", nav4: "Hoe het werkt", nav5: "Over ons", nav6: "Tarieven", navcta: "Offerte aanvragen",
    heroEb: "Brussel · Internationale formaliteiten", h1a: "Uw internationale formaliteiten,", h1b: "zonder de rompslomp.",
    heroSub: "Visa, vertaling en legalisatie van documenten. Beschrijf uw situatie in één zin: de assistent bepaalt de procedure, onze experts controleren ze.",
    heroC1: "Offerte aanvragen", heroC2: "Een adviseur spreken",
    heroPriv: "Uw documenten worden vertrouwelijk behandeld, enkel ingekeken door het team dat uw dossier behandelt, en de kopieën worden na behandeling verwijderd.",
    acH: "Wat heeft u nodig?", acP: "Beschrijf uw situatie in gewone woorden. Wij vertellen u welke procedure geldt en welke documenten u nodig heeft.",
    acPh: "Bv. Ik ga twee maanden in Congo werken...", acBtn: "Beginnen", restart: "↻ Opnieuw beginnen",
    factH: "Menselijke begeleiding, versterkt door technologie.",
    f1k: "80+", f1h: "talen behandeld", f1p: "Vrije en beëdigde vertalingen.",
    f2k: "45", f2h: "visumbestemmingen", f2p: "Toerisme, zaken, studie, transit.",
    f3h: "doorlopend", f3p: "Van maandag tot vrijdag, afgifte en afhaling.",
    f4k: "Louiza", f4h: "kantoor in Brussel", f4p: "Louizalaan 367, 1050 Brussel.",
    svEb: "Onze diensten", svH: "Eén team voor al uw formaliteiten.",
    s1h: "Visum", s1p: "Toeristen-, zaken-, studie- en transitvisa. Samenstelling van het dossier, consulaire afspraak, indiening en afhaling.", s1a: "Visa ontdekken",
    s2h: "Vertaling", s2p: "Vrije en beëdigde vertalingen, erkend door Belgische en buitenlandse administraties.", s2a: "Tarieven bekijken",
    s3h: "Legalisatie", s3p: "Apostille, legalisatie en indiening bij FOD Justitie, Buitenlandse Zaken, rechtbanken en ambassades.", s3a: "De procedure begrijpen",
    navContact: "Contact", navEvisa: "e-Visum",
    prEb: "Termijnen & diensten", prH: "Onze diensten en termijnen, helder.",
    prC1: "Formule", prC2: "Termijn", prC3: "Indicatief tarief", prC4: "Wat is inbegrepen",
    prNote: "Officiële kosten voor administraties en consulaten worden apart gefactureerd, tegen het exacte bedrag en op voorlegging van bewijs. Bedragen te bevestigen vóór publicatie.",
    stEb: "Het verloop", stH: "Eenvoudig. Duidelijk. Begeleid.",
    p1h: "U legt uw situatie uit", p1p: "In enkele zinnen, aan de assistent of aan een adviseur.",
    p2h: "Wij bepalen de nodige stappen", p2p: "Type dossier, documenten, termijnen, bevoegde instantie.",
    p3h: "U bezorgt ons uw documenten", p3p: "Online of op ons kantoor aan de Louizalaan.",
    p4h: "Wij begeleiden u tot de afronding", p4p: "Indiening, opvolging en afgifte van het dossier of paspoort.",
    dsEb: "Bestemmingen en talen", dsH: "Elke bestemming en elke taal heeft haar eigen pagina.",
    dsSub1: "Meest gevraagde bestemmingen", dsSub2: "Vertaaltalen", dsMore: "Alle 80 talen bekijken →", dsMoreD: "Alle 45 bestemmingen bekijken →",
    cfEb: "Vertrouwelijkheid", cfH: "U vertrouwt ons originelen toe. Dat nemen wij ernstig.",
    cfP: "Paspoorten, geboorteakten, diploma's: dat zijn documenten die men niet zomaar afgeeft.",
    cf1: "Documenten die vertrouwelijk door ons team worden behandeld.", cf2: "Toegang beperkt tot het team dat uw dossier behandelt.",
    cf3: "Digitale kopieën worden na behandeling verwijderd.", cf4: "Originelen bewaard op kantoor, persoonlijk overhandigd of aangetekend verzonden.",
    tmEb: "Het team", tmH: "Achter elk dossier staat een team.",
    tmP: "Technologie laat ons sneller werken. Onze experts blijven de kern van elk dossier: zij controleren, zij dienen in en zij nemen de telefoon op.",
    phH: "Foto van het Travisum-team toe te voegen", phP: "Echte professionele foto, genomen op het kantoor aan de Louizalaan. Aanbevolen formaat: 1600 × 1000 px.",
    ggEb: "Klantbeoordelingen", ggH: "Onze Google-pagina bestaat al. De website gaat er eindelijk mee verbinden.",
    ggP: "De beoordelingen op het Google Business Profile van Travisum Louise Office verschijnen hier automatisch, met de echte score en het echte aantal. Er wordt geen enkele getuigenis geschreven.",
    ggBtn: "De Google-pagina bekijken", ggNum: "4,5 mln", ggLab: "gecumuleerde weergaven op de Google Local Guide-pagina van het kantoor",
    fH: "Weet u niet waar te beginnen?", fP: "Leg ons uw situatie uit. Wij vertellen u de volgende stap.",
    fC1: "Beginnen met de assistent", fC2: "02 642 00 25",
    fAddr: "1050 Brussel, België", fBce: "Ondernemingsnummer (KBO): [aan te vullen]", fS: "Diensten", fCt: "Contact",
    fL: "Juridische informatie", fL1: "Wettelijke vermeldingen", fL2: "Privacybeleid", fL3: "Algemene voorwaarden", fL4: "Cookies",
    fH2: "Openingsuren", fHr: "Van maandag tot vrijdag<br>9u00 – 17u00, doorlopend",
    fCp: "© 2026 Travisum. Alle rechten voorbehouden.", fDis: "Travisum is geen consulaire overheid. De verstrekte informatie is indicatief.",
    mb1: "Assistent", mb2: "Offerte", mb3: "Bellen",
    prices: [
      [["Beëdigde vertaling", "Afhankelijk van de omvang", "Op offerte", "Vertaling, nalezing en stempel van de beëdigd vertaler"],
       ["Vrije vertaling", "Afhankelijk van de omvang", "Op offerte", "Professionele vertaling, zonder stempel"]],
      [["Apostille", "1 tot 2 weken", "[bedrag] € / document", "Indiening en afhaling bij de bevoegde instantie"],
       ["Volledige legalisatie", "2 tot 4 weken", "[bedrag] € / document", "Volledige keten tot bij de betrokken ambassade"],
       ["Indiening bij ambassade", "Volgens het consulaat", "[bedrag] € / document", "Afspraak, indiening en opvolging"]],
      [["Toeristenvisum", "2 tot 3 weken", "[bedrag] € + consulaire kosten", "Samenstelling dossier, indiening, afhaling"],
       ["Zakenvisum", "2 tot 3 weken", "[bedrag] € + consulaire kosten", "Controle van de uitnodigingsbrief inbegrepen"],
       ["e-Visum", "1 tot 2 weken", "[bedrag] €", "Invoer, controle en opvolging van de aanvraag"]]],
    sc: [
      { chip: "Ik vertrek over drie weken naar India…",
        msgs: [["u", "Ik ga 15 dagen op vakantie naar India."], ["a", "Goed. Wat is uw nationaliteit?"], ["u", "Belg"], ["a", "En wanneer wilt u vertrekken?"], ["u", "Over drie weken"]],
        lab: "Procedure geïdentificeerd", h: "Toeristisch e-visum voor India.",
        li: ["Indicatieve termijn: 3 tot 5 werkdagen", "6 voor te bereiden documenten", "Consulaire kosten apart gefactureerd"],
        disc: "Indicatieve informatie — de consulaire vereisten kunnen wijzigen. Uw dossier wordt door een Travisum-expert gecontroleerd vóór elke indiening.",
        btn: "Mijn dossier laten controleren" },
      { chip: "Ik moet mijn geboorteakte laten vertalen…",
        msgs: [["u", "Ik moet mijn geboorteakte laten vertalen."], ["a", "Voor welke administratie of welk land?"], ["u", "Voor een huwelijk in België"], ["a", "In welke taal is het originele document?"], ["u", "In het Arabisch"]],
        lab: "Procedure geïdentificeerd", h: "Beëdigde vertaling Arabisch → Frans.",
        li: ["Standaardtermijn: 3 tot 5 werkdagen", "Stempel van de beëdigd vertaler inbegrepen", "Legalisatie mogelijk als aanvulling"],
        disc: "Indicatieve informatie — de burgerlijke stand kan een bijkomende legalisatie eisen. Wij controleren dat samen met u.",
        btn: "Mijn offerte aanvragen" },
      { chip: "Ik moet mijn diploma laten legaliseren…",
        msgs: [["u", "Ik moet mijn diploma laten legaliseren."], ["a", "Voor welk bestemmingsland?"], ["u", "Voor Canada"], ["a", "Is het diploma al vertaald?"], ["u", "Nog niet"]],
        lab: "Procedure geïdentificeerd", h: "Haagse apostille + beëdigde vertaling.",
        li: ["Canada aanvaardt de apostille sinds 2024", "Vertaling moet vóór de apostille gebeuren", "Indicatieve termijn: 5 tot 8 werkdagen"],
        disc: "Indicatieve informatie — de volgorde van de stappen bepaalt de geldigheid van het document. Een Travisum-expert bevestigt de procedure vóór behandeling.",
        btn: "Mijn procedure starten" }] },
};


// ---- Vraies donnees injectees (compteurs, tarifs, notes) ----
for (const l of ["fr", "en", "nl"]) { T[l].f1k = "82"; T[l].f2k = "70"; }
T.fr.dsMore = "Voir les 82 langues →"; T.en.dsMore = "See all 82 languages →"; T.nl.dsMore = "Alle 82 talen bekijken →";
T.fr.mapEb = "Nous trouver"; T.en.mapEb = "Find us"; T.nl.mapEb = "Ons vinden";
T.fr.mapH = "367, avenue Louise · 1050 Bruxelles."; T.en.mapH = "367 avenue Louise · 1050 Brussels."; T.nl.mapH = "Louizalaan 367 · 1050 Brussel.";

T.fr.prNote = "Les traductions sont établies sur devis, selon le nombre de caractères et la technicité du document. Pour la légalisation et les visas, les frais officiels des administrations et consulats sont refacturés à l’euro près, sur justificatif. Envoyez un scan pour un devis ferme et gratuit.";
T.en.prNote = "Translations are quoted individually, based on the number of characters and the document’s complexity. For legalisation and visas, official fees charged by authorities and consulates are billed at cost, against receipt. Send a scan for a firm, free quote.";
T.nl.prNote = "Vertalingen worden op offerte bepaald, op basis van het aantal tekens en de complexiteit van het document. Voor legalisatie en visa worden de officiële kosten van administraties en consulaten tegen kostprijs doorgerekend, op voorlegging van bewijs. Stuur een scan voor een vaste en gratis offerte.";

T.fr.prices = [
  [["Traduction assermentée (jurée)", "Selon le volume", "Sur devis", "Traduction, relecture et cachet du traducteur juré"],
   ["Traduction libre", "Selon le volume", "Sur devis", "Traduction professionnelle soignée, sans cachet"]],
  [["Tribunal de première instance", "1 à 2 semaines", "Sur devis", "Honoraires ; frais officiels refacturés en sus"],
   ["SPF Justice / Apostille", "1 à 2 semaines", "Sur devis", "Dépôt et récupération pour vous"],
   ["Chaîne consulaire complète", "2 à 4 semaines", "Sur devis", "Jusqu’à l’ambassade concernée"]],
  [["Inde — e-Visa", "1 à 2 semaines", "Sur devis", "Dossier, dépôt, suivi (hors frais consulaires)"],
   ["Chine — visa / e-visa", "2 à 3 semaines", "Sur devis", "Dossier, dépôt, suivi (hors frais consulaires)"],
   ["Russie — visa consulaire", "2 à 3 semaines", "Sur devis", "Dossier, dépôt, suivi (hors frais consulaires)"]]];

T.en.prices = [
  [["Sworn translation", "Depends on length", "On quote", "Translation, proofreading and sworn translator’s stamp"],
   ["Standard translation", "Depends on length", "On quote", "Careful professional translation, no stamp"]],
  [["Court of First Instance", "1 to 2 weeks", "On quote", "Fee; official charges billed on top"],
   ["FPS Justice / Apostille", "1 to 2 weeks", "On quote", "Submission and collection for you"],
   ["Full consular chain", "2 to 4 weeks", "On quote", "Up to the relevant embassy"]],
  [["India — e-Visa", "1 to 2 weeks", "On quote", "File, submission, follow-up (excl. consular fees)"],
   ["China — visa / e-visa", "2 to 3 weeks", "On quote", "File, submission, follow-up (excl. consular fees)"],
   ["Russia — consular visa", "2 to 3 weeks", "On quote", "File, submission, follow-up (excl. consular fees)"]]];

T.nl.prices = [
  [["Beëdigde vertaling", "Afhankelijk van de omvang", "Op offerte", "Vertaling, nalezing en stempel van de beëdigd vertaler"],
   ["Vrije vertaling", "Afhankelijk van de omvang", "Op offerte", "Zorgvuldige professionele vertaling, zonder stempel"]],
  [["Rechtbank van eerste aanleg", "1 tot 2 weken", "Op offerte", "Honoraria; officiële kosten bovenop"],
   ["FOD Justitie / Apostille", "1 tot 2 weken", "Op offerte", "Indiening en afhaling voor u"],
   ["Volledige consulaire keten", "2 tot 4 weken", "Op offerte", "Tot bij de betrokken ambassade"]],
  [["India — e-Visum", "1 tot 2 weken", "Op offerte", "Dossier, indiening, opvolging (excl. consulaire kosten)"],
   ["China — visum / e-visum", "2 tot 3 weken", "Op offerte", "Dossier, indiening, opvolging (excl. consulaire kosten)"],
   ["Rusland — consulair visum", "2 tot 3 weken", "Op offerte", "Dossier, indiening, opvolging (excl. consulaire kosten)"]]];


export default function AccueilV3({ initialLang = "fr" }: { initialLang?: Locale }) {
  useEffect(() => {
    let lang = "fr", tab = 0, timers: ReturnType<typeof setTimeout>[] = [];
    const $ = (s: string) => document.querySelector(s) as HTMLElement | null;
    const $$ = (s: string) => Array.from(document.querySelectorAll(s)) as HTMLElement[];

    // Réécrit les liens internes pour conserver la langue en changeant de page
    // (sinon on retombe sur la version FR à la racine). Idempotent.
    function relink(l: string) {
      const pre = l === "fr" ? "" : "/" + l;
      $$("a[href]").forEach((a) => {
        let h = a.getAttribute("href") || "";
        if (h[0] !== "/") return; // ignore #ancres, tel:, mailto:, http(s)://
        h = h.replace(/^\/(nl|en)(?=\/|$)/, ""); // retire un préfixe de langue existant
        if (h === "") h = "/";
        a.setAttribute("href", pre + h);
      });
    }

    function apply(l: string) {
      lang = l; const d = T[l];
      document.documentElement.lang = l;
      $$("[data-i]").forEach((el) => { const v = d[el.dataset.i as string]; if (v !== undefined) el.innerHTML = v; });
      $$("[data-ip]").forEach((el) => { const v = d[el.dataset.ip as string]; if (v !== undefined) (el as HTMLInputElement).placeholder = v; });
      $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.l === l)));
      renderChips(); renderPrices(); renderMaillage(); resetCard(); relink(l);
    }

    let messages: { role: string; content: string }[] = [];

    function renderChips() {
      const c = $("#chips"); if (!c) return; c.innerHTML = "";
      (T[lang].sc as any[]).forEach((s) => {
        const b = document.createElement("button"); b.className = "chip"; b.textContent = s.chip;
        b.onclick = () => demarrer(s.chip); c.appendChild(b);
      });
    }

    function resetCard() {
      timers.forEach(clearTimeout); timers = [];
      messages = [];
      const re = $("#re"); if (re) re.style.display = "none";
      const d = T[lang];
      const acbd = $("#acbd"); if (!acbd) return;
      acbd.innerHTML = `<h3>${d.acH}</h3><p class="lead">${d.acP}</p>
    <textarea id="ta" placeholder="${d.acPh}"></textarea>
    <div class="chips" id="chips"></div>
    <button class="btn btn-p go" id="go"><span>${d.acBtn}</span><span class="ar">→</span></button>`;
      renderChips();
      const ta = $("#ta") as HTMLTextAreaElement | null;
      const go = $("#go");
      const lancer = () => { const v = ta ? ta.value.trim() : ""; if (v) demarrer(v); };
      if (go) go.onclick = lancer;
      if (ta) ta.addEventListener("keydown", (e: KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); lancer(); } });
    }

    function demarrer(texte: string) {
      if (!texte) return;
      timers.forEach(clearTimeout); timers = [];
      messages = [];
      const re = $("#re"); if (re) re.style.display = "block";
      const acbd = $("#acbd"); if (!acbd) return;
      const d = T[lang];
      acbd.innerHTML = `<div class="conv" id="conv"></div>
    <form class="chatform" id="cf"><input id="cin" autocomplete="off" placeholder="${d.acPh}" /><button class="btn btn-p send" type="submit"><span class="ar">→</span></button></form>`;
      const cf = $("#cf"); const cin = $("#cin") as HTMLInputElement | null;
      if (cf) cf.addEventListener("submit", (e) => { e.preventDefault(); const v = cin ? cin.value.trim() : ""; if (v && cin) { cin.value = ""; envoyer(v); } });
      envoyer(texte);
    }

    function fmt(src: string): string {
      const inline = (x: string) => x
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/__([^_]+)__/g, "<strong>$1</strong>")
        .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\*/g, "");
      const lignes = src.replace(/\r/g, "").split("\n");
      let html = ""; let liste: "ul" | "ol" | null = null;
      const fermer = () => { if (liste) { html += "</" + liste + ">"; liste = null; } };
      for (const brute of lignes) {
        const l = brute.trimEnd();
        const puce = l.match(/^\s*[-*•]\s+(.*)$/);
        const num = l.match(/^\s*\d+[.)]\s+(.*)$/);
        if (puce) { if (liste !== "ul") { fermer(); html += "<ul>"; liste = "ul"; } html += "<li>" + inline(puce[1]) + "</li>"; }
        else if (num) { if (liste !== "ol") { fermer(); html += "<ol>"; liste = "ol"; } html += "<li>" + inline(num[1]) + "</li>"; }
        else if (!l.trim()) { fermer(); }
        else { fermer(); html += "<p>" + inline(l) + "</p>"; }
      }
      fermer();
      return html;
    }

    function bulle(w: string, t: string) {
      const conv = $("#conv"); if (!conv) return;
      const m = document.createElement("div"); m.className = "msg " + w;
      if (w === "a") m.innerHTML = fmt(t); else m.textContent = t;
      conv.appendChild(m); conv.scrollTop = conv.scrollHeight;
    }

    // Révèle la réponse mot à mot, comme quelqu'un qui écrit.
    function taper(texte: string): Promise<void> {
      return new Promise((resolve) => {
        const conv = $("#conv"); if (!conv) { resolve(); return; }
        const m = document.createElement("div"); m.className = "msg a typing"; conv.appendChild(m);
        const mots = texte.split(/(\s+)/);
        const pas = Math.max(8, Math.min(30, Math.round(1500 / Math.max(1, mots.length))));
        let i = 0, acc = "";
        const etape = () => {
          if (i >= mots.length) { m.classList.remove("typing"); m.innerHTML = fmt(texte); conv.scrollTop = conv.scrollHeight; resolve(); return; }
          acc += mots[i]; i += 1;
          m.innerHTML = fmt(acc);
          conv.scrollTop = conv.scrollHeight;
          const t = setTimeout(etape, pas); timers.push(t);
        };
        etape();
      });
    }

    async function envoyer(texte: string) {
      const conv = $("#conv"); if (!conv) return;
      messages.push({ role: "user", content: texte });
      bulle("u", texte);
      const cin = $("#cin") as HTMLInputElement | null; if (cin) cin.disabled = true;
      const ty = document.createElement("div"); ty.className = "typ"; ty.innerHTML = "<i></i><i></i><i></i>"; conv.appendChild(ty); conv.scrollTop = conv.scrollHeight;
      let reply = "";
      try {
        const r = await fetch("/api/chat/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages, lang }) });
        const data = await r.json().catch(() => ({} as any));
        reply = data && data.reply ? String(data.reply) : "";
      } catch { reply = ""; }
      ty.remove();
      if (!reply) reply = lang === "nl" ? "Verbinding mislukt. Bel 02 642 00 25 of mail info@travisum.com." : lang === "en" ? "Connection failed. Call +32 2 642 00 25 or email info@travisum.com." : "Connexion impossible. Appelez le 02 642 00 25 ou écrivez à info@travisum.com.";
      messages.push({ role: "assistant", content: reply });
      await taper(reply);
      if (cin) { cin.disabled = false; cin.focus(); }
    }

    function renderPrices() {
      const rows = T[lang].prices[tab];
      const ptb = $("#ptb"); if (!ptb) return;
      ptb.innerHTML = rows.map((r: string[]) => `<tr><td>${r[0]}</td><td>${r[1]}</td>
    <td><span class="pph">${r[2]}</span></td><td><span class="d">${r[3]}</span></td></tr>`).join("");
    }

    function renderMaillage() {
      const d = T[lang]; const pre = lang === "fr" ? "" : "/" + lang;
      const dg = $("#destgrid"); if (dg) dg.innerHTML = DEST.map(([n, t, slug]) => `<a class="dcard" href="${pre}/visas/${slug}/"><b>${n}</b><span>${t}</span></a>`).join("");
      const lg = $("#langgrid"); if (lg) lg.innerHTML = LANGS.map((l) => `<a class="lchip" href="${pre}/traductions/">${l}</a>`).join("") + `<a class="more-l" href="${pre}/traductions/">${d.dsMore}</a>`;
    }

    // interactions
    const onLang = (e: Event) => {
      const l = (e.currentTarget as HTMLElement).dataset.l as string;
      try { localStorage.setItem("travisum-lang", l); } catch { /* stockage indisponible */ }
      apply(l);
    };
    $$(".lang button").forEach((b) => b.addEventListener("click", onLang));
    const onTab = (e: Event) => { const b = e.currentTarget as HTMLElement; tab = +(b.dataset.t as string); $$(".tab").forEach((x) => x.setAttribute("aria-selected", String(x === b))); renderPrices(); };
    $$(".tab").forEach((b) => b.addEventListener("click", onTab));
    const reBtn = $("#re"); if (reBtn) reBtn.onclick = resetCard;

    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -40px" });
    $$(".rv").forEach((el) => io.observe(el));
    const hd = $("#hd");
    const onScroll = () => { if (hd) hd.classList.toggle("stuck", scrollY > 20); };
    addEventListener("scroll", onScroll, { passive: true });

    // Menu mobile : le burger ouvre/ferme le panneau ; un clic sur un lien le referme.
    // .onclick = (au lieu d'addEventListener) => idempotent, jamais de handler en double.
    const burger = $(".burger");
    if (burger && hd) (burger as HTMLElement).onclick = () => hd.classList.toggle("open");
    $$(".nav a.lk").forEach((a) => { (a as HTMLElement).onclick = () => { if (hd) hd.classList.remove("open"); }; });

    apply(initialLang);

    return () => {
      timers.forEach(clearTimeout);
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, [initialLang]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: BODY }} />
      <Chat lang={initialLang} />
    </>
  );
}
