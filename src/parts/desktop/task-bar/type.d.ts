declare interface ITaskBar
 extends IMix<IDesktop, ITaskbarPart>,
 IWebComponent {

 // Subparts.
 readonly tray: ITray
 readonly menu: IMenu
}

declare type ITaskbarPart = IPart<ITaskBar, IPartAny>

declare const taskBar: ITaskBar