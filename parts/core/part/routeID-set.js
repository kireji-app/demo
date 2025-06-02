if (DELTA)
 ROUTE_ID = (ROUTE_ID + part.routeID) % part.cardinality

part.distributeRouteID(ROUTE_ID)
part[".."]?.collectRouteID([part])

if (environment === "window") {
 part.distributeRemoveView()
 part[".."]?.collectRemoveView()
 part[".."]?.collectAddView()
 part.distributeAddView()
 part[".."]?.collectPopulateView()
 part.distributePopulateView()
}

part.distributeClean()
part[".."]?.collectClean()