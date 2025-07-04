if (desktop.theme === blog) {
 document.querySelector("#post").innerHTML = date.post["article.html"]
 document.querySelector("#post-title").innerHTML = date.post.title ?? "Untitled Note"
 document.querySelector("#post-subtitle").innerHTML = date.post.subtitle ?? ""
 document.querySelector("#post-credit").innerHTML = date.post["credit.html"]
}