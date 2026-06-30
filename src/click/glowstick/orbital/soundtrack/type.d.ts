declare interface IOrbitalSoundtrack
 extends IMix<IOrbitalGame, IPartAny> {

 // Subparts.
 /** The current measure of the song. */
 readonly measure: IPartAny & {
  readonly chord: IOrbitalSoundtrackChord
 }
 /** The current eighth note of the current measure. */
 readonly eighth: IPartAny

 // Components.
 readonly pause(): void
 readonly play(): void
 readonly playArpeggio(TONES, START_TIME): void
 readonly playBass(TONE, START_TIME, BEATS): void
 readonly playPad(TONE, START_TIME): void

 // Properties.
 readonly manifest: IOrbitalSoundtrackManifest
 readonly reverbIn?: ConvolverNode
 readonly dryBus?: GainNode
 readonly padFilter?: BiquadFilterNode
 readonly lfoGain?: GainNode
 readonly beatLength: number
 readonly timer?: number
 readonly lfo?: OscillatorNode
}

declare interface IOrbitalSoundtrackManifest
 extends IPartManifest {

 readonly chords: IOrbitalSoundtrackChord[]
 readonly bpm: number
}

interface IOrbitalSoundtrackChord {
 readonly bass: number
 readonly pad: number[]
 readonly arp: number[]
}

declare const OrbitalSoundtrack: IOrbitalSoundtrack
type OrbitalSoundtrack = T