super({
 main: new.target.framework.resolveSync("main.host"),
 ...JSON.parse(read("preferences.json"))
})