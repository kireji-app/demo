declare interface IDesktop extends IPartsApexDomain {
 readonly color: IColor
 readonly era: IEra
 readonly taskBar: ITaskBar
 readonly www: IDesktopApplication

 // Views.
 readonly wallpaper: HTMLElement
}

declare const desktop: IDesktop
declare const wallpaper: HTMLElement