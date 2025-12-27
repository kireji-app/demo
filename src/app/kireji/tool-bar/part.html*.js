return `<tool-bar>${toolBar.map((item, index) =>
 `<button onclick=self._?.noop(event) onpointerdown="${toolBar.runtimeReference}.open(${index})"${item === toolBar.arm ? " data-selected" : ""}>${item["part.svg"]}</button>`
).join("")}</tool-bar>`