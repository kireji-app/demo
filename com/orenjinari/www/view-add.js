if (desktop.theme === orenjinari)
 addEventListener("wheel", orenjinari.onwheel = event => {
  const maxScrollY = orenjinari.cardinality - 1n
  const documentHeight = document.body.scrollHeight - window.innerHeight
  const currentScrollRatio = BigInt(Math.trunc(event.deltaY / documentHeight * Number.MAX_SAFE_INTEGER))
  const requestedScrollY = orenjinari.routeID + currentScrollRatio * orenjinari.cardinality / BigInt(Number.MAX_SAFE_INTEGER)
  const minScrollY = 0n
  const finalScrollY = requestedScrollY > maxScrollY ? maxScrollY : requestedScrollY < minScrollY ? minScrollY : requestedScrollY
  orenjinari.setRouteID(finalScrollY)
 })