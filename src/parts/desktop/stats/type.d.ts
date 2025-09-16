declare interface IStats extends IFacet {
 /** The HTML markup that displays the framerate on the taskbar tray. */
 readonly "tray.html": string
 /** If in the client environment, the computed framerate of the application. Null otherwise. */
 readonly fps?: number
 /** If in the client environment, the current time (taken from performance.now()) of the application. Null otherwise. */
 readonly time?: DOMHighResTimeStamp
 /** If in the client environment, the average length of time each frame is on screen in milliseconds. Null otherwise. */
 readonly meanFrameTime?: number
 /** If in the client environment, the element which displays the current framerate of the application. Null otherwise. */
 readonly element?: HTMLElement
}

declare const stats: IStats