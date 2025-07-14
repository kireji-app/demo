declare interface ITaskBar extends IMix {
 /** The task bar tray, showing some icons and a clock. */
 readonly tray: ITray
 readonly menu: IMenu
}

declare const taskBar: ITaskBar