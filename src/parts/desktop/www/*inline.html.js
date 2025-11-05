let result = ""

for (const application of Object.values(_.liveApplications)) {
 if (application === desktopApp) continue
 result += `<desktop-icon tabIndex=2><img class=icon src="${application.placeholderImage("part.png")}"/><span class=label>${application.titleMenu ?? application.title ?? application.key}</span></desktop-icon>`
}

return result