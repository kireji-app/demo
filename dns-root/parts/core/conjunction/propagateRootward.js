for (const leaf of LEAVES ?? []) {
 part.state[LAYER] += (leaf.state[LAYER] - leaf.stateCache[LAYER]) * leaf.conjunctionDivisor
 leaf.stateCache[LAYER] = leaf.state[LAYER]
}

super(LEAVES)