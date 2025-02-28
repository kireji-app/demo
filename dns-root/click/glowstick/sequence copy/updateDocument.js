if (part.frameRequest) cancelAnimationFrame(part.frameRequest)
if (part.playing) part.frameRequest = requestAnimationFrame(() => {
 if (part.state[LAYER] === part.size - part.step + BigInt(+part.playing)) part.parent.increment(LAYER, part.step)
 else part.increment(LAYER, part.step)
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