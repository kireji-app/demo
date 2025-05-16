const sectionNames = ["about", "portfolio", "others", "connect"]
const links = []
const areas = []

sectionNames.forEach((bunnyName, bunnyIndex) => {
 const src = orenjinari.render({ request: `${bunnyName}-up.gif`, format: "datauri" })
 areas.push(`<div class=placeholder>${production ? "" : `<h1>Area ${bunnyIndex + 1}</h1>`}<span class=float><img src="${src}"><span class=thin>is </span><span>coming soon.</span></span></div>`)
 links.push(`<img id=${bunnyName} class=bunny src="${src}" onclick="themes.arm.scroll.setRouteID(${BigInt(bunnyIndex + 1) * 25000n - 1n}n)"/>`)
})

return links.join("") + areas.join("")