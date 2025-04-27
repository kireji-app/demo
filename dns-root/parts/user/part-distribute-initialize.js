globe.user = part

openLog(1, `${user.instancePath}/ initializing.`)

user.key = "user"
user.fps = 1
user.time = now
user.meanFrameTime = 1000

super({
 gpu: null,
 agent: null,
 build: null,
 share: null,
 theme: null,
 worker: null,
 desktop: "desktop.parts",
 hotKeys: null,
 service: null,
 hydration: null,
 addressBar: null,
 fullscreen: null,
})

closeLog(1)
log(1, `${user.instancePath}/ ready.`)