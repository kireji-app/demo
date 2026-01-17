scroller.container.removeEventListener("scroll", scroller.listener, { passive: true })
scroller.container = null
scroller.observer.disconnect()
scroller.observer = null
scroller.scrollBar = null