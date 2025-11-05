if (typeof _.applications[HOST].translateCanonicalPathname !== "function")
 throw `Unsupported Canonical Route "https://${HOST}${PATHNAME}".`

return _.applications[HOST].translateCanonicalPathname(PATHNAME, HASH)