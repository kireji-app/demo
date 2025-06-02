const options = {
 autoplay() {
  clip[".."].setRouteID(1n, true)
 },
 autoplayInto() {
  throw '!implemented'
 },
 loop() {
  clip.setRouteID(1n, true)
 }
}

options[clip.endOfPlaybackBehavior]()