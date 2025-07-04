return (
 "<header>" + (
  "<menu>" + (
   "<span class=blog-title>" + (blog.title ?? "Untitled Note") + "</span>" +
   "<flex-spacer></flex-spacer>" +
   "<a target=_blank href=https://github.com/EJAugust>GitHub</a>" +
   "<a target=_blank href=https://github.com/sponsors/EJAugust>♡ Support</a>"
  ) +
  "</menu>" +
  date.post["heading.html"] +
  `<p id=post-credit>${date.post["credit.html"]}</p>`
 ) +
 "</header>"
) + `<article id=post>${date.post["article.html"]}</article><section id=dates><h2>Archive:</h2>${date.dates.map((post, i) => `<a onclick=_.com.ejaugust.date.go(${i})>${post.title}</a>`).join("")}</section>`