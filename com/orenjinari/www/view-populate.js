if (desktop.theme === orenjinari) {
 if (orenjinari.inputScroll)
  orenjinari.inputScroll = false
 else
  desktop.hydration.promise.then(() => {
   orenjinari.outputScroll = true
   desktop.wallpaper.scrollTop = Number(orenjinari.routeID) / Number(orenjinari.cardinality - 1n) * desktop.wallpaper.scrollHeight
  })
}