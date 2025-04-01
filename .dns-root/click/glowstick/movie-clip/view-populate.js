if (movieClip.pendingFrame)
 cancelAnimationFrame(movieClip.pendingFrame)

movieClip.scheduleFrame = () => {
 const currentTime = performance.now()
 delete movieClip.pendingFrame
 movieClip.elapsedTime = currentTime - movieClip.playbackStartTime
 const newElapsedFrames = Math.round(movieClip.elapsedTime / movieClip.frameTime)
 if (movieClip.elapsedFrames === newElapsedFrames) {
  movieClip.pendingFrame = requestAnimationFrame(movieClip.scheduleFrame)
 } else {
  movieClip.elapsedFrames = newElapsedFrames
  const nextFrame = movieClip.playbackStartFrame + BigInt(movieClip.elapsedFrames)
  if (nextFrame < movieClip.cardinality) movieClip.set(nextFrame)
  else movieClip.finishClip("document", nextFrame % movieClip.cardinality)
 }
}

movieClip.pendingFrame = requestAnimationFrame(movieClip.scheduleFrame)