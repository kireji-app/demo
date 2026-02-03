mix.updateRouteID(ROUTE_ID)

if (ROUTE_ID === -1n) {
 for (const factor of mix)
  factor.distributeRouteID(-1n)
} else {
 const factors = [...mix]

 for (let i = factors.length - 1; i >= 0; i--) {
  const factor = factors[i]
  const placeValue = mix.placeValues.get(factor)
  const routeID = ROUTE_ID / placeValue

  if (factor.routeID !== routeID)
   factor.distributeRouteID(routeID)

  ROUTE_ID %= placeValue
 }
}