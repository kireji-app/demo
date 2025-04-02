declare class MenuClipPart extends ClipPart {
 /** The generic clip prototype of the menu clip. */
 readonly super: ClipPart
 /** Sets the menu element's style to a string based on the playback progress of the movie clip. */
 populateView(): void
}
declare const menuClip: MenuClipPart