declare interface UserFeature extends CorePart {
 /** Whether or not the feature is supported. */
 readonly supported: boolean
 /** A promise which is guaranteed to resolve when the feature successfully installs. */
 readonly promise: Promise<any>
 /** An array of which environments support the given feature. */
 readonly environments: string[]
 /** Installs the given feature asynchronously. If it is not defined, install() must be defined. */
 installAsync?(): Promise<void>
 /** Installs the given feature synchronously. If it is not defined, installAsync must be defined. */
 install?(): void
 /** Returns whether the given feature is supported. */
 checkSupport(): boolean
 /** Checks if the feature is supported using feature.checkSupport(). If it is, installs it. */
 distributeInitializePart(): void
}
declare const feature: UserFeature