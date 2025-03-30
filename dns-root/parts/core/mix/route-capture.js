if (part.routeID !== ROUTE_ID) {
 super(ROUTE_ID)
 for (const subpart of part) {
  // If issue, is it because this used to say stateCache = , a property I merged into previousRouteID?
  subpart.captureRoute(subpart.previousRouteID = ROUTE_ID / subpart.mixedRadixPlaceValue)
  ROUTE_ID %= subpart.mixedRadixPlaceValue
 }
}