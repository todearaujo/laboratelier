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
    stepThree: "Final",
    stageOneTitle: "Conecte o Apelido ao País",
    stageOneSubtitle: "Como seriam apelidos carinhosos em cada língua?",
    stageTwoTitle: "Conecte o Idioma ao Ranking",
    stageTwoSubtitle: "Você sabe quais são as línguas mais faladas do mundo?",
    nicknames: "Apelidos",
    languageCountry: "Língua + país",
    languages: "Idiomas",
    rankings: "Rankings",
    connected: "conectados",
    blockOneDone: "Bloco 1 completo. Indo para o ranking...",
    tryAgain: "Essa conexão não fecha. Tente outra combinação.",
    locked: "Complete o Bloco 1 para liberar o ranking.",
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
    finalSubtitle: "Você conectou 15 idiomas, culturas e países diferentes.",
    restart: "Recomeçar"
  },
  "en-US": {
    stepOne: "Step 1",
    stepTwo: "Step 2",
    stepThree: "Final",
    stageOneTitle: "Connect the Nickname to the Country",
    stageOneSubtitle: "What would affectionate nicknames sound like in each language?",
    stageTwoTitle: "Connect the Language to the Ranking",
    stageTwoSubtitle: "Do you know which languages are the most spoken in the world?",
    nicknames: "Nicknames",
    languageCountry: "Language + country",
    languages: "Languages",
    rankings: "Rankings",
    connected: "connected",
    blockOneDone: "Block 1 complete. Moving to rankings...",
    tryAgain: "That connection does not close. Try another match.",
    locked: "Complete Block 1 to unlock the ranking.",
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
    finalSubtitle: "You connected 15 different languages, cultures, and countries.",
    restart: "Start again"
  },
  "es-ES": {
    stepOne: "Etapa 1",
    stepTwo: "Etapa 2",
    stepThree: "Final",
    stageOneTitle: "Conecta el Apodo con el País",
    stageOneSubtitle: "¿Cómo sonarían apodos cariñosos en cada idioma?",
    stageTwoTitle: "Conecta el Idioma con el Ranking",
    stageTwoSubtitle: "¿Sabes cuáles son los idiomas más hablados del mundo?",
    nicknames: "Apodos",
    languageCountry: "Idioma + país",
    languages: "Idiomas",
    rankings: "Rankings",
    connected: "conectados",
    blockOneDone: "Bloque 1 completo. Vamos al ranking...",
    tryAgain: "Esa conexión no cierra. Prueba otra combinación.",
    locked: "Completa el Bloque 1 para liberar el ranking.",
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
    finalSubtitle: "Conectaste 15 idiomas, culturas y países diferentes.",
    restart: "Empezar de nuevo"
  }
};

const languages = {
  english: { ranking: "#1", label: ["Inglês", "English", "Inglés"] },
  mandarin: { ranking: "#2", label: ["Mandarim", "Mandarin", "Mandarín"] },
  hindi: { ranking: "#3", label: ["Hindi", "Hindi", "Hindi"] },
  spanish: { ranking: "#4", label: ["Espanhol", "Spanish", "Español"] },
  arabic: { ranking: "#5", label: ["Árabe", "Arabic", "Árabe"] },
  french: { ranking: "#6", label: ["Francês", "French", "Francés"] },
  portuguese: { ranking: "#8", label: ["Português", "Portuguese", "Portugués"] },
  russian: { ranking: "#9", label: ["Russo", "Russian", "Ruso"] },
  german: { ranking: "#12", label: ["Alemão", "German", "Alemán"] },
  japanese: { ranking: "#13", label: ["Japonês", "Japanese", "Japonés"] },
  italian: { ranking: "#29", label: ["Italiano", "Italian", "Italiano"] },
  yoruba: { ranking: "~#35", label: ["Iorubá", "Yoruba", "Yoruba"] },
  greek: { ranking: "#86", label: ["Grego", "Greek", "Griego"] }
};

const data = [
  ["brazil", "Todinho", "portuguese", ["Brasil 🇧🇷", "Brazil 🇧🇷", "Brasil 🇧🇷"], "🇧🇷", ["265 milhões", "265 million", "265 millones"], ["3,3%", "3.3%", "3,3%"], ["Em português, o sufixo -inho deixa o nome mais carinhoso, pequeno e próximo.", "In Portuguese, the suffix -inho makes a name feel smaller, sweeter, and closer.", "En portugués, el sufijo -inho vuelve el nombre más cariñoso, pequeño y cercano."]],
  ["portugal", "Todezinho", "portuguese", ["Portugal 🇵🇹", "Portugal 🇵🇹", "Portugal 🇵🇹"], "🇵🇹", ["265 milhões", "265 million", "265 millones"], ["3,3%", "3.3%", "3,3%"], ["Em Portugal, -zinho também soa afetuoso, como uma forma doce de aproximar o nome.", "In Portugal, -zinho also sounds affectionate, like a gentle way to bring a name closer.", "En Portugal, -zinho también suena afectuoso, como una forma dulce de acercar el nombre."]],
  ["mexico", "Todito", "spanish", ["México 🇲🇽", "Mexico 🇲🇽", "México 🇲🇽"], "🇲🇽", ["559 milhões", "559 million", "559 millones"], ["6,9%", "6.9%", "6,9%"], ["O diminutivo -ito é muito comum no espanhol para demonstrar carinho e familiaridade.", "The diminutive -ito is common in Spanish for showing affection and familiarity.", "El diminutivo -ito es muy común en español para mostrar cariño y familiaridad."]],
  ["colombia", "Todico", "spanish", ["Colômbia 🇨🇴", "Colombia 🇨🇴", "Colombia 🇨🇴"], "🇨🇴", ["559 milhões", "559 million", "559 millones"], ["6,9%", "6.9%", "6,9%"], ["Na Colômbia, formas diminutivas e sonoras aparecem muito em apelidos afetivos.", "In Colombia, small and musical forms often appear in affectionate nicknames.", "En Colombia, las formas diminutivas y sonoras aparecen mucho en apodos cariñosos."]],
  ["united-states", "Todie", "english", ["Estados Unidos 🇺🇸", "United States 🇺🇸", "Estados Unidos 🇺🇸"], "🇺🇸", ["1,5 bilhão", "1.5 billion", "1,5 mil millones"], ["18,6%", "18.6%", "18,6%"], ["Em inglês, terminar nomes com som de -ie costuma deixar o apelido mais íntimo e brincalhão.", "In English, ending a name with an -ie sound often makes it feel warmer and more playful.", "En inglés, terminar nombres con sonido -ie suele hacer que el apodo suene más íntimo y juguetón."]],
  ["france", "Todet", "french", ["França 🇫🇷", "France 🇫🇷", "Francia 🇫🇷"], "🇫🇷", ["312 milhões", "312 million", "312 millones"], ["3,9%", "3.9%", "3,9%"], ["O francês usa terminações suaves e diminutivas para criar nomes com sensação delicada.", "French often uses soft endings and diminutive forms to make names feel delicate.", "El francés usa terminaciones suaves y diminutivas para crear nombres con una sensación delicada."]],
  ["italy", "Todino", "italian", ["Itália 🇮🇹", "Italy 🇮🇹", "Italia 🇮🇹"], "🇮🇹", ["68 milhões", "68 million", "68 millones"], ["0,8%", "0.8%", "0,8%"], ["No italiano, finais como -ino dão ao nome um tom pequeno, afetuoso e musical.", "In Italian, endings like -ino make a name feel small, affectionate, and musical.", "En italiano, finales como -ino dan al nombre un tono pequeño, afectuoso y musical."]],
  ["germany", "Tödchen", "german", ["Alemanha 🇩🇪", "Germany 🇩🇪", "Alemania 🇩🇪"], "🇩🇪", ["134 milhões", "134 million", "134 millones"], ["1,7%", "1.7%", "1,7%"], ["Em alemão, -chen é um diminutivo clássico usado para indicar pequenez ou ternura.", "In German, -chen is a classic diminutive used to suggest smallness or tenderness.", "En alemán, -chen es un diminutivo clásico usado para indicar pequeñez o ternura."]],
  ["russia", "Todik", "russian", ["Rússia 🇷🇺", "Russia 🇷🇺", "Rusia 🇷🇺"], "🇷🇺", ["258 milhões", "258 million", "258 millones"], ["3,2%", "3.2%", "3,2%"], ["O russo tem muitas formas afetivas de nomes, frequentemente com terminações curtas e calorosas.", "Russian has many affectionate name forms, often with short, warm endings.", "El ruso tiene muchas formas afectivas de nombres, a menudo con terminaciones cortas y cálidas."]],
  ["greece", "Todakis", "greek", ["Grécia 🇬🇷", "Greece 🇬🇷", "Grecia 🇬🇷"], "🇬🇷", ["13 milhões", "13 million", "13 millones"], ["0,2%", "0.2%", "0,2%"], ["Em grego, terminações como -akis podem dar uma sensação familiar ou regional ao apelido.", "In Greek, endings like -akis can give a nickname a familiar or regional feeling.", "En griego, terminaciones como -akis pueden dar al apodo una sensación familiar o regional."]],
  ["china", "Xiǎo Tode", "mandarin", ["China 🇨🇳", "China 🇨🇳", "China 🇨🇳"], "🇨🇳", ["1,1 bilhão", "1.1 billion", "1,1 mil millones"], ["13,5%", "13.5%", "13,5%"], ["Xiǎo significa pequeno e é usado antes de nomes para soar próximo, jovem ou carinhoso.", "Xiǎo means small and can be placed before names to sound close, young, or affectionate.", "Xiǎo significa pequeño y se usa antes de nombres para sonar cercano, joven o cariñoso."]],
  ["japan", "Tode-chan", "japanese", ["Japão 🇯🇵", "Japan 🇯🇵", "Japón 🇯🇵"], "🇯🇵", ["126 milhões", "126 million", "126 millones"], ["1,5%", "1.5%", "1,5%"], ["-chan é um sufixo afetivo usado para demonstrar proximidade, carinho ou fofura.", "-chan is an affectionate suffix used to show closeness, care, or cuteness.", "-chan es un sufijo afectivo usado para demostrar cercanía, cariño o ternura."]],
  ["india", "Todu", "hindi", ["Índia 🇮🇳", "India 🇮🇳", "India 🇮🇳"], "🇮🇳", ["609 milhões", "609 million", "609 millones"], ["7,5%", "7.5%", "7,5%"], ["Em hindi, apelidos familiares muitas vezes encurtam ou arredondam nomes para soar mais íntimos.", "In Hindi, family nicknames often shorten or round names to make them feel more intimate.", "En hindi, los apodos familiares muchas veces acortan o redondean nombres para sonar más íntimos."]],
  ["egypt", "Todeyib", "arabic", ["Egito 🇪🇬", "Egypt 🇪🇬", "Egipto 🇪🇬"], "🇪🇬", ["334 milhões", "334 million", "334 millones"], ["4,1%", "4.1%", "4,1%"], ["No árabe, carinho pode aparecer em variações sonoras e formas próximas usadas em família.", "In Arabic, affection can appear through sound variations and close family forms.", "En árabe, el cariño puede aparecer en variaciones sonoras y formas cercanas usadas en familia."]],
  ["nigeria", "Todekékeré", "yoruba", ["Nigéria 🇳🇬", "Nigeria 🇳🇬", "Nigeria 🇳🇬"], "🇳🇬", ["45 milhões", "45 million", "45 millones"], ["0,6%", "0.6%", "0,6%"], ["Em iorubá, kékeré remete a pequeno, ajudando a construir uma forma afetiva do nome.", "In Yoruba, kékeré suggests smallness, helping build an affectionate version of the name.", "En yoruba, kékeré remite a pequeño y ayuda a construir una forma afectiva del nombre."]]
].map(([id, nickname, languageId, country, flag, speakers, share, curiosity]) => ({ id, nickname, languageId, country, flag, speakers, share, curiosity }));

const state = {
  stage: 0,
  selected: null,
  blockOne: new Map(),
  blockTwo: new Set(),
  finalAfterModal: false
};

const els = {
  track: document.querySelector("#stageTrack"),
  oneFrom: document.querySelector("#blockOneFrom"),
  oneTo: document.querySelector("#blockOneTo"),
  twoFrom: document.querySelector("#blockTwoFrom"),
  twoTo: document.querySelector("#blockTwoTo"),
  svgOne: document.querySelector("#svgOne"),
  svgTwo: document.querySelector("#svgTwo"),
  countOne: document.querySelector("#countOne"),
  countTwo: document.querySelector("#countTwo"),
  toast: document.querySelector("#toast"),
  modal: document.querySelector("#summaryModal"),
  modalClose: document.querySelector("#modalClose"),
  reset: document.querySelector("#resetButton")
};

const text = copy[locale];

function labelLanguage(id) {
  return languages[id].label[localeIndex];
}

function labelLanguageCountry(item) {
  return `${labelLanguage(item.languageId)} ${item.flag}`;
}

function labelRank(item) {
  return `${languages[item.languageId].ranking} · ${labelLanguage(item.languageId)} ${item.flag}`;
}

function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

const orders = {
  oneFrom: shuffle(data),
  oneTo: shuffle(data),
  twoFrom: shuffle(data),
  twoTo: shuffle(data)
};

function translateStatic() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.innerHTML = text[node.dataset.i18n];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", text[node.dataset.i18nAriaLabel]);
  });
}

function makeOption({ label, id, block, side, kind }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `option ${kind}`;
  button.textContent = label;
  Object.assign(button.dataset, { id, block, side });
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => choose(button));
  return button;
}

function renderOptions() {
  els.oneFrom.replaceChildren(...orders.oneFrom.map((item) => makeOption({
    label: item.nickname,
    id: item.id,
    block: "one",
    side: "from",
    kind: "nick"
  })));
  els.oneTo.replaceChildren(...orders.oneTo.map((item) => makeOption({
    label: labelLanguageCountry(item),
    id: item.id,
    block: "one",
    side: "to",
    kind: "language-country"
  })));
  els.twoFrom.replaceChildren(...orders.twoFrom.map((item) => makeOption({
    label: labelLanguageCountry(item),
    id: item.id,
    block: "two",
    side: "from",
    kind: "language-country"
  })));
  els.twoTo.replaceChildren(...orders.twoTo.map((item) => makeOption({
    label: labelRank(item),
    id: item.id,
    block: "two",
    side: "to",
    kind: "rank"
  })));
}

function choose(button) {
  if (button.dataset.block === "two" && state.blockOne.size < data.length) {
    showToast(text.locked);
    return;
  }

  clearErrors();

  if (!state.selected || state.selected.block !== button.dataset.block || state.selected.side === button.dataset.side) {
    select(button);
    return;
  }

  const pair = [state.selected, button.dataset];
  const from = pair.find((item) => item.side === "from");
  const to = pair.find((item) => item.side === "to");

  if (button.dataset.block === "one") {
    connectBlockOne(from.id, to.id);
  } else {
    connectBlockTwo(from.id, to.id);
  }

  clearSelected();
}

function select(button) {
  clearSelected();
  state.selected = { id: button.dataset.id, block: button.dataset.block, side: button.dataset.side };
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

function connectBlockOne(fromId, toId) {
  if (fromId === toId) {
    state.blockOne.set(fromId, toId);
    markDone("one", fromId);
    update();
    if (state.blockOne.size === data.length) {
      showToast(text.blockOneDone, "ok");
      window.setTimeout(() => goToStage(1), 520);
    }
    return;
  }
  flashPair("one", fromId, toId);
  showToast(text.tryAgain);
}

function connectBlockTwo(fromId, toId) {
  if (fromId === toId) {
    state.blockTwo.add(fromId);
    markDone("two", fromId);
    update();
    showSummary(findItem(fromId));
    if (state.blockTwo.size === data.length) {
      state.finalAfterModal = true;
    }
    return;
  }
  flashPair("two", fromId, toId);
  showToast(text.tryAgain);
}

function markDone(block, id) {
  document.querySelectorAll(`[data-block="${block}"][data-id="${CSS.escape(id)}"]`).forEach((node) => {
    node.classList.add("done");
  });
}

function update() {
  els.countOne.textContent = `${state.blockOne.size}/15 ${text.connected}`;
  els.countTwo.textContent = `${state.blockTwo.size}/15 ${text.connected}`;
  drawConnections("one");
  drawConnections("two");
}

function goToStage(index) {
  state.stage = index;
  setPanelSizes();
  setStageTransform();
  document.querySelectorAll(".stage-panel").forEach((panel, panelIndex) => {
    panel.toggleAttribute("aria-hidden", panelIndex !== index);
  });
  window.setTimeout(() => {
    drawConnections("one");
    drawConnections("two");
    const first = document.querySelector(index === 1 ? '[data-block="two"][data-side="from"]:not(.done)' : ".reset-link");
    first?.focus();
  }, 580);
}

function setStageTransform() {
  els.track.style.marginLeft = `-${state.stage * window.innerWidth}px`;
}

function setPanelSizes() {
  const width = `${window.innerWidth}px`;
  els.track.style.width = `${window.innerWidth * 3}px`;
  document.querySelectorAll(".stage-panel").forEach((panel) => {
    panel.style.width = width;
    panel.style.flexBasis = width;
  });
}

function drawConnections(block) {
  const svg = block === "one" ? els.svgOne : els.svgTwo;
  const source = block === "one" ? state.blockOne : new Map([...state.blockTwo].map((id) => [id, id]));
  svg.innerHTML = "";
  source.forEach((toId, fromId) => {
    const from = document.querySelector(`[data-block="${block}"][data-side="from"][data-id="${CSS.escape(fromId)}"]`);
    const to = document.querySelector(`[data-block="${block}"][data-side="to"][data-id="${CSS.escape(toId)}"]`);
    if (from && to) addConnection(svg, from, to);
  });
}

function addConnection(svg, fromNode, toNode) {
  const svgBox = svg.getBoundingClientRect();
  const fromBox = fromNode.getBoundingClientRect();
  const toBox = toNode.getBoundingClientRect();
  const from = { x: fromBox.right - svgBox.left, y: fromBox.top + fromBox.height / 2 - svgBox.top };
  const to = { x: toBox.left - svgBox.left, y: toBox.top + toBox.height / 2 - svgBox.top };
  const ns = "http://www.w3.org/2000/svg";
  const line = document.createElementNS(ns, "line");
  line.setAttribute("x1", from.x);
  line.setAttribute("y1", from.y);
  line.setAttribute("x2", to.x);
  line.setAttribute("y2", to.y);
  line.setAttribute("stroke", "#55a846");
  line.setAttribute("stroke-width", "4");
  line.setAttribute("stroke-linecap", "round");
  svg.appendChild(line);
  [from, to].forEach((point) => {
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
    goToStage(2);
  } else {
    setPanelSizes();
    setStageTransform();
    update();
  }
}

function showToast(message, tone = "error") {
  els.toast.textContent = message;
  els.toast.dataset.tone = tone;
  els.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 1700);
}

function flashPair(block, fromId, toId) {
  [fromId, toId].forEach((id) => {
    document.querySelectorAll(`[data-block="${block}"][data-id="${CSS.escape(id)}"]`).forEach((node) => {
      node.classList.remove("error");
      requestAnimationFrame(() => node.classList.add("error"));
    });
  });
}

function clearErrors() {
  document.querySelectorAll(".option.error").forEach((node) => node.classList.remove("error"));
}

function findItem(id) {
  return data.find((item) => item.id === id);
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
update();
