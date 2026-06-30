OrbitalSoundtrack.lfo = Sound.context.createOscillator()
OrbitalSoundtrack.lfo.frequency.value = 0.12
OrbitalSoundtrack.lfo.connect(OrbitalSoundtrack.lfoGain)
OrbitalSoundtrack.lfo.start()

let nextTime = Sound.now + 0.12
OrbitalSoundtrack.timer = setInterval(() => {
 const until = Sound.now + 0.15
 while (nextTime < until) {

  const chord = OrbitalSoundtrack.measure.chord

  if (OrbitalSoundtrack.eighth.rid === 0n) {
   OrbitalSoundtrack.playPad(chord.pad, nextTime)
   OrbitalSoundtrack.playBass(chord.bass, nextTime, 1.8)
  }

  if (OrbitalSoundtrack.eighth.rid === 4n)
   OrbitalSoundtrack.playBass(chord.bass, nextTime, 1.4)

  OrbitalSoundtrack.playArpeggio(chord.arp[OrbitalSoundtrack.eighth.rid], nextTime)

  nextTime += OrbitalSoundtrack.beatLength / 2

  // TODO: Simply add one to the soundtrack itself, once the part order is right.
  OrbitalSoundtrack.eighth.setRID(1n, true)
  if (OrbitalSoundtrack.eighth.rid === 0n)
   OrbitalSoundtrack.measure.setRID(1n, true)
 }
}, 25)