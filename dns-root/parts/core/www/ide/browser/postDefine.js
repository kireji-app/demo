const addends = {}
let nonSelfReferentialBrowserTotal = 0n
let maxRecursiveDepth = 10n

for (const app of part.parent.parent.parent.parent) {
 addends[app.key] = Framework.createPart("origin." + part.host, {
  "postDefine.js": `part.size = ${app.size}n`
 }, part)
 nonSelfReferentialBrowserTotal += app.size
}

addends.core = Framework.createPart("origin." + part.host, {
 "postDefine.js": `part.size = ${nonSelfReferentialBrowserTotal * maxRecursiveDepth}n`
}, part)

part.setAddends(addends)