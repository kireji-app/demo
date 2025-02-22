super(subparts)
if (layer === root.primaryLayer) {
 part.documentState = part.state[layer]
 for (const id in app.callbacks) await app.callbacks[id]()
}