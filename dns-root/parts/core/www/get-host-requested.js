const boilerplate = `Theme Select | `

if (environment === "build")
 return null

if (environment === "server" || environment === "worker")
 return serverless.requestedHost

if (environment === "window")
 return location.host