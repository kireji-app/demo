delete part.bunnies
delete part.styleSheet
removeEventListener("wheel", part.onwheel, { passive: "false" })
delete part.wallpaper

document.querySelectorAll('link[rel="icon"]').forEach(link => {
 link.setAttribute("href", part.oldIconLinks.shift())
})
delete part.oldIconLinks