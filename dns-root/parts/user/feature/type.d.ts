declare interface UserFeature extends CorePart {
 readonly supported: boolean
 readonly promise: Promise<any>

 /** An array of which environments support the given feature. */
 readonly environments: string[]

 /** Initializes the given feature. */
 initializeAsync(): Promise<void>

 /** Returns whether the given feature is supported. */
 checkSupport(): boolean

 /** Checks if the feature is supported using feature.checkSupport(). If it is, initializes it by calling `feature.initializeAsync()`. */
 distributeInitializePart(): void
}
declare const feature: UserFeature