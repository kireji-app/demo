let result = ""

for (const subpart of _.parts.desktop) {
 if (subpart.key === "www") continue
 result += `<desktop-icon tabIndex=${subpart.index}><img class=icon src="${subpart.render({ request: "part.png", format: "datauri" })}"/><span class=label>${subpart.title ?? "Untitled " + subpart.key}</span></desktop-icon>`
}

return result