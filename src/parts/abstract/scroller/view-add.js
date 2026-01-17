scroller.container = document.querySelector(scroller.query + ">scroller-")
scroller.scrollBar = document.querySelector(scroller.query + ">scroll-bar")
scroller.thumb = scroller.scrollBar.querySelector("thumb-")
scroller.content = document.querySelector(scroller.query + ">scroller->scroll-content")
scroller.container.scrollTop = scroller.fraction * scroller.container.scrollHeight
scroller.container.addEventListener("scroll", scroller.listener, { passive: true })
scroller.observer = new ResizeObserver(() => scroller.onresize())
scroller.observer.observe(scroller.content)
scroller.observer.observe(scroller.container)