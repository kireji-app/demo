if (newState < -1n)
 throw new RangeError(`state (${newState}) is too small (min = -1). ${part.host}`)

if (newState >= part.size)
 throw new RangeError(`state (${newState}) is too large (max = ${part.size}). ${part.host}`)

// if (newState === part.state[layer])
//  console.warn(`state (${newState}) reassigned to layer ${layer}. ${part.host}`)

const previousState = part.state[layer]
part.state[layer] = newState

if (layer === root.primaryLayer && previousState === -1n)
 await part.setDocument(layer)