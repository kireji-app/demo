globe.user = this

openLog(1, user.key)

user.key = "user"
user.fps = 1
user.time = now
user.meanFrameTime = 1000

super({
 features: null,
 theme: null,
 desktop: "desktop.parts"
})

features.install()

closeLog(1)
log(1, `${user.instancePath}/ initialized.`)