document.querySelectorAll('link[rel="icon"]').forEach(link => {
 link.setAttribute("href", part.oldIconLinks.shift())
})
delete part.oldIconLinks