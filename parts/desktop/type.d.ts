/** The core operating system GUI.*/
declare class PartDesktop extends PartMix {
 readonly color: PartColorMode
 readonly era: PartEra
 readonly menu: PartMenu
 readonly menuClip: PartMenu
 readonly taskBar: PartTaskbar
 readonly www: PartDesktopTheme
 readonly themes: Part[]
 /** The operating system theme.
  * 
  * This selection is encoded by the host of the current route. */
 readonly theme: Part
 readonly themeHosts: Part

 // Facets.
 readonly gpu: PartGpu
 readonly agent: PartAgent
 readonly share: PartShare
 readonly hotKeys: PartHotKeys
 readonly hydration: PartHydration
 readonly addressBar: PartAddressBar
 readonly serviceWorker: PartServiceWorker

 // Views.
 readonly wallpaper: HTMLElement
}

declare const desktop: PartDesktop