if (DELTA)
 ROUTE_ID = (ROUTE_ID + part.routeID) % part.cardinality

part.distributeRouteID(ROUTE_ID)
part.parent?.collectRouteID([part])

if (environment === "window") {
 part.distributeRemoveView()
 part.parent?.collectRemoveView()
 part.parent?.collectAddView()
 part.distributeAddView()
 part.parent?.collectPopulateView()
 part.distributePopulateView()
}