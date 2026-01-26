declare interface IMinosGameBoard
 extends IPart<IMinosGame, null>,
 IWebComponent {

 // Serialized Properties.
 /** The width (and height) of the square game board. */
 readonly width: number

 // Runtime Properties.
 /** An array of coordinate objects relating each tile index to its coordinates. */
 readonly allTiles: IMino[]
 /** The total number of tiles on the game board. */
 readonly tileCount: number
 /** The set of active tile indices. */
 readonly activeTiles: Set<IMino>
 /** *Client only*
  * 
  * The set of tile indices already rendered on the screen. */
 readonly viewedTiles: Set<IMino>
 readonly filledColumns: Set<number>
 readonly filledRows: Set<number>
}

declare type IMino = {
 readonly x: number,
 readonly y: number
}

declare const minosBoard: IMinosGameBoard