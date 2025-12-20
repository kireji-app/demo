scroller.observer.disconnect()
scroller.container.removeEventListener("scroll", scroller.listener, { passive: true })
for (const element of [
 scroller.scrollBar.up,
 scroller.scrollBar.down,
 scroller.scrollBar.thumb,
 scroller.scrollBar
]) element.onpointerdown = null