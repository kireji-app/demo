part.taskItem = document.createElement("button")
part.taskItem.setAttribute("class", "task")
part.taskIcon = element(part.taskItem, "img")
part.taskIcon.classList.add("icon")
part.taskLabel = element(part.taskItem, "span")
part.taskLabel.classList.add("label")
part.taskLabel.innerHTML = "<span class=label>Loading...</span>"
part.taskItem.onclick = e => {
 desktop.openTaskItem?.classList.remove("open")
 desktop.openTaskItem = part.taskItem
 desktop.openTaskItem.classList.add("open")
 debug('consider cross-origin link here')
}

desktop.taskbarSpacer.before(part.taskItem)