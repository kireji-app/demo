declare interface IMatch extends IPart {
 /** A map storing the arm position offsets. */
 readonly offsets?: {}
 /** The subpart which is currently chosen. */
 readonly arm?: IPart
 /** Sets the match's arm to the given index, part, or key. This sets the part's routeID, propagating it leafward and rootward and updating all views. */
 setArm(ARM: number | IPart | string): void
}
declare const match: IMatch
declare const CHANGED_ARMS: IPart[]