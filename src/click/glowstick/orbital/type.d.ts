declare interface IOrbitalGame
 extends IGLTFGame<IGlowstickGame> {

 // Subparts.
 readonly soundtrack: IOrbitalSoundtrack
}

declare const OrbitalGame: IOrbitalGame
type OrbitalGame = T