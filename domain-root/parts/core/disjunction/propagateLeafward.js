if (this.state !== state) {
 super(state)
 for (const part of this) {
  if (state < part.size) {
   if (this.choice !== part) {
    await this.choice?.uninstall()
    this.choice = part
   }
   await part.propagateLeafward(state)
   break
  }
  state -= part.size
 }
}