const zoneNames = ["about", "portfolio", "others", "connect"]
const links = []
const areas = []

zoneNames.forEach((zoneName, zoneIndex) => {
 const src = orenjinari.placeholderImage(`${zoneName}-up.gif`)
 links.push(`<img id=${zoneName}-btn class=bunny src="${src}" onclick="_?.com.orenjinari.www.go('#${zoneName}')"/>`)
 areas.push(`<div id=${zoneName} class="zone bunny-${zoneName}">${_.local ? `<h1>Area ${zoneIndex + 1}</h1>` : ""}<span class=float><img src="${src}"/><span class=thin>is </span><span>coming soon.</span></span></div>`)
})

return orenjinari[".."].scroller.wrap(links.join("") + areas.join(""))