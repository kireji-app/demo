base()
_.frameRequest = requestAnimationFrame(() => _.distributeLoop(_.now))