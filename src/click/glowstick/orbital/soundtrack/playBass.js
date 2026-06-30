const duration = OrbitalSoundtrack.beatLength * BEATS
const endTime = START_TIME + duration + 0.28

const envelope = Sound.context.createGain()
envelope.gain.setValueAtTime(0, START_TIME)
envelope.gain.linearRampToValueAtTime(0.52, START_TIME + 0.03)
envelope.gain.setValueAtTime(0.52, START_TIME + duration - 0.2)
envelope.gain.linearRampToValueAtTime(0, endTime)
envelope.connect(OrbitalSoundtrack.dryBus)

const lowPassFilter = Sound.context.createBiquadFilter()
lowPassFilter.type = 'lowpass'
lowPassFilter.frequency.value = 230
lowPassFilter.Q.value = 0.6
lowPassFilter.connect(envelope)

const oscillator = Sound.context.createOscillator()
oscillator.type = 'sine'
oscillator.frequency.value = Sound.toneToFrequency(TONE)
oscillator.connect(lowPassFilter)
oscillator.start(START_TIME)
oscillator.stop(endTime + 0.05)