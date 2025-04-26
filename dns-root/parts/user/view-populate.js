user.fps = Math.round(1000 / (user.meanFrameTime += (now - user.time - user.meanFrameTime) / 20))
user.time = now
addressBar.populateView()