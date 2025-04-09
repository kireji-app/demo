mix.updateRoute(ROUTE_ID)

for (let i = mix.length - 1; i >= 0; i--) {
 const placeValue = mix.placeValues.get(i)
 const factor = mix[i]
 const routeID = ROUTE_ID / placeValue

 if (factor.routeID !== routeID)
  factor.distributeRoute(routeID)

 ROUTE_ID %= placeValue
}