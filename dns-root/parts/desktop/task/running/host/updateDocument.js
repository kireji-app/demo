const host = part.taskHosts[Number(part.state[LAYER])]
part.parent[LAYER].taskLabel.innerHTML = host
part.task = part.parent[LAYER].task = Framework.createPart(host, undefined, part)

if (part.windowArray) {
 part.windowArray.splice(part.windowIndex, 1)
 delete part.windowArray
 delete part.windowIndex
}

part.windowArray = desktop.windows[host] ??= []
part.windowIndex = part.windowArray.length
part.windowArray.push(part)

if (part.task.host === (Framework.isDebug ? Framework.debugHost : location.host) && BigInt(part.windowIndex) === desktop.settings.windowIndex.state[LAYER]) {
 desktop.openTaskItem?.classList.remove("open")
 desktop.openTaskItem = part.parent[LAYER].taskItem
 desktop.openTaskItem.classList.add("open")
}