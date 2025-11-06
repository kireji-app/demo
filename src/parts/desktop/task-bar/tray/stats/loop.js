stats.fps = Math.round(1000 / (stats.meanFrameTime += (TIME - (stats.mark ?? TIME) - stats.meanFrameTime) / 20))
stats.mark = TIME
stats.element.textContent = stats.fps