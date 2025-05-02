declare class MixPart extends CorePart {
 /** The prototype of the mix, whose host is "core.parts". */
 readonly super: CorePart

 /** A map from mix factor to last-known place value multiplier,
  * (the value of routeID unit for the given factor)
  * where mix is viewed as a fixed-length mixed-radix string.
  * 
  * Used to speed up computation. */
 readonly placeValues: Map<CorePart, bigint>

 /** Sets the list of factors for the mix and computes place values.*/
 distributeInitializePart(PART_MANIFEST: object, CARDINALITY_CALLBACK: function): void

 /** Updates the mix's routeID and bubbles the update rootward. */
 collectRouteID(SUBPARTS: T[]): void

 /** Updates the mix's routeID and bubbles the update leafward. */
 distributeRouteID(ROUTE_ID): void
}
declare const mix: MixPart
declare class MixError extends Error { }
declare class MixCollectRouteError extends MatchError { }
declare const CHANGED_FACTORS: CorePart[]