if (environment === "server")
 return null

if (environment === "worker")
 return server.requestedHost

if (environment === "window")
 return location.host