/** The core operating system GUI. */
declare interface IDesktop extends IPartsApexDomain {
 readonly www: IDesktopTheme
 readonly color: IColor
 readonly era: IEra
 readonly menu: IMenu
 readonly menuClip: IMenu
 readonly taskBar: ITaskbar
 readonly themes: IPart[]
 /** The operating system theme.
  * 
  * This selection is encoded by the host of the current route. */
 readonly theme: IPart
 readonly themeHosts: object

 // Facets.
 readonly gpu: IGpu
 readonly agent: IAgent
 readonly share: IShare
 readonly hotKeys: IHotKeys
 readonly hydration: IHydration
 readonly addressBar: IAddressBar
 readonly serviceWorker: IServiceWorker

 // Views.
 readonly wallpaper: HTMLElement
}

declare const desktop: IDesktop