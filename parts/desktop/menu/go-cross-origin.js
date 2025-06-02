if (production) {
 location = HOST + PATHNAME
 return
}

if (HOST === root.defaultHost)
 return

worker.registration.active.postMessage({ code: "setTheme", payload: HOST })