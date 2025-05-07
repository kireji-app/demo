if (production) {
 location = HOST + PATHNAME
 return
}

if (HOST === THEME_HOST)
 return

worker.postMessage({ code: "setTheme", payload: HOST })