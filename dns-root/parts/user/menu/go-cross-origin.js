if (IS_PRODUCTION) {
 location = HOST + PATHNAME
 return
}

if (HOST === THEME_HOST)
 return

desktop.worker.postMessage({ code: "setDebugHost", payload: HOST })