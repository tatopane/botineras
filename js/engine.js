// Botineras — Pure game engine (no DOM, no UI)
// Requires data.js to be loaded first (chars, tiers, eventTypes, actions, boosters)
// All functions take the game state object `g` as first parameter.

function score(g) {
  return (g.fame || 0) + (g.rep || 0) + (g.contacts || 0) + (g.chem || 0) - (g.rumors || 0) * 5;
}

function tierScore(g) {
  return (g.fame || 0) + (g.rep || 0) + (g.contacts || 0) - (g.rumors || 0) * 5;
}

function updateTier(g) {
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (tierScore(g) >= tiers[i].need) {
      g.tier = i;
      break;
    }
  }
}

function getRelStage(g) {
  if (g.relProgress >= 76) return 2;
  if (g.relProgress >= 41) return 1;
  return 0;
}

function applyEffects(g, effects) {
  if (!effects) return;
  Object.entries(effects).forEach(([k, v]) => {
    if (k === "relProgress") {
      g.relProgress = Math.max(0, Math.min(100, (g.relProgress || 0) + v));
    } else if (g[k] !== undefined) {
      g[k] = Math.max(0, g[k] + v);
    }
  });
  g.relStage = getRelStage(g);
}

function checkBreakup(g) {
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

function pickEvent(g) {
  const stage = getRelStage(g);
  let available = eventTypes.filter(e => e.stage === stage);
  if (g.usedEvents && g.usedEvents.length) {
    const unused = available.filter(e => !g.usedEvents.includes(e.id));
    if (unused.length > 0) available = unused;
  }
  if (available.length === 0) return eventTypes[0];
  return available[Math.floor(Math.random() * available.length)];
}

function canUseAction(g, id) {
  const act = actions.find(a => a.id === id);
  if (!act) return false;
  if (act.once && g.actionsUsed && g.actionsUsed[id]) return false;
  return true;
}

/**
 * Resolve an event choice.  Returns { ok, broke, crisis, msg }.
 * - ok:   whether the action succeeded
 * - broke: whether the relationship ended as a result
 * - crisis: whether a relationship crisis was triggered
 * - msg:   the flavour text for the outcome
 */
function resolveEvent(g, actionIndex) {
  const a = g.event.actions[actionIndex];
  const rate = a[1]
    + Math.min(0.1, (g.rep || 0) / 500)
    + Math.min(0.08, (g.chem || 0) / 500)
    - Math.min(0.1, (g.rumors || 0) * 0.02);
  const ok = Math.random() < rate;
  const eff = ok ? a[4] : a[5];
  const msg = (ok ? a[2] : a[3]).replaceAll("{player}", g.player);

  applyEffects(g, eff);

  if (g.event && g.event.id && !g.usedEvents.includes(g.event.id)) {
    g.usedEvents.push(g.event.id);
  }
  g.eventsInRelation = (g.eventsInRelation || 0) + 1;

  if (ok && g.relStage === 2 && g.relProgress >= 75) {
    g.couples = (g.couples || 0) + 1;
  }

  let broke = false;
  if (!ok && g.event.failBreaks) {
    g.relStatus = "broken";
    broke = true;
  } else if (checkBreakup(g)) {
    broke = true;
  } else if (!ok && ((g.chem || 0) < 5 || Math.random() < 0.10)) {
    g.relStatus = "broken";
    broke = true;
  }

  let crisis = false;
  if (!broke && g.eventsInRelation >= 5 && (g.chem || 0) < 50 && !g.crisisActive) {
    g.crisisActive = true;
    crisis = true;
  }

  return { ok, broke, crisis, msg };
}

function engineResolveCrisis(g, choice) {
  g.crisisActive = false;
  if (choice === "success") {
    g.chem = 51;
    return "success";
  }
  g.relStatus = "broken";
  g.player = null;
  g.usedEvents = [];
  g.eventsInRelation = 0;
  return "failure";
}

function startNewRelation(g) {
  g.player = tiers[g.tier].players[Math.floor(Math.random() * tiers[g.tier].players.length)];
  g.relProgress = 25;
  g.relStage = 0;
  g.relStatus = "active";
  g.usedEvents = [];
  g.eventsInRelation = 0;
  g.crisisActive = false;
}

/**
 * Check whether an upgrade (tier promotion) is available.
 * Returns { ready, nextTier, newPlayer } or { ready: false }.
 */
function checkUpgrade(g) {
  if (g.eventsInRelation < 4) return { ready: false };
  if ((g.eventsInRelation - 4) % 3 !== 0) return { ready: false };
  if (g.tier >= tiers.length - 1) return { ready: false };
  const nextTier = tiers[g.tier + 1];
  if (!nextTier || tierScore(g) < nextTier.need) return { ready: false };
  const newPlayer = nextTier.players[Math.floor(Math.random() * nextTier.players.length)];
  return { ready: true, nextTier: g.tier + 1, newPlayer, tierName: nextTier.name };
}