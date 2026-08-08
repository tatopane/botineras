#!/usr/bin/env python3
"""Simulador de partidas de Botineras para entender el balance del juego."""

import random
import json
import sys
from collections import Counter

# ─── Datos del juego (copiados de data.js) ────────────────────────────────

CHARS = [
    {"name": "Wonda Nara", "bonus": {"fame": 8, "rep": 4}},
    {"name": "La China Suáres", "bonus": {"chem": 12, "fame": 5}},
    {"name": "Sasha Ferra", "bonus": {"fame": 12, "contacts": 4}},
    {"name": "Bri Marcas", "bonus": {"contacts": 12, "rep": 3}},
    {"name": "Jaz Peraltaa", "bonus": {"chem": 8, "rep": 7}},
    {"name": "Clari Cremaschi", "bonus": {"rep": 10, "fame": 4}},
]

TIERS = [
    {"name": "Barrio", "need": 0, "players": ["El 9 de Lugano", "El arquero streamer", "La figura del futsal", "El entrenador de Dock Sud"]},
    {"name": "Ascenso", "need": 30, "players": ["El goleador de Chacarita", "La promesa de Atlanta", "El lateral de Temperley", "El 4 de Ferro"]},
    {"name": "Primera", "need": 60, "players": ["Valentin Carbon", "Jose Sasa", "Juanfer Quintino", "Milton Delgade"]},
    {"name": "Latam", "need": 90, "players": ["La figura de Flamengo", "Ronaldinho", "Rodrigo DiPaúl", "Sergio Canales"]},
    {"name": "Europa", "need": 150, "players": ["Vinícius Júniorr", "Jude Bellinghan", "Rafael Leãu", "Dani Olme", "Nico Willian", "Lautaro Martines"]},
    {"name": "Champions", "need": 240, "players": ["Erling Håland", "Kylian M'Bapé", "Lamine Yamall", "Rodrig", "Julián Álvares", "Harry Kane"]},
]

EVENTS = [
    {"id": "E1", "stage": 0, "actions": [
        ["Aceptar sin subir nada", 0.72, {"chem": 18, "rep": 12, "relProgress": 18}, {"chem": -5, "relProgress": -8}],
        ["Subir una historia misteriosa", 0.53, {"fame": 18, "rumors": 1, "chem": 14, "relProgress": 14}, {"rep": -8, "chem": -8, "rumors": 1, "relProgress": -10}],
        ["Pedirle a Guillote que arme el encuentro", 0.64, {"contacts": 16, "chem": 14, "relProgress": 15}, {"rep": -5, "relProgress": -6}],
    ]},
    {"id": "E2", "stage": 0, "actions": [
        ["Salir juntos", 0.56, {"fame": 22, "rumors": 1, "chem": 14, "relProgress": 15}, {"rep": -9, "rumors": 1, "relProgress": -10}],
        ["Salir por separado", 0.74, {"rep": 16, "chem": 16, "relProgress": 18}, {"chem": -8, "relProgress": -8}],
        ["Escapar por la cocina", 0.61, {"chem": 20, "contacts": 10, "relProgress": 15}, {"rep": -6, "relProgress": -7}],
    ]},
    {"id": "E3", "stage": 1, "actions": [
        ["Ir sin avisar a nadie", 0.63, {"chem": 24, "rep": 14, "relProgress": 20}, {"rep": -10, "chem": -7, "relProgress": -12}],
        ["Contárselo a una amiga", 0.49, {"contacts": 14, "chem": 16, "relProgress": 14}, {"rumors": 2, "rep": -8, "relProgress": -12}],
        ["Pedir ubicación en vivo", 0.70, {"rep": 16, "chem": 14, "relProgress": 16}, {"chem": -5, "relProgress": -8}],
    ]},
    {"id": "E4", "stage": 1, "actions": [
        ["Confirmar que se están conociendo", 0.58, {"fame": 28, "chem": 20, "rumors": 1, "relProgress": 18}, {"rep": -18, "chem": -12, "rumors": 2, "relProgress": -18}],
        ["Negarlo con elegancia", 0.72, {"rep": 22, "fame": 14, "chem": 6, "relProgress": 15}, {"rep": -6, "rumors": 1, "relProgress": -8}],
        ["No decir nada", 0.64, {"chem": 16, "rep": 14, "relProgress": 14}, {"rumors": 2, "rep": -5, "relProgress": -10}],
    ]},
    {"id": "E5", "stage": 2, "failBreaks": True, "actions": [
        ["Aceptar", 0.67, {"chem": 28, "rep": 18, "relProgress": 30}, {"chem": -15, "rep": -7, "relProgress": -20}],
        ["Pedir tiempo", 0.55, {"rep": 20, "chem": 14, "relProgress": 14}, {"chem": -12, "relProgress": -15}],
        ["Responder con un meme", 0.45, {"fame": 14, "chem": 24, "relProgress": 22}, {"chem": -18, "rep": -5, "relProgress": -20}],
    ]},
    {"id": "E6", "stage": 0, "actions": [
        ["Aceptar sin preguntar", 0.65, {"chem": 14, "relProgress": 15}, {"chem": -5, "relProgress": -8}],
        ["Preguntar quién más va", 0.55, {"rep": 12, "relProgress": 14}, {"rep": -4, "relProgress": -12}],
        ["Subir historia en biquini", 0.50, {"fame": 18, "rumors": 1, "relProgress": 10}, {"rep": -8, "chem": -5, "relProgress": -10}],
    ]},
    {"id": "E7", "stage": 1, "actions": [
        ["Ir sin avisar", 0.45, {"chem": 22, "relProgress": 22}, {"rep": -10, "rumors": 2, "relProgress": -15}],
        ["Decirle a una amiga la dirección", 0.60, {"contacts": 14, "chem": 6, "relProgress": 16}, {"rumors": 2, "rep": -6, "relProgress": -10}],
        ["Pedir que venga él/ella a tu casa", 0.70, {"rep": 14, "chem": 6, "relProgress": 12}, {"chem": -5, "relProgress": -5}],
    ]},
    {"id": "E8", "stage": 1, "actions": [
        ["Enfrentarlo y aclarar", 0.60, {"rep": 16, "chem": 14, "relProgress": 14}, {"rep": -8, "chem": -10, "relProgress": -15}],
        ["Hacerte la desentendida", 0.55, {"fame": 14, "chem": 6, "relProgress": 10}, {"rumors": 2, "chem": -8, "relProgress": -12}],
        ["Publicar una indirecta en redes", 0.50, {"fame": 22, "contacts": 10, "chem": 6, "relProgress": 8}, {"rep": -12, "rumors": 3, "relProgress": -18}],
    ]},
    {"id": "E9", "stage": 2, "failBreaks": True, "actions": [
        ["Perdonar y seguir", 0.40, {"rep": 16, "chem": 18, "relProgress": 10}, {"rep": -15, "chem": -20, "relProgress": -30}],
        ["Terminar con dignidad", 0.85, {"rep": 22, "fame": 14, "chem": 8, "relProgress": -15}, {"rep": -10, "chem": -10, "relProgress": -20}],
        ["Exponerlo todo en redes", 0.50, {"fame": 35, "contacts": 15, "relProgress": -20}, {"rep": -20, "rumors": 5, "relProgress": -30}],
    ]},
    {"id": "E10", "stage": 2, "failBreaks": True, "actions": [
        ["Mudarse juntos", 0.50, {"chem": 26, "relProgress": 26}, {"rep": -10, "chem": -15, "relProgress": -20}],
        ["Pedir tiempo para pensarlo", 0.65, {"rep": 16, "chem": 8, "relProgress": 10}, {"chem": -8, "relProgress": -12}],
        ["Mudarse pero con contrato", 0.55, {"rep": 18, "chem": 6, "relProgress": 14}, {"chem": -5, "relProgress": -8}],
    ]},
    {"id": "E11", "stage": 2, "failBreaks": True, "actions": [
        ["Irse juntos a Rusia", 0.45, {"chem": 28, "relProgress": 28, "fame": 0}, {"rep": -15, "chem": -18, "relProgress": -25}],
        ["Intentar relación a distancia", 0.55, {"rep": 14, "chem": 12, "relProgress": 10}, {"chem": -12, "relProgress": -15}],
        ["Terminar antes del viaje", 0.80, {"rep": 18, "chem": 6, "relProgress": -15}, {"fame": -8, "chem": -5, "relProgress": -10}],
    ]},
    {"id": "E12", "stage": 2, "failBreaks": True, "actions": [
        ["Aceptar emocionada", 0.55, {"chem": 32, "fame": 30, "rep": 15, "relProgress": 26}, {"rep": -15, "chem": -12, "rumors": 3, "relProgress": -20}],
        ["Hacerlo en secreto", 0.65, {"chem": 24, "rep": 18, "relProgress": 20}, {"rep": -8, "rumors": 2, "relProgress": -12}],
        ["Pedir un acuerdo prenupcial", 0.60, {"rep": 20, "contacts": 12, "chem": 6, "relProgress": 12}, {"chem": -8, "relProgress": -8}],
    ]},
    {"id": "E13", "stage": 2, "failBreaks": True, "actions": [
        ["Sí, quiero ser madre", 0.50, {"chem": 35, "fame": 22, "rep": 14, "relProgress": 24}, {"chem": -18, "rep": -10, "rumors": 2, "relProgress": -20}],
        ["Esperar un poco más", 0.60, {"rep": 16, "chem": 16, "relProgress": 12}, {"chem": -10, "relProgress": -12}],
        ["Ser sincera y decir que no", 0.55, {"rep": 18, "chem": 6, "relProgress": 10}, {"chem": -20, "relProgress": -25}],
    ]},
]

BOOSTERS = [
    {"id": "B1", "actions": [
        {"rate": 0.55, "reward": {"chem": 25, "fame": 18, "relProgress": 15}, "fail": {"rep": -20, "rumors": 5, "relProgress": -10}},
        {"rate": 0.45, "reward": {"rep": 5, "relProgress": 2}, "fail": {"rep": -20, "rumors": 5, "relProgress": -10}},
    ]},
    {"id": "B2", "actions": [
        {"rate": 0.60, "reward": {"fame": 20, "relProgress": 5}, "fail": {"rep": -15, "relProgress": -10}},
        {"rate": 0.40, "reward": {"rep": 8, "relProgress": 2}, "fail": {"rep": -15, "relProgress": -10}},
    ]},
    {"id": "B3", "actions": [
        {"rate": 0.65, "reward": {"rep": 10, "chem": 5, "relProgress": 8}, "fail": {"fame": -10, "relProgress": -5}},
        {"rate": 0.35, "reward": {"rep": 3, "relProgress": 1}, "fail": {"fame": -10, "relProgress": -5}},
    ]},
    {"id": "B4", "actions": [
        {"rate": 0.60, "reward": {"rep": 10, "contacts": 8, "relProgress": 5}, "fail": {"chem": -5, "relProgress": -3}},
        {"rate": 0.40, "reward": {"fame": 4, "relProgress": 1}, "fail": {"chem": -5, "relProgress": -3}},
    ]},
    {"id": "B5", "actions": [
        {"rate": 0.40, "reward": {"fame": 40, "contacts": 15, "relProgress": 3}, "fail": {"rep": -40, "relProgress": -15}},
        {"rate": 0.60, "reward": {"rep": 15, "relProgress": 2}, "fail": {"rep": -40, "relProgress": -15}},
    ]},
    {"id": "B6", "actions": [
        {"rate": 0.50, "reward": {"fame": 30, "relProgress": 3}, "fail": {"rep": -25, "relProgress": -8}},
        {"rate": 0.50, "reward": {"rep": 10, "relProgress": 2}, "fail": {"rep": -25, "relProgress": -8}},
    ]},
    {"id": "B7", "actions": [
        {"rate": 0.60, "reward": {"chem": 8, "relProgress": 5}, "fail": {"rep": -5, "relProgress": -3}},
        {"rate": 0.40, "reward": {"rep": 5, "relProgress": 1}, "fail": {"rep": -5, "relProgress": -3}},
    ]},
    {"id": "B8", "actions": [
        {"rate": 0.50, "reward": {"fame": 16, "contacts": 10, "relProgress": 3}, "fail": {"rep": -15, "relProgress": -5}},
        {"rate": 0.50, "reward": {"rep": 10, "relProgress": 2}, "fail": {"rep": -15, "relProgress": -5}},
    ]},
]


# ─── Funciones del juego ──────────────────────────────────────────────────

def score(g):
    return (g.get("fame", 0) + g.get("rep", 0) + g.get("contacts", 0)
            + g.get("chem", 0) - g.get("rumors", 0) * 5)

def tier_score(g):
    return (g.get("fame", 0) + g.get("rep", 0) + g.get("contacts", 0)
            - g.get("rumors", 0) * 5)

def update_tier(g):
    for i in range(len(TIERS) - 1, -1, -1):
        if tier_score(g) >= TIERS[i]["need"]:
            g["tier"] = i
            return

def get_rel_stage(g):
    p = g.get("relProgress", 0)
    if p >= 76: return 2
    if p >= 41: return 1
    return 0

def apply_effects(g, effects):
    if not effects:
        return
    for k, v in effects.items():
        if k == "relProgress":
            g["relProgress"] = max(0, min(100, g.get("relProgress", 0) + v))
        elif k in g:
            g[k] = max(0, g[k] + v)
    g["relStage"] = get_rel_stage(g)

def check_breakup(g):
    if g["relStage"] == 2 and g["relProgress"] <= 75:
        g["relStatus"] = "broken"
        return True
    if g["relProgress"] <= 0 or g.get("chem", 0) <= 0:
        g["relStatus"] = "broken"
        return True
    return False

def pick_event(g):
    stage = g["relStage"]
    available = [e for e in EVENTS if e["stage"] == stage]
    used = g.get("usedEvents", [])
    unused = [e for e in available if e["id"] not in used]
    if unused:
        return random.choice(unused)
    return random.choice(available)

def resolve_event(g, event_idx):
    """Resuelve un evento eligiendo una opción al azar. Retorna False si hay crisis."""
    event = g["event"]
    action = event["actions"][event_idx]
    rate = action[1]
    ok = random.random() < rate
    eff = action[2] if ok else action[3]

    apply_effects(g, eff)

    # Lógica de noviazgo (como en el juego real)
    if ok:
        if g["relStage"] == 2 and g["relProgress"] >= 75:
            g["couples"] = g.get("couples", 0) + 1

    if event.get("id") and event["id"] not in g.get("usedEvents", []):
        g.setdefault("usedEvents", []).append(event["id"])
    g["eventsInRelation"] = g.get("eventsInRelation", 0) + 1

    if not ok and event.get("failBreaks"):
        g["relStatus"] = "broken"
    elif check_breakup(g):
        pass
    elif not ok and (g.get("chem", 0) < 5 or random.random() < 0.10):
        g["relStatus"] = "broken"

    # Crisis check
    if g["relStatus"] != "broken" and g["eventsInRelation"] >= 5 and g.get("chem", 0) < 50 and not g.get("crisisActive"):
        g["crisisActive"] = True
        return "crisis"

    return "ok" if g["relStatus"] != "broken" else "broken"

def resolve_crisis(g, choice="success"):
    g["crisisActive"] = False
    if choice == "success" or random.random() < 0.55:
        g["chem"] = 51
        return "success"
    else:
        g["relStatus"] = "broken"
        g["player"] = None
        g["usedEvents"] = []
        g["eventsInRelation"] = 0
        return "failure"

def start_new_relation(g):
    g["player"] = random.choice(TIERS[g["tier"]]["players"])
    g["relProgress"] = 25
    g["relStage"] = 0
    g["relStatus"] = "active"
    g["usedEvents"] = []
    g["eventsInRelation"] = 0
    g["crisisActive"] = False


def simulate_game(seed=None):
    if seed is not None:
        random.seed(seed)

    char = random.choice(CHARS)
    g = {
        "name": char["name"],
        "age": 18,
        "tier": 0,
        "turn": 0,
        "turnCount": 0,
        "fame": 4,
        "rep": 6,
        "contacts": 6,
        "chem": 15,
        "rumors": 0,
        "couples": 0,
        "relations": [],
        "relProgress": 25,
        "relStage": 0,
        "relStatus": "active",
        "player": None,
        "event": None,
        "boosterJustDone": False,
        "currentBooster": None,
        "usedEvents": [],
        "eventsInRelation": 0,
        "crisisActive": False,
    }

    for k, v in char["bonus"].items():
        g[k] = g.get(k, 0) + v
    g["relStage"] = get_rel_stage(g)

    total_events = 0
    total_boosters = 0
    total_crisis = 0
    crisis_successes = 0
    crisis_failures = 0
    upgrade_taken = 0
    upgrade_rejected = 0
    event_count_per_rel = []
    events_in_current_rel = 0

    start_new_relation(g)
    g["event"] = pick_event(g)

    while g["turn"] < 24:
        if g.get("crisisActive"):
            crisis_choice = "success" if random.random() < 0.6 else "failure"
            result = resolve_crisis(g, crisis_choice)
            total_crisis += 1
            if result == "success":
                crisis_successes += 1
                g["turn"] += 1
                g["turnCount"] += 1
                if g["turn"] >= 24:
                    break
            else:
                crisis_failures += 1
                event_count_per_rel.append(events_in_current_rel)
                events_in_current_rel = 0
                g["turn"] += 1
                g["turnCount"] += 1
                if g["turn"] >= 24:
                    break
                start_new_relation(g)
                g["event"] = pick_event(g)
                continue

        if g["relStatus"] == "broken":
            event_count_per_rel.append(events_in_current_rel)
            events_in_current_rel = 0
            start_new_relation(g)
            g["event"] = pick_event(g)
            g["turn"] += 1
            g["turnCount"] += 1
            continue

        choice = random.randrange(len(g["event"]["actions"]))
        result = resolve_event(g, choice)

        total_events += 1
        events_in_current_rel += 1

        if result == "crisis":
            continue

        if result == "broken":
            event_count_per_rel.append(events_in_current_rel)
            events_in_current_rel = 0
            g["turn"] += 1
            g["turnCount"] += 1
            continue

        g["turn"] += 1
        g["turnCount"] += 1

        if g["turn"] >= 24:
            break

        # continueGame: upgrade, booster, next
        if (g["eventsInRelation"] >= 4 and (g["eventsInRelation"] - 4) % 3 == 0
                and g["tier"] < len(TIERS) - 1):
            next_tier = TIERS[g["tier"] + 1]
            if next_tier and tier_score(g) >= next_tier["need"]:
                if random.random() < 0.5:
                    upgrade_taken += 1
                    g["tier"] += 1
                    event_count_per_rel.append(events_in_current_rel)
                    events_in_current_rel = 0
                    start_new_relation(g)
                else:
                    upgrade_rejected += 1

        if g["turnCount"] % 5 == 0 and not g.get("boosterJustDone"):
            g["boosterJustDone"] = True
            booster = random.choice(BOOSTERS)
            total_boosters += 1
            choice = random.choice([0, 1])
            opt = booster["actions"][choice]
            ok = random.random() < opt["rate"]
            eff = opt["reward"] if ok else opt["fail"]
            apply_effects(g, eff)
            if check_breakup(g):
                event_count_per_rel.append(events_in_current_rel)
                events_in_current_rel = 0
                start_new_relation(g)
                g["event"] = pick_event(g)
                continue
        else:
            g["boosterJustDone"] = False

        g["event"] = pick_event(g)

    if events_in_current_rel > 0:
        event_count_per_rel.append(events_in_current_rel)

    update_tier(g)
    return {
        "char": g["name"],
        "final_tier": TIERS[g["tier"]]["name"],
        "final_tier_idx": g["tier"],
        "total_events": total_events,
        "total_boosters": total_boosters,
        "total_crisis": total_crisis,
        "crisis_successes": crisis_successes,
        "crisis_failures": crisis_failures,
        "upgrade_taken": upgrade_taken,
        "upgrade_rejected": upgrade_rejected,
        "relations_count": len(event_count_per_rel),
        "events_per_relation": event_count_per_rel,
        "avg_events_per_rel": round(sum(event_count_per_rel) / max(len(event_count_per_rel), 1), 1),
        "couples": g.get("couples", 0),
        "final_score": score(g),
        "final_tier_score": tier_score(g),
    }


def run_simulations(n=1000):
    stats = []
    for i in range(n):
        s = simulate_game(seed=i)
        stats.append(s)
    return stats


def print_report(stats):
    total = len(stats)
    tier_counts = Counter(s["final_tier"] for s in stats)
    relations_counts = [s["relations_count"] for s in stats]
    events_per_rel = [s["avg_events_per_rel"] for s in stats]
    crisis_counts = [s["total_crisis"] for s in stats]
    crisis_success = [s["crisis_successes"] for s in stats]
    upgrade_taken = [s["upgrade_taken"] for s in stats]
    upgrade_rejected_list = [s["upgrade_rejected"] for s in stats]
    final_scores = [s["final_score"] for s in stats]
    final_tier_scores = [s["final_tier_score"] for s in stats]

    print("=" * 72)
    print(f"\U0001f4ca  SIMULACIÓN DE {total} PARTIDAS")
    print("=" * 72)

    print(f"\n{' TIER FINAL ':-^72}")
    for tier_name in ["Barrio", "Ascenso", "Primera", "Latam", "Europa", "Champions"]:
        count = tier_counts.get(tier_name, 0)
        pct = count / total * 100
        bar = "\u2588" * int(pct / 2) + "\u2591" * (50 - int(pct / 2))
        print(f"  {tier_name:>12}  {bar}  {count:>4}/{total} ({pct:5.1f}%)")

    print(f"\n{' RELACIONES POR PARTIDA ':-^72}")
    avg_rel = sum(relations_counts) / total
    max_rel = max(relations_counts)
    min_rel = min(relations_counts)
    rel_dist = Counter(relations_counts)
    print(f"  Promedio: {avg_rel:.1f}  |  Máx: {max_rel}  |  Mín: {min_rel}")
    for n in sorted(rel_dist):
        pct = rel_dist[n] / total * 100
        bar = "\u2588" * int(pct / 2)
        print(f"  {n:>2} relaciones  {bar}  {rel_dist[n]:>4} ({pct:5.1f}%)")

    print(f"\n{' EVENTOS POR RELACIÓN ':-^72}")
    avg_epr = sum(events_per_rel) / total
    max_epr = max(events_per_rel)
    min_epr = min(events_per_rel)
    print(f"  Promedio: {avg_epr:.1f}  |  Máx: {max_epr}  |  Mín: {min_epr}")

    sorted_epr = sorted(events_per_rel)
    p25 = sorted_epr[int(total * 0.25)]
    p50 = sorted_epr[int(total * 0.5)]
    p75 = sorted_epr[int(total * 0.75)]
    p90 = sorted_epr[int(total * 0.9)]
    print(f"  Percentiles: P25={p25}  P50={p50}  P75={p75}  P90={p90}")

    print(f"\n{' CRISIS DE PAREJA ':-^72}")
    avg_crisis = sum(crisis_counts) / total
    total_crisis_events = sum(crisis_counts)
    total_success = sum(crisis_success)
    total_failure = total_crisis_events - total_success
    print(f"  Crisis totales: {total_crisis_events}  |  Promedio por partida: {avg_crisis:.2f}")
    if total_crisis_events > 0:
        print(f"  Éxitos: {total_success} ({total_success/total_crisis_events*100:.1f}%)  |  Fallos: {total_failure} ({total_failure/total_crisis_events*100:.1f}%)")

    print(f"\n{' ASCENSOS (UPGRADE) ':-^72}")
    avg_up = sum(upgrade_taken) / total
    total_upgrade = sum(upgrade_taken) + sum(upgrade_rejected_list)
    print(f"  Ascensos tomados: {sum(upgrade_taken)}  |  Rechazados: {sum(upgrade_rejected_list)}")
    print(f"  Promedio de ascensos por partida: {avg_up:.2f}")

    print(f"\n{' SCORE FINAL ':-^72}")
    avg_fs = sum(final_scores) / total
    max_fs = max(final_scores)
    min_fs = min(final_scores)
    avg_ts = sum(final_tier_scores) / total
    print(f"  Score total (con química):  prom={avg_fs:.0f}  máx={max_fs}  mín={min_fs}")
    print(f"  Score tier (sin química):   prom={avg_ts:.0f}")

    print(f"\n{' NOVIAZGOS ':-^72}")
    couples_list = [s["couples"] for s in stats]
    avg_c = sum(couples_list) / total
    max_c = max(couples_list)
    print(f"  Promedio: {avg_c:.1f}  |  Máx: {max_c}")


if __name__ == "__main__":
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 1000
    print(f"Simulando {n} partidas...")
    stats = run_simulations(n)
    print_report(stats)