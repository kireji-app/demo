declare interface IUpdateManager extends IFacet {
 readonly "inline.html": string
 /** If an update is found, the latest version number. Otherwise, `null`. */
 readonly version?: string
 /** Reacts to clicking the update button.
  * 
  * If an update is available, gracefully fades the screen, locally stores the current application data model (using the nonce as a key) and then navigates to the new scope.
  * 
  * Otherwise, fetches the latest version from the server, compares it to the current version and optionally sets the update version and reflects it in the UI. */
 readonly go(EVENT): void
 /** Takes a single version number string and returns true of the incoming version represents a newer version number than the currently running version.
  * 
  * Throws a TypeError if the input is not a string. Throws a syntax error if the input is not a correctly formatted semantic version number. */
 readonly isNewerVersion(INCOMING_VERSION): boolean
 /** The array of service worker registrations that is currently active for this application. */
 readonly registrations: ServiceWorkerRegistration[]
}
const update: IUpdateManager