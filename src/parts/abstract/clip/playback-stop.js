if (clip.pendingFrame) {
 cancelAnimationFrame(clip.pendingFrame)
 clip.pendingFrame = undefined
}

clip.playbackStartTime = undefined
clip.playbackStartFrame = undefined
clip.elapsedTime = undefined
clip.elapsedFrames = undefined
clip.playing = false