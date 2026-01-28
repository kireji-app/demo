const zoneNames = ["about", "portfolio", "others", "connect"]
const links = []
const areas = []

zoneNames.forEach((zoneName, zoneIndex) => {
 const src = orenjinari.placeholderImage(`${zoneName}-up.gif`)
 links.push(`<img ${orenjinari.pointAttr()} id=${zoneName}-btn name=${zoneName} class=bunny src="${src}"/>`)
 areas.push(`<section id=${zoneName} class="zone bunny-${zoneName}">${_.local ? `<h1>Area ${zoneIndex + 1}</h1>` : ""}<span class=float><img src="${src}"/><span class=thin>is </span><span>coming soon.</span></span></section>`)
})

return orenjinari.scroller.wrap(links.join("") + areas.join(""))