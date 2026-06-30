define(OrbitalSoundtrack, {
 cardinality: {
  value: 120n * 16n
 },
 reverbIn: {
  value: null,
  writable: true
 },
 dryBus: {
  value: null,
  writable: true
 },
 padFilter: {
  value: null,
  writable: true
 },
 lfoGain: {
  value: null,
  writable: true
 },
 beatLength: {
  resolve() {
   return 60 / this.manifest.bpm
  }
 },
 timer: {
  value: null,
  writable: true
 },
 lfo: {
  value: null,
  writable: true
 }
})