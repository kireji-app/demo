part.min = 0n
part.max = 599n
part.size = part.max - part.min
Object.defineProperty(part, "getValue", {
 value(LAYER) {
  return part.state[LAYER] + part.min
 }
})