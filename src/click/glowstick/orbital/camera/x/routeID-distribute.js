part.updateRouteID(ROUTE_ID)

if (SKIP_RUNTIME_STATE_DISTRIBUTION)
 return

part.smooth = Number(ROUTE_ID) / 10 - 90