declare interface IOrbitalLevels
 extends IMatch<IOrbitalGame, IOrbitalLevel> {

 // Subparts.
 readonly level: IOrbitalLevel // Abstract
 readonly test: IOrbitalLevel
}

declare const OrbitalLevels: IOrbitalLevels
type OrbitalLevels = T