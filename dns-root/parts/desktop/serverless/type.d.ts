declare class ServerlessPart extends UserFeature {
 /** Synchronously returns the response corresponding to the REQUEST_URL. */
 fetchSync(REQUEST_URL): Response
 /** The most recently requested host from fetchSync. */
 readonly requestedHost
}
declare const serverless: ServerlessPart