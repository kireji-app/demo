declare interface IClip<TOwner>
 extends IPart<TOwner, null> {

 // Serialized Properties.
 /** Initiates automatic route changes on the part that create a video playback effect. */
 readonly initiatePlayback(): void
 /** Stops the playback started by `clip.initiatePlayback()`. */
 readonly stopPlayback(): void
 /** A utility function used to handle reaching the end of a clip. */
 readonly handleEndPlayback(): void

 // Runtime Properties.
 /** If the clip is playing, the difference between `_.now` and `clip.playbackStartTime`. */
 readonly elapsedTime?: number
 /** If playing, the difference between `clip.routeID` and `clip.playbackStartFrame` */
 readonly elapsedFrames?: number
 /** Determines the next step when the clip autoplays past it's last frame. */
 readonly endOfPlaybackBehavior: "autoplay" | "autoplayInto" | "loop"
 /** The framerate at which to play the movie clip. */
 readonly frameRate: number
 /** The amount of time each frame would be on the screen, given ideal performance. */
 readonly frameTime: number
 /** If defined, a number that the JavaScript engine assigned to the last requested animation frame for the clip. */
 readonly pendingFrame?: number
 /** Whether or not the clip is currently playing. */
 readonly playing: boolean
 /** If the clip is playing, `clip.routeID` when initiatePlayback was last called. */
 readonly playbackStartFrame?: bigint
 /** If the clip is playing, the value of `_.now` when `clip.initiatePlayback()` was called. */
 readonly playbackStartTime?: DOMHighResTimeStamp
}

declare const clip: IClip<IPartAny>