desktop.fps = Math.round(1000 / (desktop.meanFrameTime += (now - desktop.time - desktop.meanFrameTime) / 20))
desktop.time = now
addressBar.populateView()