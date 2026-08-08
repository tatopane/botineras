// Botineras — UI render
function build() {
  const peopleEl = document.getElementById("people");
  if (!peopleEl) return;
  peopleEl.innerHTML = chars.map((c, i) => `
    <div class="person ${i === selected ? "sel" : ""}" onclick="pick(${i}, this)">
      <img id="img${i}" src="${c.img}" alt="${c.name}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22230%22><rect fill=%22%232d2f3b%22 width=%22400%22 height=%22230%22/><text x=%22200%22 y=%22130%22 text-anchor=%22middle%22 fill=%22%23bbb%22 font-size=%2230%22 font-family=%22sans-serif%22>Sin foto</text></svg>'">
      <div class="info">
        <h3>${c.name}</h3>
        <div class="trait">${c.trait}</div>
      </div>
    </div>
  `).join("");
}

function showScreen(screenId) {
  ["setup", "game", "final", "guide"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  const target = document.getElementById(screenId);
  if (target) target.classList.remove("hidden");
  if (screenId !== "guide") activeScreen = screenId;
  if (screenId !== "game") {
    document.getElementById("stickyHeader")?.classList.remove("visible");
  }
  if (typeof trackEvent === "function") {
    trackEvent("screen_view", { screen_name: screenId });
  }
}

function toggleGuide() {
  const guide = document.getElementById("guide");
  if (!guide) return;
  const isOpening = guide.classList.contains("hidden");
  if (typeof trackEvent === "function") {
    trackEvent("click_toggle_guide", { action: isOpening ? "open" : "close", from_screen: activeScreen });
  }
  if (isOpening) {
    showScreen("guide");
  } else {
    showScreen(activeScreen);
  }
}

function showStatInfo(key) {
  const info = statInfo[key];
  if (!info) return;
  if (typeof trackEvent === "function") {
    trackEvent("click_stat_info", { stat_key: key });
  }
  document.getElementById("statTooltipTitle").textContent = info.title;
  document.getElementById("statTooltipText").textContent = info.desc;
  document.getElementById("statTooltip")?.classList.remove("hidden");
}

function hideStatInfo() {
  document.getElementById("statTooltip")?.classList.add("hidden");
}

function initStickyObserver() {
  const card = document.getElementById("statsCard");
  const header = document.getElementById("stickyHeader");
  if (!card || !header) return;
  const obs = new IntersectionObserver(([e]) => {
    const isGameActive = activeScreen === "game";
    const scrolledPast = e.boundingClientRect.top <= 60;
    header.classList.toggle("visible", isGameActive && !e.isIntersecting && scrolledPast);
  }, { rootMargin: "-60px 0px 0px 0px", threshold: [0] });
  obs.observe(card);
}

function pick(i, e) {
  selected = i;
  if (typeof trackEvent === "function") {
    trackEvent("click_select_character", { character_name: chars[i].name, trait: chars[i].trait });
  }
  document.querySelectorAll(".person").forEach(x => x.classList.remove("sel"));
  if (e) e.classList.add("sel");
  startGame();
}

function renderScene() {
  const rankText = `${tiers[g.tier].name.toUpperCase()} — ${g.player}`;
  const ageText = `${g.name}, ${g.age} años`;

  const rankEl = document.getElementById("rank");
  if (rankEl) rankEl.textContent = rankText;
  const cRankEl = document.getElementById("c_rank");
  if (cRankEl) cRankEl.textContent = rankText;

  const ageEl = document.getElementById("age");
  if (ageEl) ageEl.textContent = ageText;
  const cAgeEl = document.getElementById("c_age");
  if (cAgeEl) cAgeEl.textContent = ageText;

  const sceneImg = document.getElementById("scene");
  if (sceneImg) sceneImg.src = g.event.img;

  const titleEl = document.getElementById("title");
  if (titleEl) titleEl.textContent = g.event.title;

  const storyEl = document.getElementById("story");
  if (storyEl) storyEl.textContent = g.event.text.replaceAll("{player}", g.player);

  const mentorEl = document.getElementById("mentor");
  if (mentorEl) {
    mentorEl.innerHTML = Math.random() < 0.45
      ? `<div class="mentor">🕴️ <b>Guillote Coppolo:</b> “${[
          "Primero la segunda salida, después la portada.",
          "Un rumor bien llevado vale por dos contactos.",
          "Nunca confirmes antes del postre.",
          "Si te bloquea, era una prueba de carácter.",
          "En el country todo se sabe, pero en la tele se cotiza."
        ][Math.floor(Math.random() * 5)]}”</div>`
      : "";
  }

  // Reset results and special views
  const resEl = document.getElementById("result");
  if (resEl) {
    resEl.innerHTML = "";
    resEl.classList.add("hidden");
  }

  const boosterEl = document.getElementById("booster");
  if (boosterEl) boosterEl.classList.add("hidden");

  const breakupEl = document.getElementById("breakupBanner");
  if (breakupEl) breakupEl.classList.add("hidden");

  const choicesEl = document.getElementById("choices");
  if (choicesEl) choicesEl.classList.remove("hidden");
  
  // Quitar estilo de booster si estaba activo
  const sceneCard = document.querySelector(".card > .scene")?.parentElement;
  if (sceneCard) sceneCard.classList.remove("booster-active");
}

function renderChoices() {
  const choicesEl = document.getElementById("choices");
  if (!choicesEl || !g.event) return;
  choicesEl.classList.remove("hidden");
  choicesEl.innerHTML = g.event.actions.map((a, i) => `
    <button class="choice" onclick="resolve(${i})">
      <strong>${a[0]}</strong>
      <span>Puede avanzar la relación o hacerla retroceder.</span>
    </button>
  `).join("");
}

function showActionsPanel() {
  const panel = document.getElementById("actionsPanel");
  if (!panel) return;
  panel.classList.remove("hidden");
  if (typeof trackEvent === "function") {
    trackEvent("click_open_actions_panel", { player: g.player });
  }
}

function hideActionsPanel() {
  const panel = document.getElementById("actionsPanel");
  if (panel) panel.classList.add("hidden");
}

function renderActions() {
  const btnContainer = document.getElementById("actionBtn");
  const panel = document.getElementById("actionsPanel");
  if (!btnContainer || !panel) return;

  // Acciones disponibles solo desde el turno 5
  if (g.turn < 5) {
    btnContainer.classList.add("hidden");
    return;
  }

  btnContainer.classList.remove("hidden");
  panel.classList.add("hidden");

  panel.innerHTML = `
    <div class="actions-panel-content">
      <div class="actions-panel-header">
        <h3>⚡ Acciones Especiales</h3>
        <button class="stat-tooltip-close" onclick="hideActionsPanel()" title="Cerrar">✕</button>
      </div>
      <p class="note" style="text-align:left;margin-bottom:12px">Podés ejecutar una jugada audaz para acelerar tu carrera o cortar de raíz.</p>
      <div class="actions-list">
        ${actions.map(act => {
          const available = canUseAction(act.id);
          const desc = act.desc.replaceAll("{player}", g.player || "tu pareja");
          return `
            <div class="action-card ${available ? "" : "disabled"}">
              <div class="action-card-header">
                <strong>${act.name}</strong>
              </div>
              <p class="action-desc">${desc}</p>
              <button class="action-exec-btn ${available ? "" : "secondary"}" ${available ? `onclick="hideActionsPanel(); triggerAction('${act.id}')"` : "disabled"}>
                ${available ? "Ejecutar jugada" : "Ya utilizada"}
              </button>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderBooster(b) {
  const desc = b.desc.replaceAll("{player}", g.player || "tu pareja");

  // Reemplazar escena: imagen con gradiente especial
  const sceneImg = document.getElementById("scene");
  if (sceneImg) {
    sceneImg.src = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22360%22><defs><linearGradient id=%22g%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22><stop offset=%220%25%22 stop-color=%22%2320153e%22/><stop offset=%22100%25%22 stop-color=%22%231a0f2e%22/></linearGradient></defs><rect fill=%22url(%23g)%22 width=%22800%22 height=%22360%22/><text x=%22400%22 y=%22180%22 text-anchor=%22middle%22 fill=%22%23ffd166%22 font-size=%2272%22 font-family=%22sans-serif%22>✨</text></svg>";
  }

  // Reemplazar título y descripción
  const titleEl = document.getElementById("title");
  if (titleEl) titleEl.innerHTML = `<span class="booster-badge">✨ EVENTO ESPECIAL</span> ${b.name}`;

  const storyEl = document.getElementById("story");
  if (storyEl) storyEl.textContent = desc;

  // Borde dorado en la card de escena
  const sceneCard = document.querySelector(".card > .scene")?.parentElement;
  if (sceneCard) sceneCard.classList.add("booster-active");

  // Ocultar choices default, mentor, action btn
  const choicesEl = document.getElementById("choices");
  if (choicesEl) {
    choicesEl.classList.remove("hidden");
    choicesEl.innerHTML = `
      <div class="booster-choices">
        <button class="choice booster-btn" onclick="triggerBooster('${b.id}', 'A')">
          <strong>${b.optionA.text}</strong>
        </button>
        <button class="choice booster-btn" onclick="triggerBooster('${b.id}', 'B')">
          <strong>${b.optionB.text}</strong>
        </button>
      </div>
    `;
  }

  const mentorEl = document.getElementById("mentor");
  if (mentorEl) mentorEl.innerHTML = "";

  const actionBtn = document.getElementById("actionBtn");
  if (actionBtn) actionBtn.classList.add("hidden");

  const resEl = document.getElementById("result");
  if (resEl) {
    resEl.classList.add("hidden");
    resEl.innerHTML = "";
  }

  const boosterEl = document.getElementById("booster");
  if (boosterEl) boosterEl.classList.add("hidden");

  const breakupEl = document.getElementById("breakupBanner");
  if (breakupEl) breakupEl.classList.add("hidden");

  if (typeof upd === "function") upd();
}

function renderBreakup(msg) {
  const breakupEl = document.getElementById("breakupBanner");
  const choicesEl = document.getElementById("choices");
  const boosterEl = document.getElementById("booster");
  const actionBtn = document.getElementById("actionBtn");
  const resEl = document.getElementById("result");

  if (choicesEl) {
    choicesEl.classList.add("hidden");
    choicesEl.innerHTML = "";
  }
  if (boosterEl) boosterEl.classList.add("hidden");
  if (actionBtn) actionBtn.classList.add("hidden");
  if (resEl) {
    resEl.classList.add("hidden");
    resEl.innerHTML = "";
  }

  if (breakupEl) {
    breakupEl.classList.remove("hidden");
    breakupEl.innerHTML = `
      <div class="breakup-card">
        <div class="big">💔</div>
        <h2>La relación se terminó</h2>
        <p>${msg}</p>
        <button onclick="continueGame()" style="margin-top:14px;background:#ef4c5d">Buscar nueva conquista</button>
      </div>
    `;
  }
}

function renderResult(ok, msg) {
  const resEl = document.getElementById("result");
  const choicesEl = document.getElementById("choices");
  const boosterEl = document.getElementById("booster");
  const breakupEl = document.getElementById("breakupBanner");

  if (choicesEl) {
    choicesEl.classList.add("hidden");
    choicesEl.innerHTML = "";
  }
  if (boosterEl) boosterEl.classList.add("hidden");
  if (breakupEl) breakupEl.classList.add("hidden");

  if (resEl) {
    resEl.classList.remove("hidden");
    resEl.innerHTML = `
      <div class="result ${ok ? "ok" : "bad"}">
        <div class="big">${ok ? "✅" : "❌"}</div>
        <b>${ok ? "Te salió bien" : "Mala jugada"}</b>
        <p>${msg}</p>
        <button onclick="continueGame()">Seguir</button>
      </div>
    `;
  }

  const logEl = document.getElementById("log");
  if (logEl) {
    logEl.innerHTML = `<p class="${ok ? "green" : "red"}">${ok ? "🟢" : "🔴"} ${msg}</p>` + logEl.innerHTML;
  }
}

function upd() {
  const fameEl = document.getElementById("fame");
  if (fameEl) fameEl.textContent = g.fame ?? 0;
  const repEl = document.getElementById("rep");
  if (repEl) repEl.textContent = g.rep ?? 0;
  const contactsEl = document.getElementById("contacts");
  if (contactsEl) contactsEl.textContent = g.contacts ?? 0;
  const chemEl = document.getElementById("chem");
  if (chemEl) chemEl.textContent = g.chem ?? 0;
  const rumorsEl = document.getElementById("rumors");
  if (rumorsEl) rumorsEl.textContent = g.rumors ?? 0;
  const couplesEl = document.getElementById("couples");
  if (couplesEl) couplesEl.textContent = g.couples ?? 0;

  const cFame = document.getElementById("c_fame");
  if (cFame) cFame.textContent = g.fame ?? 0;
  const cRep = document.getElementById("c_rep");
  if (cRep) cRep.textContent = g.rep ?? 0;
  const cContacts = document.getElementById("c_contacts");
  if (cContacts) cContacts.textContent = g.contacts ?? 0;
  const cChem = document.getElementById("c_chem");
  if (cChem) cChem.textContent = g.chem ?? 0;
  const cRumors = document.getElementById("c_rumors");
  if (cRumors) cRumors.textContent = g.rumors ?? 0;
  const cCouples = document.getElementById("c_couples");
  if (cCouples) cCouples.textContent = g.couples ?? 0;

  if (g.name && g.age) {
    const cAge = document.getElementById("c_age");
    if (cAge) cAge.textContent = `${g.name}, ${g.age} años`;
  }
  if (g.tier !== undefined && g.player) {
    const cRank = document.getElementById("c_rank");
    if (cRank) cRank.textContent = `${tiers[g.tier].name.toUpperCase()} — ${g.player}`;
  }

  const barWidth = Math.min(100, score() / 2.1) + "%";
  const bar = document.getElementById("bar");
  if (bar) bar.style.width = barWidth;
  const cBar = document.getElementById("c_bar");
  if (cBar) cBar.style.width = barWidth;

  const relEl = document.getElementById("relations");
  if (relEl) {
    relEl.innerHTML = g.relations && g.relations.length
      ? g.relations.map(r => `
          <div class="rel">
            <div class="face">${r.status.includes("Noviazgo") ? "👑" : r.status.includes("Romance") ? "🔥" : r.status.includes("mal") || r.status.includes("escándalo") ? "💔" : "⚽"}</div>
            <div><b>${r.status}</b><br>${r.player}</div>
          </div>
        `).join("")
      : '<span style="color:#999">Todavía nada confirmado.</span>';
  }
}

function shareWhatsApp() {
  const origin = window.location.origin;
  const shareUrl = `${origin}/desafiame`;
  const finalTitle = document.getElementById("finalTitle")?.textContent || "Botineras";
  const tierName = tiers[g.tier]?.name || "Champions";
  const text =
    `${finalTitle}\n` +
    `Jugué como ${g.name} en Botineras 👠\n` +
    `Categoría alcanzada: ${tierName}\n\n` +
    `Métricas de mi carrera:\n` +
    `⭐ Fama: ${g.fame}\n` +
    `🧠 Reputación: ${g.rep}\n` +
    `🤝 Contactos: ${g.contacts}\n` +
    `🔥 Química: ${g.chem}\n` +
    `💬 Rumores: ${g.rumors}\n` +
    `❤️ Noviazgos: ${g.couples}\n\n` +
    `Probá tu carrera de botinera: ${shareUrl}`;

  if (typeof trackEvent === "function") {
    trackEvent("click_share_whatsapp", {
      final_title: finalTitle,
      final_tier: tierName,
      character_name: g.name,
      final_age: g.age,
      utm_source: "whatsapp"
    });
  }
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, "_blank");
}

// Init
build();
initStickyObserver();
