if (desktop.theme === orenjinari)
 desktop.wallpaper.addEventListener("wheel", orenjinari.onwheel = event => {
  const maxScrollY = orenjinari.cardinality - 1n
  const documentHeight = desktop.wallpaper.scrollHeight - window.innerHeight
  const currentScrollRatio = BigInt(Math.trunc(event.deltaY / documentHeight * Number.MAX_SAFE_INTEGER))
  const requestedScrollY = orenjinari.routeID + currentScrollRatio * orenjinari.cardinality / BigInt(Number.MAX_SAFE_INTEGER)
  const minScrollY = 0n
  const finalScrollY = requestedScrollY > maxScrollY ? maxScrollY : requestedScrollY < minScrollY ? minScrollY : requestedScrollY
  orenjinari.go(finalScrollY)
  // desktop.wallpaper.scrollTo(finalScrollY)
 })