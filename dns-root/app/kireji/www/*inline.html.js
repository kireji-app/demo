function svg(...paths) {
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="nav-button">${paths.map(path => `<path d="${path}" stroke-width="0.2" stroke-linecap="round" />`).join("\n")}</svg>`
}

return (
 "<h2 id=outliner-header>Outliner</h2>" +
 // `<h2 id=editor-header>${svg("M -0.3 0 L 0.3 0.5 M 0.3 -0.5 L -0.3 0")}${svg("M 0.3 0 L -0.3 0.5 M -0.3 -0.5 L 0.3 0")}${svg("M 0.5 0 A 0.5 0.5 0 1 1 0 -0.5 M 0 -0.2 L 0.3 -0.45 L 0 -0.7")}<span>Property Editor</span>${svg("M 0 0.5 L 0 0.5 M 0 0 L 0 0 M 0 -0.5 L 0 -0.5")}</h2>` +
 `<h2 id=editor-header>Property Editor</h2>` +
 kirejiApp.outliner["inline.html"] +
 "<editor-container>" + kirejiApp.editor["inline.html"] + "</editor-container>" +
 kirejiApp.outliner.width["inline.html"]
)