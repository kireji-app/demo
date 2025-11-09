declare interface IDesktop extends IPartsApplication {
 readonly color: IColor
 readonly era: IEra
 readonly taskBar: ITaskBar

 // Views.
 readonly wallpaper: HTMLElement
}

declare const desktop: IDesktop
declare const wallpaper: HTMLElement