_.noop(EVENT)
_.com.ejaugust.scroller.setRouteID(0n)
if (NOTE_ROUTE_ID && ejaugust.routeID !== NOTE_ROUTE_ID) {
 history.pushState(null, null, location.href)
 ejaugust.setRouteID(NOTE_ROUTE_ID)
}