const src = coreTheme.render({ request: "theme.png", format: "datauri" })

return coreTheme.requestedHost === coreTheme.host ?

 `<h1>` + (
  `alpha`
 ) +
 `</h1>` +

 `<h2>` + (
  `<img class=part-icon src="${src}">` +
  `<span class=thin>` + (
   `core.parts`
  ) +
  `</span> is in alpha.`
 ) +
 `</h2>` +

 `<p>` + (
  `This app is still under construction.<br>` +
  `<br>` +

  `It lets you inspect the data model of my platform in every state of every app (including itself up to 10 levels of recursion).`
 ) + `</p>`

 :

 `<h1>` + (
  `alpha`
 ) +
 `</h1>` +

 `<h2>` + (
  `<img class=part-icon src="${src}">` +
  `<span class=thin>` + (
   `core.parts`
  ) +
  `</span> is in alpha.`
 ) +
 `</h2>` +

 `<p>` + (
  `This app is still under construction.<br>` +
  `<br>` +

  `It lets you inspect the data model of my platform in every state of every app (including itself up to 10 levels of recursion).`
 ) + `</p>`

/*
 `<h1>` + (
  `503`
 ) +
 `</h1>` +

 `<div class=float>` + (

  `<h2>` + (
   `<img class=part-icon src="${src}">` +
   `<span class=thin>` + (
    coreTheme.requestedHost
   ) +
   `</span> isn't in the library.`
  ) +
  `</h2>` +

  `<p>` + (
   `It might be under construction or in maintenance.`
  ) + `</p>` +

  `<p>` + (
   `You may select a theme from the library below.`
  ) +
  `</p>` +

  `<ol>` + (theme.map(subpart =>
   `<li>` + (
    `<a href="https://${subpart.host}" onclick="theme.go(event)">` + (
     `${subpart.title} (${subpart.host})`
    ) +
    `</a>`
   ) +
   `</li>`
  ).join("")) +
  `</ol>`

 ) +
 `</div>`*/