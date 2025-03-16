console.log(part.host + ' listens to onupdate')
app.onupdatedocument = async () => {
 // Although these links can be changed to buttons, this is here to demonstrate old-fashioned link functionality.
 const href = await app.stageState(part.parent, part.parent[1].offset, true)
 part.link.setAttribute("href", href)
}