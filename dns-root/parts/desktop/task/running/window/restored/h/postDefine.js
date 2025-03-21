part.min = 150n
part.max = 600n
part.size = part.max - part.min
Object.defineProperty(part, "getValue", {
 value(LAYER) {
  return part.state[LAYER] + part.min
 }
})