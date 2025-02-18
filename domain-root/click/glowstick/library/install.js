this.container = this.parent.container

const
 tvShows = [],
 movies = [],
 recents = [],
 promos = Build.archive[this.uid]["promo.uri"].match(/(?<=^s*).+?(?=s*$)/gm).map(x => this[0][x])

for (const title of this[0].slice(1).reverse()) {
 (title.isShow ? tvShows : movies).push(title)
 if (recents.length < 10) recents.push(title)
}

this.container.innerHTML = `
<div id=scroller>
 <section id=promo>
  <a href=#${encode(promos[0].offset + promos[0].parent.offset + promos[0].parent.parent.offset)}>
   <img src="https://${promos[0].uid}/promo.png" alt="Promotional banner of ${promos[0].niceName}">
  </a>
 </section>
 <section>
  <h2>TV Shows</h2>
  <div class=topic>
   ${tvShows.map(title => `<a href=#${encode(title.offset + title.parent.offset + title.parent.parent.offset)}>
    <figure>
     <img src="https://${title.uid}/tile.png" alt="Thumbnail of ${title.niceName}">
     <figcaption>${title.niceName} (${title.releaseDate.slice(-4)})</figcaption>
    </figure>
   </a>`).join(`
   `)}
  </div>
 </section>
 <section>
  <h2>Movies</h2>
  <div class=topic>
   ${movies.map(title => `<a href=#${encode(title.offset + title.parent.offset + title.parent.parent.offset)}>
    <figure>
     <img src="https://${title.uid}/tile.png" alt="Thumbnail of ${title.niceName}">
     <figcaption>${title.niceName} (${title.releaseDate.slice(-4)})</figcaption>
    </figure>
   </a>`).join(`
   `)}
  </div>
 </section>
 <section>
  <h2>Recently Added</h2>
  <div class=topic>
   ${recents.map(title => `<a href=#${encode(title.offset + title.parent.offset + title.parent.parent.offset)}>
    <figure>
     <img src="https://${title.uid}/tile.png" alt="Thumbnail of ${title.niceName}">
     <figcaption>${title.niceName} (${title.releaseDate.slice(-4)})</figcaption>
    </figure>
   </a>`).join(`
   `)}
  </div>
 </section>
</div>`

this.styleSheet = this.parent.styleSheet
this.styleSheet.replaceSync(`
* {
 box-sizing: border-box;
}
:host {
 overflow: hidden;
}
#scroller {
 position: fixed;
 top: var(--toolbar-height);
 bottom: 0;
 left: 0;
 right: 0;
 overflow: hidden;
 overflow-y: auto;
 display: flex;
 flex-flow: column;
 gap: var(--spacing);
 padding: 0;
 padding-bottom: var(--spacing);
}
dialog,
#scroller > section {
 position: relative;
 flex: 0 0 auto;
 padding: 0;
 margin: 0;
}
#scroller > section {
 overflow-y: visible;
}
.topic {
 gap: var(--spacing);
 display: flex;
 padding: 0 var(--spacing);
}
#scroller > section > h2 {
 font-size: 19px;
 line-height: 19px;
 font-weight: 400;
 padding: 0 var(--spacing);
 display: flex;
}
.topic > a {
 border-radius: calc(var(--spacing) / 2);
 flex: 0 0 auto;
 overflow: hidden;
}
.topic > a > figure {
 padding: 0;
 margin: 0;
 background: #fff1;
}
.topic > a > figure > figcaption {
 padding: 6px;
 background: #0007;
 position: absolute;
 bottom: 0;
 left: 0;
 right: 0;
 pointer-events: none;
}
a, a:visited {
 color: unset;
}
.topic > a:not(:hover) > figure > figcaption {
 opacity: 0%;
}
.topic > a:hover {
 transform: scale(1.05);
 outline: 4px solid var(--color);
 outline-offset: 6px;
}
.topic > a > figure > img {
 width: 32vmin;
 height: 18vmin;
 display: block;
}
dialog {
 display: flex;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 background-color: #000a;
 width: unset;
 height: unset;
 min-width: unset;
 min-height: unset;
 padding: 0;
 margin: 0;
 justify-content: stretch;
 position: fixed;
 z-index: 1;
}
dialog > div {
 top: var(--toolbar-height);
 right: 0;
 left: 0;
 bottom: 0;
 flex: 1;
 color: var(--color);
 background: var(--bg);
 position: fixed;
 overflow: hidden;
 overflow-y: auto;
}
dialog > div > img {
 width: 100vw;
 height: calc(100vw / 16 * 9);
}
dialog > div > h3 {
 font-size: 23px;
 padding: 0 16px;
}
.cta,
.cta:visited {
 padding: 16px;
 color: var(--bg);
 background: silver;
 cursor: default;
 pointer-events: none;
 width: 100%;
 height: 100%;
 display: block;
 font-size: 18px;
 line-height: 18px;
 font-weight: 600;
 border-radius: calc(var(--spacing) / 2);
 text-decoration: none;
 text-align: center;
}
.cta.released,
.cta.released:visited {
 background: var(--theme);
 cursor: pointer;
 pointer-events: all;
}
dialog > div > p {
 position: relative;
 padding: 0 16px;
}
dialog > div > button {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 height: var(--toolbar-height);
 cursor: pointer;
 border: none;
 text-align: left;
 font-size: var(--icon-size);
 line-height: var(--icon-size);
 background: var(--bg);
 color: var(--color);
 padding: var(--spacing);
 box-shadow: var(--toolbar-accent);
}
@media (orientation: landscape) {
 dialog {
  --info-width: min(40vw, 365px);
 }
 dialog > div {
  padding-right: calc(100vw - var(--info-width));
 }
 dialog > div > a,
 dialog > div > a:visited {
  width: calc(var(--info-width) - var(--spacing) * 2);
 }
 dialog > div > img,
 dialog > div::after {
  position: absolute;
  z-index: -1;
  width: calc(100vw - var(--info-width));
  left: var(--info-width);
  top: 0;
  pointer-events: none;
  height: calc((100vw - var(--info-width)) / 16 * 9);
 }
 dialog > div::after {
  content: "";
  background: linear-gradient(to right, var(--bg), transparent 25%);
 }
}
#promo {
 width: 100vw;
 height: fit-content;
 overflow: hidden;
 position: relative;
}
#promo::after {
 content: "";
 position: absolute;
 width: 100%;
 height: 100%;
 left: 0;
 top: 0;
 pointer-events: none;
}
#promo > a,
#promo > a > img {
 display: block;
 width: 100%;
}
`)