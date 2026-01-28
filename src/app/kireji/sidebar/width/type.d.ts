declare interface IKirejiAppSidebarWidth
 extends IPart<IKirejiAppSidebar, null>,
 IWebComponent {

 // Serialized Properties.
 /** A string which is used as the style string for the application's host element, allowing rapid updating. */
 readonly "style": string
 /** The event handler for clicking and dragging to resize the sidebar. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void

 // Runtime Properties.
 /** The smallest width the sidebar panel is allowed to reach while open. Half of this number is the threshold at which a user dragging the panel will see it close. */
 readonly min: number
}

declare interface IKirejiAppSidebarWidthPointerConfig
 extends IPointerConfig {
 /** The width in pixels of the toolbar element. Used to determine the true width of the sidebar panel using pointer event positions. */
 readonly toolBarWidth: number
 /** A cache of the route ID of the sidebar width at the beginning of the pointer session. This allows the route ID to drive the visible drag behavior while also allowing the user to drag the panel closed so that it reopens to its original width before the drag session started. */
 readonly sidebarWidthRouteIDCache: bigint
}

declare const sidebarWidth: IKirejiAppSidebarWidth