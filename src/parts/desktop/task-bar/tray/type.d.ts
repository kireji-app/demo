declare interface ITray
 extends IMix<IMenu, ITrayItem> {

 // Subparts.
 /** A part representing the fullscreen button. */
 readonly fullscreen: ITrayItem
 /** A part representing the share button. */
 readonly share: ITrayItem
 /** A part representing the fps counter. */
 readonly stats: IStats
 /** A part representing the clock. */
 readonly clock: IClock

 // Serialized Properties.
 /** The HTML markup that displays the taskbar tray. */
 readonly "inline.html": string
}

/** The taskbar's tray, displayed in the bottom-right corner of the screen. */
declare const tray: ITray