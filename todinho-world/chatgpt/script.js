const locale = document.documentElement.lang.startsWith("en")
  ? "en-US"
  : document.documentElement.lang.startsWith("es")
    ? "es-ES"
    : "pt-BR";

const localeIndex = { "pt-BR": 0, "en-US": 1, "es-ES": 2 }[locale];

const copy = {
  "pt-BR": {
    stepOne: "Etapa 1",
    stepTwo: "Etapa 2",
    stepThree: "Etapa 3",
    stepFinal: "Final",
    stageOneTitle: "Conecte o Idioma ao Ranking",
    stageOneSubtitle: "Você sabe quais são as línguas mais faladas do mundo?",
    stageTwoTitle: "Conecte o País à Palavra",
    stageTwoSubtitle: "Como se fala \"todos\" em cada idioma?",
    stageThreeTitle: "Conecte o Apelido ao País",
    stageThreeSubtitle: "Como seriam apelidos carinhosos em cada língua?",
    nicknames: "Apelidos",
    countries: "Países",
    languages: "Idiomas",
    rankings: "Rankings",
    words: "Palavras",
    connected: "conectados",
    stepDone: "Etapa completa. Indo para a próxima...",
    tryAgain: "Essa conexão não fecha. Tente outra combinação.",
    summaryTitle: "Cadeia completa",
    countryLabel: "País:",
    nicknameLabel: "Apelido:",
    languageLabel: "Idioma:",
    rankingLabel: "Ranking:",
    speakersLabel: "Falantes:",
    shareLabel: "Participação:",
    curiosityLabel: "Curiosidade:",
    closeSummary: "Fechar resumo",
    finalTitle: "Muitos apelidos.<br>Um só Tode.",
    finalSubtitle: "Você conectou idiomas, palavras, culturas e países diferentes.",
    restart: "Recomeçar"
  },
  "en-US": {
    stepOne: "Step 1",
    stepTwo: "Step 2",
    stepThree: "Step 3",
    stepFinal: "Final",
    stageOneTitle: "Connect the Language to the Ranking",
    stageOneSubtitle: "Do you know which languages are the most spoken in the world?",
    stageTwoTitle: "Connect the Country to the Word",
    stageTwoSubtitle: "How do you say \"all\" in each language?",
    stageThreeTitle: "Connect the Nickname to the Country",
    stageThreeSubtitle: "What would affectionate nicknames sound like in each language?",
    nicknames: "Nicknames",
    countries: "Countries",
    languages: "Languages",
    rankings: "Rankings",
    words: "Words",
    connected: "connected",
    stepDone: "Step complete. Moving to the next one...",
    tryAgain: "That connection does not close. Try another match.",
    summaryTitle: "Chain complete",
    countryLabel: "Country:",
    nicknameLabel: "Nickname:",
    languageLabel: "Language:",
    rankingLabel: "Ranking:",
    speakersLabel: "Speakers:",
    shareLabel: "Share:",
    curiosityLabel: "Curiosity:",
    closeSummary: "Close summary",
    finalTitle: "Many nicknames.<br>One Tode.",
    finalSubtitle: "You connected languages, words, cultures, and countries.",
    restart: "Start again"
  },
  "es-ES": {
    stepOne: "Etapa 1",
    stepTwo: "Etapa 2",
    stepThree: "Etapa 3",
    stepFinal: "Final",
    stageOneTitle: "Conecta el Idioma con el Ranking",
    stageOneSubtitle: "¿Sabes cuáles son los idiomas más hablados del mundo?",
    stageTwoTitle: "Conecta el País con la Palabra",
    stageTwoSubtitle: "¿Cómo se dice \"todos\" en cada idioma?",
    stageThreeTitle: "Conecta el Apodo con el País",
    stageThreeSubtitle: "¿Cómo sonarían apodos cariñosos en cada idioma?",
    nicknames: "Apodos",
    countries: "Países",
    languages: "Idiomas",
    rankings: "Rankings",
    words: "Palabras",
    connected: "conectados",
    stepDone: "Etapa completa. Vamos a la siguiente...",
    tryAgain: "Esa conexión no cierra. Prueba otra combinación.",
    summaryTitle: "Cadena completa",
    countryLabel: "País:",
    nicknameLabel: "Apodo:",
    languageLabel: "Idioma:",
    rankingLabel: "Ranking:",
    speakersLabel: "Hablantes:",
    shareLabel: "Participación:",
    curiosityLabel: "Curiosidad:",
    closeSummary: "Cerrar resumen",
    finalTitle: "Muchos apodos.<br>Un solo Tode.",
    finalSubtitle: "Conectaste idiomas, palabras, culturas y países diferentes.",
    restart: "Empezar de nuevo"
  }
};

const text = copy[locale];

const languages = {
  english: { ranking: "#1", label: ["Inglês", "English", "Inglés"], word: "all" },
  mandarin: { ranking: "#2", label: ["Mandarim", "Mandarin", "Mandarín"], word: "大家" },
  hindi: { ranking: "#3", label: ["Hindi", "Hindi", "Hindi"], word: "सभी" },
  spanish: { ranking: "#4", label: ["Espanhol", "Spanish", "Español"], word: "todos" },
  arabic: { ranking: "#5", label: ["Árabe", "Arabic", "Árabe"], word: "الجميع" },
  french: { ranking: "#6", label: ["Francês", "French", "Francés"], word: "tous" },
  portuguese: { ranking: "#8", label: ["Português", "Portuguese", "Portugués"], word: "todos" },
  russian: { ranking: "#9", label: ["Russo", "Russian", "Ruso"], word: "все" },
  german: { ranking: "#12", label: ["Alemão", "German", "Alemán"], word: "alle" },
  japanese: { ranking: "#13", label: ["Japonês", "Japanese", "Japonés"], word: "みんな" },
  italian: { ranking: "#29", label: ["Italiano", "Italian", "Italiano"], word: "tutti" },
  yoruba: { ranking: "~#35", label: ["Iorubá", "Yoruba", "Yoruba"], word: "gbogbo" },
  greek: { ranking: "#86", label: ["Grego", "Greek", "Griego"], word: "όλοι" }
};

const countryRows = [
  ["brazil", "Todinho", "portuguese", ["Brasil 🇧🇷", "Brazil 🇧🇷", "Brasil 🇧🇷"], ["Brasil", "Brazil", "Brasil"], "🇧🇷", ["265 milhões", "265 million", "265 millones"], ["3,3%", "3.3%", "3,3%"], ["Em português, o sufixo -inho deixa o nome mais carinhoso, pequeno e próximo.", "In Portuguese, the suffix -inho makes a name feel smaller, sweeter, and closer.", "En portugués, el sufijo -inho vuelve el nombre más cariñoso, pequeño y cercano."]],
  ["portugal", "Todezinho", "portuguese", ["Portugal 🇵🇹", "Portugal 🇵🇹", "Portugal 🇵🇹"], ["Portugal", "Portugal", "Portugal"], "🇵🇹", ["265 milhões", "265 million", "265 millones"], ["3,3%", "3.3%", "3,3%"], ["Em Portugal, -zinho também soa afetuoso, como uma forma doce de aproximar o nome.", "In Portugal, -zinho also sounds affectionate, like a gentle way to bring a name closer.", "En Portugal, -zinho también suena afectuoso, como una forma dulce de acercar el nombre."]],
  ["mexico", "Todito", "spanish", ["México 🇲🇽", "Mexico 🇲🇽", "México 🇲🇽"], ["México", "Mexico", "México"], "🇲🇽", ["559 milhões", "559 million", "559 millones"], ["6,9%", "6.9%", "6,9%"], ["O diminutivo -ito é muito comum no espanhol para demonstrar carinho e familiaridade.", "The diminutive -ito is common in Spanish for showing affection and familiarity.", "El diminutivo -ito es muy común en español para mostrar cariño y familiaridad."]],
  ["colombia", "Todico", "spanish", ["Colômbia 🇨🇴", "Colombia 🇨🇴", "Colombia 🇨🇴"], ["Colômbia", "Colombia", "Colombia"], "🇨🇴", ["559 milhões", "559 million", "559 millones"], ["6,9%", "6.9%", "6,9%"], ["Na Colômbia, formas diminutivas e sonoras aparecem muito em apelidos afetivos.", "In Colombia, small and musical forms often appear in affectionate nicknames.", "En Colombia, las formas diminutivas y sonoras aparecen mucho en apodos cariñosos."]],
  ["united-states", "Todie", "english", ["Estados Unidos 🇺🇸", "United States 🇺🇸", "Estados Unidos 🇺🇸"], ["Estados Unidos", "United States", "Estados Unidos"], "🇺🇸", ["1,5 bilhão", "1.5 billion", "1,5 mil millones"], ["18,6%", "18.6%", "18,6%"], ["Em inglês, terminar nomes com som de -ie costuma deixar o apelido mais íntimo e brincalhão.", "In English, ending a name with an -ie sound often makes it feel warmer and more playful.", "En inglés, terminar nombres con sonido -ie suele hacer que el apodo suene más íntimo y juguetón."]],
  ["france", "Todet", "french", ["França 🇫🇷", "France 🇫🇷", "Francia 🇫🇷"], ["França", "France", "Francia"], "🇫🇷", ["312 milhões", "312 million", "312 millones"], ["3,9%", "3.9%", "3,9%"], ["O francês usa terminações suaves e diminutivas para criar nomes com sensação delicada.", "French often uses soft endings and diminutive forms to make names feel delicate.", "El francés usa terminaciones suaves y diminutivas para crear nombres con una sensación delicada."]],
  ["italy", "Todino", "italian", ["Itália 🇮🇹", "Italy 🇮🇹", "Italia 🇮🇹"], ["Itália", "Italy", "Italia"], "🇮🇹", ["68 milhões", "68 million", "68 millones"], ["0,8%", "0.8%", "0,8%"], ["No italiano, finais como -ino dão ao nome um tom pequeno, afetuoso e musical.", "In Italian, endings like -ino make a name feel small, affectionate, and musical.", "En italiano, finales como -ino dan al nombre un tono pequeño, afectuoso y musical."]],
  ["germany", "Tödchen", "german", ["Alemanha 🇩🇪", "Germany 🇩🇪", "Alemania 🇩🇪"], ["Alemanha", "Germany", "Alemania"], "🇩🇪", ["134 milhões", "134 million", "134 millones"], ["1,7%", "1.7%", "1,7%"], ["Em alemão, -chen é um diminutivo clássico usado para indicar pequenez ou ternura.", "In German, -chen is a classic diminutive used to suggest smallness or tenderness.", "En alemán, -chen es un diminutivo clásico usado para indicar pequeñez o ternura."]],
  ["russia", "Todik", "russian", ["Rússia 🇷🇺", "Russia 🇷🇺", "Rusia 🇷🇺"], ["Rússia", "Russia", "Rusia"], "🇷🇺", ["258 milhões", "258 million", "258 millones"], ["3,2%", "3.2%", "3,2%"], ["O russo tem muitas formas afetivas de nomes, frequentemente com terminações curtas e calorosas.", "Russian has many affectionate name forms, often with short, warm endings.", "El ruso tiene muchas formas afectivas de nombres, a menudo con terminaciones cortas y cálidas."]],
  ["greece", "Todakis", "greek", ["Grécia 🇬🇷", "Greece 🇬🇷", "Grecia 🇬🇷"], ["Grécia", "Greece", "Grecia"], "🇬🇷", ["13 milhões", "13 million", "13 millones"], ["0,2%", "0.2%", "0,2%"], ["Em grego, terminações como -akis podem dar uma sensação familiar ou regional ao apelido.", "In Greek, endings like -akis can give a nickname a familiar or regional feeling.", "En griego, terminaciones como -akis pueden dar al apodo una sensación familiar o regional."]],
  ["china", "Xiǎo Tode", "mandarin", ["China 🇨🇳", "China 🇨🇳", "China 🇨🇳"], ["China", "China", "China"], "🇨🇳", ["1,1 bilhão", "1.1 billion", "1,1 mil millones"], ["13,5%", "13.5%", "13,5%"], ["Xiǎo significa pequeno e é usado antes de nomes para soar próximo, jovem ou carinhoso.", "Xiǎo means small and can be placed before names to sound close, young, or affectionate.", "Xiǎo significa pequeño y se usa antes de nombres para sonar cercano, joven o cariñoso."]],
  ["japan", "Tode-chan", "japanese", ["Japão 🇯🇵", "Japan 🇯🇵", "Japón 🇯🇵"], ["Japão", "Japan", "Japón"], "🇯🇵", ["126 milhões", "126 million", "126 millones"], ["1,5%", "1.5%", "1,5%"], ["-chan é um sufixo afetivo usado para demonstrar proximidade, carinho ou fofura.", "-chan is an affectionate suffix used to show closeness, care, or cuteness.", "-chan es un sufijo afectivo usado para demostrar cercanía, cariño o ternura."]],
  ["india", "Todu", "hindi", ["Índia 🇮🇳", "India 🇮🇳", "India 🇮🇳"], ["Índia", "India", "India"], "🇮🇳", ["609 milhões", "609 million", "609 millones"], ["7,5%", "7.5%", "7,5%"], ["Em hindi, apelidos familiares muitas vezes encurtam ou arredondam nomes para soar mais íntimos.", "In Hindi, family nicknames often shorten or round names to make them feel more intimate.", "En hindi, los apodos familiares muchas veces acortan o redondean nombres para sonar más íntimos."]],
  ["egypt", "Todeyib", "arabic", ["Egito 🇪🇬", "Egypt 🇪🇬", "Egipto 🇪🇬"], ["Egito", "Egypt", "Egipto"], "🇪🇬", ["334 milhões", "334 million", "334 millones"], ["4,1%", "4.1%", "4,1%"], ["No árabe, carinho pode aparecer em variações sonoras e formas próximas usadas em família.", "In Arabic, affection can appear through sound variations and close family forms.", "En árabe, el cariño puede aparecer en variaciones sonoras y formas cercanas usadas en familia."]],
  ["nigeria", "Todekékeré", "yoruba", ["Nigéria 🇳🇬", "Nigeria 🇳🇬", "Nigeria 🇳🇬"], ["Nigéria", "Nigeria", "Nigeria"], "🇳🇬", ["45 milhões", "45 million", "45 millones"], ["0,6%", "0.6%", "0,6%"], ["Em iorubá, kékeré remete a pequeno, ajudando a construir uma forma afetiva do nome.", "In Yoruba, kékeré suggests smallness, helping build an affectionate version of the name.", "En yoruba, kékeré remite a pequeño y ayuda a construir una forma afectiva del nombre."]]
];

const countries = countryRows.map(([id, nickname, languageId, country, countryName, flag, speakers, share, curiosity]) => ({
  id,
  nickname,
  languageId,
  country,
  countryName,
  flag,
  speakers,
  share,
  curiosity
}));

const languageIds = ["english", "mandarin", "hindi", "spanish", "arabic", "french", "portuguese", "russian", "german", "japanese", "italian", "yoruba", "greek"];

const state = {
  stage: 0,
  selected: null,
  matched: [new Set(), new Set(), new Set()],
  finalAfterModal: false
};

const els = {
  track: document.querySelector("#stageTrack"),
  columns: [
    [document.querySelector("#blockOneFrom"), document.querySelector("#blockOneTo")],
    [document.querySelector("#blockTwoFrom"), document.querySelector("#blockTwoTo")],
    [document.querySelector("#blockThreeFrom"), document.querySelector("#blockThreeTo")]
  ],
  svgs: [document.querySelector("#svgOne"), document.querySelector("#svgTwo"), document.querySelector("#svgThree")],
  counts: [document.querySelector("#countOne"), document.querySelector("#countTwo"), document.querySelector("#countThree")],
  toast: document.querySelector("#toast"),
  modal: document.querySelector("#summaryModal"),
  modalClose: document.querySelector("#modalClose"),
  reset: document.querySelector("#resetButton")
};

const stageData = [
  {
    total: languageIds.length,
    from: languageIds.map((id) => ({ id, match: id, label: labelLanguage(id), kind: "language-country" })),
    to: languageIds.map((id) => ({ id, label: languages[id].ranking, kind: "rank" }))
  },
  {
    total: countries.length,
    from: countries.map((item) => ({ id: item.id, match: item.languageId, label: item.country[localeIndex], kind: "language-country" })),
    to: languageIds.map((id) => ({ id, label: `${languages[id].word} · ${labelLanguage(id)}`, kind: "word" }))
  },
  {
    total: countries.length,
    from: countries.map((item) => ({ id: item.id, match: item.id, label: item.nickname, kind: "nick" })),
    to: countries.map((item) => ({ id: item.id, label: item.country[localeIndex], kind: "language-country" }))
  }
];

function labelLanguage(id) {
  return languages[id].label[localeIndex];
}

function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function translateStatic() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.innerHTML = text[node.dataset.i18n];
  });
}

function makeOption({ label, id, match = id, stage, side, kind }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `option ${kind}`;
  button.textContent = label;
  Object.assign(button.dataset, { id, match, stage: String(stage), side });
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => choose(button));
  return button;
}

function renderOptions() {
  stageData.forEach((stage, stageIndex) => {
    const [from, to] = els.columns[stageIndex];
    from.style.gridTemplateRows = `repeat(${stage.from.length}, minmax(0, 1fr))`;
    to.style.gridTemplateRows = `repeat(${stage.to.length}, minmax(0, 1fr))`;
    from.replaceChildren(...shuffle(stage.from).map((item) => makeOption({ ...item, id: item.id, stage: stageIndex, side: "from" })));
    to.replaceChildren(...shuffle(stage.to).map((item) => makeOption({ ...item, stage: stageIndex, side: "to" })));
  });
}

function choose(button) {
  if (button.disabled) return;
  clearErrors();

  if (!state.selected || state.selected.stage !== button.dataset.stage || state.selected.side === button.dataset.side) {
    select(button);
    return;
  }

  const pair = [state.selected, readButton(button)];
  const from = pair.find((item) => item.side === "from");
  const to = pair.find((item) => item.side === "to");
  const stage = Number(button.dataset.stage);

  if (from.match === to.id) {
    connect(stage, from.id);
  } else {
    flashWrong(state.selected.node, button);
    showToast(text.tryAgain);
  }

  clearSelected();
}

function readButton(button) {
  return {
    id: button.dataset.id,
    match: button.dataset.match,
    stage: button.dataset.stage,
    side: button.dataset.side,
    node: button
  };
}

function select(button) {
  clearSelected();
  state.selected = readButton(button);
  button.classList.add("selected");
  button.setAttribute("aria-pressed", "true");
}

function clearSelected() {
  document.querySelectorAll(".option.selected").forEach((node) => {
    node.classList.remove("selected");
    node.setAttribute("aria-pressed", "false");
  });
  state.selected = null;
}

function connect(stage, id) {
  state.matched[stage].add(id);
  markDone(stage, id);
  update();

  if (stage === 2) {
    showSummary(findCountry(id));
    if (state.matched[stage].size === stageData[stage].total) {
      state.finalAfterModal = true;
    }
    return;
  }

  if (state.matched[stage].size === stageData[stage].total) {
    showToast(text.stepDone, "ok");
    window.setTimeout(() => goToStage(stage + 1), 520);
  }
}

function markDone(stage, id) {
  const from = document.querySelector(`[data-stage="${stage}"][data-side="from"][data-id="${CSS.escape(id)}"]`);
  if (!from) return;
  from.classList.add("done");
  from.disabled = true;

  const match = from.dataset.match;
  const unmatchedSameTarget = stageData[stage].from.some((item) => item.match === match && !state.matched[stage].has(item.id));
  const to = document.querySelector(`[data-stage="${stage}"][data-side="to"][data-id="${CSS.escape(match)}"]`);
  if (to && !unmatchedSameTarget) {
    to.classList.add("done");
    to.disabled = true;
  }
}

function update() {
  stageData.forEach((stage, index) => {
    els.counts[index].textContent = `${state.matched[index].size}/${stage.total} ${text.connected}`;
    drawConnections(index);
  });
}

function goToStage(index) {
  state.stage = index;
  setPanelSizes();
  setStageTransform();
  document.querySelectorAll(".stage-panel").forEach((panel, panelIndex) => {
    panel.toggleAttribute("aria-hidden", panelIndex !== index);
    panel.inert = panelIndex !== index;
  });
  window.setTimeout(() => {
    drawConnections(0);
    drawConnections(1);
    drawConnections(2);
    getStageFocusTarget(index)?.focus();
  }, 580);
}

function getStageFocusTarget(index) {
  if (index < 3) return document.querySelector(`[data-stage="${index}"][data-side="from"]:not(.done)`);
  return document.querySelector(".reset-link");
}

function setStageTransform() {
  els.track.style.marginLeft = `-${state.stage * window.innerWidth}px`;
}

function setPanelSizes() {
  const panels = document.querySelectorAll(".stage-panel");
  const width = `${window.innerWidth}px`;
  els.track.style.width = `${window.innerWidth * panels.length}px`;
  panels.forEach((panel) => {
    panel.style.width = width;
    panel.style.flexBasis = width;
  });
}

function drawConnections(stage) {
  const svg = els.svgs[stage];
  svg.innerHTML = "";
  state.matched[stage].forEach((id) => {
    const from = document.querySelector(`[data-stage="${stage}"][data-side="from"][data-id="${CSS.escape(id)}"]`);
    const toId = from?.dataset.match;
    const to = toId ? document.querySelector(`[data-stage="${stage}"][data-side="to"][data-id="${CSS.escape(toId)}"]`) : null;
    if (from && to) addConnection(svg, from, to);
  });
}

function addConnection(svg, fromNode, toNode) {
  const svgBox = svg.getBoundingClientRect();
  const fromBox = fromNode.getBoundingClientRect();
  const toBox = toNode.getBoundingClientRect();
  const start = { x: fromBox.right - svgBox.left, y: fromBox.top + fromBox.height / 2 - svgBox.top };
  const end = { x: toBox.left - svgBox.left, y: toBox.top + toBox.height / 2 - svgBox.top };
  const curve = Math.max(42, Math.abs(end.x - start.x) * 0.42);
  const ns = "http://www.w3.org/2000/svg";
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", `M ${start.x} ${start.y} C ${start.x + curve} ${start.y}, ${end.x - curve} ${end.y}, ${end.x} ${end.y}`);
  path.setAttribute("stroke", "#55a846");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("fill", "none");
  svg.appendChild(path);
  [start, end].forEach((point) => {
    const dot = document.createElementNS(ns, "circle");
    dot.setAttribute("cx", point.x);
    dot.setAttribute("cy", point.y);
    dot.setAttribute("r", "5");
    dot.setAttribute("fill", "#55a846");
    svg.appendChild(dot);
  });
}

function showSummary(item) {
  document.querySelector("#summaryHeading").textContent = item.country[localeIndex];
  document.querySelector("#summaryCountry").textContent = item.country[localeIndex];
  document.querySelector("#summaryNickname").textContent = item.nickname;
  document.querySelector("#summaryLanguage").textContent = `${labelLanguage(item.languageId)} ${item.flag}`;
  document.querySelector("#summaryRanking").textContent = languages[item.languageId].ranking;
  document.querySelector("#summarySpeakers").textContent = item.speakers[localeIndex];
  document.querySelector("#summaryShare").textContent = item.share[localeIndex];
  document.querySelector("#summaryCuriosity").textContent = item.curiosity[localeIndex];
  els.modal.hidden = false;
  els.modalClose.focus();
}

function closeSummary() {
  els.modal.hidden = true;
  if (state.finalAfterModal) {
    state.finalAfterModal = false;
    goToStage(3);
  } else {
    setPanelSizes();
    setStageTransform();
    update();
    getStageFocusTarget(2)?.focus();
  }
}

function showToast(message, tone = "error") {
  els.toast.textContent = message;
  els.toast.dataset.tone = tone;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 1700);
}

function flashWrong(...nodes) {
  nodes.forEach((node) => {
    node.classList.remove("error");
    void node.offsetWidth;
    node.classList.add("error");
  });
  window.setTimeout(clearErrors, 650);
}

function clearErrors() {
  document.querySelectorAll(".option.error").forEach((node) => node.classList.remove("error"));
}

function findCountry(id) {
  return countries.find((item) => item.id === id);
}

function resetGame() {
  window.location.reload();
}

els.modalClose.addEventListener("click", closeSummary);
els.modal.addEventListener("click", (event) => {
  if (event.target === els.modal) closeSummary();
});
els.reset.addEventListener("click", resetGame);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.modal.hidden) closeSummary();
});
window.addEventListener("resize", () => requestAnimationFrame(() => {
  setPanelSizes();
  setStageTransform();
  update();
}));

translateStatic();
setPanelSizes();
renderOptions();
document.querySelectorAll(".stage-panel").forEach((panel, panelIndex) => {
  panel.toggleAttribute("aria-hidden", panelIndex !== 0);
  panel.inert = panelIndex !== 0;
});
update();
