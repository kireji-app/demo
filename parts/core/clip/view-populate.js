if (clip.pendingFrame)
 cancelAnimationFrame(clip.pendingFrame)

delete clip.pendingFrame

if (clip.playing) {
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

 clip.pendingFrame = requestAnimationFrame(nextFrameCallback)
}