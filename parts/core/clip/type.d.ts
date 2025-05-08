declare class PartClip extends PartCore {
 /** The framerate at which to play this movie clip. */
 readonly frameRate: number

 /** The amount of time each frame would be on the screen, given ideal performance. */
 readonly frameTime: number

 /** Determines the next step when the clip autoplays past it's last frame. */
 readonly endOfPlaybackBehavior: "autoplay" | "autoplayInto" | "loop"

 /** If the clip is playing, `clip.routeID` when initiatePlayback was last called. */
 readonly playbackStartFrame: bigint

 /** If the clip is playing, the value of `now` when `clip.initiatePlayback()` was called. */
 readonly playbackStartTime: DOMHighResTimeStamp

 /** If the clip is playing, the difference between `now` and `clip.playbackStartTime`. */
 readonly elapsedTime: number

 /** If playing, the difference between `clip.routeID` and `clip.playbackStartFrame` */
 readonly elapsedFrames: number

 /** Initiates automatic route changes on the part that create a video playback effect. */
 initiatePlayback(): void

 /** Stops the playback started by `clip.initiatePlayback()`. */
 stopPlayback(): void

 /** A utility function used to handle reaching the end of a clip. */
 handlePlaybackEnd(): void
}
declare const clip: PartClip