declare class PartMatch extends PartCore {
 /** The prototype of the match, whose host is "core.parts". */
 readonly super: PartCore
 /** An object storing the arm position offsets by index and by key. */
 readonly offsets?: {}
 /** The subpart which is currently chosen. */
 readonly arm?: PartCore
 /** Sets the part's factory settings, subparts and cardinality.
  * 
  * For each subpart in the manifest, the cardinality callback will receive the precomputed match cardinality and must return a cardinality to assign to the match. */
 distributeInitializePart(PART_MANIFEST: object, CARDINALITY_CALLBACK: Function): void
 /** Sets the match's arm to the given index, part, or key. This sets the part's routeID, propagating it leafward and rootward and updating all views. */
 setArm(ARM: number | PartCore | string): void
}
declare const match: PartMatch
declare class MatchError extends Error { }
declare class MatchCollectRouteError extends MatchError { }
declare const CHANGED_ARMS: PartCore[]