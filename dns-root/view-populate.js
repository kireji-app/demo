_.fps = Math.round(1000 / (_.meanFrameTime += (now - (_.time ?? now) - _.meanFrameTime) / 20))
_.time = now

addressBar.notify()