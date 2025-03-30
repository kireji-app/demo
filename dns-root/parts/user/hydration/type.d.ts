declare interface HydrationPart extends UserFeature {
 readonly attributeName: string
 readonly hydrated: boolean
}
declare const hydration: HydrationPart