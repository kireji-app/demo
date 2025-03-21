part.taskItem = document.createElement("button")
part.taskItem.setAttribute("class", "task")
part.taskIcon = element(part.taskItem, "img")
part.taskIcon.classList.add("icon")
part.taskLabel = element(part.taskItem, "span")
part.taskLabel.classList.add("label")
part.taskLabel.innerHTML = "<span class=label>Loading...</span>"
part.taskItem.onclick = async e => {
 e.stopPropagation()
 e.preventDefault()
 await desktop.settings.windowIndex.setLayer(LAYER, BigInt(part.subhost.windowIndex))
 const taskHost = part.subhost.task.host
 const currentHost = Framework.isDebug ? Framework.debugHost : location.host
 if (currentHost === taskHost) {
  desktop.openTaskItem?.classList.remove("open")
  desktop.openTaskItem = part.taskItem
  desktop.openTaskItem.classList.add("open")
 } else {
  if (Framework.isDebug) {
   worker.postMessage({ code: "setDebugHost", payload: taskHost })
   console.log('simulating ' + "https://" + taskHost + location.pathname)
  } else location = "https://" + taskHost + location.pathname
 }
}

desktop.taskbarSpacer.before(part.taskItem)