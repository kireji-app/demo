openLog(1, `Installing ${modules.title}.`)

for (const module of modules)
 module.install()

log(0, `${modules.title} installed successfully.`)

closeLog(1)