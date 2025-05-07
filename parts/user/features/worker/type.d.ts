declare const worker: WorkerPart
declare interface WorkerPart extends UserFeature {
 readonly startupRegistration?: ServiceWorkerRegistration
 readonly registration: ServiceWorkerRegistration
 readonly incomingServiceWorker?: ServiceWorker
 readonly controller: ServiceWorker
 readonly channel: BroadcastChannel
}