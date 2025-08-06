Object.defineProperty(desktop, "wallpaper", {
 value: environment === "client" ? document.querySelector("wallpaper-") : null
})