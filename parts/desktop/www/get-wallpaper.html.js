let result = ""

for (const subpart of _.parts.desktop)
 result += `<desktop-icon tabIndex=${subpart.index}><img class=icon src="${subpart.render({
  request: "theme.png",
  fallback: "data:image/png;base64,iVBORw0KGgo=",
  format: "datauri"
 })}"/><span class=label>${subpart.title ?? "Untitled " + subpart.key}</span></desktop-icon>`

return result