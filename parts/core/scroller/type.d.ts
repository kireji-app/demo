declare class PartScroller extends Part {
 /** The element that will recieve the scroll listening and view updates. */
 readonly container: HTMLElement
 /** When true, the event cycle doesn't trigger assignment to the container's scroll and instead reads its position. */
 readonly inputScroll: boolean
 /** When true, the event cycle doesn't read in the container's scroll position and instead set it. */
 readonly outputScroll: boolean
 /** The CSS selector query that uniquely idenfies the scroller's container in the page. */
 readonly query: string
}
declare const scroller: PartScroller