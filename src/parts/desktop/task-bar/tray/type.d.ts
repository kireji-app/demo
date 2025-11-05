declare interface ITray extends IPart {
 /** A locale string of the clock time currently displayed on the O/S task bar. */
 readonly time: string
 /** The HTML markup that displays the tray. */
 readonly "inline.html": string,
 /** A part representing the fullscreen button. */
 readonly fullscreen: IFullscreen
 /** A part representing the share button. */
 readonly share: IShare
 /** A part representing the fps counter. */
 readonly stats: IStats
}

declare const tray: ITray