globe.user = part

openLog(1, `${user.instancePath}/ initializing.`)

user.key = "user"
user.fps = 1
user.time = now
user.meanFrameTime = 1000

super({
 addressBar: null,
 theme: null,
 gpu: null,
 agent: null,
 build: null,
 share: null,
 worker: null,
 desktop: "desktop.parts",
 hotKeys: null,
 hydration: null,
 fullscreen: null,
 serverless: null,
})

closeLog(1)
log(1, `${user.instancePath}/ ready.`)