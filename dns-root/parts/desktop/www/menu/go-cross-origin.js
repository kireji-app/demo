if (IS_PRODUCTION) {
 location = HOST + PATHNAME
 return
}

if (HOST === DEVELOPMENT_HOST)
 return

desktop.worker.postMessage({ code: "setDebugHost", payload: HOST })