return EJAugust.scroller.wrap(
 "<header>" + (
  `<a ${_.pointAttr()} id=notebook-title title="⌂ Home" href=${EJAugustHome.canonicalURL}>` + (
   `<h1>` + (
    `<img src="${EJAugust.placeholderImage("title.png")}" alt="${EJAugust.title}"></h1>`
   ) + `</h1>`
  ) +
  `</a>`
 ) +
 "</header>" + (
  "\n<article id=notebook-section>" + EJAugustSections["part.html"] + "\n</article>\n"
 ) +
 "<footer>" + (
  "<section id=quick-links>" + (
   `<a ${_.pointAttr()} id=footer-home href=${EJAugustHome.canonicalURL}><span class=unicode-icon>⌂</span> Home</a>` +
   `<a ${_.pointAttr()} id=footer-top href=${EJAugust.canonicalURL}><span class=unicode-icon>↑</span> Back to Top</a>`
  ) +
  "</section>" +
  `<a ${_.pointAttr()} class=external  title="Visit Site Repo" id=k-logo href="${_.gitHubRepo}#readme"><pre>${_.welcomeMessage.replace("k =", "<span id=k>k</span> =")}</pre></a>` +
  "<section id=social>" + (
   `<a ${_.pointAttr()} class=external  title="My GitHub Profile" href=https://github.com/EJAugust>${EJAugust["github.svg"]}</a>` +
   `<a ${_.pointAttr()} class=external  title="Me on LinkedIn" href=https://linkedin.com/in/kireji>${EJAugust["linkedin.svg"]}</a>` +
   `<a ${_.pointAttr()} class=external  title="♡ Sponsor Me" href=https://github.com/sponsors/EJAugust>♡</a>`
  ) +
  "</section>"
 ) +
 "</footer>"
)