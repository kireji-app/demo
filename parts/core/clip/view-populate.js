if (clip.pendingFrame)
 cancelAnimationFrame(clip.pendingFrame)

delete clip.pendingFrame
clip.elapsedTime = now - clip.playbackStartTime
const newElapsedFrames = Math.round(clip.elapsedTime / clip.frameTime)
let nextFrameCallback

if (clip.elapsedFrames === newElapsedFrames)
 nextFrameCallback = () => clip.populateView()
else {
 clip.elapsedFrames = newElapsedFrames
 const nextFrame = clip.playbackStartFrame + BigInt(clip.elapsedFrames)
 if (nextFrame < clip.cardinality)
  nextFrameCallback = () => clip.setRouteID(nextFrame)
 else
  nextFrameCallback = () => clip.handleEndPlayback()
}
// commented out for debug only
// clip.pendingFrame = requestAnimationFrame(nextFrameCallback)