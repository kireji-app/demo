inherit.container
inherit.releaseDate
inherit.niceName
inherit.released
inherit.description

const releaseDate = new Date(part.releaseDate)
part.popup = element(part.container, "dialog")
part.popup.tabIndex = 0
part.popup.innerHTML = `
 <img src="https://${part.parent.host}/still.png!" alt="Still image captured from ${part.niceName}">
 <h3>${part.niceName}</h3>
 <p id=release-date>${releaseDate > Date.now() ? "Coming" : "Released on"} ${releaseDate.toLocaleDateString("en-US", {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
})}</p>
 <p><a id=play-btn class="cta ${part.released ? "released" : "upcoming"}">${part.released ? "Watch Now" : "Coming soon"}</a>
 <p>${part.description}`

// part.backButton = part.popup.querySelector("#back-btn")
// part.backButton.onclick = () => {
//  part.parent.parent.set(0n)
// }

part.playButton = part.popup.querySelector("#play-btn")
part.playButton.onclick = () => { /*
 if (document.documentElement.requestFullscreen)
  document.documentElement.requestFullscreen()
 else if (document.documentElement.webkitRequestFullscreen)
  document.documentElement.webkitRequestFullscreen()
 else if (document.documentElement.msRequestFullscreen)
  document.documentElement.msRequestFullscreen()*/
 part.parent.set(1n)
}

part.popup.focus()