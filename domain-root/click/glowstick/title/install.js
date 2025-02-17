this.container = this.parent.container
const releaseDate = new Date(this.releaseDate)
this.popup = element(this.container, "dialog")
this.popup.tabIndex = 0
this.popup.innerHTML = `
<div>
 <button>‹</button>
 <img src="https://${this.uid}/still.png" alt="Still image captured from ${this.niceName}">
 <h3>${this.niceName}</h3>
 <p id=release-date>${releaseDate > Date.now() ? "Coming" : "Released on"} ${releaseDate.toLocaleDateString("en-US", {
 year: 'numeric',
 month: 'long',
 day: 'numeric',
})}</p>
 <p><a href=#0 class="cta ${this.released ? "released" : "upcoming"}">${this.released ? "Watch Now" : "Coming soon"}</a>
 <p>${this.description}
</div>`

this.backButton = this.popup.querySelector("button")
this.backButton.onclick = async e => {
 await this.parent.setState(0n)
}

this.popup.focus()