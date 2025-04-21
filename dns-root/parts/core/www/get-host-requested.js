const boilerplate = `Theme Select | `

if (ENVIRONMENT === "build")
 return null

if (ENVIRONMENT === "server" || ENVIRONMENT === "worker")
 return serverless.requestedHost

if (ENVIRONMENT === "window")
 return location.host