declare interface IMinosGame
 extends IMix<IGlowstick, IPartAny> {

 // Subparts.
 readonly score: IMinosGameScore
 readonly board: IMinosGameBoard
 readonly pieces: IMinosGamePieces
 readonly bomb: IMinosGameBomb

 // Serialized Properties.
 /** Checks to see if the game's current state has met any of the scoring, winning or losing conditions. */
 readonly checkState(): void
}

declare const minos: IMinosGame