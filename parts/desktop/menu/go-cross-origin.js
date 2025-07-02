if (production) {
 location = "https://" + HOST + location.pathname
 return
}

if (HOST === _.themeHost)
 return

worker.registration.active.postMessage({ code: "setTheme", payload: HOST })