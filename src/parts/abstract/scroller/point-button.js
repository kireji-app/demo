const isTrack = TARGET_ELEMENT === scroller.scrollBar
const scrollUp = isTrack ? scroller.thumb.getBoundingClientRect().top > POINTER_EVENT.clientY : TARGET_ELEMENT.classList.contains("scroll-up")
const computedStyle = isTrack ? undefined : getComputedStyle(scroller.container)
const magnitude = isTrack ? scroller.container.clientHeight : (computedStyle.lineHeight === "normal" ? parseFloat(computedStyle.fontSize) * 1.2 : parseFloat(computedStyle.lineHeight))
const scrollVector = magnitude * (scrollUp ? -1 : 1)

let timeoutID = null

pointer.handle({
 down(delay = 400) {
  scroller.container.scrollTop += scrollVector
  timeoutID = setTimeout(delay => this.down(delay), delay, 40)
 },
 reset() {
  clearTimeout(timeoutID)
 },
 POINTER_EVENT,
 TARGET_ELEMENT
})