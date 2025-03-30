declare const serviceWorker: ServiceWorkerPart
declare interface ServiceWorkerPart extends UserFeature {
 readonly startupRegistration?: ServiceWorkerRegistration
 readonly registration: ServiceWorkerRegistration
 readonly incomingServiceWorker?: ServiceWorker
 readonly controller: ServiceWorker
 readonly channel: BroadcastChannel
 readonly manifestLink: HTMLLinkElement
}