declare interface IOrenjinari
 extends IComApplication {

 // Subparts.
 /** The scroller that controls the entire wallpaper. */
 readonly scroller: IScroller<IOrenjinari>

 // Serialized Properties.
 /** Scrolls to the given zone with an animation transition. */
 readonly go(ZONE_ID: string): void
 readonly "static.css": void
}

/** Orenjinari's artist profile. */
declare const orenjinari: IOrenjinari