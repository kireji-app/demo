super([
 APPLICATION,
 ...read("preferences.host").split(/[\s\n]+/g)
])