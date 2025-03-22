desktop.onupdatedocument = async () => {
 // Although these links can be changed to buttons, this is here to demonstrate old-fashioned link functionality.
 await desktop.stageState(part.parent[LAYER], part.parent[LAYER][1].offset, true)
 await desktop.stageState(part.parent[LAYER].ide.explorer.width, part.parent[LAYER].ide.explorer.width.open.offset)
 const href = await desktop.stageState(part.parent[LAYER].ide.explorer.width.open, 196n)
 part.link.setAttribute("href", href)
}