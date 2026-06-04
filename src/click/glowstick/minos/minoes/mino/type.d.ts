declare interface IMinosGameMino
 extends IPart<IMinosGameMinoes, null>,
 IWebView,
 IMinosGamePrimitive {

 // Components.
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void
 /** Scans the game board and caches the set of tiles where the mino can be placed. */
 readonly recompute(): void
 /** Places the mino at the given point on the game board. */
 readonly place(POINT: IVector2): void
 /** Randomly changes the mino to a different primitive, setting its RID which in turn recomputes its placeability. */
 readonly randomize(): void

 // Properties.
 /** The cached array of board tiles where the mino can be placed. */
 readonly allowedTiles: Set<IVector2>
 /** The currently assigned primitive, as determined by the current RID. */
 readonly primitive: IMinosGamePrimitive
}

declare const thisMinosMino: IMinosGameMino

declare interface IMinosGameMinoPointerConfig
 extends IPointerConfig {
 /** The display details in pixels of the game board at the moment the pointer was pressed. */
 readonly boardSize: IMinosGameBoardClientSize,
 /** The style string defining the width and height of TARGET_ELEMENT, measured in tiles. */
 readonly itemStyle: string,
 /** The display details in pixels of TARGET_ELEMENT. */
 readonly itemSize: DOMRect,
 /** An HTML element created and added to the game board to visualize the drop position of the mino. */
 readonly dropMarker: HTMLElement,
 /** If defined, the valid drop position of the dragged mino, measured in tiles. */
 readonly dropPosition?: IVector2
}