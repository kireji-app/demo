globe.desktop = part

desktop.key ??= "desktop"
desktop.fps = 1
desktop.time = now
desktop.meanFrameTime = 1000

desktop.super.setParts({
 gpu: null,
 menu: null,
 agent: null,
 build: null,
 share: null,
 worker: null,
 hotKeys: "hot-keys",
 hydration: null,
 colorMode: null,
 addressBar: null,
 serverless: null,
 vintageMode: null,
})

for (const component of desktop)
 component.setParts()