declare interface IClock
 extends ITrayItem {

 // Serialized Properties.
 /** A locale string of the clock time currently displayed in the taskbar tray. */
 readonly "time": string
}

declare const clock: IClock