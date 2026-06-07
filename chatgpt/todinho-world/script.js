const locale = document.documentElement.lang.startsWith("en") ? "en-US" : document.documentElement.lang.startsWith("es") ? "es-ES" : "pt-BR";
const li = { "pt-BR": 0, "en-US": 1, "es-ES": 2 }[locale];
const copy = {
  "pt-BR": {
    title: "TODE @<br>PELO MUNDO 🌎", subtitle: "Como seria um apelido carinhoso para Tode em outras línguas?", boardLabel: "Jogo de conexões", blockOne: "Bloco 1", blockOnePrompt: "Ligue o apelido ao país", blockTwo: "Bloco 2", blockTwoPrompt: "Ligue o país ao ranking da língua", nicknames: "Apelidos", countries: "Países", languageRanking: "Ranking da Língua", wrongConnection: "Ops! Conexão incorreta.", tryAgain: "Tente conectar novamente.", chainComplete: "Cadeia completa! ✨", nicknameLabel: "Apelido:", languageLabel: "Idioma:", rankingLabel: "Ranking:", speakersLabel: "Falantes:", shareLabel: "Participação global:", curiosityLabel: "Curiosidade:", continue: "Continuar conectando!", finalTitle: "Muitos apelidos.<br>Um só Tode.", finalSubtitle: "Você conectou 15 idiomas, culturas e países diferentes.", finalLine: "Mesmo nome. Muitos mundos.", restart: "Recomeçar jornada", footer: "🌎 Muitos apelidos. Um só Tode. ♥", connected: "conectados", rules: "<strong>Regras:</strong> conecte primeiro o apelido ao país. Depois, conecte o país ao ranking da língua. Se errar no Bloco 2, essa cadeia volta ao começo.", notReady: (c) => `Primeiro conecte ${c} a um apelido no Bloco 1.`, wrongSecond: (c) => `A conexão do ${c} não foi concluída. Você voltou para o início desse país.`
  },
  "en-US": {
    title: "TODE @<br>AROUND THE WORLD 🌎", subtitle: "What would a sweet nickname for Tode sound like in other languages?", boardLabel: "Connection game", blockOne: "Block 1", blockOnePrompt: "Connect the nickname to the country", blockTwo: "Block 2", blockTwoPrompt: "Connect the country to the language ranking", nicknames: "Nicknames", countries: "Countries", languageRanking: "Language Ranking", wrongConnection: "Oops! Wrong connection.", tryAgain: "Try connecting again.", chainComplete: "Chain complete! ✨", nicknameLabel: "Nickname:", languageLabel: "Language:", rankingLabel: "Ranking:", speakersLabel: "Speakers:", shareLabel: "Global share:", curiosityLabel: "Curiosity:", continue: "Keep connecting!", finalTitle: "Many nicknames.<br>One Tode.", finalSubtitle: "You connected 15 different languages, cultures, and countries.", finalLine: "Same name. Many worlds.", restart: "Start again", footer: "🌎 Many nicknames. One Tode. ♥", connected: "connected", rules: "<strong>Rules:</strong> first connect the nickname to the country. Then connect the country to the language ranking. If you miss in Block 2, that chain goes back to the start.", notReady: (c) => `First connect ${c} to a nickname in Block 1.`, wrongSecond: (c) => `${c} was not completed. You are back at the start of that country.`
  },
  "es-ES": {
    title: "TODE @<br>POR EL MUNDO 🌎", subtitle: "¿Cómo sonaría un apodo cariñoso para Tode en otros idiomas?", boardLabel: "Juego de conexiones", blockOne: "Bloque 1", blockOnePrompt: "Conecta el apodo con el país", blockTwo: "Bloque 2", blockTwoPrompt: "Conecta el país con el ranking del idioma", nicknames: "Apodos", countries: "Países", languageRanking: "Ranking del Idioma", wrongConnection: "¡Ups! Conexión incorrecta.", tryAgain: "Intenta conectar de nuevo.", chainComplete: "¡Cadena completa! ✨", nicknameLabel: "Apodo:", languageLabel: "Idioma:", rankingLabel: "Ranking:", speakersLabel: "Hablantes:", shareLabel: "Participación global:", curiosityLabel: "Curiosidad:", continue: "¡Seguir conectando!", finalTitle: "Muchos apodos.<br>Un solo Tode.", finalSubtitle: "Conectaste 15 idiomas, culturas y países diferentes.", finalLine: "Mismo nombre. Muchos mundos.", restart: "Empezar de nuevo", footer: "🌎 Muchos apodos. Un solo Tode. ♥", connected: "conectados", rules: "<strong>Reglas:</strong> primero conecta el apodo con el país. Después, conecta el país con el ranking del idioma. Si fallas en el Bloque 2, esa cadena vuelve al comienzo.", notReady: (c) => `Primero conecta ${c} con un apodo en el Bloque 1.`, wrongSecond: (c) => `La conexión de ${c} no se completó. Volviste al inicio de ese país.`
  }
};
const t = copy[locale];
const languages = {
  english: ["#1", ["Inglês", "English", "Inglés"]], mandarin: ["#2", ["Mandarim", "Mandarin", "Mandarín"]], hindi: ["#3", ["Hindi", "Hindi", "Hindi"]], spanish: ["#4", ["Espanhol", "Spanish", "Español"]], arabic: ["#5", ["Árabe", "Arabic", "Árabe"]], french: ["#6", ["Francês", "French", "Francés"]], portuguese: ["#8", ["Português", "Portuguese", "Portugués"]], russian: ["#9", ["Russo", "Russian", "Ruso"]], german: ["#12", ["Alemão", "German", "Alemán"]], japanese: ["#13", ["Japonês", "Japanese", "Japonés"]], italian: ["#29", ["Italiano", "Italian", "Italiano"]], yoruba: ["~#35", ["Iorubá", "Yoruba", "Yoruba"]], greek: ["#86", ["Grego", "Greek", "Griego"]]
};
const rankOrder = ["english", "mandarin", "hindi", "spanish", "arabic", "french", "portuguese", "russian", "german", "japanese", "italian", "yoruba", "greek"];
const rows = [
  ["brazil", "Todinho", "portuguese", ["Brasil 🇧🇷", "Brazil 🇧🇷", "Brasil 🇧🇷"], ["265 milhões", "265 million", "265 millones"], ["3,3%", "3.3%", "3,3%"], ["Em português, o sufixo -inho deixa o nome mais carinhoso, pequeno e próximo.", "In Portuguese, the suffix -inho makes a name feel smaller, sweeter, and closer.", "En portugués, el sufijo -inho vuelve el nombre más cariñoso, pequeño y cercano."]],
  ["portugal", "Todezinho", "portuguese", ["Portugal 🇵🇹", "Portugal 🇵🇹", "Portugal 🇵🇹"], ["265 milhões", "265 million", "265 millones"], ["3,3%", "3.3%", "3,3%"], ["Em Portugal, -zinho também soa afetuoso, como uma forma doce de aproximar o nome.", "In Portugal, -zinho also sounds affectionate, like a gentle way to bring a name closer.", "En Portugal, -zinho también suena afectuoso, como una forma dulce de acercar el nombre."]],
  ["mexico", "Todito", "spanish", ["México 🇲🇽", "Mexico 🇲🇽", "México 🇲🇽"], ["559 milhões", "559 million", "559 millones"], ["6,9%", "6.9%", "6,9%"], ["O diminutivo -ito é muito comum no espanhol para demonstrar carinho e familiaridade.", "The diminutive -ito is common in Spanish for showing affection and familiarity.", "El diminutivo -ito es muy común en español para mostrar cariño y familiaridad."]],
  ["colombia", "Todico", "spanish", ["Colômbia 🇨🇴", "Colombia 🇨🇴", "Colombia 🇨🇴"], ["559 milhões", "559 million", "559 millones"], ["6,9%", "6.9%", "6,9%"], ["Na Colômbia, formas diminutivas e sonoras aparecem muito em apelidos afetivos.", "In Colombia, small and musical forms often appear in affectionate nicknames.", "En Colombia, las formas diminutivas y sonoras aparecen mucho en apodos cariñosos."]],
  ["united-states", "Todie", "english", ["Estados Unidos 🇺🇸", "United States 🇺🇸", "Estados Unidos 🇺🇸"], ["1,5 bilhão", "1.5 billion", "1,5 mil millones"], ["18,6%", "18.6%", "18,6%"], ["Em inglês, terminar nomes com som de -ie costuma deixar o apelido mais íntimo e brincalhão.", "In English, ending a name with an -ie sound often makes it feel warmer and more playful.", "En inglés, terminar nombres con sonido -ie suele hacer que el apodo suene más íntimo y juguetón."]],
  ["france", "Todet", "french", ["França 🇫🇷", "France 🇫🇷", "Francia 🇫🇷"], ["312 milhões", "312 million", "312 millones"], ["3,9%", "3.9%", "3,9%"], ["O francês usa terminações suaves e diminutivas para criar nomes com sensação delicada.", "French often uses soft endings and diminutive forms to make names feel delicate.", "El francés usa terminaciones suaves y diminutivas para crear nombres con una sensación delicada."]],
  ["italy", "Todino", "italian", ["Itália 🇮🇹", "Italy 🇮🇹", "Italia 🇮🇹"], ["68 milhões", "68 million", "68 millones"], ["0,8%", "0.8%", "0,8%"], ["No italiano, finais como -ino dão ao nome um tom pequeno, afetuoso e musical.", "In Italian, endings like -ino make a name feel small, affectionate, and musical.", "En italiano, finales como -ino dan al nombre un tono pequeño, afectuoso y musical."]],
  ["germany", "Tödchen", "german", ["Alemanha 🇩🇪", "Germany 🇩🇪", "Alemania 🇩🇪"], ["134 milhões", "134 million", "134 millones"], ["1,7%", "1.7%", "1,7%"], ["Em alemão, -chen é um diminutivo clássico usado para indicar pequenez ou ternura.", "In German, -chen is a classic diminutive used to suggest smallness or tenderness.", "En alemán, -chen es un diminutivo clásico usado para indicar pequeñez o ternura."]],
  ["russia", "Todik", "russian", ["Rússia 🇷🇺", "Russia 🇷🇺", "Rusia 🇷🇺"], ["258 milhões", "258 million", "258 millones"], ["3,2%", "3.2%", "3,2%"], ["O russo tem muitas formas afetivas de nomes, frequentemente com terminações curtas e calorosas.", "Russian has many affectionate name forms, often with short, warm endings.", "El ruso tiene muchas formas afectivas de nombres, a menudo con terminaciones cortas y cálidas."]],
  ["greece", "Todakis", "greek", ["Grécia 🇬🇷", "Greece 🇬🇷", "Grecia 🇬🇷"], ["13 milhões", "13 million", "13 millones"], ["0,2%", "0.2%", "0,2%"], ["Em grego, terminações como -akis podem dar uma sensação familiar ou regional ao apelido.", "In Greek, endings like -akis can give a nickname a familiar or regional feeling.", "En griego, terminaciones como -akis pueden dar al apodo una sensación familiar o regional."]],
  ["china", "Xiǎo Tode", "mandarin", ["China 🇨🇳", "China 🇨🇳", "China 🇨🇳"], ["1,1 bilhão", "1.1 billion", "1,1 mil millones"], ["13,5%", "13.5%", "13,5%"], ["Xiǎo significa pequeno e é usado antes de nomes para soar próximo, jovem ou carinhoso.", "Xiǎo means small and can be placed before names to sound close, young, or affectionate.", "Xiǎo significa pequeño y se usa antes de nombres para sonar cercano, joven o cariñoso."]],
  ["japan", "Tode-chan", "japanese", ["Japão 🇯🇵", "Japan 🇯🇵", "Japón 🇯🇵"], ["126 milhões", "126 million", "126 millones"], ["1,5%", "1.5%", "1,5%"], ["-chan é um sufixo afetivo usado para demonstrar proximidade, carinho ou fofura.", "-chan is an affectionate suffix used to show closeness, care, or cuteness.", "-chan es un sufijo afectivo usado para demostrar cercanía, cariño o ternura."]],
  ["india", "Todu", "hindi", ["Índia 🇮🇳", "India 🇮🇳", "India 🇮🇳"], ["609 milhões", "609 million", "609 millones"], ["7,5%", "7.5%", "7,5%"], ["Em hindi, apelidos familiares muitas vezes encurtam ou arredondam nomes para soar mais íntimos.", "In Hindi, family nicknames often shorten or round names to make them feel more intimate.", "En hindi, los apodos familiares muchas veces acortan o redondean nombres para sonar más íntimos."]],
  ["egypt", "Todeyib", "arabic", ["Egito 🇪🇬", "Egypt 🇪🇬", "Egipto 🇪🇬"], ["334 milhões", "334 million", "334 millones"], ["4,1%", "4.1%", "4,1%"], ["No árabe, carinho pode aparecer em variações sonoras e formas próximas usadas em família.", "In Arabic, affection can appear through sound variations and close family forms.", "En árabe, el cariño puede aparecer en variaciones sonoras y formas cercanas usadas en familia."]],
  ["nigeria", "Todekékeré", "yoruba", ["Nigéria 🇳🇬", "Nigeria 🇳🇬", "Nigeria 🇳🇬"], ["45 milhões", "45 million", "45 millones"], ["0,6%", "0.6%", "0,6%"], ["Em iorubá, kékeré remete a pequeno, ajudando a construir uma forma afetiva do nome.", "In Yoruba, kékeré suggests smallness, helping build an affectionate version of the name.", "En yoruba, kékeré remite a pequeño y ayuda a construir una forma afectiva del nombre."]]
];
const data = rows.map(([id, nickname, languageId, country, speakers, share, curiosity]) => ({ id, nickname, languageId, country, speakers, share, curiosity }));
const state = { selected: null, pendingCountryByNickname: new Map(), completedCountryIds: new Set() };
const els = {
  nicknameList: document.querySelector("#nicknameList"), countryListOne: document.querySelector("#countryListOne"), countryListTwo: document.querySelector("#countryListTwo"), rankList: document.querySelector("#rankList"), progressText: document.querySelector("#progressText"), errorNotice: document.querySelector("#errorNotice"), errorText: document.querySelector("#errorText"), discoveryCard: document.querySelector("#discoveryCard"), finalScreen: document.querySelector("#finalScreen"), continueButton: document.querySelector("#continueButton"), resetButton: document.querySelector("#resetButton")
};
const countryLabel = (item) => item.country[li];
const languageLabel = (id) => languages[id][1][li];
const rankText = (id) => `${languages[id][0]} · ${languageLabel(id)}`;
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => node.innerHTML = t[node.dataset.i18n]);
  document.querySelectorAll("[data-i18n-html]").forEach((node) => node.innerHTML = t[node.dataset.i18nHtml]);
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => node.setAttribute("aria-label", t[node.dataset.i18nAriaLabel]));
}
function node({ label, kind, side, block, id, index }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `node ${kind}`;
  button.textContent = label;
  Object.assign(button.dataset, { kind, side, block, id, index });
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => selectNode(button));
  return button;
}
function renderLists() {
  els.nicknameList.replaceChildren(); els.countryListOne.replaceChildren(); els.countryListTwo.replaceChildren(); els.rankList.replaceChildren();
  data.forEach((item, index) => {
    els.nicknameList.appendChild(node({ label: item.nickname, kind: "nick", side: "from", block: "nick-country", id: item.nickname, index }));
    els.countryListOne.appendChild(node({ label: countryLabel(item), kind: "country", side: "to", block: "nick-country", id: item.id, index }));
    els.countryListTwo.appendChild(node({ label: countryLabel(item), kind: "country", side: "from", block: "country-rank", id: item.id, index }));
  });
  rankOrder.forEach((id, index) => els.rankList.appendChild(node({ label: rankText(id), kind: "rank", side: "to", block: "country-rank", id, index })));
}
function selectNode(button) {
  clearTransientErrors();
  const current = button.dataset;
  if (current.block === "country-rank" && current.side === "from" && !hasPendingCountry(current.id)) {
    flash(button); showError(t.notReady(countryLabel(findItem(current.id)))); focusNicknameColumn(); return;
  }
  if (!state.selected || state.selected.block !== current.block || state.selected.side === current.side) {
    setSelected(button); return;
  }
  const pair = [state.selected, current];
  const from = pair.find((entry) => entry.side === "from");
  const to = pair.find((entry) => entry.side === "to");
  if (state.selected.block === "nick-country") attemptNickCountry(from.id, to.id);
  else attemptCountryRank(from.id, to.id);
  clearSelected();
}
function hasPendingCountry(id) { return Array.from(state.pendingCountryByNickname.values()).includes(id); }
function setSelected(button) { clearSelected(); state.selected = { id: button.dataset.id, block: button.dataset.block, side: button.dataset.side }; button.classList.add("selected"); button.setAttribute("aria-pressed", "true"); }
function clearSelected() { document.querySelectorAll(".node.selected").forEach((n) => { n.classList.remove("selected"); n.setAttribute("aria-pressed", "false"); }); state.selected = null; }
function attemptNickCountry(nickname, countryId) {
  const item = data.find((entry) => entry.nickname === nickname);
  if (item && item.id === countryId) { state.pendingCountryByNickname.set(nickname, countryId); hideError(); updateAll(); focusCountryRank(countryId); return; }
  flash(findNode("nick-country", "to", countryId)); updateAll();
}
function attemptCountryRank(countryId, languageId) {
  const item = findItem(countryId);
  if (item && state.pendingCountryByNickname.get(item.nickname) === countryId && languageId === item.languageId) {
    state.completedCountryIds.add(countryId); hideError(); showDiscovery(item); updateAll(); return;
  }
  if (item) { state.pendingCountryByNickname.delete(item.nickname); state.completedCountryIds.delete(countryId); }
  showError(t.wrongSecond(countryLabel(item))); focusNicknameColumn(); updateAll(countryId, languageId);
}
function showDiscovery(item) {
  els.discoveryCard.hidden = false;
  document.querySelector("#cardCountry").textContent = countryLabel(item);
  document.querySelector("#cardNickname").textContent = item.nickname;
  document.querySelector("#cardLanguage").textContent = languageLabel(item.languageId);
  document.querySelector("#cardRanking").textContent = languages[item.languageId][0];
  document.querySelector("#cardSpeakers").textContent = item.speakers[li];
  document.querySelector("#cardShare").textContent = item.share[li];
  document.querySelector("#cardCuriosity").textContent = item.curiosity[li];
}
function showError(message) { els.errorText.textContent = message; els.errorNotice.hidden = false; }
function hideError() { els.errorNotice.hidden = true; }
function flash(node) { if (!node) return; node.classList.remove("error"); requestAnimationFrame(() => node.classList.add("error")); }
function clearTransientErrors() { document.querySelectorAll(".node.error").forEach((node) => node.classList.remove("error")); }
function focusNicknameColumn() { const firstOpen = data.find((item) => !state.completedCountryIds.has(item.id)); findNode("nick-country", "from", firstOpen?.nickname || data[0].nickname)?.focus(); }
function focusCountryRank(id) { findNode("country-rank", "from", id)?.focus(); }
function updateAll(errorCountryId, errorLanguageId) {
  const completed = state.completedCountryIds.size;
  els.progressText.textContent = `${completed}/15 ${t.connected}`;
  els.finalScreen.hidden = completed !== data.length;
  if (completed === data.length) { els.discoveryCard.hidden = true; hideError(); }
  document.querySelectorAll(".node").forEach((n) => n.classList.remove("pending", "done"));
  data.forEach((item) => {
    const pending = state.pendingCountryByNickname.get(item.nickname) === item.id;
    const done = state.completedCountryIds.has(item.id);
    if (pending || done) {
      findNode("nick-country", "from", item.nickname)?.classList.add(done ? "done" : "pending");
      findNode("nick-country", "to", item.id)?.classList.add(done ? "done" : "pending");
      findNode("country-rank", "from", item.id)?.classList.add(done ? "done" : "pending");
    }
  });
  state.completedCountryIds.forEach((id) => { const item = findItem(id); if (item) findNode("country-rank", "to", item.languageId)?.classList.add("done"); });
  if (errorCountryId) { findNode("country-rank", "from", errorCountryId)?.classList.add("error"); findNode("country-rank", "to", errorLanguageId)?.classList.add("error"); }
  drawConnections(errorCountryId, errorLanguageId);
}
function findItem(id) { return data.find((entry) => entry.id === id); }
function findNode(block, side, id) { return document.querySelector(`[data-block="${block}"][data-side="${side}"][data-id="${CSS.escape(id)}"]`); }
function drawConnections(errorCountryId, errorLanguageId) {
  drawBlock({ svg: document.querySelector("#svgNickCountry"), fromNodes: [...els.nicknameList.children], toNodes: [...els.countryListOne.children], connections: data.filter((item) => state.pendingCountryByNickname.get(item.nickname) === item.id || state.completedCountryIds.has(item.id)).map((item) => ({ from: item.nickname, to: item.id, status: state.completedCountryIds.has(item.id) ? "done" : "pending" })) });
  const rankConnections = data.filter((item) => state.completedCountryIds.has(item.id)).map((item) => ({ from: item.id, to: item.languageId, status: "done" }));
  if (errorCountryId && errorLanguageId) rankConnections.push({ from: errorCountryId, to: errorLanguageId, status: "error" });
  drawBlock({ svg: document.querySelector("#svgCountryRank"), fromNodes: [...els.countryListTwo.children], toNodes: [...els.rankList.children], connections: rankConnections });
}
function drawBlock({ svg, fromNodes, toNodes, connections }) {
  const box = svg.parentElement.getBoundingClientRect();
  const width = Math.max(1, Math.round(box.width));
  const height = Math.max(1, Math.round(box.height));
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`); svg.innerHTML = "";
  for (let i = 0; i < Math.min(fromNodes.length, toNodes.length); i += 1) addLine(svg, pointFor(fromNodes[i], svg, "right"), pointFor(toNodes[i], svg, "left"), "guide");
  connections.forEach((connection) => addLine(svg, pointFor(fromNodes.find((node) => node.dataset.id === connection.from), svg, "right"), pointFor(toNodes.find((node) => node.dataset.id === connection.to), svg, "left"), connection.status));
}
function pointFor(node, svg, side) {
  if (!node) return { x: 0, y: 0 };
  const nodeBox = node.getBoundingClientRect();
  const svgBox = svg.getBoundingClientRect();
  return { x: side === "right" ? 0 : svgBox.width, y: nodeBox.top + nodeBox.height / 2 - svgBox.top };
}
function addLine(svg, from, to, status) {
  const ns = "http://www.w3.org/2000/svg";
  const line = document.createElementNS(ns, "line");
  line.setAttribute("x1", from.x); line.setAttribute("y1", from.y); line.setAttribute("x2", to.x); line.setAttribute("y2", to.y);
  line.setAttribute("stroke-width", status === "guide" ? "2" : "4"); line.setAttribute("stroke-linecap", "round"); line.setAttribute("stroke", status === "error" ? "#e9473f" : status === "guide" ? "#aab2c1" : "#55a846");
  if (status === "guide") { line.setAttribute("stroke-dasharray", "2 7"); line.setAttribute("opacity", "0.75"); }
  svg.appendChild(line); addDot(svg, from, status); addDot(svg, to, status);
}
function addDot(svg, point, status) {
  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("cx", point.x); dot.setAttribute("cy", point.y); dot.setAttribute("r", status === "guide" ? "4" : "5"); dot.setAttribute("fill", status === "error" ? "#e9473f" : status === "guide" ? "#8d98aa" : "#55a846");
  svg.appendChild(dot);
}
function resetGame() { state.selected = null; state.pendingCountryByNickname.clear(); state.completedCountryIds.clear(); els.discoveryCard.hidden = true; els.finalScreen.hidden = true; hideError(); updateAll(); focusNicknameColumn(); }
els.continueButton.addEventListener("click", () => { const next = data.find((item) => !state.completedCountryIds.has(item.id)); if (next) findNode("nick-country", "from", next.nickname)?.focus(); });
els.resetButton.addEventListener("click", resetGame);
window.addEventListener("resize", () => requestAnimationFrame(() => drawConnections()));
applyTranslations(); renderLists(); updateAll();
