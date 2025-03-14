await part.propagateLeafward(LAYER, STATE)
await part.propagateRootward(LAYER)

if (LAYER === root.primaryLayer) {
 await part.updateLeafward(LAYER)
 await part.updateRootward(LAYER)
}