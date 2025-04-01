part.taskHosts = [
 "www.kireji.io",
 "www.kireji.app",
 "www.core.parts",
 "www.ejaugust.com",
 "www.orenjinari.com",
 "www.kireji.vercel.app",
 "www.ejaugust.vercel.app",
 "www.orenjinari.vercel.app",
]
// If the app is maximized, we go to its location when focusing on it
//  otherwise, we go to desktop.parts

// Alterative: interacting with more than one app takes user to www.desktop.parts
part.cardinality = BigInt(part.taskHosts.length)