/** Alias for `globalThis` used to improve linting at the moment. */
declare const globe: {
 root: RootPart
} & Window | ServiceWorkerGlobalScope | {
 // node.js global scope
 readonly process
}
declare interface RootPart extends MatchPart {
 readonly 0: BuildPart
 readonly 1: ServerPart
 readonly 2: WorkerPart
 readonly 3: DesktopPart

 readonly build: BuildPart
 readonly server: ServerPart
 readonly worker: WorkerPart
 readonly desktop: DesktopPart
}
/** The root part, which instantiates all others. */
declare const root: RootPart