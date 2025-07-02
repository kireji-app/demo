return `
<task-menu style="${desktop.menu.arm.styleAttr}" onclick="_.parts.desktop.menu.go()">
 <sidebar- onclick="_.noop(event)">
 <ul id=theme-control>${desktop.themes.map(themePart => {
 return `
  <li class=task-link${themePart === desktop.theme ? ` data-here` : ""}>
   <a href="https://${themePart.host}" onclick="_.parts.desktop.setTheme(event, this)">
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
  _.version,
  ...(_.branch === "main" ? [] : [_.branch]),
  ...(_.local ? ["local"] : [])
 ].map(tag => `<span>${tag}</span>`).join("")}</span>
   </span>
   ${desktop.color["control.html"]}
   ${desktop.era["control.html"]}
  </section>
 </sidebar->
</task-menu>`