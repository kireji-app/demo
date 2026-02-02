declare interface IMinosGameBoard
 extends IPart<IMinosGame, null>,
 IWebComponent {

 // Serialized Properties.
 /** The width (and height) of the square game board. */
 readonly width: number
 /** *Client-only*
  * 
  * The client pixel information of the board. */
 readonly clientSize: IMinosGameBoardClientSize
 readonly scramble(): void

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
 /** The board's HTML element. */
 readonly element: HTMLElement
}

declare interface IMinosGameBoardClientSize {
 readonly left: number
 readonly top: number
 readonly tileSize: number
}

declare interface IMino {
 readonly x: number,
 readonly y: number
}

declare const minosBoard: IMinosGameBoard