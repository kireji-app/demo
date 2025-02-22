super(FACTORS)

this.computeShuffle = layer => {
 if (layer !== Build.documentLayer) return

 const
  offset = this.offset,
  state = ((this.layer[layer] * 1664525n + 1013904223n) % this.size)
 if (typeof this.onshuffle === "function") this.onshuffle(offset + state)
}