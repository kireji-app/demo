declare interface IGlowstickApplication extends IApplication {
 readonly "..": IGlowstick
 /** The game update loop for glowstick. */
 loop(): void
 /** The computed framerate of the application. */
 readonly fps: number
 /** The current performance time of the application. */
 readonly time: DOMHighResTimeStamp
 /** An integer ID representing the game loop's current pending frame request. */
 readonly frameRequest: number
 /** The average length of time each frame is on screen in milliseconds. */
 readonly meanFrameTime: number
 /** When the user is walking, the moment the walking started (used for computing walking speed). */
 readonly walkMark: number
 /** When the user is walking, an iterator tracking the distance the yser has walking in tiles (used for computing walking speed). */
 readonly tilesCount: number
 /** The walking speed of the user. */
 readonly tilesPerSecond: number
 /** A cache of the last direction of motion, used to detect a change in user direction. */
 readonly thumbstickVector: {
  x: number,
  y: number
 }
}
declare const glowstick: IGlowstickApplication