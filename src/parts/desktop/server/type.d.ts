/** Host of the fetch function which renders response objects from URIs. */
declare interface IServer extends IFacet {
}
declare interface IVersionedServer {
 /** Allows pass-through access to this version's server-side rendering features. */
 proxy(host: string, pathname: string, ifNoneMatch: string, prefersDarkMode: boolean): any
 /** Allows conversion of a URL pathname segment to a data model using the server's hash function. */
 decode(segmnt: string): any
 /** Allows conversion of a data model to a URL pathname segment using the server's hash function. */
 encode(model: any): string
}
declare const server: IServer