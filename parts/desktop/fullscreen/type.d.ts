declare interface IFullscreen extends IFacet {
 /** Toggles the native fullscreen facet. */
 go(): void
}

/** A holder part for the native fullscreen facet. */
declare const fullscreen: IFullscreen