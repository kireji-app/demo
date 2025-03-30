declare class CorePart {
 constructor(): CorePart
 /** The framework instance which was dedicated to compiling the script of this type's class. */
 readonly static framework: Framework
 /** The framework instance, which was dedicated to compiling the script of this part's class. */
 readonly framework: Framework
 /** The domain name used to identify this part's type. */
 readonly host: string
 /** The number of routes this part has, used heavily to compute routing across the desktop. */
 readonly cardinality: bigint
 /** The child name used to identify this part on its parent. */
 readonly key: string
 /** This part's index in it's parent. */
 readonly index: number
 /** Whether or not this part has a running task */
 readonly running: boolean
 /** Whether or not this part should have a running task */
 readonly enabled: boolean
 /** Whether or not this part was enabled before the most recent route change. */
 readonly wasEnabled: boolean
 /** This current route of this part expressed as a bigint index in the virtual array of all of its routes. */
 readonly routeID: bigint
 /** This previous route of this part, changed at the last call to route-capture or route-bubble. */
 readonly previousRouteID: bigint
 /** This difference between the current routeID and the previous one. */
 readonly deltaRouteID: bigint
 /** The parent part.
  * 
  * *Note: There is no* `root.parent`. */
 readonly parent: CorePart
 /** The root part of this part's tree. */
 readonly root: CorePart
 /** The unique path to the instance from the root object. */
 readonly instancePath: string
 /** When parent type is `mix.core.parts`, a divisor which the parent mix uses to encode and decode subroutes.*/
 readonly mixedRadixPlaceValue: bigint
 render(REQUEST_URL: URL, FALLBACK: string | Response, RESULT_FORMAT: "raw" | "datauri" | "response")

 routeID: bigint

 render(): string | Response
 endTask(): void
 runTask(): void
 setParts(PARTS: object): void
 updateTask(): void
 installTask(): void
 captureTaskUpdate(): void
 captureTaskExecution(): void

 setRoute(ROUTE_ID: bigint): void
 bubbleRoute(SUBPART: CorePart[]): void
 captureRoute(ROUTE_ID: bigint): void
}

declare class Part {
 constructor(HOST, CUSTOM_STRING_COLLECTION): CorePart
}
/** The host of the currently evaluating script. */
declare const SCRIPT_HOST: string
/** A proxy for `part.parent` that assigns gotten property values directly to `part`.
 * 
 * Shorthand for `part.parent.<property> = part.<property>`.*/
/** The array of subparts whose value change is bubbling up to this part. 
* 
* *Note: Only available in `route-bubble.js`.**/
declare const SUBPARTS: string
/** The bigint which identifies the route being propagated leafward (captured).
 * 
 * *Note: Available only in `route-set.js` and `route-capture.js`.* */
declare const ROUTE_ID: bigint
/** The part instance on which the current script is being called.
 * 
 * Alias for `this` to disambiguate it from globalThis.
 * 
 * *Note: Not available in `constructor.js`*. */
declare const part: CorePart
/** The framework instance that compiled the source code for the class instance of the currently evaluated script. */
declare const framework: Framework
/** A proxy object that allows `inherit.exampleProperty` to replace `part.exampleProperty = part.parent.exampleProperty`.  */
declare const inherit: CorePart