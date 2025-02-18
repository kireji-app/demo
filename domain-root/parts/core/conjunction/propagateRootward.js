for (const instance of instances) {
 this.state += (instance.state - instance.stateCache) * instance.conjunctionDivisor
 instance.stateCache = instance.state
}

super(...instances)