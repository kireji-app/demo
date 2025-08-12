declare interface IGlowstickUser extends IPart {
 vectorToRouteID(X: number, Y: number): bigint
 vectorFromRouteID(ROUTE_ID: bigint): {
  x: number,
  y: number
 }
 /** The current user world position along y. */
 readonly x: bigint
 /** The current user world position along x. */
 readonly y: bigint
 /** The HTML element representing the user in the DOM (client only). */
 readonly element: HTMLElement
 /** A unicode arrow character pointing in the same direction as the user. */
 readonly arrow: string
}
declare const user: IGlowstickUser