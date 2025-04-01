if (mix.routeID !== ROUTE_ID) {
 super(ROUTE_ID)
 for (const factor of mix) {
  factor.distributeRoute(ROUTE_ID / mix.placeValues[factor])
  ROUTE_ID %= mix.placeValues[factor]
 }
}