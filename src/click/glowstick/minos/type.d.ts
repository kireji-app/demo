declare interface IMinosGame
 extends IApplication<IGlowstick, IPartAny> {

 // Subparts.
 readonly board: IMinosGameBoard
 readonly bomb: IMinosGameBomb
 readonly modal: IMinosGameModal
 readonly pieces: IMinosGamePieces
 readonly score: IMinosGameScore

 // Serialized Properties.
 /** Checks to see if the game's current state has met any of the scoring, winning or losing conditions. */
 readonly checkState(): void
 /** Prevents user interaction with the game until `unlock()` is called. */
 readonly lock(): void
 /** If lock was called, enables user interaction again. */
 readonly unlock(): void

 // Runtime Properties.
 /** Whether or not the minos game is allowing interaction. */
 readonly locked: boolean

 /** Once installed, the collection of archived primitive mino instances representing potential game pieces. */
 readonly primitives?: IMinosGamePrimitives
}

declare const minos: IMinosGame

declare interface IMinosGamePrimitive {

 // Serialized Properties.
 /** The width of the bounding box of the piece. */
 readonly width: number
 /** The height of the bounding box of the piece. */
 readonly height: number
 /** The set of minos that compose the piece, with coordinates relative to the origin at the top left corner of the piece's bounding box. */
 readonly minos: IMino[]
 /** The cost of the primitive when trading. */
 readonly price: number
}

declare interface IMinosGamePrimitives {

 /** The array of all available mino primitives. */
 readonly allPrimitives: IMinosGamePrimitive[]

 /** The array of the smallest mino primitives. */
 readonly easyPrimitives: IMinosGamePrimitive[]

 /** The array of standard/medium-size mino primitives. */
 readonly normalPrimitives: IMinosGamePrimitive[]

 /** The array of large and awkwardly shaped mino primitives. */
 readonly hardPrimitives: IMinosGamePrimitive[]

 /** The mino primitive representing the bomb which clears the row and column it is placed in. */
 readonly crosshairBomb: IMinosGamePrimitive

 /** The mino primitive representing the bomb which clears all minos within a certain radius around itself. */
 readonly radialBomb: IMinosGamePrimitive
}