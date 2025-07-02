const sectionNames = ["about", "portfolio", "others", "connect"]
const links = []
const areas = []

sectionNames.forEach((bunnyName, bunnyIndex) => {
 const src = orenjinari.render({ request: `${bunnyName}-up.gif`, format: "datauri" })
 links.push(`<img id=${bunnyName} class=bunny src="${src}" onclick="_.com.orenjinari.www.go(${BigInt(bunnyIndex + 1) * 25000n - 1n}n)"/>`)
 areas.push(`<div class="placeholder bunny-${bunnyName}">${production ? "" : `<h1>Area ${bunnyIndex + 1}</h1>`}<span class=float><img src="${src}"><span class=thin>is </span><span>coming soon.</span></span></div>`)
})

return links.join("") + areas.join("")