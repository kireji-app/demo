/** A type of single-cardinality part which requires an installation step that
 * can only take place within a proper subset of the four environments and only
 * after the user part has distributed it's initialization. */
declare interface IFacet extends IPart {
 /** Whether or not the facet is supported. */
 readonly supported: boolean
 /** Whether or not the facet requires an asynchronous installation. */
 readonly isAsync: boolean
 /** A promise which is guaranteed to resolve when the facet installs.
  * 
  * This is undefined if the facet installs synchronously. */
 readonly promise?: Promise<any>
 /** An array of which environments support the given facet. */
 readonly environments: string[]
 /** The reason, if any, that the facet is not supported. */
 readonly error?: string
 /** Installs the given facet asynchronously. If it is not defined, install() must be defined. */
 installAsync?(): Promise<void>
 /** Installs the given facet synchronously. If it is not defined, installAsync() must be defined. */
 install?(): void
 /** Returns whether the given facet is supported. */
 checkSupport(): boolean
}
declare const facet: IFacet