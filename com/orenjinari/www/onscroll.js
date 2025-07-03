if (orenjinari.outputScroll) {
 orenjinari.outputScroll = false
} else {
 const maxY = desktop.wallpaper.scrollHeight
 const newY = desktop.wallpaper.scrollTop
 const scrollRouteID = BigInt(Math.trunc(Math.max(Math.min(maxY, newY), 0) / maxY * Number(orenjinari.cardinality - 1n)))

 if (orenjinari.routeID !== scrollRouteID) {
  orenjinari.inputScroll = true
  orenjinari.setRouteID(scrollRouteID)
 }
}