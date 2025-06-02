return `
<task-menu style="${root.parts.desktop.menu.arm.styleAttr}" onclick=root.parts.desktop.menu.go()>
 <sidebar- onclick="noop(event)">
 <ul id=theme-control>${root.parts.user.themes.map(themePart => {
 return `
  <li class=task-link${themePart === root.parts.user.themes.arm ? ` data-here` : ""}>
   <a href="https://${themePart.host}" onclick="root.parts.user.themes.go(event, this)">
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