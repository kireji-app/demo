declare class PartModules extends PartMix {
 readonly gpu: PartGpu
 readonly agent: PartAgent
 readonly share: PartShare
 readonly hotKeys: PartHotKeys
 readonly hydration: PartHydration
 readonly addressBar: PartAddressBar
 readonly serviceWorker: PartServiceWorker
}
declare const modules: PartModules & Iterable<UserModule>