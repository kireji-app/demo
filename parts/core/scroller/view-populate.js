if (scroller.inputScroll)
 scroller.inputScroll = false
else
 desktop.hydration.promise.then(() => {
  scroller.outputScroll = true
  scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
 })