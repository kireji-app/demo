declare class PartFeatures extends PartMix {
 readonly gpu: PartGpu
 readonly agent: PartAgent
 readonly share: PartShare
 readonly hotKeys: PartHotKeys
 readonly hydration: PartHydration
 readonly addressBar: PartAddressBar
 readonly serviceWorker: PartServiceWorker
}
declare const features: PartFeatures & Iterable<UserFeature>