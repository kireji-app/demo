declare class PartEra extends PartMatch {
 readonly vintage: Part
 readonly modern: Part
 /** The toggle button for vintage/modern mode. */
 readonly button: HTMLButtonElement
 /** The part for the currently selected era. */
 readonly arm: Part & {
  /** The current era as a state string, which can be used for controlling UI components. */
  readonly stateData: string
 }
 /** The style element which holds the CSS that this part uses to drive UI changes. */
 readonly styleElement: HTMLStyleElement
}
/** A toggle between a Windows 98-inspired theme and a modern web app style. */
declare const era: PartEra