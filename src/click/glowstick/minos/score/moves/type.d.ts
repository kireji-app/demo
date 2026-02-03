declare interface IMinosGameMovesCount
 extends IPart<IMinosGameScore, null> {

 // Serialized Properties.
 /** Increments the route ID of the part until it reaches the max. */
 readonly count(): void
 /** Sets the route ID of the part to 0n, if it isn't already there. */
 readonly clear(): void
}

declare const minosMoveCount: IMinosGameMovesCount