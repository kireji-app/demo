if (STATE !== part.state[LAYER]) {
 await part.setLayerLeafward(LAYER, STATE)
 await part.setLayerRootward(LAYER)

 if (LAYER === root.primaryLayer) {
  await part.setDocumentLeafward(LAYER)
  part.rootPart.updateDocumentLeafward(LAYER)
 }
} // else console.warn('ignored reassignment', part.host, part.state[LAYER])