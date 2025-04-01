const options = {
 autoplay() {
  movieClip.parent.setRoute(1n, true)
 },
 autoplayInto() {
  throw '!implemented'
 },
 loop() {
  movieClip.setRoute(1n, true)
 }
}

options[movieClip.endOfPlaybackBehavior]()