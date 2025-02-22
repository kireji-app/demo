if (part.state[layer] !== newState) {
 super(newState)
 for (const subpart of part) {
  await subpart.propagateLeafward(layer, subpart.stateCache[layer] = newState / subpart.conjunctionDivisor)
  newState %= subpart.conjunctionDivisor
 }
}