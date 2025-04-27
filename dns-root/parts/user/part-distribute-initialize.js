openLog(1, "Initializing user configuration space.")

globe.user = part

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

log(1, "User configuration space initialized.")
closeLog(1)