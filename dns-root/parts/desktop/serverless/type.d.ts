declare class ServerlessPart extends UserFeature {
 /** Synchronously returns the response corresponding to the REQUEST_URL. */
 fetchSync(REQUEST_URL): Response
}
declare const serverless: ServerlessPart