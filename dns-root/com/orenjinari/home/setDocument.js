part.bunnyNames = ["about", "portfolio", "others", "connect"]

inherit.styleSheet.replaceSync(part.framework.read("style.css"))
inherit.container
inherit.containerHost

part.bunnies = part.bunnyNames.map((bunnyName, bunnyIndex) => {
 const area = bunnyIndex + 1
 const img = element(part.container, "img")
 img.setAttribute("src", `https://${scriptHost}${Framework.version}${bunnyName}-up.gif`)
 img.setAttribute("class", "bunny")
 img.setAttribute("id", bunnyName)
 img.onclick = () => part.scroll.setLayer(LAYER, (BigInt(area) * 25000n - 1n))
 const placeholder = element(part.container, "div")
 placeholder.setAttribute("class", "placeholder")
 placeholder.innerHTML = `${Framework.isDebug ? `<h1>Area ${area}</h1>` : ""}<span id=float><img src="https://${scriptHost}${Framework.version}${bunnyName}-up.gif"><span class=thin>is </span><span>coming soon.</span></span>`
 return img
})

addEventListener("wheel", part.onwheel = event => {
 event.preventDefault()
 event.stopPropagation()
 const maxScrollY = part.scroll.size - 1n
 const documentHeight = document.body.scrollHeight - window.innerHeight
 const currentScrollRatio = BigInt(Math.trunc(event.deltaY / documentHeight * Number.MAX_SAFE_INTEGER))
 const requestedScrollY = part.state[LAYER] + currentScrollRatio * part.scroll.size / BigInt(Number.MAX_SAFE_INTEGER)
 const minScrollY = 0n
 const finalScrollY = requestedScrollY > maxScrollY ? maxScrollY : requestedScrollY < minScrollY ? minScrollY : requestedScrollY
 part.scroll.setLayer(LAYER, finalScrollY)
}, { passive: false })