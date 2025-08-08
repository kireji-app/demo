declare interface IUpdateManager extends IPart {
 readonly "inline.html": string
 /** A boolean indicating whether or not the upgrade manager is currently engaged in upgrade mode. */
 readonly isUpgrading: boolean
 /** If an update is available, a URL that can be used to perform the upgrade. Otherwise, `null`. */
 readonly nonce?: string
 /** Reacts to clicking the update button.
  * 
  * If an update nonce URL is available, gracefully fades the screen, locally stores the current application data model (using the nonce as a key) and then navigates to the nonce.
  * 
  * Otherwise, fetches the latest version from the server, compares it to the current version and updates the UI and optionally sets a nonce based on the result. */
 readonly go(EVENT): void
 /** Completes the update sequence by using the current URL (which should always be a nonce URL) to fetch the locally-stored data model and populate the platform. Then, gracefully fades in.  */
 readonly finish(EVENT): void
 /** Takes a single version number string and returns true of the incoming version represents a newer version number than the currently running version.
  * 
  * Throws a TypeError if the input is not a string. Throws a syntax error if the input is not a correctly formatted semantic version number. */
 readonly isNewerVersion(INCOMING_VERSION): boolean
}
const update: IUpdateManager