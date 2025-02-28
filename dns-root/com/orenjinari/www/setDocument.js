part.oldIconLinks = []
document.querySelectorAll('link[rel="icon"]').forEach(link => {
 part.oldIconLinks.push(link.href)
 link.setAttribute("href", link.href.slice(0, 22) + read("icon.png"))
})