scroller.container = document.querySelector(scroller.query + ">scroller-")
scroller.content = document.querySelector(scroller.query + ">scroller->scroll-content")
scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
scroller.container.addEventListener("scroll", scroller.listener, { passive: true })
scroller.observer = new ResizeObserver(() => scroller.onresize())
scroller.observer.observe(scroller.content)
scroller.observer.observe(scroller.container)

const
 scrollerLimit = scroller.cardinality - 1n,
 track = scroller.scrollBar = document.querySelector(scroller.query + ">scroll-bar"),
 up = track.querySelector(".scroll-up"),
 down = track.querySelector(".scroll-down"),
 thumb = track.querySelector("thumb-"),
 start = e => {
  _.noop(e)
  if (pointerID !== null) return
  activeElement = e.target
  activeElement.setPointerCapture(pointerID = e.pointerId)
  if (activeElement === thumb) {
   markY = e.clientY
   markedRouteID = scroller.routeID
   document.addEventListener("pointermove", drag)
  } else {
   markY = thumb.getBoundingClientRect().top
   jump(e.clientY)
   timeoutID = setTimeout(repeat, 400, e.clientY)
  }
  document.addEventListener("pointerup", end)
  document.addEventListener("pointercancel", end)
 },
 drag = e => {
  if (e.pointerId !== pointerID) return
  const positionalRouteID = markedRouteID + BigInt(Math.trunc((e.clientY - markY) / (track.clientHeight - (era.arm === era.vintage ? 2 * track.clientWidth : 0)) * Number(scrollerLimit)))
  const rangeLimit = BigInt(Math.trunc(Number(scrollerLimit) * (1 - scroller.container.clientHeight / scroller.container.scrollHeight)))
  const newRouteID = positionalRouteID < 0n ? 0n : (positionalRouteID > rangeLimit) ? rangeLimit : positionalRouteID
  if (newRouteID !== scroller.routeID)
   scroller.setRouteID(newRouteID)
 },
 jump = pointerY => {
  const amount = activeElement === track ? scroller.container.clientHeight : parseFloat(getComputedStyle(scroller.container).lineHeight)
  const direction = +(activeElement === track && markY < pointerY || activeElement === down) * 2 - 1
  scroller.container.scrollTop += amount * direction
 },
 repeat = pointerY => {
  jump(pointerY)
  timeoutID = setTimeout(repeat, 40, pointerY)
 },
 end = e => {
  if (e.pointerId !== pointerID)
   return

  if (activeElement === thumb) {
   document.removeEventListener("pointermove", drag)
   markedRouteID = null
  } else {
   clearTimeout(timeoutID)
   timeoutID = null
  }

  document.removeEventListener("pointerup", end)
  document.removeEventListener("pointercancel", end)

  if (activeElement.hasPointerCapture(pointerID))
   activeElement.releasePointerCapture(pointerID)

  pointerID = null
  activeElement = null
  markY = null
 }

scroller.startDrag = start

let timeoutID = null
let pointerID = null
let activeElement = null
let markY = null
let markedRouteID = null

for (const element of [up, down, thumb, track]) {
 element.onclick = e => _.noop(e)
 element.onpointerdown = scroller.startDrag
}

track.up = up
track.down = down
track.thumb = thumb