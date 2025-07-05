/** Host of the fetch function which renders response objects from URIs. */
declare interface IService extends IFacet {
 /** Synchronously returns the response corresponding to the REQUEST_URL. */
 fetchSync(REQUEST_URL): Response
}
declare const service: IService