const markedRouteID = scroller.routeID
const scrollerLimit = scroller.cardinality - 1n
const rangeLimit = BigInt(Math.trunc(Number(scrollerLimit) * (1 - scroller.container.clientHeight / scroller.container.scrollHeight)))

pointer.handle({
 drag(pointerEvent) {
  const positionalRouteID = markedRouteID + BigInt(Math.trunc((pointerEvent.clientY - POINTER_EVENT.clientY) / (scroller.scrollBar.clientHeight - (era.arm === era.vintage ? 2 * scroller.scrollBar.clientWidth : 0)) * Number(scrollerLimit)))
  const newRouteID = positionalRouteID < 0n ? 0n : (positionalRouteID > rangeLimit) ? rangeLimit : positionalRouteID
  if (newRouteID !== scroller.routeID) scroller.setRouteID(newRouteID)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})