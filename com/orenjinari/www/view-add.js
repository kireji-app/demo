addEventListener("wheel", part.onwheel = event => {
 event.preventDefault()
 event.stopPropagation()
 const maxScrollY = part.scroll.cardinality - 1n
 const documentHeight = document.body.scrollHeight - window.innerHeight
 const currentScrollRatio = BigInt(Math.trunc(event.deltaY / documentHeight * Number.MAX_SAFE_INTEGER))
 const requestedScrollY = part.routeID + currentScrollRatio * part.scroll.cardinality / BigInt(Number.MAX_SAFE_INTEGER)
 const minScrollY = 0n
 const finalScrollY = requestedScrollY > maxScrollY ? maxScrollY : requestedScrollY < minScrollY ? minScrollY : requestedScrollY
 part.scroll.set(finalScrollY)
}, { passive: false })