if (!/^[-a-z0-9/]*$/.test(PATHNAME))
 throw "Bad Canonical Path: " + PATHNAME

if (typeof _.applications[HOST].translateCanonicalPathname !== "function")
 throw "Unknown Canonical Path: " + PATHNAME

return _.applications[HOST].translateCanonicalPathname(PATHNAME, HASH)