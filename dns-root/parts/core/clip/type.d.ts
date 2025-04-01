declare class ClipPart extends CorePart {
 /** The framerate at which to play this movie clip. */
 readonly frameRate: number

 /** The amount of time each frame would be on the screen, given ideal performance. */
 readonly frameTime: number

 /** Determines the next step when the clip autoplays past it's last frame. */
 readonly endOfPlaybackBehavior: "autoplay" | "autoplayInto" | "loop"
 readonly playbackStartFrame = clip.routeID
 readonly playbackStartTime = performance.now()
 readonly elapsedTime = 0
 readonly elapsedFrames = 0
 initiatePlayback(): void
 stopPlayback(): void
 handlePlaybackEnd(): void
}
declare const clip: ClipPart