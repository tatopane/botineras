#!/usr/bin/env node
/**
 * Simulador de Botineras — usa data.js + engine.js directamente
 *
 * Uso: node tareas/simular.js [numero_de_partidas]
 *
 * Importa la lógica de engine.js (resolveEvent, pickEvent, applyEffects, etc.)
 * para que la simulación refleje exactamente el juego real.
 * Solo el loop de simulación y el reporte son propios.
 */

const fs = require('fs');
const path = require('path');

// ─── Cargar data.js + engine.js ──────────────────────────────────────
const dataCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'data.js'), 'utf8');
const engineCode = fs.readFileSync(path.join(__dirname, '..', 'js', 'engine.js'), 'utf8');
const vm = require('vm');
vm.runInThisContext(dataCode);
vm.runInThisContext(engineCode);
// Ahora tenemos: chars, tiers, eventTypes, boosters, actions,
// y funciones: score, tierScore, updateTier, getRelStage, applyEffects,
// checkBreakup, pickEvent, canUseAction, resolveEvent, engineResolveCrisis,
// startNewRelation, checkUpgrade

// ─── Seeded PRNG (xoshiro128) para resultados reproducibles ──────────
class SeededRandom {
  constructor(seed) {
    this.state = new Uint32Array([seed, seed + 0x9e3779b9, seed + 0x243f6a88, seed + 0xb7e15162]);
    for (let i = 0; i < 10; i++) this.next();
  }
  next() {
    const s0 = this.state[0], s3 = this.state[3];
    const t = (s3 << 11) ^ s3;
    const ns3 = s0 ^ (s0 >>> 19) ^ t ^ (t >>> 8);
    this.state[0] = this.state[1];
    this.state[1] = this.state[2];
    this.state[2] = this.state[3];
    this.state[3] = ns3;
    return (ns3 >>> 0) / 4294967296;
  }
  random() { return this.next(); }
}

// ─── Sobreescribe Math.random con la versión seedeada ────────────────
function useSeededRandom(seed) {
  const rng = new SeededRandom(seed);
  Math.random = () => rng.random();
  return rng;
}

// ─── Simulación ─────────────────────────────────────────────────────
function simulateGame(seed, acceptRate = 0.95) {
  useSeededRandom(seed);

  const char = chars[Math.floor(Math.random() * chars.length)];
  const g = {
    name: char.name,
    age: 18,
    tier: 0,
    maxTier: 0,
    turn: 0,
    turnCount: 0,
    fame: 4, rep: 6, contacts: 6, chem: 15, rumors: 0,
    couples: 0,
    relations: [],
    relProgress: 25,
    relStage: 0,
    relStatus: 'active',
    player: null,
    event: null,
    boosterJustDone: false,
    currentBooster: null,
    usedEvents: [],
    usedPlayers: [],
    eventsInRelation: 0,
    crisisActive: false,
  };

  Object.entries(char.bonus).forEach(([k, v]) => { g[k] = (g[k] || 0) + v; });
  g.relStage = getRelStage(g);

  let totalEvents = 0;
  let totalBoosters = 0;
  let totalCrisis = 0;
  let crisisSuccesses = 0;
  let crisisFailures = 0;
  let upgradeTaken = 0;
  let upgradeRejected = 0;
  const eventCountPerRel = [];
  let eventsInCurrentRel = 0;

  // Primera relación
  startNewRelation(g);
  g.event = pickEvent(g);

  while (g.turn < 24) {
    // ── Crisis resolution ──
    if (g.crisisActive) {
      const crisisChoice = Math.random() < 0.6 ? 'success' : 'failure';
      const result = engineResolveCrisis(g, crisisChoice);
      totalCrisis++;
      if (result === 'success') {
        crisisSuccesses++;
      } else {
        crisisFailures++;
        eventCountPerRel.push(eventsInCurrentRel);
        eventsInCurrentRel = 0;
        startNewRelation(g);
        g.event = pickEvent(g);
      }
      g.turn++;
      g.turnCount++;
      if (g.turn >= 24) break;
      continue;
    }

    // ── Breakup previa → inicializar nueva relación para el turno actual ──
    if (g.relStatus === 'broken') {
      eventCountPerRel.push(eventsInCurrentRel);
      eventsInCurrentRel = 0;
      startNewRelation(g);
      g.event = pickEvent(g);
    }

    // ── Resolver evento ──
    const choice = Math.floor(Math.random() * g.event.actions.length);
    const result = resolveEvent(g, choice);

    totalEvents++;
    eventsInCurrentRel++;

    g.turn++;
    g.turnCount++;
    if (g.turn >= 24) break;

    if (result.crisis) continue;    // la crisis se resolverá al inicio del próximo turno
    if (result.broke) continue;     // la nueva relación se iniciará al comienzo del próximo turno

    // ── Upgrade (oportunidad de ascenso) ──
    const upgrade = checkUpgrade(g);
    if (upgrade.ready) {
      if (Math.random() < acceptRate) {
        upgradeTaken++;
        g.tier = upgrade.nextTier;
        eventCountPerRel.push(eventsInCurrentRel);
        eventsInCurrentRel = 0;
        startNewRelation(g);
      } else {
        upgradeRejected++;
      }
    }

    // ── Booster ──
    if (g.turnCount % 5 === 0 && !g.boosterJustDone) {
      g.boosterJustDone = true;
      const booster = boosters[Math.floor(Math.random() * boosters.length)];
      totalBoosters++;
      const bChoice = Math.floor(Math.random() * 2);
      const opt = bChoice === 0 ? booster.optionA : booster.optionB;
      const ok = Math.random() < opt.rate;
      const eff = ok ? opt.reward : opt.fail;
      applyEffects(g, eff);
      checkBreakup(g);
    } else {
      g.boosterJustDone = false;
    }

    g.event = pickEvent(g);
  }

  if (eventsInCurrentRel > 0) eventCountPerRel.push(eventsInCurrentRel);
  updateTier(g);

  return {
    char: g.name,
    finalTier: tiers[g.tier].name,
    finalTierIdx: g.tier,
    totalEvents,
    totalBoosters,
    totalCrisis,
    crisisSuccesses,
    crisisFailures,
    upgradeTaken,
    upgradeRejected,
    relationsCount: eventCountPerRel.length,
    eventsPerRelation: eventCountPerRel,
    avgEventsPerRel: Math.round((eventCountPerRel.reduce((a, b) => a + b, 0) / Math.max(eventCountPerRel.length, 1)) * 10) / 10,
    couples: g.couples,
    finalScore: score(g),
    finalTierScore: tierScore(g),
  };
}

function runSimulations(n = 1000, acceptRate = 0.95) {
  const stats = [];
  for (let i = 0; i < n; i++) {
    stats.push(simulateGame(i, acceptRate));
  }
  return stats;
}

function printReport(stats) {
  const total = stats.length;

  const tierCounts = {};
  stats.forEach(s => { tierCounts[s.finalTier] = (tierCounts[s.finalTier] || 0) + 1; });

  const tierNames = ['Barrio', 'Ascenso', 'Primera', 'Latam', 'Europa', 'Champions'];
  console.log('='.repeat(72));
  console.log(`📊  SIMULACIÓN DE ${total} PARTIDAS (usa engine.js)`);
  console.log('='.repeat(72));

  console.log('\n' + ' TIER FINAL '.padStart(36, '-').padEnd(72, '-'));
  tierNames.forEach(name => {
    const count = tierCounts[name] || 0;
    const pct = (count / total) * 100;
    const bar = '█'.repeat(Math.floor(pct / 2)) + '░'.repeat(50 - Math.floor(pct / 2));
    console.log(`  ${name.padStart(12)}  ${bar}  ${count}/${total} (${pct.toFixed(1)}%)`);
  });

  const relCounts = stats.map(s => s.relationsCount);
  const avgRel = relCounts.reduce((a, b) => a + b, 0) / total;
  const maxRel = Math.max(...relCounts);
  const minRel = Math.min(...relCounts);

  console.log('\n' + ' RELACIONES POR PARTIDA '.padStart(36, '-').padEnd(72, '-'));
  console.log(`  Promedio: ${avgRel.toFixed(1)}  |  Máx: ${maxRel}  |  Mín: ${minRel}`);

  const relDist = {};
  relCounts.forEach(n => { relDist[n] = (relDist[n] || 0) + 1; });
  Object.keys(relDist).sort((a, b) => a - b).forEach(n => {
    const pct = relDist[n] / total * 100;
    const bar = '█'.repeat(Math.floor(pct / 2));
    console.log(`  ${String(n).padStart(2)} relaciones  ${bar}  ${relDist[n]} (${pct.toFixed(1)}%)`);
  });

  const epr = stats.map(s => s.avgEventsPerRel);
  const avgEpr = epr.reduce((a, b) => a + b, 0) / total;
  const maxEpr = Math.max(...epr);
  const minEpr = Math.min(...epr);
  const sortedEpr = [...epr].sort((a, b) => a - b);

  console.log('\n' + ' EVENTOS POR RELACIÓN '.padStart(36, '-').padEnd(72, '-'));
  console.log(`  Promedio: ${avgEpr.toFixed(1)}  |  Máx: ${maxEpr.toFixed(1)}  |  Mín: ${minEpr.toFixed(1)}`);
  console.log(`  Percentiles: P25=${sortedEpr[Math.floor(total * 0.25)].toFixed(1)}  P50=${sortedEpr[Math.floor(total * 0.5)].toFixed(1)}  P75=${sortedEpr[Math.floor(total * 0.75)].toFixed(1)}  P90=${sortedEpr[Math.floor(total * 0.9)].toFixed(1)}`);

  const crisisTotal = stats.reduce((a, s) => a + s.totalCrisis, 0);
  const crisisOk = stats.reduce((a, s) => a + s.crisisSuccesses, 0);
  const crisisFail = crisisTotal - crisisOk;
  console.log('\n' + ' CRISIS DE PAREJA '.padStart(36, '-').padEnd(72, '-'));
  console.log(`  Crisis totales: ${crisisTotal}  |  Promedio por partida: ${(crisisTotal / total).toFixed(2)}`);
  if (crisisTotal > 0) {
    console.log(`  Éxitos: ${crisisOk} (${(crisisOk / crisisTotal * 100).toFixed(1)}%)  |  Fallos: ${crisisFail} (${(crisisFail / crisisTotal * 100).toFixed(1)}%)`);
  }

  const upTaken = stats.reduce((a, s) => a + s.upgradeTaken, 0);
  const upRejected = stats.reduce((a, s) => a + s.upgradeRejected, 0);
  console.log('\n' + ' ASCENSOS (UPGRADE) '.padStart(36, '-').padEnd(72, '-'));
  console.log(`  Ascensos tomados: ${upTaken}  |  Rechazados: ${upRejected}`);
  console.log(`  Promedio de ascensos por partida: ${(upTaken / total).toFixed(2)}`);

  const finalScores = stats.map(s => s.finalScore);
  const tierScores = stats.map(s => s.finalTierScore);
  const avgFs = finalScores.reduce((a, b) => a + b, 0) / total;
  const maxFs = Math.max(...finalScores);
  const minFs = Math.min(...finalScores);
  const avgTs = tierScores.reduce((a, b) => a + b, 0) / total;

  console.log('\n' + ' SCORE FINAL '.padStart(36, '-').padEnd(72, '-'));
  console.log(`  Score total (con química):  prom=${avgFs.toFixed(0)}  máx=${maxFs}  mín=${minFs}`);
  console.log(`  Score tier (sin química):   prom=${avgTs.toFixed(0)}`);

  const couples = stats.map(s => s.couples);
  const avgCouples = couples.reduce((a, b) => a + b, 0) / total;
  const maxCouples = Math.max(...couples);
  console.log('\n' + ' NOVIAZGOS '.padStart(36, '-').padEnd(72, '-'));
  console.log(`  Promedio: ${avgCouples.toFixed(1)}  |  Máx: ${maxCouples}`);
}

// ─── CLI ────────────────────────────────────────────────────────────
const n = parseInt(process.argv[2]) || 500;
const acceptRate = process.argv[3] && !isNaN(parseFloat(process.argv[3])) ? parseFloat(process.argv[3]) : 0.95;

console.log(`Simulando ${n} partidas usando engine.js (tasa de aceptación de ascensos: ${(acceptRate * 100).toFixed(0)}%)...`);
console.log(`(incluye bonuses por stats en la tasa de éxito de eventos)\n`);
const stats = runSimulations(n, acceptRate);
printReport(stats);