declare interface IDesktop
 extends IPartsApplication {

 // Subparts.
 readonly color: IColor
 readonly era: IEra
 readonly taskBar: ITaskBar
 readonly icons: IDesktopIcons
}

declare const desktop: IDesktop