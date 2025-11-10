declare interface ITaskBar
 extends IMix<IDesktop, ITaskbarPart> {

 // Subparts.
 readonly tray: ITray
 readonly menu: IMenu

 // Serialized Properties.
 /** The HTML snippet which renders the taskbar across the bottom of the desktop environment. */
 readonly "inline.html": string
}

declare type ITaskbarPart = IPart<ITaskBar, IPartAny>

declare const taskBar: ITaskBar