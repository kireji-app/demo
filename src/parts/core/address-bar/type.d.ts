declare interface IAddressBar
 extends IFacet<ICore> {

 // Serialized Properties.
 /** Takes the current location.href and uses it to set the full framework state. */
 readonly useRoute(): void
 /** Pushes the current ecosystem route ID onto the history stack to mark the current state as the undo point (where the back button will return to). */
 readonly setUndoPoint(): void

 // Runtime Properties.
 /** The minimum time between address bar changes, used to throttle them to prevent from triggering the browser's own, much more aggressive throttle. */
 readonly throttleDuration: number
 /** The last time the address bar throttle function allowed the address bar to be set. */
 readonly throttleStartTime: number
 /** The most recent routeID set to the address bar. */
 readonly routeIDCache: bigint
 /** The identification number for the most recently set timeout, if one is currently set. */
 readonly timer?: number
}

/** A client facet representing the browser address bar that provides and reflects the state ID in the client environment. */
declare const addressBar: IAddressBar