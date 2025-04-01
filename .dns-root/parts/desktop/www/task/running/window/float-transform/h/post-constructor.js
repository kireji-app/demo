part.min = 150n
part.max = 600n
part.cardinality = part.max - part.min
Object.defineProperty(part, "value", {
 value() {
  return part.routeID + part.min
 }
})