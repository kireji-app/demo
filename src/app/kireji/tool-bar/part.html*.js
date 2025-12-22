return `<tool-bar>${toolBar.map((item, index) =>
 `<button onclick="${toolBar.runtimeReference}.open(${index})"${item === toolBar.arm ? " data-selected" : ""}>${item["part.svg"]}</button>`
).join("")}</tool-bar>`