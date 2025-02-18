if (this.state !== state) {
 super(state)
 for (const instance of this) {
  if (state < instance.size) {
   if (this.choice !== instance) {
    await this.choice?.uninstall()
    this.choice = instance
   }
   await instance.propagateLeafward(state)
   break
  }
  state -= instance.size
 }
}