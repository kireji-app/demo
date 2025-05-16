user.fps = Math.round(1000 / (user.meanFrameTime += (now - (user.time ?? now) - user.meanFrameTime) / 20))
user.time = now

// Every time the user changes position, notify the window address bar.
addressBar.populateView()