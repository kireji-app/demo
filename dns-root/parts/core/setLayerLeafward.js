if (STATE < -1n)
 throw new RangeError(`(host ${part.host}, layer ${LAYER}, index ${part.index}): state (${STATE}) is too small (min = -1).`)

if (STATE >= part.size)
 throw new RangeError(`(host ${part.host}, layer ${LAYER}, index ${part.index}): state (${STATE}) is too large (max = ${part.size}).`)

// if (STATE === part.state[LAYER])
//  console.warn(`existing state (${STATE}) reassigned to LAYER ${LAYER}. ${part.host}`)

if (LAYER === root.primaryLayer)
 part.previousPrimaryState = part.state[LAYER]

part.state[LAYER] = STATE