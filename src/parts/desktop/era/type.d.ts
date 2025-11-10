declare interface IEra
 extends IMatch<IDesktop, IEraMode> {

 // Subparts.
 readonly vintage: IEraMode
 readonly modern: IEraMode

 // Serialized Properties.
 /** The stylesheet which is responsible for depicting the current era. */
 readonly "inline.css": string
 /** The HTML snippet representing the era control button in the desktop menu. */
 readonly "inline.html": string
}

/** A toggle between a Windows 98-inspired look-and-feel and a modern web app style. */
declare const era: IEra