import sys
sys.path.insert(0, '/home/tato/botineras/tareas')

# Quick check - use a different set of seeds to avoid exact replay
import random

# Load the sim module
from simular import simulate_game, TIERS, tier_score

# Check what the threshold actually is in the module
print(f"Champions need: {TIERS[5]['need']}")
print(f"Europa need: {TIERS[4]['need']}")
print()

# Run 20 games with fresh seeds to see distribution
scores = []
for i in range(500, 600):
    g = simulate_game(seed=i)
    scores.append(g['final_tier_score'])

# Count how many between thresholds
count_120_144 = sum(1 for s in scores if 120 <= s <= 144)
count_150_plus = sum(1 for s in scores if s >= 150)
count_145_149 = sum(1 for s in scores if 145 <= s <= 149)
europa_range = sum(1 for s in scores if 75 <= s < 120)

print(f"Games with tier score 120-144: {count_120_144}")
print(f"Games with tier score 145-149: {count_145_149}")
print(f"Games with tier score >=150: {count_150_plus}")
print(f"Games with tier score 75-119 (Europa range): {europa_range}")
print(f"Min score: {min(scores)}, Max score: {max(scores)}, Avg: {sum(scores)/len(scores):.0f}")