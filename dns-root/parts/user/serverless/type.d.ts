/** Host of the serverless function which renders files from URIs. */
declare class ServerlessPart extends UserFeature {
 /** Synchronously returns the response corresponding to the REQUEST_URL. */
 fetchSync(REQUEST_URL): Response
 /** The route object created by the most recent call to fetchSync. */
 readonly route: Route
}
declare const serverless: ServerlessPart