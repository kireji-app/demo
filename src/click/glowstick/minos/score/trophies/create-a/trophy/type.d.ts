declare interface IMinosGameShapeTrophy
 extends IMinosGameBooleanTrophy {

 // Serialized Properties.
 /** Examines the current board and returns true of the shape on the board matches the goal shape. */
 readonly examine(): boolean

 // Runtime Properties.
 /** A Bigint representing the exact number of active tiles that make up the shape. */
 readonly size: bigint
 /** The bigint mask of the shape, if it were positioned at {0,0}, encoded with the same width as the board itself. */
 readonly mask: bigint
 /** The width of the bounding box of the shape. */
 readonly width: bigint
 /** The height of the bounding box of the shape. */
 readonly height: bigint
}

declare const minosShapeTrophy: IMinosGameShapeTrophy