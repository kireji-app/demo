if (part.state[LAYER] !== STATE) {
 super(STATE)
 for (const subpart of part) {
  if (STATE < subpart.size) {
   if (part.choice[LAYER] !== subpart) {
    if (LAYER === root.primaryLayer) await part.choice[LAYER]?.unsetDocument(LAYER)
    part.choice[LAYER] = part[subpart.index]
   }
   await subpart.propagateLeafward(LAYER, STATE)
   break
  }
  STATE -= subpart.size
 }
}