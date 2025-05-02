declare class FeaturesPart extends MixPart {
 readonly gpu: GpuPart
 readonly agent: AgentPart
 readonly share: SharePart
 readonly desktop: DesktopPart
 readonly hotKeys: HotKeysPart
 readonly hydration: HydrationPart
 readonly addressBar: AddressBarPart
 readonly serviceWorker: ServiceWorkerPart
}
declare const features: FeaturesPart & Iterable<UserFeature>