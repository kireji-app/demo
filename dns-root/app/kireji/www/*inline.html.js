function svg(clickScript, ...paths) {
 return `<svg onclick="${clickScript}" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="nav-button">${paths.map(path => `<path d="${path}" stroke-width="0.2" stroke-linecap="round" />`).join("\n")}</svg>`
}

return (
 "<h2 id=outliner-header>Outliner</h2>" +
 // `<h2 id=editor-header>${svg("M 0.5 0 A 0.5 0.5 0 1 1 0 -0.5 M 0 -0.2 L 0.3 -0.45 L 0 -0.7")}<span>Property Editor</span></h2>` +
 // ${svg("", "M -0.3 0 L 0.3 0.5 M 0.3 -0.5 L -0.3 0")}${svg("", "M 0.3 0 L -0.3 0.5 M -0.3 -0.5 L 0.3 0")}
 `<h2 id=editor-header>${svg("_.app.kireji.www.outliner.width.toggle(event)", "M 0 0.5 L 0 0.5 M 0 0 L 0 0 M 0 -0.5 L 0 -0.5")} Property Editor</h2>` +
 kirejiApp.outliner["inline.html"] +
 "<part-editor>" + kirejiApp.editor["inline.html"] + "</part-editor>" +
 kirejiApp.outliner.width["inline.html"]
)