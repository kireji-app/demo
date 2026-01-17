declare interface ITrayItem
 extends IPart<ITray, null> {

 // Serialized Properties.
 /** The tooltip that appears when the user hovers the button on desktop. */
 readonly "tooltip": string
 /** The raw HTML that generates the item's button in the tray. */
 readonly "tray.html": string
 /** The raw HTML that goes inside the item's button. */
 readonly "button.html": string
 /** The action that the tray item performs when it is clicked. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void

 // Runtime Properties.
 /** The runtime HTML element corresponding to the tray item view. */
 readonly element: HTMLElement
}

declare const trayItem: ITrayItem