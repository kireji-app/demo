declare class PartScroll extends Part {
 /** The HTML element that the scroller controls.
  * 
  * Used only by view methods. */
 readonly container: HTMLElement
 /** The listener that will be attached to client window.
  * 
  * *Note: only available in the 'window' environment.* */
 readonly onwheel?(): void
}
declare const scroller: PartScroll