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
 /** Parses the given url (or the address bar itself) and uses it to instantiate factors. */
 distributeInitializePart(LOCATION?: URL): void
}
/** Represents a point in the user configuration space `user.parts`.
 * 
 * An extension of the native URL class. */
declare class Route extends URL {
 /** The alphabet used when encoding bigints as URI path segments. */
 static readonly pathSegmentRadix: string
 /** The maximum safe length of a URI path segment, used for determining the maximum safe route cardinality.
  * 
  * Equal to 2000.
 */
 static readonly maxPathLength: number
 /** The maximum length for a path segment in a URI. Equal to 250. */
 static readonly maxSegmentLength: number
 /** Takes in a single valid URI path segment and returns it's routeID. */
 static segmentToRouteID(STRING: string): void
 /** Takes in a routeID and returns a string representation that is also a valid URI path segment. */
 static segmentFromRouteID(ROUTE_ID: bigint): void
 /**
  * Creates a new Route instance.
  * @param {string | URL} input The URL string or path.
  * @param {string} [base] Optional base URL if the first argument is relative.
  */
 constructor(input: string | URL, base: string)
 /** The name of any explicit file request added between the path and the mark. */
 filename: string
 /** The string parts of the pathname, split along "/" and excluding any filename or mark. */
 segments: string[]
 /** An array of the routeIDs corresponding to the route's path segments. */
 routeIDs: bigint[]
 /** The portion of the route's pathname which does not include the filename or mark. */
 path: string
 /** The mark at the end of the pathname indicating whether or not it contains an explicit filename. */
 mark: string
 /** The header for the route's filename.*/
 readonly header: FileHeader
}
declare class FileHeader {
 static readonly mimeTypes: string[]
 static readonly textBasedPrefixes: Set<string>
 /** Generates a new read-only FileHeader from the given filename. */
 constructor(filename): FileHeader
 /** The filetype extension (including the dot). */
 readonly extension: string
 /** The content-type of the file, based on its extension. */
 readonly type: string
 /** Whether or not the file's content type refers to binary data. */
 readonly binary: boolean
}
/** A window feature representing the browser address bar that provides `pathname <=> route ID` mapping to all environments. */
declare const addressBar: AddressBarPart