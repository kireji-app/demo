declare class AddressBarPart extends MixPart {

 /** The minimum time between address bar changes, used to throttle them
  * to prevent from triggering the browser's own, much more aggressive throttle. */
 readonly throttleDuration: number

 /** The last time the address bar throttle function allowed the address bar to be set. */
 readonly throttleStartTime: number

 /** The routeIDs most recently written to or read from the address bar. */
 readonly routeIDs: bigint[]

 /** The hostname most recently written to or read from the address bar. */
 readonly hostname: string

 /** Takes in a single valid URI path segment and returns it's routeID. */
 decodeRoute(STRING: string): void

 /** Takes in a routeID and returns a string representation that is also a valid URI path segment. */
 encodeRoute(ROUTE_ID: bigint): void

 /** Parses the given url (or the address bar itself) and uses it to instantiate factors. */
 distributeInitializePart(LOCATION?: URL): void
}

declare const addressBar: AddressBarPart