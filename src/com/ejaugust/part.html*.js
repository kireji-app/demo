return scroller.wrap(
 "<header>" + (
  `<a ${_.pointAttr()} id=notebook-title title="⌂ Home" href=${home.canonicalURL}>` + (
   `<h1>` + (
    `<img src="${ejaugust.placeholderImage("title.png")}" alt="${ejaugust.title}"></h1>`
   ) + `</h1>`
  ) +
  `</a>`
 ) +
 "</header>" + (
  "\n<article id=notebook-section>" + sections["part.html"] + "\n</article>\n"
 ) +
 "<footer>" + (
  "<section id=quick-links>" + (
   `<a ${_.pointAttr()} id=footer-home href=${home.canonicalURL}><span class=unicode-icon>⌂</span> Home</a>` +
   `<a ${_.pointAttr()} id=footer-top href=${ejaugust.canonicalURL}><span class=unicode-icon>↑</span> Back to Top</a>`
  ) +
  "</section>" +
  `<a ${_.pointAttr()} class="external" title="Visit Site Repo" id=k-logo href="https://github.com/kireji-app/demo#readme"><pre>` + (
   " \n" +
   "𝑘\n" +
   " \n" +
   " \n"
  ) +
  '</pre><pre>' + (
   "   ▌ ▘     ▘▘ \n" +
   " = ▙▘▌▛▘█▌ ▌▌ \n" +
   "   ▛▖▌▌ ▙▖ ▌▌ \n" +
   "          ▙▌  \n"
  ) +
  "</pre></a>" +
  "<section id=social>" + (
   `<a ${_.pointAttr()} class="external" title="My GitHub Profile" href=https://github.com/EJAugust>${ejaugust["github.svg"]}</a>` +
   `<a ${_.pointAttr()} class="external" title="Me on LinkedIn" href=https://linkedin.com/in/kireji>${ejaugust["linkedin.svg"]}</a>` +
   `<a ${_.pointAttr()} class="external" title="♡ Sponsor Me" href=https://github.com/sponsors/EJAugust>♡</a>`
  ) +
  "</section>"
 ) +
 "</footer>"
)