return `
<task-menu style="${desktop.menu.arm.styleAttr}" onclick=desktop.menu.go()>
 <sidebar- onclick="noop(event)">
 <ul id=theme-control>${desktop.themes.map(themePart => {
 return `
  <li class=task-link${themePart === desktop.theme ? ` data-here` : ""}>
   <a href="https://${themePart.host}" onclick="root.setTheme(event, this)">
    <img src="${themePart.render({ request: "theme.png", format: "datauri" })}" class=part-icon />
    <span class=label>${themePart.render("title")}</span>
   </a>
  </li>`
}).join("")}</ul>
  <hr>
  <section id="settings">
   <span id=version tabIndex=6>
    <span class="label">Version:</span>
    <span id="tags">${[
  root.version,
  ...(root.branch === "main" ? [] : [root.branch]),
  ...(root.local ? ["local"] : [])
 ].map(tag => `<span>${tag}</span>`).join("")}</span>
   </span>
   ${color["control.html"]}
   ${era["control.html"]}
  </section>
 </sidebar->
</task-menu>`