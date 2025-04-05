if (DELTA)
 ROUTE_ID = (ROUTE_ID + part.routeID) % part.cardinality

part.distributeRoute(ROUTE_ID)
part.parent?.collectRoute([part])

if (ENVIRONMENT === "window") {
 part.distributeRemoveView()
 part.parent?.collectRemoveView()
 part.parent?.collectAddView()
 part.distributeAddView()
 part.parent?.collectPopulateView()
 part.distributePopulateView()
}