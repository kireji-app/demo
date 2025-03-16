console.log(part.host + ' listens to onupdate')
app.onupdatedocument = async () => {
 // Although these links can be changed to buttons, this is here to demonstrate old-fashioned link functionality.
 await app.stageState(part.parent, part.parent[1].offset, true)
 await app.stageState(part.parent.ide.explorer.width, part.parent.ide.explorer.width.open.offset)
 const href = await app.stageState(part.parent.ide.explorer.width.open, 196n)
 part.link.setAttribute("href", href)
}