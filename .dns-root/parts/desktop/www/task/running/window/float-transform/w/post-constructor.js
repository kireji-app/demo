part.min = 300n
part.max = 900n
part.cardinality = part.max - part.min

Object.defineProperty(part, "value", {
 value() {
  return part.routeID + part.min
 }
})