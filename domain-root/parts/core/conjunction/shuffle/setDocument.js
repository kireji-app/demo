part.computeShuffle = layer => {
 if (layer !== root.primaryLayer) return

 const
  offset = part.offset,
  state = ((part.state[layer] * 1664525n + 1013904223n) % part.size)
 if (typeof part.onshuffle === "function") part.onshuffle(offset + state)
}