declare interface UserFeature extends CorePart {
 readonly supported: boolean
 readonly promise: Promise<any>
 readonly initializeAsync(): Promise<void>
 readonly checkSupport(): boolean
}
declare const feature: UserFeature