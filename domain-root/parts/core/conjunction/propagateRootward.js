for (const subpart of subparts ?? []) {
 part.state[layer] += (subpart.state[layer] - subpart.stateCache[layer]) * subpart.conjunctionDivisor
 subpart.stateCache[layer] = subpart.state[layer]
}

super(subparts)