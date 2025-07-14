declare interface IWorker extends IFacet {
 readonly startupRegistration?: ServiceWorkerRegistration
 readonly registration: ServiceWorkerRegistration
 readonly incomingServiceWorker?: ServiceWorker
 readonly controller: ServiceWorker
}

declare const worker: IWorker