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
  * This selection is encoded by the host of the user route. */
 readonly theme: Part
 readonly themeHosts: Part
}

declare const desktop: PartDesktop