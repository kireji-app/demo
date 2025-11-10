function svg(clickScript, ...paths) {
 return `<svg onclick="${clickScript}" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="nav-button">${paths.map(path => `<path d="${path}" stroke-width="0.2" stroke-linecap="round" />`).join("\n")}</svg>`
}

return (
 `<h2 id=outliner-header>${outliner.title}</h2>` +
 // `<h2 id=property-viewer-header>${svg("M 0.5 0 A 0.5 0.5 0 1 1 0 -0.5 M 0 -0.2 L 0.3 -0.45 L 0 -0.7")}<span>Property Viewer</span></h2>` +
 // ${svg("", "M -0.3 0 L 0.3 0.5 M 0.3 -0.5 L -0.3 0")}${svg("", "M 0.3 0 L -0.3 0.5 M -0.3 -0.5 L 0.3 0")}
 `<h2 id=property-viewer-header>${svg(`${outliner.width.runtimeReference}.toggle(event)`, "M 0 0.5 L 0 0.5 M 0 0 L 0 0 M 0 -0.5 L 0 -0.5")} ${propertyViewer.title}</h2>` +
 outliner["inline.html"] +
 "<property-viewer>" + propertyViewer["inline.html"] + "</property-viewer>" +
 outliner.width["inline.html"]
)