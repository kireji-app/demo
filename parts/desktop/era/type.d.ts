declare interface IEra extends IMatch {
 readonly vintage: IPart
 readonly modern: IPart
 /** The toggle button for vintage/modern mode. */
 readonly button: HTMLButtonElement
 /** The part for the currently selected era. */
 readonly arm: IPart & {
  /** The current era as a state string, which can be used for controlling UI components. */
  readonly stateData: string
 }
}
/** A toggle between a Windows 98-inspired look-and-feel and a modern web app style. */
declare const era: IEra