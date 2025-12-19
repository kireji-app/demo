declare interface IEra
 extends IMatch<IDesktop, IEraMode>,
 IWebComponent {

 // Subparts.
 readonly vintage: IEraMode
 readonly modern: IEraMode
}

/** A toggle between a Windows 98-inspired look-and-feel and a modern web app style. */
declare const era: IEra