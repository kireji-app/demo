declare interface IGlowstickUser
 extends IPart<IGlowstick, null>,
 IWebComponent {

 // Serialized Properties.
 /** A unicode arrow character pointing in the same direction as the user. */
 readonly "arrow": string
 /** A string (either left, right, front or back) representing which direction the user is currently facing. */
 readonly "direction": string
 /** The current user world position along x. */
 readonly "x": number
 /** The current user world position along y. */
 readonly "y": number
 /** Converts the given x/y facing vector into a bigint that can be used as the user's route ID. */
 readonly vectorToRouteID(VECTOR: { x: number, y: number }): bigint | undefined
 /** Converts the given route ID into an x/y facing vector that can be used to control which directional graphic is used to display the character in the world. */
 readonly vectorFromRouteID(ROUTE_ID: bigint): { x: number, y: number }

 // Runtime Properties.
 /** The HTML element representing the user in the DOM (client only). */
 readonly element: HTMLElement
 /** The walking speed of the user. */
 readonly pixelsPerSecond: number
}

declare const user: IGlowstickUser