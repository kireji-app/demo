addEventListener("wheel", scroller.onwheel = event => {
 const maxScrollY = scroller.cardinality - 1n
 const documentHeight = document.body.scrollHeight - window.innerHeight
 const currentScrollRatio = BigInt(Math.trunc(event.deltaY / documentHeight * Number.MAX_SAFE_INTEGER))
 const requestedScrollY = scroller.routeID + currentScrollRatio * scroller.cardinality / BigInt(Number.MAX_SAFE_INTEGER)
 const minScrollY = 0n
 const finalScrollY = requestedScrollY > maxScrollY ? maxScrollY : requestedScrollY < minScrollY ? minScrollY : requestedScrollY
 scroller.setRouteID(finalScrollY)
})