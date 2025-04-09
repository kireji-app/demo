/** A type that generates an animated menu.
 * 
 * It is a seamless looping sequence of
 * four movie clips:
 * ```
 * [
 *   menu.closed,
 *   menu.introduce,
 *   menu.opened,
 *   menu.dismiss
 * ]
 * ```*/
declare class MenuPart extends MatchPart {
 /** The match prototype of the menu. */
 readonly super: MatchPart
 /** A movie clip that represents the closed position. It plays once and freezes on its last frame. */
 readonly closed: MenuClipPart
 /** The movie clip that tweens the menu from the closed position to the opened position. */
 readonly introduce: MenuClipPart
 /** A movie clip that represents the opened position. It plays once and freezes on its last frame. */
 readonly opened: MenuClipPart
 /** The movie clip that tweens the menu from the opened position to the closed position. */
 readonly dismiss: MenuClipPart

 /** When enabled, the button element which appears on the taskbar and opens the menu. */
 readonly button: HTMLButtonElement
 /** When enabled, the fullscreen element that contains the menu. */
 readonly element: HTMLElement
}

/** The task menu that lets users change the theme and access settings. */
declare const menu: MenuPart