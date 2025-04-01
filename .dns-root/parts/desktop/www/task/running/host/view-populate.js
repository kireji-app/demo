const host = part.taskHosts[Number(part.routeID)]
part.parent.taskLabel.innerHTML = host
part.task = part.parent.task = new Part(host, undefined, part)

if (part.windowArray) {
 part.windowArray.splice(part.windowIndex, 1)
 delete part.windowArray
 delete part.windowIndex
}

part.windowArray = desktop.windows[host] ??= []
part.windowIndex = part.windowArray.length
part.windowArray.push(part)

if (part.task.host === desktop.appHost) {
 desktop.openTaskItem?.classList.remove("open")
 desktop.openTaskItem = part.parent.taskItem
 desktop.openTaskItem.classList.add("open")
}