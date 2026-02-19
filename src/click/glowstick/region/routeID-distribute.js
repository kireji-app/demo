box.updateRouteID(ROUTE_ID)

if (glowstick.skipMoveWorld)
 return

for (let i = box.placeValues.length - 1; i >= 0; i--) {
 const placeValue = box.placeValues[i]
 box.placeStates[i] = Number(ROUTE_ID / placeValue)
 ROUTE_ID %= placeValue
}