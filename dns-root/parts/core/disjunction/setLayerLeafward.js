if (part.state[LAYER] !== STATE) {
 super(STATE)
 for (const subpart of part) {
  if (STATE < subpart.size) {
   if (LAYER === root.primaryLayer && part.choice[LAYER] !== subpart)
    part.previousChoice = part.choice[LAYER]

   part.choice[LAYER] = subpart
   await subpart.setLayerLeafward(LAYER, STATE)
   break
  }
  STATE -= subpart.size
 }
}