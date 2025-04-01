part.min = 0n
part.max = 599n
part.cardinality = part.max - part.min
Object.defineProperty(part, "value", {
 get() {
  return part.routeID + part.min
 }
})