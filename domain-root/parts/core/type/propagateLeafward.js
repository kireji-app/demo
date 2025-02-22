if (state < -1n)
 throw new RangeError(`state (${state}) is too small (min = -1). ${this.uid}`)

if (state >= this.size)
 throw new RangeError(`state (${state}) is too large (max = ${this.size}). ${this.uid}`)

if (this.layer[layer] === state)
 console.warn(`state (${state}) reassigned to layer ${layer}. ${this.uid}`)

const previousState = this.layer[layer]
this.layer[layer] = state

if (layer === Build.documentLayer && previousState === -1n)
 await this.setDocument(layer)