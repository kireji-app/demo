declare class MatchPart extends CorePart {
 /** The prototype of the match, whose host is "core.parts". */
 readonly super: CorePart
 /** An object storing the arm position offsets by index and by key. */
 readonly offsets?: {}
 /** The subpart which is currently chosen. */
 readonly arm?: CorePart
 /** Sets the part's factory settings, subparts and cardinality.
  * 
  * For each subpart in the manifest, the cardinality callback will receive the precomputed match cardinality and must return a cardinality to assign to the match. */
 distributeInitializePart(PART_MANIFEST: object, CARDINALITY_CALLBACK: Function): void
}
declare const match: MatchPart
declare class MatchError extends Error { }
declare class MatchCollectRouteError extends MatchError { }
declare const CHANGED_ARMS: CorePart[]