if (LAYER === root.primaryLayer)
 console.groupCollapsed('Propagate https://' + part.host)

await part.propagateLeafward(LAYER, STATE)
await part.propagateRootward(LAYER)

if (LAYER === root.primaryLayer)
 console.groupEnd()

if (LAYER === root.primaryLayer) {
 console.groupCollapsed('Update https://' + part.host)
 await part.updateLeafward(LAYER)
 await part.updateRootward(LAYER)
 console.groupEnd()
}