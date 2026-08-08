// Botineras — Game logic
let selected = 0;
let g = {};
let activeScreen = "setup";

function score() {
  return (g.fame || 0) + (g.rep || 0) + (g.contacts || 0) + (g.chem || 0) - (g.rumors || 0) * 5;
}

function updateTier() {
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (score() >= tiers[i].need) {
      g.tier = i;
      break;
    }
  }
}

function getRelStage() {
  if (g.relProgress >= 76) return 2;  // noviazgo firme
  if (g.relProgress >= 41) return 1;  // avanzada
  return 0;                           // inicio
}

function applyEffects(effects) {
  if (!effects) return;
  Object.entries(effects).forEach(([k, v]) => {
    if (k === "relProgress") {
      g.relProgress = Math.max(0, Math.min(100, (g.relProgress || 0) + v));
    } else if (g[k] !== undefined) {
      g[k] = Math.max(0, g[k] + v);
    }
  });
  g.relStage = getRelStage();
}

function checkBreakup() {
  if (g.relStage === 2 && g.relProgress <= 75) {
    g.relStatus = "broken";
    return true;
  }
  if (g.relProgress <= 0 || g.chem <= 0) {
    g.relStatus = "broken";
    return true;
  }
  return false;
}

function pickEvent() {
  const stage = getRelStage();
  let available = eventTypes.filter(e => e.stage === stage);
  // Excluir eventos ya usados en esta relación
  if (g.usedEvents && g.usedEvents.length) {
    const unused = available.filter(e => !g.usedEvents.includes(e.id));
    if (unused.length > 0) available = unused;
  }
  if (available.length === 0) return eventTypes[0];
  return available[Math.floor(Math.random() * available.length)];
}

function canUseAction(id) {
  const act = actions.find(a => a.id === id);
  if (!act) return false;
  if (act.once && g.actionsUsed && g.actionsUsed[id]) return false;
  return true;
}

function triggerAction(id) {
  const act = actions.find(a => a.id === id);
  if (!act || !canUseAction(id)) return;
  if (!g.actionsUsed) g.actionsUsed = {};
  g.actionsUsed[id] = true;

  if (id === "A4") {
    const penalty = g.relProgress > 75 ? { rep: -25, rumors: 15 } : { rep: -5 };
    applyEffects(penalty);
    upRel("Terminó relación");
    g.relStatus = "broken";
    g.usedEvents = [];
    if (typeof trackEvent === "function") {
      trackEvent("use_action", { action_id: id, action_name: act.name, outcome: "breakup", player: g.player });
    }
    if (typeof renderBreakup === "function") {
      renderBreakup(`Decidiste cortar la relación con ${g.player || "tu pareja"} por tu cuenta.`);
    }
    return;
  }

  const p = act.successRate + Math.min(0.1, g.rep / 500) + Math.min(0.08, g.chem / 500) - Math.min(0.1, g.rumors * 0.02);
  const ok = Math.random() < p;
  const eff = ok ? act.reward : act.fail;
  applyEffects(eff);

  let broke = false;
  if (!ok && act.failBreaks) {
    g.relStatus = "broken";
    broke = true;
  } else {
    broke = checkBreakup();
  }

  if (typeof trackEvent === "function") {
    trackEvent("use_action", { action_id: id, action_name: act.name, outcome: ok ? "success" : "failure", broke, player: g.player });
  }

  if (broke) {
    upRel("Ruptura por escándalo");
    if (typeof renderBreakup === "function") {
      renderBreakup(`Mala jugada: La relación con ${g.player || "tu pareja"} no resistió el escándalo.`);
    }
  } else {
    const msg = ok ? `Acción exitosa: ${act.name}` : `Salió mal: ${act.name}`;
    if (typeof renderResult === "function") {
      renderResult(ok, msg);
    }
  }
  if (typeof upd === "function") upd();
}

function triggerBooster(boosterId, choice) {
  const b = boosters.find(x => x.id === boosterId);
  if (!b) return;
  const opt = choice === "A" ? b.optionA : b.optionB;
  const ok = Math.random() < opt.rate;
  const eff = ok ? opt.reward : (opt.fail || {});
  applyEffects(eff);
  const msg = (ok ? opt.msgSuccess : opt.msgFail).replaceAll("{player}", g.player || "tu pareja");

  if (typeof trackEvent === "function") {
    trackEvent("resolve_booster", { booster_id: boosterId, choice, outcome: ok ? "success" : "failure", player: g.player });
  }

  const broke = checkBreakup();
  if (broke) {
    upRel("Terminó mal");
    g.usedEvents = [];
    if (typeof renderBreakup === "function") {
      renderBreakup(`💔 ${msg}`);
    }
  } else {
    if (typeof renderResult === "function") {
      renderResult(ok, msg);
    }
  }
  if (typeof upd === "function") upd();
}

function startGame() {
  const c = chars[selected];
  const imgEl = typeof document !== "undefined" ? document.getElementById("img" + selected) : null;
  const img = imgEl ? imgEl.src : c.img;

  g = {
    name: c.name,
    img,
    age: 18,
    tier: 0,
    turn: 0,
    turnCount: 0,
    fame: 4,
    rep: 6,
    contacts: 6,
    chem: 5,
    rumors: 0,
    couples: 0,
    relations: [],
    relProgress: 20,
    relStage: 0,
    relStatus: "active",
    player: null,
    event: null,
    actionsUsed: {},
    boosterJustDone: false,
    currentBooster: null,
    usedEvents: []
  };

  Object.entries(c.bonus).forEach(([k, v]) => {
    g[k] = (g[k] || 0) + v;
  });
  g.relStage = getRelStage();

  if (typeof trackEvent === "function") {
    trackEvent("game_start", { character_name: g.name, character_trait: c.trait });
  }

  if (typeof hideStatInfo === "function") hideStatInfo();
  if (typeof document !== "undefined") {
    document.getElementById("stickyHeader")?.classList.remove("visible");
  }
  if (typeof showScreen === "function") showScreen("game");

  next();

  if (typeof setTimeout !== "undefined") {
    setTimeout(() => {
      const target = document.getElementById("statsCard") || document.getElementById("game");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }
}

function next() {
  updateTier();
  let isNewRelation = false;
  if (!g.player || g.relStatus === "broken") {
    g.player = tiers[g.tier].players[Math.floor(Math.random() * tiers[g.tier].players.length)];
    g.relProgress = 20;
    g.relStage = 0;
    g.relStatus = "active";
    g.usedEvents = [];
    isNewRelation = true;
  }
  g.relStage = getRelStage();
  g.event = pickEvent();

  if (isNewRelation) {
    // Mostrar intro de nueva relación antes del evento
    if (typeof renderNewRelation === "function") renderNewRelation();
    if (typeof upd === "function") upd();
    return;
  }

  if (typeof renderScene === "function") renderScene();
  if (typeof renderChoices === "function") renderChoices();
  if (typeof renderActions === "function") renderActions();
  if (typeof upd === "function") upd();
}

// Llamada desde el botón "Seguir" de la pantalla de nueva relación
function confirmNewRelation() {
  if (typeof hideNewRelation === "function") hideNewRelation();
  if (typeof renderScene === "function") renderScene();
  if (typeof renderChoices === "function") renderChoices();
  if (typeof renderActions === "function") renderActions();
  if (typeof upd === "function") upd();
}

function resolve(i) {
  const a = g.event.actions[i];
  const p = a[1] + Math.min(0.1, g.rep / 500) + Math.min(0.08, g.chem / 500) - Math.min(0.1, g.rumors * 0.02);
  const ok = Math.random() < p;
  const eff = ok ? a[4] : a[5];
  const msg = (ok ? a[2] : a[3]).replaceAll("{player}", g.player);

  if (typeof trackEvent === "function") {
    trackEvent("click_game_choice", {
      choice_index: i,
      choice_text: a[0],
      event_title: g.event.title,
      event_id: g.event.id,
      stage: g.relStage,
      player: g.player,
      tier_name: tiers[g.tier].name
    });
    trackEvent("game_event_outcome", { outcome: ok ? "success" : "failure", event_title: g.event.title, player: g.player });
  }

  applyEffects(eff);
  // Registrar evento como usado en esta relación
  if (g.event && g.event.id && !g.usedEvents.includes(g.event.id)) {
    g.usedEvents.push(g.event.id);
  }

  if (ok) {
    if (g.relStage === 0) {
      const r = g.relations.find(x => x.player === g.player && x.status !== "Terminó mal");
      if (!r) g.relations.push({ player: g.player, status: "Primera salida" });
    }
    if (g.relStage === 1) upRel("Romance");
    if (g.relStage === 2) {
      if (g.relProgress >= 75) {
        upRel("Noviazgo");
        g.couples++;
        // La relación continúa con el mismo jugador
      } else {
        upRel("Romance confirmado");
      }
    }
  } else {
    // failBreaks: eventos de stage 2 (firme) que en fallo rompen la relación
    if (g.event.failBreaks || checkBreakup() || g.chem < 5 || Math.random() < 0.25) {
      upRel("Terminó mal");
      g.relStatus = "broken";
      g.player = null;
      g.relProgress = 0;
      g.relStage = 0;
      g.usedEvents = [];
    }
  }

  if (g.relStatus === "broken") {
    // Mostrar pantalla de ruptura con el motivo
    if (typeof renderBreakup === "function") renderBreakup(msg);
  } else if (typeof renderResult === "function") {
    renderResult(ok, msg);
  }
  if (typeof upd === "function") upd();
}

function upRel(status) {
  const r = [...g.relations].reverse().find(x => x.player === g.player && x.status !== "Terminó mal");
  if (r) {
    r.status = status;
  } else if (g.player) {
    g.relations.push({ player: g.player, status });
  }
}

function continueGame() {
  g.turn++;
  g.turnCount++;
  if (g.turn % 3 === 0) g.age++;
  if (g.turn >= 24) {
    finish();
    return;
  }

  if (g.turnCount % 5 === 0 && !g.boosterJustDone) {
    g.boosterJustDone = true;
    const b = boosters[Math.floor(Math.random() * boosters.length)];
    g.currentBooster = b;
    if (typeof renderBooster === "function") {
      renderBooster(b);
    }
    return;
  }
  g.boosterJustDone = false;
  next();
}

function finish() {
  if (typeof showScreen === "function") showScreen("final");
  const finalTitle = g.couples >= 3 ? "👑 REINA INTERNACIONAL" : g.couples >= 1 ? "❤️ CARRERA CONSOLIDADA" : "🍸 MUCHO RUMOR, POCO NOVIAZGO";
  const finalTitleEl = document.getElementById("finalTitle");
  if (finalTitleEl) finalTitleEl.textContent = finalTitle;
  const finalTextEl = document.getElementById("finalText");
  if (finalTextEl) {
    finalTextEl.innerHTML =
      `<b>${g.name}</b> terminó su carrera a los <b>${g.age} años</b> en categoría <b>${tiers[g.tier].name}</b> con <b>${g.couples} noviazgos</b> y <b>${g.relations.length} historias sentimentales</b>.<br><br>` +
      `⭐ Fama: ${g.fame} · 🧠 Reputación: ${g.rep} · 🤝 Contactos: ${g.contacts}<br>` +
      `🔥 Química: ${g.chem} · 💬 Rumores: ${g.rumors} · ❤️ Noviazgos: ${g.couples}`;
  }
  if (typeof trackEvent === "function") {
    trackEvent("game_finish", {
      final_title: finalTitle,
      final_tier: tiers[g.tier].name,
      total_couples: g.couples,
      total_fame: g.fame,
      total_rep: g.rep,
      total_contacts: g.contacts,
      total_chem: g.chem,
      total_rumors: g.rumors,
      final_age: g.age
    });
  }
}

function end() {
  g = {
    name: g.name || "Wonda Nara",
    img: g.img || chars[0].img,
    age: 26,
    tier: 5,
    turn: 24,
    turnCount: 24,
    fame: 185,
    rep: 95,
    contacts: 90,
    chem: 80,
    rumors: 1,
    couples: 3,
    relations: [
      { player: "El 9 de Lugano", status: "Noviazgo" },
      { player: "Julián Álvares", status: "Noviazgo" },
      { player: "Erling Håland", status: "Noviazgo" }
    ],
    relProgress: 95,
    relStage: 2,
    relStatus: "active",
    player: "Erling Håland",
    event: eventTypes[4]
  };
  finish();
}

if (typeof window !== "undefined") {
  window.end = end;
}
