if (scroller.inputScroll)
 scroller.inputScroll = false
else
 desktop.client.promise.then(() => {
  scroller.outputScroll = true
  scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
 })