declare interface IMinosGameMovesCount
 extends IPart<IMinosGameScore, null> {

 // Components.
 /** Increments the RID of the part until it reaches the max. */
 readonly count(): void
 /** Sets the RID of the part to 0n, if it isn't already there. */
 readonly clear(): void
}

declare const MinosMovesCount: IMinosGameMovesCount
type MinosMovesCount = T