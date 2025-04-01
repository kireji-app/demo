if (movieClip.pendingFrame) {
 cancelAnimationFrame(movieClip.pendingFrame)
 delete movieClip.pendingFrame
}

delete movieClip.playbackStartTime
delete movieClip.playbackStartFrame
delete movieClip.elapsedTime
delete movieClip.elapsedFrames