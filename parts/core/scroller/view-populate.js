if (scroller.inputScroll)
 scroller.inputScroll = false
else
 desktop.hydration.promise.then(() => {
  scroller.outputScroll = true
  scroller.container.scrollTop = Number(scroller.routeID) / Number(scroller.cardinality - 1n) * scroller.container.scrollHeight
 })