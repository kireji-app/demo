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
declare class PartMenu extends PartMatch {
 /** The match prototype of the menu. */
 readonly super: PartMatch
 /** A movie clip that represents the closed position. It plays once and freezes on its last frame. */
 readonly closed: PartMenuClip
 /** The movie clip that tweens the menu from the closed position to the opened position. */
 readonly introduce: PartMenuClip
 /** A movie clip that represents the opened position. It plays once and freezes on its last frame. */
 readonly opened: PartMenuClip
 /** The movie clip that tweens the menu from the opened position to the closed position. */
 readonly dismiss: PartMenuClip
 /** When enabled, the fullscreen element that contains the menu. */
 readonly element: HTMLElement
 /** The settings section in the sidebar. */
 readonly settingsSection: HTMLElement
 /** The section in the menu listing themes to choose from. */
 readonly themeSection: HTMLUListElement
 /** The part dedicated to the currently selected menu clip. */
 readonly arm: PartCore
}

/** The task menu that lets users change the theme and access settings. */
declare const menu: PartMenu