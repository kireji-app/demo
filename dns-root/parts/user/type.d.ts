declare interface UserPart extends MixPart {
 /** The computed framerate of the application. */
 readonly fps: number
 /** The current session time. */
 readonly time: DOMHighResTimeStamp
 /** The average length of time each frame is on screen in milliseconds. */
 readonly meanFrameTime: number

 readonly gpu: GpuPart
 readonly agent: AgentPart
 readonly share: AgentPart
 readonly hydration: HydrationPart
 readonly addressBar: HydrationPart
 readonly serviceWorker: ServiceWorkerPart
 /** Sets all of the client features. Those features will only initialize if we are in the desktop environment. */
 setParts(): void
}

declare const user: UserPart