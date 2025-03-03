Object.assign(globalThis, {
 root: Object.assign(part, {
  environment: (globalThis.constructor === globalThis.Window ? "client" : "worker") + ".core.parts",
  primaryLayer: 0,
  stagingLayer: 1,
  debugHost: Framework.fallbackHost,
  isLocal: location.host.startsWith("localhost:"),
  resetStagingLayer: async () => {
   await root.setLayer(root.stagingLayer, root.state[root.primaryLayer])
  },
  headerOf(filename) {
   let binary = false
   const extension = filename.split(".").pop()
   return [{
    get "png"() { binary = true; return "image/png" },
    "svg": "image/svg+xml;charset=UTF-8",
    "js": "text/javascript;charset=UTF-8",
    "json": "application/json;charset=UTF-8",
    "html": "text/html;charset=UTF-8",
    "host": "text/plain"
   }[extension], binary, extension]
  },
  async createResponse(request, host = root.host) {
   const url = new URL(request, "https://" + host)
   const filename = url.pathname.split("/").pop()
   const [type, binary] = root.headerOf(filename)
   let body
   if (filename === "debug.host") body = root.debugHost
   else {
    body = await Framework.createPart(host).resolve(filename)
    if (!body) {
     console.warn('404 ' + host + "/" + filename)
     body = new Blob([], { type })
    } else if (binary) {
     const B = atob(body), k = B.length, A = new ArrayBuffer(k), I = new Uint8Array(A)
     for (var i = 0; i < k; i++) I[i] = B.charCodeAt(i)
     body = new Blob([I], { type })
    }
   }

   return new Response(body, {
    headers: {
     "content-type": type,
     expires: "Sun, 20 Jul 1969 20:17:00 UTC",
     server: "kireji",
    },
   })
  },
  async createDataURI(request, host = root.host) {
   const url = new URL(request, "https://" + host)
   const filename = url.pathname.split("/").pop()
   const [type, binary] = root.headerOf(filename)
   let body = await Framework.createPart(host).resolve(filename)
   return `data:${type};base64,${binary ? body : Framework.btoaUnicode(body)}`
  }
 })
})

root.choice[root.primaryLayer] = root[root.environment]
root.state[root.primaryLayer] = root.choice[root.primaryLayer].offset + root.choice[root.primaryLayer].state[root.primaryLayer]
await root.choice[root.primaryLayer].initialize()