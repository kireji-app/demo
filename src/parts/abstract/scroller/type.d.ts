/** Controls a stateful vertically scrolling view with a positional cardinality of 10,000. */
declare interface IScroller<TOwner>
 extends IPart<TOwner, null>,
 IWebComponent {

 // Serialized Properties.
 /** A number between 0 and 1 obtained by dividing the scroller's current route ID by it's highest possible route ID (one less than its cardinality). */
 readonly "fraction": number
 /** The stylesheet which tells the scroller's container to move to the right scroller position before hydration.
  * 
  * After hydration, the scroller's position is set by script and the given CSS becomes inert. */
 readonly "part.css": string
 /** The CSS selector query that uniquely idenfies the scroller's container in the page. */
 readonly "query": string
 /** The listener which is called by the ResizerObserver to track scrolling. */
 readonly onresize(): void
 /** The inner event listener which is called by `scroller.listener` to track scrolling. */
 readonly onscroll(): void
 /** Sets the scroller's route to 0n, if it is not already there. */
 readonly scrollToTop(): void
 /** Used to wrap the given HTML string with the scroller's provided container and custom scrollbar HTML. */
 readonly wrap(INNER_HTML: string): string

 // Runtime Properties.
 /** The element that will recieve the scroll listening and view updates. */
 readonly container: HTMLElement
 /** The ResizeObserver instance that tracks changes to the relative size between the scroll-content element and the scroller element itself, regardless of whether that value changes due to the outside container changing size or the inside content changing size. */
 readonly observer: ResizeObserver
 /** The element that displays the custom scroll bar control. */
 readonly scrollBar: HTMLElement
 /** The draggable element that manually controls the scroll fraction of the scroller. */
 readonly thumb: HTMLElement
 /** The element that tracks the scroll height of the scroller, needed for handling resize events. */
 readonly content: HTMLElement
 /** When true, the event cycle doesn't trigger assignment to the container's scroll and instead reads its position in order to set the scroller's route ID. */
 readonly skipDOMUpdate: boolean
 /** When true, the event cycle doesn't read in the container's DOM scroll position and instead sets it based on the scroller's route ID. */
 readonly skipRouteIDUpdate: boolean
 /** The outer event listener which can be added and removed and calls the inner event listener `scroller.onscroll`. */
 readonly listener(scrollEvent: Event): void
}

declare const scroller: IScroller<IPartAny>