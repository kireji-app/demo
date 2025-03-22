if (DELTA)
 STATE = (STATE + part.state[LAYER]) % part.size

if (STATE !== part.state[LAYER]) {
 await part.setLayerLeafward(LAYER, STATE)
 await part.setLayerRootward(LAYER)
 if (LAYER === root.primaryLayer) {
  await part.setDocumentLeafward(LAYER)
  part.root[LAYER].updateDocumentLeafward(LAYER)
 }
} // else console.warn('ignored reassignment', part.host, part.state[LAYER])