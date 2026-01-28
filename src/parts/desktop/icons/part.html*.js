let result = ""

for (let iconIndex = 0; iconIndex < desktopIcons.superset.length; iconIndex++) {
 const application = desktopIcons.superset[iconIndex]
 let truncatedName = ""
 const iconName = application.titleMenu ?? application.title ?? application.key
 for (const word of iconName.split(" ")) {
  if (truncatedName.length + word.length + 1 > 20) {
   truncatedName += "..."
   break
  }
  truncatedName += " " + word
 }
 const isSelected = (desktopIcons.routeID & 1n << BigInt(iconIndex)) !== 0n
 const maskVar = application.cssVariableOfImage("part.png")
 result += `<desktop-icon ${desktopIcons.pointAttr()} tabIndex=0 data-index=${iconIndex}${isSelected ? " data-selected" : ""}><icon-mask style="-webkit-mask-image:${maskVar};mask-image:${maskVar}"><img class=icon src="${application.placeholderImage("part.png")}"/></icon-mask><span class=label>${truncatedName}</span></desktop-icon>`
}

return result