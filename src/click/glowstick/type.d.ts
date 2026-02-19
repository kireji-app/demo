declare interface IGlowstick
 extends IClickApplication {

 // Subparts.
 readonly region: IGlowstickRegion
 readonly user: IGlowstickUser
 readonly world: IGlowstickWorld

 // Runtime Properties.
 /** If currently using the mobile thumbstick, the on-screen element representing the thumbstick. */
 readonly handleElement?: HTMLElement
 /** If currently using the mobile thumbstick, the origin point (center) of the thumbstick. */
 readonly thumbstickStart?: { x: number, y: number }
 /** A cache of the last direction of motion, used to detect a change in user direction. */
 readonly thumbstickVector: { x: number, y: number }
 /** If currently using the mobile thumbstick, the on-screen element representing the handle of the thumbstick. */
 readonly thumbstickElement?: HTMLElement
 /** When the user is walking, an iterator tracking the distance the yser has walking in tiles (used for computing walking speed). */
 readonly tilesCount: number
 /** When the user is walking, the moment the walking started (used for computing walking speed). */
 readonly walkMark: number
 /** Whether or not to skip the view update on the world when the route ID changes (because it was already updated by the user interaction loop before the route ID was updated). */
 readonly skipMoveWorld: boolean
 /** The ratio of art pixel size to css pixel size. */
 readonly pixelRatio: number
}

declare const glowstick: IGlowstick