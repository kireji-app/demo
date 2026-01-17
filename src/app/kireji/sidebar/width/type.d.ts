declare interface IKirejiAppSidebarWidth
 extends IPart<IKirejiAppSidebar, null>,
 IWebComponent {

 // Serialized Properties.
 /** A string which is used as the style string for the wallpaper- element, allowing rapid updating. */
 readonly "style": string
 /** The event handler for clicking and dragging to resize the sidebar. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void

 // Runtime Properties.
 /** The smallest width the sidebar panel is allowed to reach while open. Half of this number is the threshold at which a user dragging the panel will see it close. */
 readonly min: number
}

declare const sidebarWidth: IKirejiAppSidebarWidth