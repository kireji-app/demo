if (clip.pendingFrame) {
 cancelAnimationFrame(clip.pendingFrame)
 delete clip.pendingFrame
}

delete clip.playbackStartTime
delete clip.playbackStartFrame
delete clip.elapsedTime
delete clip.elapsedFrames