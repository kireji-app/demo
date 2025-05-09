if (production) {
 location = HOST + PATHNAME
 return
}

if (HOST === build.defaultHost)
 return

worker.registration.active.postMessage({ code: "setTheme", payload: HOST })