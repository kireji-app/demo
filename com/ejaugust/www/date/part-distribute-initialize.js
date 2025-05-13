const apexFramework = new Framework("ejaugust.com")
const numericSubdomains = apexFramework.allSubdomains.filter(n => parseInt(n))
const manifest = Object.fromEntries(numericSubdomains.map(n => ['post' + n, apexFramework.resolveImplicitHost(n)]))
super(manifest)