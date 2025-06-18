/** Host of the fetch function which renders response objects from URIs. */
declare class PartService extends OSFacet {
 /** Synchronously returns the response corresponding to the REQUEST_URL. */
 fetchSync(REQUEST_URL): Response
 /** The route object created by the most recent call to fetchSync. */
 readonly route: Route
}
declare const service: PartService