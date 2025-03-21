part.min = 300n
part.max = 900n
part.size = part.max - part.min
Object.defineProperty(part, "getValue", {
 value(LAYER) {
  return part.state[LAYER] + part.min
 }
})