desktop.onupdatedocument = async () => {
 // Although these links can be changed to buttons, this is here to demonstrate old-fashioned link functionality.
 const href = await desktop.stageState(part.parent[LAYER], part.parent[LAYER][1].offset, true)
 part.link.setAttribute("href", href)
}