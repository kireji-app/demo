declare class MatchPart extends CorePart {
 /** An object storing the arm position offsets by index and by key. */
 readonly offsets?: {}
 /** The subpart which was chosen before the last arm change. */
 readonly previousArm?: CorePart
 /** The subpart which is currently chosen. */
 readonly arm?: CorePart
}
declare const match: MatchPart