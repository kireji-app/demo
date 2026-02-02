declare interface IMinosGamePiece
 extends IPart<IMinosGamePieces, null>,
 IWebComponent,
 IMinosGamePrimitive,
 IMinosGamePrimitives {

 // Serialized Properties.
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void
 /** Scans the game board and caches the set of tiles where the piece can be placed. */
 readonly recompute(): void
 /** Places the piece at the given X and Y coordinates of the game board. */
 readonly place(X: number, Y: number): void
 /** Randomly changes the piece to a different piece, setting its route ID which in turn recomputes its placeability. */
 readonly randomize(): void

 // Runtime Properties.
 /** The cached array of tiles where the piece can be placed. */
 readonly allowedTiles: Set<IMino>
 readonly easyCardinality: bigint
 readonly normalCardinality: bigint
 readonly hardCardinality: bigint
 readonly bombCardinality: bigint
 /** The currently assigned primitive, as determined by the current route ID. */
 readonly primitive: IMinosGamePrimitive
}

declare const minosPiece: IMinosGamePiece

declare interface IMinosGamePiecePointerConfig
 extends IPointerConfig {
 /** The display details in pixels of the game board at the moment the pointer was pressed. */
 readonly boardSize: IMinosGameBoardClientSize,
 /** The style string defining the width and height of TARGET_ELEMENT, measured in minos. */
 readonly itemStyle: string,
 /** The display details in pixels of TARGET_ELEMENT. */
 readonly itemSize: DOMRect,
 /** An HTML element created and added to the game board to visualize the drop position of the game piece. */
 readonly dropMarker: HTMLElement,
 /** If defined, the valid drop position of the dragged game piece, measured in minos. */
 readonly dropPosition?: { x: number, y: number },
 /** The bounding rectangle of the drop zone where pieces can be traded for other pieces. */
 readonly tradeZone: DOMRect
 /** If true, a piece is currently being held over the drop zone. */
 readonly trade: boolean
}