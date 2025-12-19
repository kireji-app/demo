declare interface ITray
 extends IMix<IMenu, ITrayItem>,
 IWebComponent {

 // Subparts.
 /** A part representing the fullscreen button. */
 readonly fullscreen: ITrayItem
 /** A part representing the share button. */
 readonly share: ITrayItem
 /** A part representing the fps counter. */
 readonly stats: IStats
 /** A part representing the clock. */
 readonly clock: IClock
}

/** The taskbar's tray, displayed in the bottom-right corner of the screen. */
declare const tray: ITray