return `<tool-bar>${toolBar.map((item, index) =>
 `<button onpointerdown="${toolBar.runtimeReference}.point(event,this,${index})"${item === toolBar.arm ? " data-active" : ""}>${item["part.svg"]}</button>`
).join("")}</tool-bar>`