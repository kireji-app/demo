if (this.layer[layer] !== state) {
 super(state)
 for (const instance of this) {
  await instance.propagateLeafward(layer, instance.layerCache[layer] = state / instance.conjunctionDivisor)
  state %= instance.conjunctionDivisor
 }
}