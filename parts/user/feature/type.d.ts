/** A type of single-cardinality part which requires an installation step that
 * can only take place within a proper subset of the four environments and only
 * after the user part has distributed it's initialization. */
declare class UserFeature extends Part {
 /** Whether or not the feature is supported. */
 readonly supported: boolean
 /** Whether or not the feature requires an asynchronous installation. */
 readonly isAsync: boolean
 /** A promise which is guaranteed to resolve when the feature successfully installs. */
 readonly promise: Promise<any>
 /** An array of which environments support the given feature. */
 readonly environments: string[]
 /** The reason, if any, that the feature is not supported. */
 readonly error?: string
 /** Installs the given feature asynchronously. If it is not defined, install() must be defined. */
 installAsync?(): Promise<void>
 /** Installs the given feature synchronously. If it is not defined, installAsync() must be defined. */
 install?(): void
 /** Returns whether the given feature is supported. */
 checkSupport(): boolean
 /** Checks if the feature is supported using feature.checkSupport(). If it is, installs it. */
 distributeInitializePart(): void
}
declare const feature: UserFeature