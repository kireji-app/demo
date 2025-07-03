const options = {
 autoplay() {
  if ("next" in clip)
   clip.next()
  else
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