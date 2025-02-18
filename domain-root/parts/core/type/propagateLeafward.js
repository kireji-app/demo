if (state < -1n)
 throw new RangeError(`state (${state}) is too small (min = -1). ${this.uid}`)

if (state >= this.size)
 throw new RangeError(`state (${state}) is too large (max = ${this.size}). ${this.uid}`)

if (this.state === state)
 console.warn(`state (${state}) was reassigned. ${this.uid}`)

const uninstalled = this.state === -1n
this.state = state

if (uninstalled)
 await this.install()