openLog(1, `\x1b[32m\x1b[1m${modules.title}\x1b[0m`)

for (const module of modules)
 module.install()

closeLogSpaced(1)