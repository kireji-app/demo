if (scroller.skipDOMUpdate) {
 scroller.skipDOMUpdate = false
} else {
 const updateDOM = () => {
  scroller.skipRouteIDUpdate = true
  scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
 }
 if (hydrated) updateDOM()
 else client.promise.then(updateDOM)
}

const updateDOM = () => {
 scroller.scrollBar.style.setProperty("--fraction", scroller.fraction)
}

if (hydrated) updateDOM()
else client.promise.then(updateDOM)