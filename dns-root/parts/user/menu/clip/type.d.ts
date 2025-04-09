declare class MenuClipPart extends ClipPart {
 /** The generic clip prototype of the menu clip. */
 readonly super: ClipPart
 /** Sets the menu element's style to a string based on the playback progress of the movie clip. */
 populateView(): void
 /** Returns the correct style attribute for the menu, computed from the clip's routeID. */
 styleAttr(): string
}
declare const menuClip: MenuClipPart