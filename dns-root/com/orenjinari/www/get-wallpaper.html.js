const sectionNames = ["about", "portfolio", "others", "connect"]
const links = []
const areas = []

sectionNames.forEach((bunnyName, bunnyIndex) => {
 const src = part.render({ request: `${bunnyName}-up.gif`, format: "datauri" })
 areas.push(`<div class=placeholder>${IS_PRODUCTION ? "" : `<h1>Area ${bunnyIndex + 1}</h1>`}<span id=float><img src="${src}"><span class=thin>is </span><span>coming soon.</span></span></div>`)
 links.push(`<img id=${bunnyName} class=bunny src="${src}" onclick="theme.arm.scroll.setRoute(${BigInt(bunnyIndex + 1) * 25000n - 1n}n)"/>`)
})

return links.join("") + areas.join("")