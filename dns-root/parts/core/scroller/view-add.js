scroller.container = document.querySelector(scroller.query + ">scroller-")
scroller.scrollBar = document.querySelector(scroller.query + ">scroll-bar")
scroller.content = document.querySelector(scroller.query + ">scroller->scroll-content")
scroller.container.addEventListener("scroll", scroller.listener, { passive: true })
scroller.observer = new ResizeObserver(() => scroller.onresize())
scroller.observer.observe(scroller.content)
scroller.scrollBar.up = scroller.scrollBar.querySelector("up-")
scroller.scrollBar.down = scroller.scrollBar.querySelector("down-")
scroller.scrollBar.thumb = scroller.scrollBar.querySelector("thumb-")
scroller.scrollBar.onclick = e => {
 _.noop(e)
 debug('now we hit the track directly my man')
}
scroller.scrollBar.up.onclick = e => {
 _.noop(e)
 debug("just clicked dat up button yo")
}
scroller.scrollBar.down.onclick = e => {
 _.noop(e)
 debug("just pressed up on dat down arrow my guy")
}
scroller.scrollBar.thumb.onclick = e => {
 _.noop(e)
 debug("juz clicked dat thumb boss")
}