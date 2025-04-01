const arms = {}
let nonSelfReferentialBrowserTotal = 0n
let maxRecursiveDepth = 10n

for (const task of desktop) {
 arms[task.key] = new Part("origin." + part.host, {
  "post-constructor.js": `part.cardinality = ${task.cardinality}n`
 }, part)
 nonSelfReferentialBrowserTotal += task.cardinality
}

arms.core = new Part("origin." + part.host, {
 "post-constructor.js": `part.cardinality = ${nonSelfReferentialBrowserTotal * maxRecursiveDepth}n`
}, part)

part.setParts(arms)