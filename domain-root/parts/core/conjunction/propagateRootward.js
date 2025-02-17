for (const part of parts) {
 this.state += (part.state - part.stateCache) * part.conjunctionDivisor
 part.stateCache = part.state
}

super(...parts)