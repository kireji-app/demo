inherit.styleSheet.replaceSync(read("library.css"))

const scroller = element(inherit.container, "div")
scroller.setAttribute("id", "scroller")

const promo = part[0][read("promo.uri").match(/(?<=^s*).+?(?=s*$)/gm)[0]]
if (promo) {
 const promoBanner = element(scroller, "section")
 promoBanner.setAttribute("id", "promo")

 const promoLink = element(promoBanner, "a")
 promoLink.setAttribute("href", await app.stageState(part[0], promo.offset, true))
 promoLink.innerHTML = `<img src="https://${promo.host}/promo.png" alt="Promotional banner of ${promo.niceName}"></img>`
}

const tvShows = element(scroller, "section")
const tvShowsHeader = element(tvShows, "h2")
tvShowsHeader.innerText = "TV Shows"
const tvShowTopic = element(tvShows, "div")
tvShowTopic.setAttribute("class", "topic")

const movies = element(scroller, "section")
const moviesHeader = element(movies, "h2")
moviesHeader.innerText = "Movies"
const moviesTopic = element(movies, "div")
moviesTopic.setAttribute("class", "topic")

const recents = element(scroller, "section")
const recentsHeader = element(recents, "h2")
recentsHeader.innerText = "New Releases"
const recentsTopic = element(recents, "div")
recentsTopic.setAttribute("class", "topic")

for (const title of part[0].slice(1).reverse()) {
 const titleLink = element(title.isShow ? tvShowTopic : moviesTopic, "a")
 titleLink.setAttribute("href", await app.stageState(part[0], title.offset, true))
 titleLink.innerHTML = `<figure>
 <img src="https://${title.host}/tile.png" alt="Thumbnail of ${title.niceName}"/>
 <figcaption>${title.niceName} (${title.releaseDate.slice(-4)})</figcaption>
</figure>`
 recentsTopic.appendChild(titleLink.cloneNode(true))
}