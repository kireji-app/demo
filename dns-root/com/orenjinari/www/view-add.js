part.oldIconLinks = []
document.querySelectorAll('link[rel="icon"]').forEach(link => {
 part.oldIconLinks.push(link.href)
 link.setAttribute("href", link.href.slice(0, 22) + framework.openOwnStaticFile("icon.png"))
})
part.bunnyNames = ["about", "portfolio", "others", "connect"]

inherit.styleSheet.replaceSync(part.framework.openOwnStaticFile("style.css"))
inherit.wallpaper

part.bunnies = part.bunnyNames.map((bunnyName, bunnyIndex) => {
 const area = bunnyIndex + 1
 const img = element(part.wallpaper, "img")
 img.setAttribute("src", `https://${framework.host}/${bunnyName}-up.gif!`)
 img.setAttribute("class", "bunny")
 img.setAttribute("id", bunnyName)
 img.onclick = () => part.scroll.set((BigInt(area) * 25000n - 1n))
 const placeholder = element(part.wallpaper, "div")
 placeholder.setAttribute("class", "placeholder")
 placeholder.innerHTML = `${Framework.isProduction ? "" : `<h1>Area ${area}</h1>`}<span id=float><img src="https://${framework.host}/${bunnyName}-up.gif!"><span class=thin>is </span><span>coming soon.</span></span>`
 return img
})

addEventListener("wheel", part.onwheel = event => {
 event.preventDefault()
 event.stopPropagation()
 const maxScrollY = part.scroll.cardinality - 1n
 const documentHeight = document.body.scrollHeight - window.innerHeight
 const currentScrollRatio = BigInt(Math.trunc(event.deltaY / documentHeight * Number.MAX_SAFE_INTEGER))
 const requestedScrollY = part.routeID + currentScrollRatio * part.scroll.cardinality / BigInt(Number.MAX_SAFE_INTEGER)
 const minScrollY = 0n
 const finalScrollY = requestedScrollY > maxScrollY ? maxScrollY : requestedScrollY < minScrollY ? minScrollY : requestedScrollY
 part.scroll.set(finalScrollY)
}, { passive: false })