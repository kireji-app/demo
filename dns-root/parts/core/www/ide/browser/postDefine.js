const addends = {}
let nonSelfReferentialBrowserTotal = 0n
let maxRecursiveDepth = 10n

for (const task of desktop) {
 addends[task.key] = Framework.createPart("origin." + part.host, {
  "postDefine.js": `part.size = ${task.size}n`
 }, part)
 nonSelfReferentialBrowserTotal += task.size
}

addends.core = Framework.createPart("origin." + part.host, {
 "postDefine.js": `part.size = ${nonSelfReferentialBrowserTotal * maxRecursiveDepth}n`
}, part)

part.setAddends(addends)