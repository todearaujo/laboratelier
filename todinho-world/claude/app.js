/* ============================================================
   Todinho @ Mundo — app (3 desafios + i18n)
   Desafio 1: Idioma  → Ranking (posição mundial, só o número)
   Desafio 2: País    → Palavra "Todos" (no idioma do país)
   Desafio 3: País    → Apelido (revela a curiosidade no fim)
   Navegação POR FASES (stepper): completa um desafio p/ liberar
   o próximo. Estado persiste no localStorage (chave única →
   trocar de idioma mantém tudo).
   ------------------------------------------------------------
   Dados aproximados (Ethnologue). Traduções de "Todos" e
   curiosidades são pesquisa/aproximação — bloco editável.
   ============================================================ */
(() => {
  'use strict';

  /* -------------------- DADOS -------------------- */
  const RANKINGS = {
    en: { num: 1,  label: '#1',  word: 'All',     idioma: { pt: 'Inglês',    en: 'English',    es: 'Inglés' },    falantes: { pt: '1,5 bilhão',  en: '1.5 billion', es: '1.500 millones' }, share: { pt: '19%',   en: '19%',   es: '19%' } },
    zh: { num: 2,  label: '#2',  word: '所有',    idioma: { pt: 'Mandarim',  en: 'Mandarin',   es: 'Mandarín' },  falantes: { pt: '1,1 bilhão',  en: '1.1 billion', es: '1.100 millones' }, share: { pt: '14%',   en: '14%',   es: '14%' } },
    hi: { num: 3,  label: '#3',  word: 'सभी',     idioma: { pt: 'Hindi',     en: 'Hindi',      es: 'Hindi' },     falantes: { pt: '610 milhões', en: '610 million', es: '610 millones' },   share: { pt: '7,5%',  en: '7.5%',  es: '7,5%' } },
    es: { num: 4,  label: '#4',  word: 'Todos',   idioma: { pt: 'Espanhol',  en: 'Spanish',    es: 'Español' },   falantes: { pt: '560 milhões', en: '560 million', es: '560 millones' },   share: { pt: '7%',    en: '7%',    es: '7%' } },
    ar: { num: 5,  label: '#5',  word: 'الجميع',  idioma: { pt: 'Árabe',     en: 'Arabic',     es: 'Árabe' },     falantes: { pt: '400 milhões', en: '400 million', es: '400 millones' },   share: { pt: '5%',    en: '5%',    es: '5%' } },
    fr: { num: 6,  label: '#6',  word: 'Tous',    idioma: { pt: 'Francês',   en: 'French',     es: 'Francés' },   falantes: { pt: '310 milhões', en: '310 million', es: '310 millones' },   share: { pt: '4%',    en: '4%',    es: '4%' } },
    pt: { num: 8,  label: '#8',  word: 'Todos',   idioma: { pt: 'Português', en: 'Portuguese', es: 'Portugués' }, falantes: { pt: '260 milhões', en: '260 million', es: '260 millones' },   share: { pt: '3,3%',  en: '3.3%',  es: '3,3%' } },
    ru: { num: 9,  label: '#9',  word: 'Все',     idioma: { pt: 'Russo',     en: 'Russian',    es: 'Ruso' },      falantes: { pt: '255 milhões', en: '255 million', es: '255 millones' },   share: { pt: '3,2%',  en: '3.2%',  es: '3,2%' } },
    de: { num: 12, label: '#12', word: 'Alle',    idioma: { pt: 'Alemão',    en: 'German',     es: 'Alemán' },    falantes: { pt: '135 milhões', en: '135 million', es: '135 millones' },   share: { pt: '1,7%',  en: '1.7%',  es: '1,7%' } },
    ja: { num: 13, label: '#13', word: 'みんな',  idioma: { pt: 'Japonês',   en: 'Japanese',   es: 'Japonés' },   falantes: { pt: '126 milhões', en: '126 million', es: '126 millones' },   share: { pt: '1,5%',  en: '1.5%',  es: '1,5%' } },
    it: { num: 29, label: '#29', word: 'Tutti',   idioma: { pt: 'Italiano',  en: 'Italian',    es: 'Italiano' },  falantes: { pt: '66 milhões',  en: '66 million',  es: '66 millones' },    share: { pt: '0,8%',  en: '0.8%',  es: '0,8%' } },
    yo: { num: 35, label: '~#35',word: 'Gbogbo',  idioma: { pt: 'Iorubá',    en: 'Yoruba',     es: 'Yoruba' },    falantes: { pt: '45 milhões',  en: '45 million',  es: '45 millones' },    share: { pt: '0,6%',  en: '0.6%',  es: '0,6%' } },
    el: { num: 86, label: '#86', word: 'Όλοι',    idioma: { pt: 'Grego',     en: 'Greek',      es: 'Griego' },    falantes: { pt: '13 milhões',  en: '13 million',  es: '13 millones' },    share: { pt: '0,17%', en: '0.17%', es: '0,17%' } },
  };

  const COUNTRIES = {
    br:  { apelido: 'Todinho',     flag: '🇧🇷', rid: 'pt', pais: { pt: 'Brasil',         en: 'Brazil',         es: 'Brasil' },
      curio: { pt: "O sufixo “-inho” é o diminutivo afetivo mais comum do português brasileiro.",
               en: "The suffix “-inho” is the most common affectionate diminutive in Brazilian Portuguese.",
               es: "El sufijo «-inho» es el diminutivo afectivo más común del portugués brasileño." } },
    prt: { apelido: 'Todezinho',   flag: '🇵🇹', rid: 'pt', pais: { pt: 'Portugal',       en: 'Portugal',       es: 'Portugal' },
      curio: { pt: "Em Portugal, “-zinho” reforça o diminutivo com ainda mais carinho.",
               en: "In Portugal, “-zinho” adds an extra layer of fondness to the diminutive.",
               es: "En Portugal, «-zinho» refuerza el diminutivo con aún más cariño." } },
    mx:  { apelido: 'Todito',      flag: '🇲🇽', rid: 'es', pais: { pt: 'México',         en: 'Mexico',         es: 'México' },
      curio: { pt: "“-ito” é o diminutivo afetivo clássico do espanhol.",
               en: "“-ito” is the classic affectionate diminutive in Spanish.",
               es: "«-ito» es el diminutivo afectivo clásico del español." } },
    co:  { apelido: 'Todico',      flag: '🇨🇴', rid: 'es', pais: { pt: 'Colômbia',       en: 'Colombia',       es: 'Colombia' },
      curio: { pt: "Na Colômbia, “-ico” aparece no lugar de “-ito” depois de certas sílabas (como em “momentico”).",
               en: "In Colombia, “-ico” replaces “-ito” after certain syllables (as in “momentico”).",
               es: "En Colombia, «-ico» reemplaza a «-ito» tras ciertas sílabas (como en «momentico»)." } },
    us:  { apelido: 'Todie',       flag: '🇺🇸', rid: 'en', pais: { pt: 'Estados Unidos', en: 'United States',  es: 'Estados Unidos' },
      curio: { pt: "Em inglês, terminar um nome em “-ie” (como Charlie, Toddie) soa próximo e afetuoso.",
               en: "In English, ending a name in “-ie” (like Charlie or Toddie) sounds close and affectionate.",
               es: "En inglés, terminar un nombre en «-ie» (como Charlie o Toddie) suena cercano y cariñoso." } },
    fra: { apelido: 'Todet',       flag: '🇫🇷', rid: 'fr', pais: { pt: 'França',         en: 'France',         es: 'Francia' },
      curio: { pt: "O sufixo “-et” forma diminutivos carinhosos no francês.",
               en: "The suffix “-et” forms endearing diminutives in French.",
               es: "El sufijo «-et» forma diminutivos cariñosos en francés." } },
    ita: { apelido: 'Todino',      flag: '🇮🇹', rid: 'it', pais: { pt: 'Itália',         en: 'Italy',          es: 'Italia' },
      curio: { pt: "“-ino” é o diminutivo afetivo italiano por excelência.",
               en: "“-ino” is the quintessential affectionate diminutive in Italian.",
               es: "«-ino» es el diminutivo afectivo italiano por excelencia." } },
    deu: { apelido: 'Tödchen',     flag: '🇩🇪', rid: 'de', pais: { pt: 'Alemanha',       en: 'Germany',        es: 'Alemania' },
      curio: { pt: "“-chen” é o diminutivo afetivo alemão — e ainda ganha o trema (ö) no caminho.",
               en: "“-chen” is the German affectionate diminutive — and it even adds an umlaut (ö) along the way.",
               es: "«-chen» es el diminutivo afectivo alemán — y de paso suma la diéresis (ö)." } },
    rus: { apelido: 'Todik',       flag: '🇷🇺', rid: 'ru', pais: { pt: 'Rússia',         en: 'Russia',         es: 'Rusia' },
      curio: { pt: "“-ik” é um diminutivo informal e amigável no russo.",
               en: "“-ik” is an informal, friendly diminutive in Russian.",
               es: "«-ik» es un diminutivo informal y amistoso en ruso." } },
    grc: { apelido: 'Todakis',     flag: '🇬🇷', rid: 'el', pais: { pt: 'Grécia',         en: 'Greece',         es: 'Grecia' },
      curio: { pt: "“-akis” é um diminutivo grego típico, muito comum em sobrenomes cretenses.",
               en: "“-akis” is a typical Greek diminutive, very common in Cretan surnames.",
               es: "«-akis» es un diminutivo griego típico, muy común en apellidos cretenses." } },
    chn: { apelido: 'Xiǎo Tode',   flag: '🇨🇳', rid: 'zh', pais: { pt: 'China',          en: 'China',          es: 'China' },
      curio: { pt: "Em mandarim, “Xiǎo” (小, “pequeno”) vem antes do nome como um apelido afetuoso.",
               en: "In Mandarin, “Xiǎo” (小, “little”) goes before the name as an affectionate nickname.",
               es: "En mandarín, «Xiǎo» (小, «pequeño») va antes del nombre como apodo cariñoso." } },
    jpn: { apelido: 'Tode-chan',   flag: '🇯🇵', rid: 'ja', pais: { pt: 'Japão',          en: 'Japan',          es: 'Japón' },
      curio: { pt: "“-chan” é um sufixo afetivo japonês que demonstra proximidade, carinho ou fofura.",
               en: "“-chan” is a Japanese affectionate suffix showing closeness, fondness or cuteness.",
               es: "«-chan» es un sufijo afectivo japonés que muestra cercanía, cariño o ternura." } },
    ind: { apelido: 'Todu',        flag: '🇮🇳', rid: 'hi', pais: { pt: 'Índia',          en: 'India',          es: 'India' },
      curio: { pt: "No hindi, uma vogal final aberta dá um tom familiar e carinhoso ao nome.",
               en: "In Hindi, an open final vowel gives the name a familiar, affectionate tone.",
               es: "En hindi, una vocal final abierta da un tono familiar y cariñoso al nombre." } },
    egy: { apelido: 'Todeyib',     flag: '🇪🇬', rid: 'ar', pais: { pt: 'Egito',          en: 'Egypt',          es: 'Egipto' },
      curio: { pt: "No árabe egípcio, o nome ganha uma terminação que soa próxima e brincalhona.",
               en: "In Egyptian Arabic, the name takes on a playful, close-sounding ending.",
               es: "En árabe egipcio, el nombre adopta una terminación cercana y juguetona." } },
    nga: { apelido: 'Todekékeré',  flag: '🇳🇬', rid: 'yo', pais: { pt: 'Nigéria',        en: 'Nigeria',        es: 'Nigeria' },
      curio: { pt: "Em iorubá, “kékeré” quer dizer “pequeno” — literalmente “Tode pequenininho”.",
               en: "In Yoruba, “kékeré” means “small” — literally “little Tode”.",
               es: "En yoruba, «kékeré» significa «pequeño» — literalmente «Tode pequeñito»." } },
  };

  const CIDS = Object.keys(COUNTRIES);
  const RID_ORDER = Object.keys(RANKINGS).sort((a, b) => RANKINGS[a].num - RANKINGS[b].num);

  // palavras "Todos" únicas (pt e es são idênticas → compartilham 1 chip)
  const WORDS = []; const widOf = {};
  RID_ORDER.forEach((rid) => { const w = RANKINGS[rid].word; let i = WORDS.indexOf(w); if (i < 0) { i = WORDS.length; WORDS.push(w); } widOf[rid] = i; });
  const widOfCid = (cid) => widOf[COUNTRIES[cid].rid];

  /* -------------------- TEXTOS (i18n) -------------------- */
  const STRINGS = {
    pt: {
      subtitle: 'Como seria um apelido carinhoso para Tode em outras línguas?',
      steps: [
        { tag: 'DESAFIO 1 · IDIOMA → RANKING', title: 'Ligue o idioma à sua posição mundial', l: 'Idiomas', r: 'Ranking mundial' },
        { tag: 'DESAFIO 2 · PAÍS → PALAVRA',   title: 'Ligue o país à palavra “Todos” do seu idioma', l: 'Países', r: 'A palavra' },
        { tag: 'DESAFIO 3 · PAÍS → APELIDO',   title: 'Como seria um apelido carinhoso em cada país?', l: 'Países', r: 'Apelidos' },
      ],
      linked: 'ligados', prev: 'Anterior', next: 'Próximo',
      stepDone: 'Desafio concluído! Avance para o próximo.',
      footer: 'Muitos apelidos. Um só Tode.',
      chainComplete: 'DESCOBERTA!',
      lApelido: 'Apelido', lIdioma: 'Idioma', lRanking: 'Ranking', lFalantes: 'Falantes', lShare: 'Participação global', lWord: '“Todos” nesse idioma', lCurio: 'Curiosidade',
      keepGoing: 'Continuar', keepGoingLast: 'Ver o resultado',
      finalTitle: 'Muitos apelidos.\nUm só Tode.',
      finalSub: 'Você conectou 15 idiomas, culturas e países diferentes.\n\nMesmo nome.\nMuitos mundos.',
      again: 'Recomeçar', reset: 'Recomeçar',
      aSel: (x) => `${x} selecionado.`, aOk: 'Conexão correta.', aNo: 'Conexão incorreta. Tente de novo.',
      aReveal: (p) => `${p}: descoberta completa.`,
      idiomaAria: (i) => `Idioma ${i}`, rankAria: (n) => `Posição ${n} no mundo`,
      paisAria: (p) => `País ${p}`, wordAria: (w) => `Palavra ${w}`, apelidoAria: (a) => `Apelido ${a}`,
    },
    en: {
      subtitle: 'What would an affectionate nickname for Tode sound like in other languages?',
      steps: [
        { tag: 'CHALLENGE 1 · LANGUAGE → RANKING', title: 'Match the language to its world ranking', l: 'Languages', r: 'World ranking' },
        { tag: 'CHALLENGE 2 · COUNTRY → WORD',     title: 'Match the country to the word “All” in its language', l: 'Countries', r: 'The word' },
        { tag: 'CHALLENGE 3 · COUNTRY → NICKNAME', title: 'What would an affectionate nickname be in each country?', l: 'Countries', r: 'Nicknames' },
      ],
      linked: 'linked', prev: 'Back', next: 'Next',
      stepDone: 'Challenge complete! Move on to the next.',
      footer: 'Many nicknames. One Tode.',
      chainComplete: 'DISCOVERY!',
      lApelido: 'Nickname', lIdioma: 'Language', lRanking: 'Ranking', lFalantes: 'Speakers', lShare: 'Global share', lWord: '“All” in this language', lCurio: 'Did you know?',
      keepGoing: 'Continue', keepGoingLast: 'See the result',
      finalTitle: 'Many nicknames.\nOne Tode.',
      finalSub: 'You connected 15 different languages, cultures and countries.\n\nSame name.\nMany worlds.',
      again: 'Play again', reset: 'Reset',
      aSel: (x) => `${x} selected.`, aOk: 'Correct connection.', aNo: 'Wrong connection. Try again.',
      aReveal: (p) => `${p}: discovery complete.`,
      idiomaAria: (i) => `Language ${i}`, rankAria: (n) => `World rank ${n}`,
      paisAria: (p) => `Country ${p}`, wordAria: (w) => `Word ${w}`, apelidoAria: (a) => `Nickname ${a}`,
    },
    es: {
      subtitle: '¿Cómo sería un apodo cariñoso para Tode en otros idiomas?',
      steps: [
        { tag: 'DESAFÍO 1 · IDIOMA → RANKING', title: 'Une el idioma a su posición mundial', l: 'Idiomas', r: 'Ranking mundial' },
        { tag: 'DESAFÍO 2 · PAÍS → PALABRA',   title: 'Une el país a la palabra “Todos” en su idioma', l: 'Países', r: 'La palabra' },
        { tag: 'DESAFÍO 3 · PAÍS → APODO',     title: '¿Cómo sería un apodo cariñoso en cada país?', l: 'Países', r: 'Apodos' },
      ],
      linked: 'enlazados', prev: 'Atrás', next: 'Siguiente',
      stepDone: '¡Desafío completo! Avanza al siguiente.',
      footer: 'Muchos apodos. Un solo Tode.',
      chainComplete: '¡DESCUBRIMIENTO!',
      lApelido: 'Apodo', lIdioma: 'Idioma', lRanking: 'Ranking', lFalantes: 'Hablantes', lShare: 'Participación global', lWord: '“Todos” en este idioma', lCurio: 'Curiosidad',
      keepGoing: 'Continuar', keepGoingLast: 'Ver el resultado',
      finalTitle: 'Muchos apodos.\nUn solo Tode.',
      finalSub: 'Conectaste 15 idiomas, culturas y países diferentes.\n\nMismo nombre.\nMuchos mundos.',
      again: 'Volver a jugar', reset: 'Reiniciar',
      aSel: (x) => `${x} seleccionado.`, aOk: 'Conexión correcta.', aNo: 'Conexión incorrecta. Inténtalo de nuevo.',
      aReveal: (p) => `${p}: descubrimiento completo.`,
      idiomaAria: (i) => `Idioma ${i}`, rankAria: (n) => `Posición mundial ${n}`,
      paisAria: (p) => `País ${p}`, wordAria: (w) => `Palabra ${w}`, apelidoAria: (a) => `Apodo ${a}`,
    },
  };

  const LANG = (document.body.dataset.lang || 'pt');
  const T = STRINGS[LANG] || STRINGS.pt;
  const STORE = 'todinho-world:v3';
  const TOTALS = { 1: RID_ORDER.length, 2: CIDS.length, 3: CIDS.length }; // 13, 15, 15

  /* -------------------- HELPERS -------------------- */
  const SVGNS = 'http://www.w3.org/2000/svg';
  function el(tag, cls, attrs) { const n = document.createElement(tag); if (cls) n.className = cls; if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]); return n; }
  function svg(tag, attrs) { const n = document.createElementNS(SVGNS, tag); if (attrs) for (const k in attrs) n.setAttribute(k, attrs[k]); return n; }
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function load() { try { return JSON.parse(localStorage.getItem(STORE)) || null; } catch { return null; } }
  function save() { try { localStorage.setItem(STORE, JSON.stringify({ v: 3, orders: state.orders, c1: state.c1, c2: state.c2, c3: state.c3, step: state.step })); } catch {} }
  function track() {} // telemetria — hook no-op p/ release futuro

  /* -------------------- ESTADO -------------------- */
  const state = {
    orders: null,
    c1: {}, // rid: true  (idioma→ranking)
    c2: {}, // cid: true  (país→palavra)
    c3: {}, // cid: true  (país→apelido)
    step: 1,
    sel: null,
  };
  function newOrders() {
    state.orders = {
      idi: shuffle(RID_ORDER), rk: RID_ORDER.slice(),
      pa2: shuffle(CIDS), wd: shuffle(WORDS.map((_, i) => i)),
      pa3: shuffle(CIDS), ap: shuffle(CIDS),
    };
  }
  const count = (n) => Object.keys(n === 1 ? state.c1 : n === 2 ? state.c2 : state.c3).length;
  const stepDone = (n) => count(n) >= TOTALS[n];

  /* -------------------- DOM refs -------------------- */
  const root = document.getElementById('app');
  const steps = {};
  let live, track$, viewport, stepper, prevBtn, nextBtn, modalEl, finalEl;

  /* -------------------- BUILD: chips -------------------- */
  function chip(kind, attrs, content) {
    const c = el('button', 'chip is-' + kind, Object.assign({ type: 'button' }, attrs));
    c.dataset.kindBase = kind; c.appendChild(content); c.appendChild(el('span', 'node', { 'aria-hidden': 'true' }));
    c.addEventListener('click', () => onActivate(c));
    c.addEventListener('pointerdown', (e) => onPointerDown(e, c));
    return c;
  }
  function txt(s, cls) { const w = el('span', cls || 'txt'); w.textContent = s; return w; }
  function countryFrag(cid) { const f = document.createDocumentFragment(); const fl = el('span', 'flag'); fl.textContent = COUNTRIES[cid].flag; f.appendChild(fl); f.appendChild(txt(COUNTRIES[cid].pais[LANG])); return f; }
  function rankFrag(rid) { const n = el('span', 'rank-num'); n.textContent = RANKINGS[rid].label; return n; }

  function buildBoard(n) {
    const cfg = T.steps[n - 1];
    const board = el('div', 'board');
    const left = el('div', 'col col-left'); const right = el('div', 'col col-right');
    left.appendChild(txt(cfg.l, 'col-title')); right.appendChild(txt(cfg.r, 'col-title'));

    if (n === 1) { // idioma → ranking
      state.orders.idi.forEach((rid) => left.appendChild(chip('idioma', { 'data-step': '1', 'data-role': 'source', 'data-rid': rid, 'aria-label': T.idiomaAria(RANKINGS[rid].idioma[LANG]) }, txt(RANKINGS[rid].idioma[LANG]))));
      state.orders.rk.forEach((rid) => right.appendChild(chip('rank', { 'data-step': '1', 'data-role': 'target', 'data-rid': rid, 'aria-label': T.rankAria(RANKINGS[rid].num) }, rankFrag(rid))));
    } else if (n === 2) { // país → palavra "Todos"
      state.orders.pa2.forEach((cid) => left.appendChild(chip('country', { 'data-step': '2', 'data-role': 'source', 'data-cid': cid, 'aria-label': T.paisAria(COUNTRIES[cid].pais[LANG]) }, countryFrag(cid))));
      state.orders.wd.forEach((wid) => right.appendChild(chip('word', { 'data-step': '2', 'data-role': 'target', 'data-wid': String(wid), 'aria-label': T.wordAria(WORDS[wid]) }, txt(WORDS[wid]))));
    } else { // país → apelido
      state.orders.pa3.forEach((cid) => left.appendChild(chip('country', { 'data-step': '3', 'data-role': 'source', 'data-cid': cid, 'aria-label': T.paisAria(COUNTRIES[cid].pais[LANG]) }, countryFrag(cid))));
      state.orders.ap.forEach((cid) => right.appendChild(chip('apelido', { 'data-step': '3', 'data-role': 'target', 'data-cid': cid, 'aria-label': T.apelidoAria(COUNTRIES[cid].apelido) }, txt(COUNTRIES[cid].apelido))));
    }
    const wires = svg('svg', { class: 'wires' }); const temp = svg('path', { class: 'wire temp' }); wires.appendChild(temp);
    board.appendChild(left); board.appendChild(wires); board.appendChild(right);
    steps[n] = { board, svg: wires, temp };
    return board;
  }

  function buildStep(n) {
    const sec = el('section', 'step', { 'data-step': String(n) });
    const cfg = T.steps[n - 1];
    const head = el('div', 'block-head');
    head.appendChild(txt(cfg.tag, 'block-tag'));
    const h2 = el('h2'); h2.textContent = cfg.title; head.appendChild(h2);
    const prog = el('div', 'step-count'); prog.dataset.step = String(n); head.appendChild(prog);
    sec.appendChild(head); sec.appendChild(buildBoard(n));
    return sec;
  }

  function buildHeader() {
    const head = el('header', 'site-head');
    const h1 = el('h1', 'brand');
    h1.appendChild(document.createTextNode('Todinho ')); const at = el('span', 'at'); at.textContent = '@'; h1.appendChild(at);
    h1.appendChild(document.createTextNode(' ')); const g = el('span', 'globe'); g.textContent = '🌍'; h1.appendChild(g);
    head.appendChild(h1);
    stepper = el('div', 'stepper', { role: 'list' });
    for (let i = 1; i <= 3; i++) {
      const pill = el('div', 'sp', { role: 'listitem' }); pill.dataset.step = String(i);
      const dot = el('span', 'sp-dot'); dot.textContent = String(i);
      const lbl = el('span', 'sp-lbl'); lbl.textContent = T.steps[i - 1].tag.split('·')[1].trim();
      pill.appendChild(dot); pill.appendChild(lbl); stepper.appendChild(pill);
    }
    head.appendChild(stepper);
    return head;
  }

  function buildAll() {
    root.textContent = ''; delete steps[1]; delete steps[2]; delete steps[3];
    root.appendChild(buildHeader());
    viewport = el('div', 'steps-viewport'); track$ = el('div', 'steps-track');
    for (let i = 1; i <= 3; i++) track$.appendChild(buildStep(i));
    viewport.appendChild(track$); root.appendChild(viewport);
    const nav = el('div', 'step-nav');
    prevBtn = el('button', 'nav-btn prev', { type: 'button' }); prevBtn.textContent = '← ' + T.prev;
    nextBtn = el('button', 'nav-btn next', { type: 'button' }); nextBtn.textContent = T.next + ' →';
    prevBtn.addEventListener('click', () => goStep(state.step - 1));
    nextBtn.addEventListener('click', () => goStep(state.step + 1));
    nav.appendChild(prevBtn); nav.appendChild(nextBtn); root.appendChild(nav);
    setupSwipe();
  }

  function buildStatic() {
    const foot = el('footer', 'site-foot'); foot.textContent = '🌍 ' + T.footer + ' 🖖🏻';
    const resetBtn = el('button', 'reset', { type: 'button' }); resetBtn.textContent = '↺ ' + T.reset; resetBtn.addEventListener('click', doReset);
    live = el('div', 'sr-only', { 'aria-live': 'polite', 'aria-atomic': 'true' });
    document.body.appendChild(foot); document.body.appendChild(resetBtn); document.body.appendChild(live);
    buildModal(); buildFinal();
  }
  function buildModal() {
    const back = el('div', 'modal-backdrop', { hidden: '' });
    const m = el('div', 'modal', { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-country' });
    back.appendChild(m); back.addEventListener('click', (e) => { if (e.target === back) advanceReveal(); });
    modalEl = { back, body: m }; document.body.appendChild(back);
  }
  function buildFinal() {
    finalEl = el('div', 'final', { hidden: '', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'final-title' });
    const sky = svg('svg', { class: 'sky' }); const inner = el('div', 'inner');
    const h2 = el('h2', null, { id: 'final-title' }); h2.style.whiteSpace = 'pre-line'; h2.textContent = T.finalTitle;
    const p = el('p'); p.textContent = T.finalSub;
    const again = el('button', 'again', { type: 'button' }); again.textContent = T.again; again.addEventListener('click', doReset);
    inner.appendChild(h2); inner.appendChild(p); inner.appendChild(again);
    finalEl.appendChild(sky); finalEl.appendChild(inner); document.body.appendChild(finalEl);
  }

  /* -------------------- RENDER -------------------- */
  function setChip(c, klass, { locked = false, source = false, selected = false } = {}) {
    c.className = 'chip is-' + c.dataset.kindBase + (klass ? ' ' + klass : '') + (locked ? ' locked' : '') + (source ? ' can-source' : '') + (selected ? ' selected' : '');
    if (c.dataset.role === 'source') c.setAttribute('aria-pressed', selected ? 'true' : 'false');
    c.setAttribute('aria-disabled', locked ? 'true' : 'false');
  }
  function widUsed(wid) { for (const cid in state.c2) if (widOfCid(cid) === wid) return true; return false; }

  function render() {
    const sel = state.sel && state.sel.chip, cur = state.step;
    steps[1].board.querySelectorAll('.chip').forEach((c) => {
      const rid = c.dataset.rid, done = rid in state.c1, on = cur === 1;
      if (c.dataset.role === 'source') setChip(c, done ? 'done' : '', { locked: done, source: on && !done, selected: c === sel });
      else setChip(c, done ? 'done' : '', { locked: done });
    });
    steps[2].board.querySelectorAll('.chip').forEach((c) => {
      const on = cur === 2;
      if (c.dataset.role === 'source') { const cid = c.dataset.cid, done = cid in state.c2; setChip(c, done ? 'done' : '', { locked: done, source: on && !done, selected: c === sel }); }
      else { setChip(c, widUsed(+c.dataset.wid) ? 'done' : '', {}); }
    });
    steps[3].board.querySelectorAll('.chip').forEach((c) => {
      const cid = c.dataset.cid, done = cid in state.c3, on = cur === 3;
      if (c.dataset.role === 'source') setChip(c, done ? 'done' : '', { locked: done, source: on && !done, selected: c === sel });
      else setChip(c, done ? 'done' : '', { locked: done });
    });
    stepper.querySelectorAll('.sp').forEach((p) => { const n = +p.dataset.step; p.classList.toggle('current', n === cur); p.classList.toggle('done', stepDone(n)); p.classList.toggle('locked', n > cur && !stepDone(n - 1)); });
    root.querySelectorAll('.step-count').forEach((e) => { const n = +e.dataset.step; e.textContent = count(n) + ' / ' + TOTALS[n] + ' · ' + T.linked; });
    prevBtn.disabled = cur === 1;
    const canNext = cur < 3 && stepDone(cur);
    nextBtn.disabled = !canNext; nextBtn.classList.toggle('ready', canNext); nextBtn.hidden = cur === 3;
  }

  /* -------------------- SVG -------------------- */
  function anchor(board, c) { const br = board.getBoundingClientRect(), r = c.getBoundingClientRect(); const left = c.closest('.col').classList.contains('col-left'); return { x: (left ? r.right : r.left) - br.left, y: r.top + r.height / 2 - br.top }; }
  function pathD(a, b) { const k = Math.max(26, Math.abs(b.x - a.x) * 0.45); return `M ${a.x} ${a.y} C ${a.x + k} ${a.y}, ${b.x - k} ${b.y}, ${b.x} ${b.y}`; }
  function drawWire(n, fromChip, toChip, cls, { animate = false, star = false, twinkle = false } = {}) {
    const blk = steps[n]; const a = anchor(blk.board, fromChip), b = anchor(blk.board, toChip);
    const p = svg('path', { class: 'wire ' + cls, d: pathD(a, b) }); blk.svg.appendChild(p);
    if (animate) { const len = p.getTotalLength(); p.style.setProperty('--len', len); p.classList.add('wire-draw'); }
    if (star) [a, b].forEach((pt) => blk.svg.appendChild(svg('circle', { class: 'wire-star' + (twinkle ? ' twinkle' : ''), cx: pt.x, cy: pt.y, r: 3.2 })));
    return p;
  }
  function clearWires(n) { [...steps[n].svg.querySelectorAll('.wire:not(.temp), .wire-star')].forEach((e) => e.remove()); }
  function redrawStep(n, opts = {}) {
    clearWires(n); const done = stepDone(n), cls = done ? 'done' : 'ok';
    if (n === 1) Object.keys(state.c1).forEach((rid) => {
      const a = steps[1].board.querySelector(`.chip[data-rid="${rid}"][data-role="source"]`);
      const b = steps[1].board.querySelector(`.chip[data-rid="${rid}"][data-role="target"]`);
      if (a && b) drawWire(1, a, b, cls, { star: done, twinkle: opts.twinkle === rid });
    });
    else if (n === 2) Object.keys(state.c2).forEach((cid) => {
      const a = steps[2].board.querySelector(`.chip[data-cid="${cid}"][data-role="source"]`);
      const b = steps[2].board.querySelector(`.chip[data-wid="${widOfCid(cid)}"][data-role="target"]`);
      if (a && b) drawWire(2, a, b, cls, { star: done });
    });
    else Object.keys(state.c3).forEach((cid) => {
      const a = steps[3].board.querySelector(`.chip[data-cid="${cid}"][data-role="source"]`);
      const b = steps[3].board.querySelector(`.chip[data-cid="${cid}"][data-role="target"]`);
      if (a && b) drawWire(3, a, b, cls, { star: done, twinkle: opts.twinkle === cid });
    });
  }
  function redrawAll() { [1, 2, 3].forEach((n) => redrawStep(n)); }

  /* -------------------- INTERAÇÃO -------------------- */
  function announce(m) { if (live) { live.textContent = ''; requestAnimationFrame(() => { live.textContent = m; }); } }
  function nameOf(c) { const k = c.dataset.kindBase; return k === 'idioma' ? RANKINGS[c.dataset.rid].idioma[LANG] : k === 'country' ? COUNTRIES[c.dataset.cid].pais[LANG] : k === 'word' ? WORDS[+c.dataset.wid] : COUNTRIES[c.dataset.cid].apelido; }
  function canSource(c) {
    if (+c.dataset.step !== state.step) return false;
    if (c.dataset.step === '1') return !(c.dataset.rid in state.c1);
    if (c.dataset.step === '2') return !(c.dataset.cid in state.c2);
    return !(c.dataset.cid in state.c3);
  }
  function select(c) { deselect(); state.sel = { step: c.dataset.step, chip: c }; c.classList.add('selected'); c.setAttribute('aria-pressed', 'true'); announce(T.aSel(nameOf(c))); }
  function deselect() { if (state.sel && state.sel.chip) { state.sel.chip.classList.remove('selected'); state.sel.chip.setAttribute('aria-pressed', 'false'); } state.sel = null; }

  function onActivate(c) {
    if (suppressClick) return;
    if (c.dataset.role === 'source') {
      if (!canSource(c)) return;
      if (state.sel && state.sel.chip === c) { deselect(); return; }
      select(c);
    } else {
      if (!state.sel || state.sel.step !== c.dataset.step) return;
      attempt(state.sel.chip, c);
    }
  }

  function attempt(src, tgt) {
    const n = +src.dataset.step; let ok = false, key;
    if (n === 1) { ok = src.dataset.rid === tgt.dataset.rid; key = src.dataset.rid; }
    else if (n === 2) { ok = String(widOfCid(src.dataset.cid)) === tgt.dataset.wid; key = src.dataset.cid; }
    else { ok = src.dataset.cid === tgt.dataset.cid; key = src.dataset.cid; }

    if (ok) {
      if (n === 1) state.c1[key] = true; else if (n === 2) state.c2[key] = true; else state.c3[key] = true;
      save(); deselect(); render();
      if (stepDone(n)) redrawStep(n, n === 3 ? { twinkle: key } : {});
      else drawWire(n, src, tgt, 'ok', { animate: true });
      announce(stepDone(n) ? T.stepDone : T.aOk); track('ok', { step: n, key });
      if (n === 3) queueReveal(key);
    } else {
      tgt.classList.add('wrong'); setTimeout(() => tgt.classList.remove('wrong'), 450);
      const tmp = drawWire(n, src, tgt, 'wrong', {}); setTimeout(() => tmp.remove(), 470);
      deselect(); render(); announce(T.aNo); track('no', { step: n });
    }
  }

  /* drag (mouse) — tap-tap é o caminho garantido */
  let drag = null, suppressClick = false;
  function onPointerDown(e, c) { if (e.pointerType !== 'mouse' || e.button !== 0) return; if (c.dataset.role !== 'source' || !canSource(c)) return; drag = { chip: c, step: +c.dataset.step, x: e.clientX, y: e.clientY, moved: false }; }
  window.addEventListener('pointermove', (e) => {
    if (!drag) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6) { drag.moved = true; select(drag.chip); }
    if (drag.moved) { const blk = steps[drag.step]; const a = anchor(blk.board, drag.chip); const br = blk.board.getBoundingClientRect(); blk.temp.setAttribute('d', pathD(a, { x: e.clientX - br.left, y: e.clientY - br.top })); }
  });
  window.addEventListener('pointerup', (e) => {
    if (!drag) return; const d = drag; drag = null; if (!d.moved) return;
    steps[d.step].temp.removeAttribute('d');
    const under = document.elementFromPoint(e.clientX, e.clientY); const t = under && under.closest('.chip');
    if (t && t.dataset.role === 'target' && +t.dataset.step === d.step) attempt(d.chip, t); else deselect();
    suppressClick = true; setTimeout(() => { suppressClick = false; }, 0);
  });

  /* -------------------- NAVEGAÇÃO -------------------- */
  function goStep(n) {
    n = Math.max(1, Math.min(3, n));
    if (n > state.step && !stepDone(state.step)) return;
    state.step = n; deselect(); save();
    track$.style.transform = `translateX(${-(n - 1) * 100}%)`;
    syncHeight(); render(); requestAnimationFrame(() => redrawStep(n));
    if (window.innerWidth < 720) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function syncHeight() { const a = steps[state.step].board.closest('.step'); if (a) viewport.style.height = a.offsetHeight + 'px'; }
  function setupSwipe() {
    let sx = 0, sy = 0, on = false;
    viewport.addEventListener('pointerdown', (e) => { if (e.target.closest('.chip')) return; on = true; sx = e.clientX; sy = e.clientY; });
    window.addEventListener('pointerup', (e) => { if (!on) return; on = false; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goStep(state.step + (dx < 0 ? 1 : -1)); });
  }
  document.addEventListener('keydown', (e) => { if (!modalEl.back.hidden || !finalEl.hidden) return; if (e.key === 'ArrowRight') goStep(state.step + 1); else if (e.key === 'ArrowLeft') goStep(state.step - 1); });

  /* -------------------- REVELAÇÃO (desafio 3) -------------------- */
  let revealQueue = [], lastFocus = null;
  function queueReveal(cid) { revealQueue.push(cid); if (modalEl.back.hidden) showReveal(); }
  function showReveal() {
    if (!revealQueue.length) { if (count(3) >= TOTALS[3]) showFinal(); return; }
    const c = COUNTRIES[revealQueue[0]], r = RANKINGS[c.rid], m = modalEl.body;
    announce(T.aReveal(c.pais[LANG])); m.textContent = '';
    const kick = el('div', 'kicker'); kick.textContent = T.chainComplete + ' 🎉'; m.appendChild(kick);
    const ct = el('div', 'country', { id: 'modal-country' }); const fl = el('span', 'flag'); fl.textContent = c.flag; ct.appendChild(fl); ct.appendChild(document.createTextNode(c.pais[LANG])); m.appendChild(ct);
    m.appendChild(el('hr'));
    const grid = el('div', 'grid');
    const cell = (lbl, val, cls, full) => { const d = el('div', full ? 'full' : null); const l = el('div', 'lbl'); l.textContent = lbl; const v = el('div', 'val' + (cls ? ' ' + cls : '')); v.textContent = val; d.appendChild(l); d.appendChild(v); return d; };
    grid.appendChild(cell(T.lApelido, c.apelido));
    grid.appendChild(cell(T.lIdioma, r.idioma[LANG]));
    grid.appendChild(cell(T.lRanking, r.label, 'rank'));
    grid.appendChild(cell(T.lFalantes, r.falantes[LANG]));
    grid.appendChild(cell(T.lWord, r.word, '', true));
    grid.appendChild(cell(T.lShare, r.share[LANG], '', true));
    m.appendChild(grid);
    const curio = el('div', 'curio'); const cl = el('div', 'lbl'); cl.textContent = T.lCurio; cl.style.marginBottom = '3px'; curio.appendChild(cl); curio.appendChild(document.createTextNode(c.curio[LANG])); m.appendChild(curio);
    const last = revealQueue.length === 1 && count(3) >= TOTALS[3];
    const btn = el('button', 'continue', { type: 'button' }); btn.textContent = last ? T.keepGoingLast : T.keepGoing; btn.addEventListener('click', advanceReveal); m.appendChild(btn);
    if (modalEl.back.hidden) { lastFocus = document.activeElement; modalEl.back.hidden = false; document.addEventListener('keydown', modalKeys); }
    btn.focus();
  }
  function advanceReveal() { revealQueue.shift(); if (revealQueue.length) showReveal(); else closeModal(); }
  function modalKeys(e) { if (e.key === 'Escape') { e.preventDefault(); advanceReveal(); } if (e.key === 'Tab') { e.preventDefault(); modalEl.body.querySelector('.continue').focus(); } }
  function closeModal() { modalEl.back.hidden = true; document.removeEventListener('keydown', modalKeys); if (count(3) >= TOTALS[3]) { showFinal(); return; } if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus(); } catch {} } }

  /* -------------------- FINAL -------------------- */
  function showFinal() {
    const sky = finalEl.querySelector('.sky'); sky.textContent = '';
    const W = window.innerWidth, H = window.innerHeight;
    for (let i = 0; i < 80; i++) sky.appendChild(svg('circle', { cx: Math.random() * W, cy: Math.random() * H, r: Math.random() * 1.4 + 0.3, fill: i % 6 === 0 ? '#f5c451' : '#9fb4d8', opacity: Math.random() * 0.7 + 0.2 }));
    finalEl.hidden = false; finalEl.querySelector('.again').focus(); track('completed');
  }

  /* -------------------- RESET / RESIZE / INIT -------------------- */
  function doReset() {
    state.c1 = {}; state.c2 = {}; state.c3 = {}; state.step = 1; revealQueue = []; deselect();
    newOrders(); save(); finalEl.hidden = true; modalEl.back.hidden = true;
    buildAll(); render(); track$.style.transform = 'translateX(0)';
    requestAnimationFrame(() => { syncHeight(); redrawAll(); });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  let raf = 0;
  function onResize() { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { syncHeight(); redrawAll(); }); }
  window.addEventListener('resize', onResize); window.addEventListener('orientationchange', onResize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(onResize);

  function init() {
    const s = load();
    if (s && s.orders && s.orders.idi && s.orders.idi.length === RID_ORDER.length) {
      state.orders = s.orders; state.c1 = s.c1 || {}; state.c2 = s.c2 || {}; state.c3 = s.c3 || {};
      state.step = Math.min(3, Math.max(1, s.step || 1));
    } else newOrders();
    save();
    buildAll(); buildStatic(); render();
    track$.style.transform = `translateX(${-(state.step - 1) * 100}%)`;
    requestAnimationFrame(() => { syncHeight(); redrawAll(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
