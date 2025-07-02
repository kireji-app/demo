return (
 "<header>" + (
  "<menu>" + (
   "<span class=blog-title>" + blog.title + "</span>" +
   "<flex-spacer></flex-spacer>" +
   "<a target=_blank href=https://github.com/EJAugust>GitHub</a>" +
   "<a target=_blank href=https://github.com/sponsors/EJAugust>♡ Support</a>"
  ) +
  "</menu>" +
  blog.date.arm["heading.html"] +
  blog.date.arm["credit.html"]
 ) +
 "</header>"
) + blog.date.arm["article.html"]