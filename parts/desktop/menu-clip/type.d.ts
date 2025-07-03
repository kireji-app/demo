declare class PartMenuClip extends PartClip {
 /** Sets the menu element's style to a string based on the playback progress of the movie clip. */
 populateView(): void
 /** Returns the correct style attribute for the menu, computed from the clip's routeID.
  * 
  * This allows the current clip to drive the menu's css. */
 readonly styleAttr: string
 /** The key for the clip which should play next when autoplaying this clip. */
 readonly nextKey: string
}
declare const menuClip: PartMenuClip
declare const menu: PartMenu