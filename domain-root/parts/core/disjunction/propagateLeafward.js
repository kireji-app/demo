if (this.layer[layer] !== state) {
 super(state)
 for (const instance of this) {
  if (state < instance.size) {
   if (this.choice[layer] !== instance) {
    if (layer === Build.documentLayer)
     await this.choice[layer]?.unsetDocument(layer)
    this.choice[layer] = instance
   }
   await instance.propagateLeafward(layer, state)
   break
  }
  state -= instance.size
 }
}