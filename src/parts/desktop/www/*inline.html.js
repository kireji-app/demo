let result = ""

for (const application of Object.values(_.applications)) {
 if (application === desktopApp) continue
 let truncatedName = ""
 const iconName = application.titleMenu ?? application.title ?? application.key
 for (const word of iconName.split(" ")) {
  if (truncatedName.length + word.length + 1 > 20) {
   truncatedName += "..."
   break
  }
  truncatedName += " " + word
 }
 result += `<desktop-icon tabIndex=2><img class=icon src="${application.placeholderImage("part.png")}"/><span class=label>${truncatedName}</span></desktop-icon>`
}

return result