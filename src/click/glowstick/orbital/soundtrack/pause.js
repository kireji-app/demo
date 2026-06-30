clearInterval(OrbitalSoundtrack.timer)
OrbitalSoundtrack.timer = null
OrbitalSoundtrack.lfo.stop()
OrbitalSoundtrack.lfo.disconnect()
OrbitalSoundtrack.lfo = null