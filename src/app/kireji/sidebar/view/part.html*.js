return `<toolbar->${sidebarView.map((item, index) =>
 `<button onclick="${sidebarView.runtimeReference}.open(${index})">${item["part.html"]}</button>`
).join("")}</toolbar->`