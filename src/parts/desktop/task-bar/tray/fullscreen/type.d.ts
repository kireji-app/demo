declare interface IFullscreen extends IPart {
 /** Toggles the native fullscreen mode. */
 go(): void
}

/** A holder part for the native fullscreen tray button. */
declare const fullscreen: IFullscreen