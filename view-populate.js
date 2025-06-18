_.fps = Math.round(1000 / (_.meanFrameTime += (now - (_.time ?? now) - _.meanFrameTime) / 20))
_.time = now

// Every time the user changes position, notify the window address bar.
addressBar.notify()