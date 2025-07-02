/** Host of the fetch function which renders response objects from URIs. */
declare class PartService extends OSFacet {
 /** Synchronously returns the response corresponding to the REQUEST_URL. */
 fetchSync(REQUEST_URL): Response
}
declare const service: PartService