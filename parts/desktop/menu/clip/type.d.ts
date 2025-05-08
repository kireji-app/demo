declare class PartMenuClip extends PartClip {
 /** The generic clip prototype of the menu clip. */
 readonly super: PartClip
 /** Sets the menu element's style to a string based on the playback progress of the movie clip. */
 populateView(): void
 /** Returns the correct style attribute for the menu, computed from the clip's routeID. */
 styleAttr(): string
}
declare const menuClip: PartMenuClip