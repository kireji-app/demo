user.fps = Math.round(1000 / (_.parts.user.meanFrameTime += (now - (_.parts.user.time ?? now) - _.parts.user.meanFrameTime) / 20))
user.time = now

// Every time the user changes position, notify the window address bar.
addressBar.notify()