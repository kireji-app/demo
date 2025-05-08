return `
<task-menu style="${menu.arm.styleAttr}">
 <sidebar- onclick="menu.noop(event)">
 <ul id=themes>${theme.map(themePart => {
 return `
  <li class=task-link${themePart === theme.arm ? ` data-here` : ""}>
   <a href="https://${themePart.host}" onclick="theme.go(event)">
    <img src="${themePart.render({ request: "theme.png", format: "datauri" })}" class=part-icon />
    <span class=label>${themePart.render("title")}</span>
   </a>
  </li>`
}).join("")}</ul>
  <hr>
  <section id="settings">
   <span id=version tabIndex=6>
    <span class="label">Version</span>
    <span id="tags">${[
  build.version,
  ...(build.branch === "main" ? [] : [build.branch]),
  ...(build.local ? ["local"] : [])
 ].map(tag => `<span>${tag}</span>`).join("")}</span>
   </span>
   <span id="color-mode" tabIndex=7 data-state="${colorMode.arm.stateData}" onclick="colorMode.setRouteID(1n, true)">
    <span id="label1" class="label">Color Mode</span>
    <span id="label2" class="label">Device Mode</span>
    <span class="base">
     <span class="handle">✱</span>
    </span>
   </span>
   <span id="era-button" tabIndex=8 data-state="${era.arm.stateData}" onclick="debug(era)">
    <span class="label">Era</span>
    <span class="base">
     <span class="handle"></span>
    </span>
   </span>
  </section>
 </sidebar->
</task-menu>`