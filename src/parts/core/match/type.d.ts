declare interface IMatch extends IMatchOf<IPart> {
}

declare interface IMatchOf<T> extends IPartOf<T> {
 /** A map storing the arm position offsets. */
 readonly offsets?: Map<T, bigint>
 /** The subpart which is currently chosen. */
 readonly arm?: T
}

declare const match: IMatch
declare const CHANGED_ARMS: IPart[]