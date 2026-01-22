partMask.updateRouteID(ROUTE_ID)

let chosenParts = 0

partMask.chosenParts.clear()

for (let i = 0; i < partMask.superset.length; i++) {
 const subjectPart = partMask.superset[i]
 const toggleBit = 1n << BigInt(i)
 if ((toggleBit & partMask.routeID) > 0n)
  partMask.chosenParts.add(subjectPart)
}