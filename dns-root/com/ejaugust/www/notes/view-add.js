// TODO: Enable multi-object inheritance so this mix.core.parts can also be a section.ejaugust.com.
if (_.application === _.com.ejaugust.www && client.hydrated) {
 const article = document.getElementById("notebook-section")
 article.innerHTML = section["article.html"]

 const stylesheet = document.getElementById("application-css")
 stylesheet.innerHTML = ejaugust["inline.css"]
}