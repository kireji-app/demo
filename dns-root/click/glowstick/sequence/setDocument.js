part.styleSheet = new CSSStyleSheet()
part.animatedStyleSheet = new CSSStyleSheet()
part.oldMain = document.querySelector("main")

part.container = document.createElement("main")
part.oldMain.replaceWith(part.container)

part.pauseButton = element(part.container, "button")
part.pauseButton.setAttribute("class", "play-pause-button")
part.pauseButton.setAttribute("id", "pause-button")
part.pauseButton.innerHTML = '⏸'
part.pauseButton.onclick = decrement

part.playButton = element(part.container, "button")
part.playButton.setAttribute("class", "play-pause-button")
part.playButton.setAttribute("id", "play-button")
part.playButton.innerHTML = '⏵'
part.playButton.onclick = increment

part.bottomToolbar = element(part.container, "footer")
part.bottomToolbar.setAttribute("id", "bottom-toolbar")

part.previousButton = element(part.bottomToolbar, "button")
part.previousButton.setAttribute("id", "previous-button")
part.previousButton.innerHTML = '⏮'

part.timeline = element(part.bottomToolbar, "input")
part.timeline.setAttribute("id", "timeline")
part.timeline.setAttribute("type", "range")
part.timeline.setAttribute("max", Number.MAX_SAFE_INTEGER)
part.timeline.setAttribute("min", 0)
part.timeline.setAttribute("step", 1)
part.timeline.setAttribute("value", 0)

part.timeline.oninput = () => {
 const frame = BigInt(parseInt(part.timeline.value)) * part.size * part.step / (BigInt(Number.MAX_SAFE_INTEGER) + 1n)
 console.log({ frame, host })
 part.setLayer(LAYER, frame * this.step + BigInt(+this.playing))
}

part.nextButton = element(part.bottomToolbar, "button")
part.nextButton.setAttribute("id", "next-button")
part.nextButton.innerHTML = '⏭'

part.styleSheet.replaceSync(read("player.css"))
part.oldThrottleDuration = app.throttleDuration
app.throttleDuration = part.oldThrottleDuration // 5000
document.adoptedStyleSheets.push(part.styleSheet, part.animatedStyleSheet)