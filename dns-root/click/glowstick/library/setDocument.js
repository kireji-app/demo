inherit.styleSheet.replaceSync(read("library.css"))

const scroller = element(inherit.container, "div")
scroller.setAttribute("id", "scroller")

const promo = part.nowPlaying[read("promo.txt").split(" ")[0]]
if (promo) {
 const promoBanner = element(scroller, "section")
 promoBanner.setAttribute("id", "promo")

 const promoLink = element(promoBanner, "button")
 promoLink.onclick = () => part.nowPlaying.setLayer(LAYER, promo.offset)
 promoLink.innerHTML = `<img src="https://${promo.host}${Framework.version}promo.png" alt="Promotional banner of ${promo.niceName}"></img>`
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

for (const title of part.nowPlaying.slice(1).reverse()) {
 const titleLink = element(title.isShow ? tvShowTopic : moviesTopic, "button")
 titleLink.onclick = () => part.nowPlaying.setLayer(LAYER, title.offset)
 titleLink.innerHTML = `<figure>
 <img src="https://${title.host}${Framework.version}tile.png" alt="Thumbnail of ${title.niceName}"/>
 <figcaption>${title.niceName} (${title.releaseDate.slice(-4)})</figcaption>
</figure>`
 if (true/* is recent */) {
  const titleLink = element(recentsTopic, "button")
  titleLink.onclick = () => part.nowPlaying.setLayer(LAYER, title.offset)
  titleLink.innerHTML = `<figure>
 <img src="https://${title.host}${Framework.version}tile.png" alt="Thumbnail of ${title.niceName}"/>
 <figcaption>${title.niceName} (${title.releaseDate.slice(-4)})</figcaption>
</figure>`
 }
}