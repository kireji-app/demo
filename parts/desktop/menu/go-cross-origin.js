if (production) {
 location = HOST + PATHNAME
 return
}

if (HOST === _.defaultHost)
 return

worker.registration.active.postMessage({ code: "setTheme", payload: HOST })