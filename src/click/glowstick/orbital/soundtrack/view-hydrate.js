OrbitalSoundtrack.reverbIn = Sound.reverb()
OrbitalSoundtrack.dryBus = Sound.context.createGain()
OrbitalSoundtrack.dryBus.gain.value = 0.55
OrbitalSoundtrack.dryBus.connect(Sound.output)
OrbitalSoundtrack.padFilter = Sound.context.createBiquadFilter()
OrbitalSoundtrack.padFilter.type = 'lowpass'
OrbitalSoundtrack.padFilter.frequency.value = 850
OrbitalSoundtrack.padFilter.Q.value = 0.45
OrbitalSoundtrack.padFilter.connect(OrbitalSoundtrack.dryBus)
OrbitalSoundtrack.padFilter.connect(OrbitalSoundtrack.reverbIn)
OrbitalSoundtrack.lfoGain = Sound.context.createGain()
OrbitalSoundtrack.lfoGain.gain.value = 260
OrbitalSoundtrack.lfoGain.connect(OrbitalSoundtrack.padFilter.frequency)