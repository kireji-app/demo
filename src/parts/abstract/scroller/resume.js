if (scroller.observer) {
 scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
 scroller.container.addEventListener("scroll", scroller.listener, { passive: true })
 scroller.observer.observe(scroller.content)
 scroller.observer.observe(scroller.container)
 for (const element of [
  scroller.scrollBar.up,
  scroller.scrollBar.down,
  scroller.scrollBar.thumb,
  scroller.scrollBar
 ]) element.onpointerdown = scroller.startDrag
} else {
 scroller.addView()
}

scroller.scrollBar.style.setProperty("--fraction", scroller.fraction)