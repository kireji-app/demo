return partOutliner.getChildren(SUBJECT).map((childPart, i, childArray) => {
 const hasSubparts = partOutliner.getChildren(childPart).length !== 0
 const folderIndex = hasSubparts ? folders.folderParts.indexOf(childPart) : -1
 const isOpen = hasSubparts && !!((folders.routeID >> BigInt(folderIndex)) & 1n)
 const partIndex = allParts.indexOf(childPart)
 const symbol = `<img src="${childPart.placeholderImage("part.png")}"/>`
 const handle = hasSubparts ? `<svg onclick="self._?.noop(event); ${partOutliner.runtimeReference}.toggle(this,${folderIndex})" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="explore-toggle"><line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />${isOpen ? "" : `<line x1="0" y1="-0.41" x2="0" y2="0.41" stroke-width="0.2" stroke-linecap="round" />`}` : ""
 const label = `<span class="label${childPart.isAbstract ? " abstract" : ""}">${partOutliner.getLabel(childPart)}</span>`
 const summary = `<summary data-index="${partIndex}"${partOutliner.isSelected(childPart) ? " data-selected" : ""}${IS_LAST_OF_TYPE && !hasSubparts ? ' id="lastOutlinerItem"' : ""} onclick="${partOutliner.runtimeReference}.open(event,${partIndex})">${Array(DEPTH + +!hasSubparts).fill('<outliner-spacer></outliner-spacer>').join("")}${handle}${symbol}${label}</summary>`
 return `<details${hasSubparts ? "" : ` class=empty`} ${isOpen ? "open" : ""}>${summary}${recurse(childPart, DEPTH + 1, IS_LAST_OF_TYPE && i === childArray.length - 1)}</details>`
}).join("")

/* TODO: the children of collapsed outliner items should not be rendered into HTML. This bloats the fetch size. They should be dynamically instantiated and destroyed when their parent is expanded and collapsed, respectively. */