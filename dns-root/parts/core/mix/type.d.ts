declare class MixPart extends CorePart {

 /** A map from mix factor to last-known place value multiplier,
  * (the value of routeID unit for the given factor)
  * where mix is viewed as a fixed-length mixed-radix string.
  * 
  * Used to speed up computation. */
 readonly placeValues: Map<CorePart, bigint>

 /** A map from mix factor to last known routeID.
  *  Used to speed up computation when a change occurs. */
 readonly cache: Map<CorePart, bigint>

 /** Sets the list of factors for the mix, which sets the length and placeValues and
  * using only those subparts for leafward distributing and
  * collecting calls. */
 readonly setParts(PARTS: object): void

 /** Updates the mix's routeID and bubbles the update rootward. */
 readonly collectRoute(PARTS: CorePart[]): void

 /** Updates the mix's routeID and bubbles the update leafward. */
 readonly distributeRoute(ROUTE_ID): void

 /** Updates the mix's routeID and bubbles the update leafward. */
 readonly distributeViewPopulate(ROUTE_ID): void

 /** */
 readonly removeView(): void
}
declare const mix: MixPart