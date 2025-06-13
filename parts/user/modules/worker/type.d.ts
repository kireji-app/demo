declare const worker: PartWorker
declare interface PartWorker extends UserModule {
 readonly startupRegistration?: ServiceWorkerRegistration
 readonly registration: ServiceWorkerRegistration
 readonly incomingServiceWorker?: ServiceWorker
 readonly controller: ServiceWorker
 readonly channel: BroadcastChannel
}