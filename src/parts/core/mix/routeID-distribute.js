mix.updateRouteID(ROUTE_ID)

const factors = [...mix]

for (let i = factors.length - 1; i >= 0; i--) {
 const factor = factors[i]
 const placeValue = mix.placeValues.get(factor)
 const routeID = ROUTE_ID / placeValue

 if (factor.routeID !== routeID)
  factor.distributeRouteID(routeID)

 ROUTE_ID %= placeValue
}