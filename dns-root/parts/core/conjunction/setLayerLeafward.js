if (part.state[LAYER] !== STATE) {
 super(STATE)
 for (const subpart of part) {
  await subpart.setLayerLeafward(LAYER, subpart.stateCache[LAYER] = STATE / subpart.conjunctionDivisor)
  STATE %= subpart.conjunctionDivisor
 }
}