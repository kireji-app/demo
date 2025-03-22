if (part.frameRequest) cancelAnimationFrame(part.frameRequest)
if (part.playing) part.frameRequest = requestAnimationFrame(async () => {
 if (part.state[LAYER] === part.size - part.step + BigInt(+part.playing)) await part.parent[LAYER].setLayer(LAYER, part.step, true)
 else await part.setLayer(LAYER, part.step, true)
})
const frame = part.state[LAYER] / part.step
const value = Number(frame * (BigInt(Number.MAX_SAFE_INTEGER) + 1n) / (part.size / part.step))
const fraction = value / Number.MAX_SAFE_INTEGER
console.log({ frame, host })
part.timeline.value = value
part.animatedStyleSheet.replaceSync(`
main {
 --angle: ${fraction * 360}deg;
}
#${part.playing ? 'play' : 'pause'}-button {
 display: none;
}`)