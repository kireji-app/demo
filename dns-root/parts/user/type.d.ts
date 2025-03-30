declare interface UserPart extends MixPart {
 readonly time: DOMHighResTimeStamp
 readonly fps: number
 readonly meanFrameTime: number
 readonly throttleDuration: number
 readonly throttleStartTime: number

 readonly gpu: GpuPart
 readonly agent: AgentPart
 readonly hydration: HydrationPart
 readonly serviceWorker: ServiceWorkerPart

 readonly parseLocation(LOCATION: URL): void
}

declare const user: UserPart