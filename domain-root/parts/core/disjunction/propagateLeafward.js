if (part.state[layer] !== newState) {
 super(newState)
 for (const subpart of part) {
  if (newState < subpart.size) {
   if (part.choice[layer] !== subpart) {
    if (layer === root.primaryLayer) await part.choice[layer]?.unsetDocument(layer)
    part.choice[layer] = part[subpart.index]
   }
   await subpart.propagateLeafward(layer, newState)
   break
  }
  newState -= subpart.size
 }
}