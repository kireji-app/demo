if (part.frameRequest) cancelAnimationFrame(part.frameRequest)
if (part.playing) part.frameRequest = requestAnimationFrame(() => {
 if (part.routeID === part.cardinality - part.step + BigInt(+part.playing)) part.parent.set(part.step, true)
 else part.set(part.step, true)
})
const frame = part.routeID / part.step
const value = Number(frame * (BigInt(Number.MAX_SAFE_INTEGER) + 1n) / (part.cardinality / part.step))
const fraction = value / Number.MAX_SAFE_INTEGER
debug({ frame, host })
part.timeline.value = value
part.animatedStyleSheet.replaceSync(`
main {
 --angle: ${fraction * 360}deg;
}
#${part.playing ? 'play' : 'pause'}-button {
 display: none;
}`)