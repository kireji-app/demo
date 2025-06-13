/** A type of single-cardinality part which requires an installation step that
 * can only take place within a proper subset of the four environments and only
 * after the user part has distributed it's initialization. */
declare class UserModule extends Part {
 /** Whether or not the module is supported. */
 readonly supported: boolean
 /** Whether or not the module requires an asynchronous installation. */
 readonly isAsync: boolean
 /** A promise which is guaranteed to resolve when the module successfully installs. */
 readonly promise: Promise<any>
 /** An array of which environments support the given module. */
 readonly environments: string[]
 /** The reason, if any, that the module is not supported. */
 readonly error?: string
 /** Installs the given module asynchronously. If it is not defined, install() must be defined. */
 installAsync?(): Promise<void>
 /** Installs the given module synchronously. If it is not defined, installAsync() must be defined. */
 install?(): void
 /** Returns whether the given module is supported. */
 checkSupport(): boolean
 /** Checks if the module is supported using module.checkSupport(). If it is, installs it. */
 distributeInitializePart(): void
}
declare const module: UserModule