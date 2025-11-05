clip.define({
 frameRate: { value: 60, writable: true },
 frameTime: { value: 1000 / 60, writable: true },
 endOfPlaybackBehavior: { value: "autoplay", writable: true },
 playbackStartFrame: { value: undefined, writable: true },
 playbackStartTime: { value: undefined, writable: true },
 elapsedTime: { value: undefined, writable: true },
 elapsedFrames: { value: undefined, writable: true },
 playing: { value: undefined, writable: true },
 pendingFrame: { value: undefined, writable: true },
 nextClip: { value: null, writable: true }
})