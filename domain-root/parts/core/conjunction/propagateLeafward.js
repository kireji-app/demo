if (this.state !== state) {
 super(state)
 for (const part of this) {
  await part.propagateLeafward(part.stateCache = state / part.conjunctionDivisor)
  state %= part.conjunctionDivisor
 }
}