if (STATE < -1n)
 throw new RangeError(`state (${STATE}) is too small (min = -1). ${part.host}`)

if (STATE >= part.size)
 throw new RangeError(`state (${STATE}) is too large (max = ${part.size}). ${part.host}`)

// if (STATE === part.state[LAYER])
//  console.warn(`state (${STATE}) reassigned to LAYER ${LAYER}. ${part.host}`)

const previousState = part.state[LAYER]
part.state[LAYER] = STATE

if (LAYER === root.primaryLayer && previousState === -1n)
 await part.setDocument(LAYER)