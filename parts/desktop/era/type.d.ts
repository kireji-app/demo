declare class PartEra extends PartMatch {
 readonly vintage: PartCore
 readonly modern: PartCore
 /** The toggle button for vintage/modern mode. */
 readonly button: HTMLButtonElement
}
/** A toggle between a Windows 98-inspired theme and a modern web style. */
declare const era: PartEra