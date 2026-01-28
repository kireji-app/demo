return `
<task-menu ${menu.pointAttr()} style="${menu.arm.styleAttr}">
 <task-sidebar ${menu.pointAttr()}>
 <ul id=application-control>${Object.entries(_.menuApplications).map(([host, application]) => {
 const isCurrentApplication = application === _.application
 return `
  <li class=task-link${isCurrentApplication ? ` data-here` : ""}>
   <a ${isCurrentApplication ? "" : _.pointAttr()} href=https://${host}>
    <img src="${application.placeholderImage("part.png")}" class=part-icon />
    <span class=label>${application.titleMenu ?? application.title}</span>
   </a>
  </li>`
}).join("")}</ul>
  <hr>
  <section id="settings">
   ${update["part.html"]}
   ${color["part.html"]}
   ${era["part.html"]}
  </section>
 </task-sidebar>
</task-menu>`