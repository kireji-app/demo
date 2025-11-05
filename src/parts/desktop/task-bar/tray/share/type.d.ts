declare interface IShare extends IPart {
 /** Performs the native share function. */
 go(): void
}

/** A holder part for the browser native share tray button. */
declare const share: IShare