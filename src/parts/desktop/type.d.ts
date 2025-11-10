declare interface IDesktop
 extends IPartsApplication {

 // Subparts.
 readonly color: IColor
 readonly era: IEra
 readonly taskBar: ITaskBar

 // Runtime Properties.
 readonly wallpaper: HTMLElement
}

declare const desktop: IDesktop
declare const wallpaper: HTMLElement