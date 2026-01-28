/** Host of a node server which renders response objects from node requests. */
declare interface IServer
 extends IFacet<ICore> { }

/** An interface that represents an internal server API contract between modules of different versions. */
declare interface IVersionedExports {
 /** Allows pass-through access to this build's server-side rendering features. */
 proxy(host: string, pathname: string, ifNoneMatch: string, prefersDarkMode: boolean): any
 /** Allows conversion of a URL pathname segment to a data model using the server's hash function. */
 decode(segmnt: string): any
 /** Allows conversion of a data model to a URL pathname segment using the server's hash function. */
 encode(model: any): string
}

declare const server: IServer