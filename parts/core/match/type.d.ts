declare class PartMatch extends Part {
 /** A map storing the arm position offsets. */
 readonly offsets?: {}
 /** The subpart which is currently chosen. */
 readonly arm?: Part
 /** Sets the match's arm to the given index, part, or key. This sets the part's routeID, propagating it leafward and rootward and updating all views. */
 setArm(ARM: number | Part | string): void
}
declare const match: PartMatch
declare const CHANGED_ARMS: Part[]