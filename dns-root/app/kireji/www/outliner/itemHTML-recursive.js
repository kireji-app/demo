const items = []

const subparts = [...SUBJECT]

for (let i = 0; i < subparts.length; i++) {
 const subpart = subparts[i]
 const hasSubparts = subpart.length !== 0
 const folderIndex = hasSubparts ? outliner.folders.folderParts.indexOf(subpart) : -1
 const isOpen = hasSubparts && !!((outliner.folders.routeID >> BigInt(folderIndex)) & 1n)
 const symbol = `<img src="${subpart.render({ request: "part.png", format: "datauri" })}"/>`
 const handle = subpart.length ? `<svg onclick="_.noop(event); _.app.kireji.www.outliner.toggle(this, ${folderIndex})" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="explore-toggle"><line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />${isOpen ? "" : `<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`}` : ""
 const label = `<span class=label>${subpart === _ ? `DNS Root (${_.version})` : subpart.key}</span>`
 const summary = `<summary ${IS_LAST_OF_TYPE && !hasSubparts ? 'id="lastOutlinerItem" ' : ""}onclick="_.app.kireji.www.editor.go(event, ${instances.indexOf(subpart)})">${Array(DEPTH + +(subpart.length === 0)).fill('<outliner-spacer></outliner-spacer>').join("")}${handle}${symbol}${label}</summary>`
 items.push(`<details${subpart.length ? "" : ` class=empty`} ${isOpen ? "open" : ""}>${summary}${outliner[property.niceName](subpart, DEPTH + 1, IS_LAST_OF_TYPE && i === subparts.length - 1)}</details>`)
}

return items.join("")