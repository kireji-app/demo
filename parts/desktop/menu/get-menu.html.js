return `
<task-menu style="${menu.arm.styleAttr}" onclick=menu.go()>
 <sidebar- onclick="noop(event)">
 <ul id=theme-control>${themes.map(themePart => {
 return `
  <li class=task-link${themePart === themes.arm ? ` data-here` : ""}>
   <a href="https://${themePart.host}" onclick="themes.go(event, this)">
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
  build.version,
  ...(build.branch === "main" ? [] : [build.branch]),
  ...(build.local ? ["local"] : [])
 ].map(tag => `<span>${tag}</span>`).join("")}</span>
   </span>
   ${color["control.html"]}
   ${era["control.html"]}
  </section>
 </sidebar->
</task-menu>`