stats.fps = Math.round(1000 / (stats.meanFrameTime += (TIME - (stats.time ?? TIME) - stats.meanFrameTime) / 20))
stats.time = TIME
stats.element.textContent = stats.fps