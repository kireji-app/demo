return `<tool-bar>${toolBar.map((item, index) =>
 `<button ${toolBar.pointAttr("point", index)}${item === toolBar.arm ? " data-active" : ""}>${item["part.svg"]}</button>`
).join("")}</tool-bar>`