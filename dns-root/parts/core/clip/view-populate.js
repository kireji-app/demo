if (clip.pendingFrame)
 cancelAnimationFrame(clip.pendingFrame)

clip.scheduleFrame = () => {
 const currentTime = performance.now()
 delete clip.pendingFrame
 clip.elapsedTime = currentTime - clip.playbackStartTime
 const newElapsedFrames = Math.round(clip.elapsedTime / clip.frameTime)
 if (clip.elapsedFrames === newElapsedFrames) {
  clip.pendingFrame = requestAnimationFrame(clip.scheduleFrame)
 } else {
  clip.elapsedFrames = newElapsedFrames
  const nextFrame = clip.playbackStartFrame + BigInt(clip.elapsedFrames)
  if (nextFrame < clip.cardinality) clip.set(nextFrame)
  else clip.finishClip("document", nextFrame % clip.cardinality)
 }
}

clip.pendingFrame = requestAnimationFrame(clip.scheduleFrame)