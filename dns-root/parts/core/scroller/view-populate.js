if (scroller.skipDOMUpdate) {
 scroller.skipDOMUpdate = false
} else {
 const updateDOM = () => {
  scroller.skipRouteIDUpdate = true
  scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
 }
 if (desktop.client.hydrated) updateDOM()
 else desktop.client.promise.then(updateDOM)
}

const updateDOM = () => {
 scroller.scrollBar.style.setProperty("--fraction", scroller.fraction)
}

if (desktop.client.hydrated) updateDOM()
else desktop.client.promise.then(updateDOM)