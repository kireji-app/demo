declare interface IMinosGame
 extends IApp<IGlowstickGame, IPartAny> {

 // Subparts.
 readonly board: IMinosGameBoard
 readonly bomb: IMinosGameBomb
 readonly modal: IMinosGameModal
 readonly minoes: IMinosGameMinoes
 readonly score: IMinosGameScore

 // Components.
 /** Checks to see if the game's current state has met any of the scoring, winning or losing conditions. */
 readonly checkState(): void
 /** Prevents user interaction with the game until `unlock()` is called. */
 readonly lock(): void
 /** If lock was called, enables user interaction again. */
 readonly unlock(): void

 // Properties.
 /** Whether or not the Minos game is allowing interaction. */
 readonly locked: boolean

 /** Once installed, the collection of archived mino primitives representing user-placeable game minoes. */
 readonly primitives?: IMinosGamePrimitives
}

declare const MinosGame: IMinosGame
type MinosGame = T

declare interface IMinosGamePrimitive {

 // Components.
 /** The width of the bounding box of the mino. */
 readonly width: number
 /** The height of the bounding box of the mino. */
 readonly height: number
 /** The set of tiles that compose the mino, with coordinates relative to the origin at the top left corner of the mino's bounding box. */
 readonly tiles: IVector2[]
 /** The cost of the primitive when trading. */
 readonly price: number
}

declare interface IMinosGamePrimitives {

 /** The array of all available mino primitives. */
 readonly allPrimitives: IMinosGamePrimitive[]

 /** The array of the smallest mino primitives. */
 readonly easyPrimitives: IMinosGamePrimitive[]

 /** The array of medium-size mino primitives. */
 readonly mediumPrimitives: IMinosGamePrimitive[]

 /** The array of standard-size mino primitives. */
 readonly normalPrimitives: IMinosGamePrimitive[]

 /** The array of large and awkwardly shaped mino primitives. */
 readonly hardPrimitives: IMinosGamePrimitive[]

 /** The mino primitive representing the bomb which clears the row and column it is placed in. */
 readonly crosshairBomb: IMinosGamePrimitive

 /** The mino primitive representing the bomb which clears all tiles within a certain radius around itself. */
 readonly radialBomb: IMinosGamePrimitive

 /** The cardinality offset for each subtype of primitive. */
 readonly ranges: {
  readonly easy: IMinosGamePrimitiveRange
  readonly medium: IMinosGamePrimitiveRange
  readonly normal: IMinosGamePrimitiveRange
  readonly hard: IMinosGamePrimitiveRange
  readonly bomb: IMinosGamePrimitiveRange
 }
}

declare interface IMinosGamePrimitiveRange {
 readonly cardinality: bigint
 readonly offset: bigint
}