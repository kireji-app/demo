// This base HTML is always server-rendered, making this a hydrating task.

if (!hydration.supported)
 throw "Unrecoverable: call to the root view function without the necessary facet support."

Object.defineProperties(_, {
 manifestLink: { value: document.querySelector('link[rel="manifest"]') },
 wallpaper: { value: document.querySelector("wallpaper-") },
 taskbar: { value: document.querySelector("task-bar") },
 menuButton: { value: document.querySelector("menu-button") },
})

Object.defineProperties(_, {
 taskbarSpacer: { value: _.taskbar.querySelector("flex-spacer") }
})

_.manifestLink.ref ??= "/manifest.json!"