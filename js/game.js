// Botineras — Game logic (UI layer; pure logic in engine.js)
let selected = 0;
let g = {};
let activeScreen = "setup";

function triggerAction(id) {
  const act = actions.find(a => a.id === id);
  if (!act || !canUseAction(g, id)) return;
  if (!g.actionsUsed) g.actionsUsed = {};
  g.actionsUsed[id] = true;

  if (id === "A4") {
    const penalty = g.relProgress > 75 ? { rep: -25, rumors: 15 } : { rep: -5 };
    applyEffects(g, penalty);
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
  applyEffects(g, eff);

  let broke = false;
  if (!ok && act.failBreaks) {
    g.relStatus = "broken";
    broke = true;
  } else {
    broke = checkBreakup(g);
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
  applyEffects(g, eff);
  const msg = (ok ? opt.msgSuccess : opt.msgFail).replaceAll("{player}", g.player || "tu pareja");

  if (typeof trackEvent === "function") {
    trackEvent("resolve_booster", { booster_id: boosterId, choice, outcome: ok ? "success" : "failure", player: g.player });
  }

  const broke = checkBreakup(g);
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
    chem: 15,
    rumors: 0,
    couples: 0,
    relations: [],
    relProgress: 25,
    relStage: 0,
    relStatus: "active",
    player: null,
    event: null,
    actionsUsed: {},
    boosterJustDone: false,
    currentBooster: null,
    usedEvents: [],
    eventsInRelation: 0,
    crisisActive: false
  };

  Object.entries(c.bonus).forEach(([k, v]) => {
    g[k] = (g[k] || 0) + v;
  });
  g.relStage = getRelStage(g);

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
  updateTier(g);
  let isNewRelation = false;
  if (!g.player || g.relStatus === "broken") {
    g.player = tiers[g.tier].players[Math.floor(Math.random() * tiers[g.tier].players.length)];
    g.relProgress = 25;
    g.relStage = 0;
    g.relStatus = "active";
    g.usedEvents = [];
    isNewRelation = true;
    g.eventsInRelation = 0;
    g.crisisActive = false;
  }
  g.relStage = getRelStage(g);
  g.event = pickEvent(g);

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
  const result = resolveEvent(g, i);

  // Tracking
  if (typeof trackEvent === "function") {
    trackEvent("click_game_choice", {
      choice_index: i,
      choice_text: g.event.actions[i][0],
      event_title: g.event.title,
      event_id: g.event.id,
      outcome: result.ok ? "success" : "failure",
      character_name: g.name,
      turn: g.turn,
      events_in_relation: g.eventsInRelation,
      player: g.player,
      tier_name: tiers[g.tier].name,
      tier_index: g.tier,
      stage: g.relStage,
      relProgress: g.relProgress,
      fame: g.fame,
      rep: g.rep,
      contacts: g.contacts,
      chem: g.chem,
      rumors: g.rumors,
      couples: g.couples
    });
  }

  // Relation history bookkeeping
  if (result.ok && !result.broke) {
    if (g.relStage === 0) {
      const r = g.relations.find(x => x.player === g.player && x.status !== "Terminó mal");
      if (!r) g.relations.push({ player: g.player, status: "Primera salida" });
    }
    if (g.relStage === 1) upRel("Romance");
    if (g.relStage === 2) {
      upRel(g.relProgress >= 75 ? "Noviazgo" : "Romance confirmado");
    }
  }

  if (result.broke) {
    upRel("Terminó mal");
    g.player = null;
    g.relProgress = 0;
    g.relStage = 0;
  }

  // Crisis → show crisis UI
  if (result.crisis) {
    if (typeof renderCrisis === "function") renderCrisis();
    if (typeof upd === "function") upd();
    return;
  }

  if (result.broke) {
    if (typeof renderBreakup === "function") renderBreakup(result.msg);
  } else {
    if (typeof renderResult === "function") renderResult(result.ok, result.msg);
  }
  if (typeof upd === "function") upd();
}

function resolveCrisis(choice) {
  const oldPlayer = g.player;
  const result = engineResolveCrisis(g, choice);

  if (typeof trackEvent === "function") {
    trackEvent("crisis_resolved", { outcome: result, player: oldPlayer });
  }
  if (typeof hideCrisis === "function") hideCrisis();

  if (result === "success") {
    const msg = `💪 Superaron la crisis de pareja. La química se renovó y están en 51%.`;
    if (typeof renderResult === "function") renderResult(true, msg);
  } else {
    if (typeof renderBreakup === "function") {
      renderBreakup(`La crisis de pareja con ${oldPlayer} fue demasiado. No pudieron recomponer la relación.`);
    }
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

  // Cada 2 eventos desde el 4to en adelante, oportunidad de subir de categoría
  if (g.eventsInRelation >= 4 && (g.eventsInRelation - 4) % 3 === 0 && g.tier < tiers.length - 1) {
    const nextTier = tiers[g.tier + 1];
    if (nextTier && tierScore(g) >= nextTier.need) {
      const newPlayer = nextTier.players[Math.floor(Math.random() * nextTier.players.length)];
      g.upgradeTarget = { player: newPlayer, tierIndex: g.tier + 1, tierName: nextTier.name };
      if (typeof renderUpgrade === "function") {
        renderUpgrade();
      }
      return;
    }
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

function confirmUpgrade() {
  const target = g.upgradeTarget;
  if (!target) return;
  // Terminar relación actual
  upRel("Ascenso de categoría");
  // Asignar nuevo jugador del tier superior
  g.player = target.player;
  g.tier = target.tierIndex;
  g.relProgress = 25;
  g.relStage = 0;
  g.relStatus = "active";
  g.usedEvents = [];
  g.eventsInRelation = 0;
  g.upgradeTarget = null;
  // Mostrar intro de nueva relación
  if (typeof hideUpgrade === "function") hideUpgrade();
  if (typeof renderNewRelation === "function") renderNewRelation();
  if (typeof upd === "function") upd();
}

function rejectUpgrade() {
  // Rechazar la oportunidad, seguir con la relación actual
  g.upgradeTarget = null;
  if (typeof hideUpgrade === "function") hideUpgrade();
  // Resetear contador para que no aparezca de nuevo hasta dentro de 2 eventos más
  g.eventsInRelation = 1;
  g.boosterJustDone = false;
  if (typeof renderBooster === "function") renderBooster(boosters[Math.floor(Math.random() * boosters.length)]);
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
