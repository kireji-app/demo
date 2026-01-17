declare interface IMenu
 extends IMatch<IMenu, IMenuClip>,
 IWebComponent {

 // Subparts.
 /** The abstract part used for all the menu's clips which automatically plays the clips when the menu match arm is set. */
 readonly clip: IMenuClip
 /** A movie clip that represents the closed position. It plays once and freezes on its last frame. */
 readonly closed: IMenuClip
 /** The movie clip that tweens the menu from the opened position to the closed position. */
 readonly dismiss: IMenuClip
 /** The movie clip that tweens the menu from the closed position to the opened position. */
 readonly introduce: IMenuClip
 /** A movie clip that represents the opened position. It plays once and freezes on its last frame. */
 readonly opened: IMenuClip

 // Serialized Properties.
 /** The HTML that renders the menu button on the taskbar. */
 readonly "button.html": string
 /** The HTML that renders the desktop application menu, including some application links and a few settings. */
 readonly "menu.html": string
 /** An event handler that advances the menu from its current clip into its next one. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void

 // Runtime Properties.
 /** On the client, the screen-filling element that contains the menu. If the menu is closed at hydration time, it will be rendered in an offscreen element so that it can be quickly shown later by adding it to the DOM. */
 readonly element: HTMLElement
 /** On the client, the button element that should open the task menu. */
 readonly button: HTMLElement
}

/** A type that generates an animated menu.
 * 
 * It's a seamless looping sequence of four movie clips:
 * ```
 * [
 *   menu.closed,
 *   menu.introduce,
 *   menu.opened,
 *   menu.dismiss
 * ]
 * ```*/
declare const menu: IMenu