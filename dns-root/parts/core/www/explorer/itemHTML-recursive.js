const items = []

for (const subpart of SUBJECT) {
 const symbol = `<img src="${subpart.render({ request: "part.png", format: "datauri" })}"/>`
 const handle = subpart.length ? `<svg onclick="_.noop(event); _.parts.core.www.explorer.toggle(this)" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 2 2" class="explore-toggle"><line x1="-0.41" y1="0" x2="0.41" y2="0" stroke-width="0.2" stroke-linecap="round" />` : ""
 const label = `<span class=label>${subpart === _ ? `DNS Root (${_.version})` : subpart.key}</span>`
 const summary = `<summary onclick="_.noop(event); console.log('set the part in the window to ${subpart.host}')">${Array(DEPTH + +(subpart.length === 0)).fill('<span class="spacer"></span>').join("")}${handle}${symbol}${label}</summary>`
 items.push(`<details${subpart.length ? "" : ` class=empty`} open>${summary}${explorer[property.niceName](subpart, DEPTH + 1)}</details>`)
}

return items.join("")