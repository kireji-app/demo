declare interface IShare extends IFacet {
 /** Performs the native share function. */
 go(): void
}

/** A holder part for the browser native share facet. */
declare const share: IShare