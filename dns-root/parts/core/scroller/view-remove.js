scroller.container.removeEventListener("scroll", scroller.listener, { passive: true })
scroller.container = null
scroller.scrollBar = null
scroller.observer.disconnect()
scroller.observer = null