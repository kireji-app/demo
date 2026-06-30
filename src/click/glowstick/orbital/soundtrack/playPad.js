const attack = 0.75
const volume = 0.13
const release = 0.9
const endTime = START_TIME + OrbitalSoundtrack.beatLength * 4 + release

const envelope = Sound.context.createGain()
envelope.gain.setValueAtTime(0, START_TIME)
envelope.gain.linearRampToValueAtTime(volume, START_TIME + attack)
envelope.gain.setValueAtTime(volume, START_TIME + OrbitalSoundtrack.beatLength * 4 - release)
envelope.gain.linearRampToValueAtTime(0, endTime)
envelope.connect(OrbitalSoundtrack.padFilter)

const configs = [['sine', 0], ['triangle', 10], ['sine', -10]]
for (const tone of TONES) {
 const frequency = Sound.toneToFrequency(tone)
 for (let ci = 0; ci < configs.length; ci++) {
  const oscillator = Sound.context.createOscillator()
  oscillator.type = configs[ci][0]
  oscillator.frequency.value = frequency
  oscillator.detune.value = configs[ci][1]
  oscillator.connect(envelope)
  oscillator.start(START_TIME)
  oscillator.stop(endTime + 0.1)
 }
}