if (this.state !== state) {
 super(state)
 for (const instance of this) {
  await instance.propagateLeafward(instance.stateCache = state / instance.conjunctionDivisor)
  state %= instance.conjunctionDivisor
 }
}