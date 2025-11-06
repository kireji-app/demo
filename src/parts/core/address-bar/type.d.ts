declare interface IAddressBar extends IFacet {
 /** The minimum time between address bar changes, used to throttle them
  * to prevent from triggering the browser's own, much more aggressive throttle. */
 readonly throttleDuration: number
 /** The last time the address bar throttle function allowed the address bar to be set. */
 readonly throttleStartTime: number
 /** The hostname most recently written to or read from the address bar. */
 readonly hostname: string
 /** The most recent routeID set to the address bar. */
 readonly routeIDCache: bigint
 /** Takes the current location.href and uses it to set the full framework state. */
 readonly useRoute(): void
}
/** A client facet representing the browser address bar that provides `pathname <=> route ID` mapping to all environments. */
declare const addressBar: IAddressBar