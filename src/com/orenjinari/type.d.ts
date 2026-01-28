declare interface IOrenjinari
 extends IComApplication {

 // Subparts.
 /** The scroller that controls the entire application. */
 readonly scroller: IScroller<IOrenjinari>

 // Serialized Properties.
 /** Scrolls to the given zone with an animation transition. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void
 readonly "static.css": void
}

/** Orenjinari's artist profile. */
declare const orenjinari: IOrenjinari