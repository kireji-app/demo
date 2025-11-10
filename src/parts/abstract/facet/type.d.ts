/** A type of single-cardinality part which requires an installation step that can only take place within a proper subset of the three environments and only after the user part has distributed it's initialization. */
declare interface IFacet<TOwner>
 extends IPart<TOwner, null> {

 // Serialized Properties
 /** A line-separated list of environments which support the given facet. */
 readonly "environments": string[]
 /** Installs the given facet asynchronously. If it's not defined, install() must be defined. */
 readonly installAsync?(): Promise<void>
 /** Installs the given facet synchronously. If it's not defined, installAsync() must be defined. */
 readonly install?(): void
 /** Returns whether the given facet is supported. Defaults to "true".*/
 readonly checkSupport(): boolean

 // Runtime Properties.
 /** The reason, if any, that the facet is not supported. */
 readonly error?: string
 /** Whether or not the facet requires an asynchronous installation. */
 readonly isAsync: boolean
 /** A promise which resolves after the facet installs or undefined if the facet installs synchronously. */
 readonly promise?: Promise<any>
 /** Whether or not the facet is supported. */
 readonly supported: boolean
}

declare const facet: IFacet<IApplicationAny>

/** A promise with resolvers that doesn't resolve until all of the facets have been installed or enqueued. */
declare const GATE: PromiseWithResolvers<void>