const duration = OrbitalSoundtrack.beatLength / 2 * 0.78
const endTime = START_TIME + duration + 0.04
const velocity = 0.85 + Math.random() * 0.15

const envelope = Sound.context.createGain()
envelope.gain.setValueAtTime(0, START_TIME)
envelope.gain.linearRampToValueAtTime(0.2 * velocity, START_TIME + 0.012)
envelope.gain.linearRampToValueAtTime(0.09 * velocity, START_TIME + 0.09)
envelope.gain.setValueAtTime(0.09 * velocity, START_TIME + duration - 0.03)
envelope.gain.linearRampToValueAtTime(0, START_TIME + duration)

const lowPassFilter = Sound.context.createBiquadFilter()
lowPassFilter.type = 'lowpass'
lowPassFilter.frequency.value = 2100
lowPassFilter.Q.value = 1.1
lowPassFilter.connect(envelope)

const frequency = Sound.toneToFrequency(TONE)
const saw = Sound.context.createOscillator()
saw.type = 'sawtooth'
saw.frequency.value = frequency
saw.connect(lowPassFilter)
saw.start(START_TIME)
saw.stop(endTime)

const shim = Sound.context.createOscillator()
shim.type = 'triangle'
shim.frequency.value = frequency * 2

const shimGain = Sound.context.createGain()
shimGain.gain.value = 0.15
shim.connect(shimGain)
shimGain.connect(lowPassFilter)
shim.start(START_TIME)
shim.stop(endTime)

envelope.connect(OrbitalSoundtrack.dryBus)
envelope.connect(OrbitalSoundtrack.reverbIn)