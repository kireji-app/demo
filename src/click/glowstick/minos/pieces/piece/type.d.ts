declare interface IMinosGamePiece
 extends IPart<IMinosGamePieces, null>,
 IWebComponent,
 IMinosGamePiecePrimitive {

 // Serialized Properties.
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void
 /** Scans the game board and caches the set of tiles where the piece can be placed. */
 readonly recompute(): void
 /** Places this piece at the given X and Y coordinates of the game board. */
 readonly place(X: number, Y: number): void
 /** Randomly changes this piece to a different piece, setting its route ID which in turn recomputes its placeability. */
 readonly randomize(): void

 // Runtime Properties.
 /** The cached array of tiles where the piece can be placed. */
 readonly allowedTiles: Set<IMino>
 /** The array of all available mino primitives. */
 readonly allPrimitives: IMinosGamePiecePrimitive[]
 readonly easyPrimitives: IMinosGamePiecePrimitive[]
 readonly normalPrimitives: IMinosGamePiecePrimitive[]
 readonly hardPrimitives: IMinosGamePiecePrimitive[]
 readonly crosshairBomb: IMinosGamePiecePrimitive
 readonly radialBomb: IMinosGamePiecePrimitive
 readonly easyCardinality: bigint
 readonly normalCardinality: bigint
 readonly hardCardinality: bigint
 readonly bombCardinality: bigint
 /** The currently assigned primitive, as determined by the current route ID. */
 readonly primitive: IMinosGamePiecePrimitive
}

declare const minosPiece: IMinosGamePiece

declare interface IMinosGamePiecePrimitive {

 // Serialized Properties.
 /** The width of the bounding box of the piece. */
 readonly width: number
 /** The height of the bounding box of the piece. */
 readonly height: number
 /** The set of minos that compose the piece, with coordinates relative to the origin at the top left corner of the piece's bounding box. */
 readonly minos: IMino[]
}