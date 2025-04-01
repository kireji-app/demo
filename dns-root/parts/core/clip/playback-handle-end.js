const options = {
 autoplay() {
  clip.parent.setRoute(1n, true)
 },
 autoplayInto() {
  throw '!implemented'
 },
 loop() {
  clip.setRoute(1n, true)
 }
}

options[clip.endOfPlaybackBehavior]()