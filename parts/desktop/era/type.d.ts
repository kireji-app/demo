declare class PartEra extends PartMatch {
 readonly vintage: PartCore
 readonly modern: PartCore
 /** The toggle button for vintage/modern mode. */
 readonly button: HTMLButtonElement
 /** The part for the currently selected era. */
 readonly arm: PartCore & {
  /** The current era as a state string, which can be used for controlling UI components. */
  readonly stateData: string
 }
}
/** A toggle between a Windows 98-inspired theme and a modern web app style. */
declare const era: PartEra