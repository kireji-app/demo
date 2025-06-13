user.fps = Math.round(1000 / (root.parts.user.meanFrameTime += (now - (root.parts.user.time ?? now) - root.parts.user.meanFrameTime) / 20))
user.time = now

// Every time the user changes position, notify the window address bar.
addressBar.notify()