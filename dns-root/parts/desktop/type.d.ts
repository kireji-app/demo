/** The core operating system GUI. */
declare interface IDesktop extends IPartsApexDomain {
 readonly color: IColor
 readonly era: IEra
 readonly taskBar: ITaskBar
 readonly update: IUpdateManager
 readonly www: IDesktopApplication

 // Facets.
 readonly addressBar: IAddressBar
 readonly agent: IAgent
 readonly client: IClient
 readonly fullscreen: IFullscreen
 readonly gpu: IGpu
 readonly hotKeys: IHotKeys
 readonly server: IServer
 readonly share: IShare
 readonly worker: IWorker

 // Views.
 readonly wallpaper: HTMLElement
}

declare const desktop: IDesktop