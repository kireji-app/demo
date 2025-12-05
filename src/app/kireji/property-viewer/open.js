const targetPart = allParts[PART_INDEX]
const filename = isNaN(FILE_INDEX) ? undefined : targetPart.filenames[FILE_INDEX]
const existingTabIndex = tabGroup.openTabs.findIndex(tab => tab.part === targetPart && tab.filename === filename)

if (existingTabIndex !== -1) {
 if (tabGroup.activeTab !== existingTabIndex) {
  const existingTabElement = document.querySelector(`tab-:nth-child(${existingTabIndex + 1})`)
  propertyViewer.activate(EVENT, existingTabElement)
  existingTabElement.scrollIntoView({
   behavior: 'smooth',
   inline: 'center',
  })
 } else _.noop(EVENT)
 return
}

const newTabIndex = tabGroup.openTabs.length
const newTabElement = (() => {
 const offscreen = document.createElement("div")
 offscreen.innerHTML = tabGroup.renderTabHTML(targetPart, filename, newTabIndex)
 return offscreen.querySelector("tab-")
})()
document.getElementById("tab-group").appendChild(newTabElement)

newTabElement.scrollIntoView({
 behavior: 'smooth',
 inline: 'center',
})

tabGroup.openTabs[newTabIndex] = { part: targetPart, filename }
tabGroup.permutationRouteID = tabGroup.getPermutationRouteID(tabGroup.model.openTabs)
propertyViewer.activate(EVENT, newTabElement)