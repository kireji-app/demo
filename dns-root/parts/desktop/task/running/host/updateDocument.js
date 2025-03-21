const host = part.taskHosts[Number(part.state[LAYER])]
part.parent.taskLabel.innerHTML = host
part.parent.task = Framework.createPart(host, undefined, part)
inherit.task

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
 desktop.openTaskItem = part.parent.taskItem
 desktop.openTaskItem.classList.add("open")
}