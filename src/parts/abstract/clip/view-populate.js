if (clip.pendingFrame)
 cancelAnimationFrame(clip.pendingFrame)

delete clip.pendingFrame

if (clip.playing) {
 clip.elapsedTime = _.now - clip.playbackStartTime
 const newElapsedFrames = Math.round(clip.elapsedTime / clip.frameTime)
 let nextFrameCallback

 if (clip.elapsedFrames === newElapsedFrames)
  nextFrameCallback = () => clip.populateView()
 else {
  clip.elapsedFrames = newElapsedFrames
  const nextFrame = clip.playbackStartFrame + BigInt(clip.elapsedFrames)
  nextFrameCallback = nextFrame < clip.cardinality ? () => clip.setRouteID(nextFrame) : () => clip.handleEndPlayback()
 }

 clip.pendingFrame = requestAnimationFrame(nextFrameCallback)
}