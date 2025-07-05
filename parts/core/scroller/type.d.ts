declare interface IScroller extends IPart {
 /** The element that will recieve the scroll listening and view updates. */
 readonly container: HTMLElement
 /** When true, the event cycle doesn't trigger assignment to the container's scroll and instead reads its position. */
 readonly inputScroll: boolean
 /** When true, the event cycle doesn't read in the container's scroll position and instead set it. */
 readonly outputScroll: boolean
 /** The CSS selector query that uniquely idenfies the scroller's container in the page. */
 readonly query: string
 /** A number between 0 and 1 obtained by dividing the scroller's current route ID by it's highest possible route ID (one less than its cardinality). */
 readonly fraction: number
 /** The stylesheet which tells the scroller's container to move to the right scroller position before hydration.
  * 
  * After hydration, the scroller's position is set by script and the given CSS becomes inert. */
 readonly "inline.css"
}
declare const scroller: IScroller