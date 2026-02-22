declare interface IGlowstickUser
 extends IPart<IGlowstick, null>,
 IWebComponent {

 // Serialized Properties.
 /** Converts the given vector into a bigint that can be used as the user's route ID. */
 readonly vectorToRouteID(VECTOR: IVector2): bigint | undefined

 // Runtime Properties.
 /** The HTML element representing the user in the DOM (client only). */
 readonly element: HTMLElement
 /** The walking speed of the user. */
 readonly pixelsPerSecond: number
 /** The current phase of the user's walk cycle. */
 readonly walkPhase: number
 /** The number of frames in the animation walk cycle. */
 readonly walkFrames: number
 /** The best frame of the walk cycle to start with when walking initiates. */
 readonly walkStartFrame: number
 /** A multiplier used to tweak the relationship between distance and walk animation playback speed. */
 readonly strideFactor: number
}

declare const user: IGlowstickUser