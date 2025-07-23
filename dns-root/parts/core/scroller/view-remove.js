scroller.container.removeEventListener("scroll", scroller.listener, { passive: true })
scroller.container = null
scroller.scrollBar = null
scroller.observer.disconnect()
scroller.observer = null
scroller.scrollBar.onclick = null
scroller.scrollBar.up.onclick = null
scroller.scrollBar.down.onclick = null
scroller.scrollBar.thumb.onclick = null
delete scroller.scrollBar.up
delete scroller.scrollBar.down
delete scroller.scrollBar.thumb