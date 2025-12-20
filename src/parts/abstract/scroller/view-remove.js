scroller.container.removeEventListener("scroll", scroller.listener, { passive: true })
scroller.container = null
scroller.observer.disconnect()
scroller.observer = null
const track = scroller.scrollBar

for (const element of [track, track.up, track.down, track.thumb]) {
 element.onclick = null
 element.onpointerdown = null
}

delete scroller.scrollBar.up
delete scroller.scrollBar.down
delete scroller.scrollBar.thumb
scroller.scrollBar = null