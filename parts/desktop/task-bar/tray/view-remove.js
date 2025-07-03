if (part.clockTimer) {
 clearTimeout(part.clockTimer)
 clearInterval(part.clockTimer)
 delete part.clockTimer
}