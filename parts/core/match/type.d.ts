declare class PartMatch extends Part {
 /** An object storing the arm position offsets by index and by key. */
 readonly offsets?: {}
 /** The subpart which is currently chosen. */
 readonly arm?: Part
 /** Sets the part's factory settings, subparts and cardinality.
  * 
  * For each subpart in the manifest, the cardinality callback will receive the precomputed match cardinality and must return a cardinality to assign to the match. */
 distributeInitializePart(PART_MANIFEST: object, CARDINALITY_CALLBACK: Function): void
 /** Sets the match's arm to the given index, part, or key. This sets the part's routeID, propagating it leafward and rootward and updating all views. */
 setArm(ARM: number | Part | string): void
}
declare const match: PartMatch
declare const CHANGED_ARMS: Part[]