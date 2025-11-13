const items = []

const { subdomains } = SUBJECT

for (let i = 0; i < subdomains.length; i++) {
 const subpart = SUBJECT[subdomains[i]]
 const hasSubparts = subpart.subdomains.length !== 0
 const folderIndex = hasSubparts ? outliner.folders.folderParts.indexOf(subpart) : -1
 const isOpen = hasSubparts && !!((outliner.folders.routeID >> BigInt(folderIndex)) & 1n)
 const instanceIndex = allParts.indexOf(subpart)
 const symbol = `<img src="${subpart.placeholderImage("part.png")}"/>`
 const handle = hasSubparts ? `<svg onclick="self._?.noop(event); ${outliner.runtimeReference}.toggle(this,${folderIndex})" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="explore-toggle"><line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />${isOpen ? "" : `<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`}` : ""
 const label = `<span class="label${subpart.isAbstract ? " abstract" : ""}">${subpart === _ ? "" : subpart.key}</span>`
 const summary = `<summary data-index="${instanceIndex}" ${selectedPart === subpart ? "data-selected " : ""}${IS_LAST_OF_TYPE && !hasSubparts ? 'id="lastOutlinerItem" ' : ""}onclick="${selected.runtimeReference}.go(event,${instanceIndex})">${Array(DEPTH + +!hasSubparts).fill('<outliner-spacer></outliner-spacer>').join("")}${handle}${symbol}${label}</summary>`
 items.push(`<details${hasSubparts ? "" : ` class=empty`} ${isOpen ? "open" : ""}>${summary}${recurse(subpart, DEPTH + 1, IS_LAST_OF_TYPE && i === subdomains.length - 1)}</details>`)
}

return items.join("")