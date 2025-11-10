declare interface IStats
 extends ITrayItem {

 // Runtime Properties.
 /** If in the client environment, the computed framerate of the application. Null otherwise. */
 readonly fps?: number
 /** If in the client environment, the time (taken from _.now) of the last loop evaluation. Null otherwise. */
 readonly mark?: DOMHighResTimeStamp
 /** If in the client environment, the average length of time each frame is on screen in milliseconds. Null otherwise. */
 readonly meanFrameTime?: number
}

/** The framerate monitor, which sits in the taskbar tray. */
declare const stats: IStats