/** A type that generates an animated menu.
 * 
 * It's a seamless looping sequence of
 * four movie clips:
 * ```
 * [
 *   menu.closed,
 *   menu.introduce,
 *   menu.opened,
 *   menu.dismiss
 * ]
 * ```*/
declare interface IMenu extends IMatch {
 /** A movie clip that represents the closed position. It plays once and freezes on its last frame. */
 readonly closed: IMenuClip
 /** The movie clip that tweens the menu from the closed position to the opened position. */
 readonly introduce: IMenuClip
 /** A movie clip that represents the opened position. It plays once and freezes on its last frame. */
 readonly opened: IMenuClip
 /** The movie clip that tweens the menu from the opened position to the closed position. */
 readonly dismiss: IMenuClip
 /** When enabled, the fullscreen element that contains the menu. */
 readonly element: HTMLElement
 /** The part dedicated to the currently selected menu clip. */
 readonly arm: IMenuClip
}