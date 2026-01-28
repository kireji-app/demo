declare interface IMenuClip
 extends IClip<IMenu> {

 // Serialized Properties.
 /** The key for the clip which should play next when autoplaying the clip. */
 readonly "nextKey": string
 /** Returns the correct style attribute for the menu, computed from the clip's routeID, allowing the current clip to drive the menu's css. */
 readonly "styleAttr": string
}

declare const menuClip: IMenuClip
