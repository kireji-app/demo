declare interface ITray extends IPart {
 /** A locale string of the clock time currently displayed on the O/S task bar. */
 readonly time: string
 /** The HTML markup that displays the tray. */
 readonly "inline.html": string
}

declare const tray: ITray