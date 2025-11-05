declare interface IWorker extends IFacet {
 readonly startupRegistration?: ServiceWorkerRegistration
 readonly registration: ServiceWorkerRegistration
 readonly incomingServiceWorker?: ServiceWorker
 readonly controller: ServiceWorker,
 /** A minimal script inlined into server-rendered HTML which registers a service worker,
  * gives it control of the current page, and allows it to provide a copy of the framework. */
 readonly async bootstrapAsync(): Promise<void>
 /** Ensures that there is a valid service worker for the current page, whether it was
  * server- or client-rendered or the result of a "hard" reload (which fetches from the
  * server and prevents the service worker from becoming the page's controller). */
 readonly async takeControlAsync(): Promise<void>
}

declare const worker: IWorker