box.updateRouteID(ROUTE_ID)

for (let i = box.placeValues.length - 1; i >= 0; i--) {
 const placeValue = box.placeValues[i]
 box.placeStates[i] = ROUTE_ID / placeValue
 ROUTE_ID %= placeValue
}