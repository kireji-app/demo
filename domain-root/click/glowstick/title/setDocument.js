inherit.container
inherit.gotHome
const releaseDate = new Date(part.releaseDate)
part.popup = element(part.container, "dialog")
part.popup.tabIndex = 0
part.popup.innerHTML = `<div>
 <a id=back-btn>‹</a>
 <img src="https://${part.host}/still.png" alt="Still image captured from ${part.niceName}">
 <h3>${part.niceName}</h3>
 <p id=release-date>${releaseDate > Date.now() ? "Coming" : "Released on"} ${releaseDate.toLocaleDateString("en-US", {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
})}</p>
 <p><a href=#${0} class="cta ${part.released ? "released" : "upcoming"}">${part.released ? "Watch Now" : "Coming soon"}</a>
 <p>${part.description}
</div>`

part.backButton = part.popup.querySelector("#back-btn")
app.listen(part.id, async () => {
 part.backButton.setAttribute("href", await app.stageState(part.parent, 0n, true))
})

part.popup.focus()