declare class CorePart extends Iterable<CorePart> {
 constructor(): CorePart
 [Symbol.iterator](): IterableIterator<CorePart>
 /** Returns the subparts that meet the condition provided by FILTER_FUNCTION.  */
 filter(FILTER_FUNCTION: Function): CorePart[]
 /** Returns a boolean indicating whether or not the part includes the given SUBPART.  */
 includes(SUBPART: CorePart): boolean
 /** The framework instance which was dedicated to compiling the script defining the part's type. */
 readonly static framework: Framework
 /** The framework instance, which was dedicated to compiling the script of the part's class. */
 readonly framework: Framework
 /** The domain name used to identify the part's type. */
 readonly host: string
 /** The number of routes the part has, used heavily to compute routing across the desktop. */
 readonly cardinality: bigint
 /** The child name used to identify the part on its parent. */
 readonly key: string
 /** The part's index in it's parent. */
 readonly index: number
 /** The number of subparts the part has. */
 readonly length: number
 /** The object in the part's prototype chain that owns its base class methods. */
 readonly super: CorePart
 /** Whether or not the part has a running task */
 readonly running: boolean
 /** Whether or not the part has a routeID greater than `-1n`. */
 readonly enabled: boolean
 /** Whether or not the part has a routeID equal to `-1n`. */
 readonly disabled: boolean
 /** Whether or not the part was enabled before the most recent route change. */
 readonly wasEnabled: boolean
 /** Whether or not the part just became enabled at the most recent route change.
  * 
  * Equal to:
  * ```
  * part.enabled && !part.wasEnabled
  * ```*/
 readonly justEnabled: boolean
 /** Whether or not the part just became disabled at the most recent route change.
  * 
  * Equal to:
  * ```
  * !part.enabled && part.wasEnabled
  * ```*/
 readonly justDisabled: boolean
 /** The current route of the part expressed as a bigint index in the virtual array of all of its routes. */
 readonly routeID: bigint
 /** The previous route of the part, changed at the last call to route-distribute or route-collect. */
 readonly previousRouteID: bigint
 /** The difference between the current routeID and the previous one. */
 readonly deltaRouteID: bigint
 /** The parent part.
  * 
  * *Note: There is no* `desktop.parent`. */
 readonly parent: CorePart
 /** Generate a named string or fetch it from the static cache.
  * 
  * String names are treated like their file extension. For binary file types (like .png)
   * the "value" format will return a base64 encoded string and the "response" and "datauri"
   * formats will return a file or file literal with the corresponding content-type.*/
 render(REQUEST: string | {
  /** The name of the string to render, which can include URI parameters, such as
   * ```
   * "icon.png?size=64"
   * ``` */
  request: string,
  /** Whether or not to treat `*.uri` files as literal files ("no-follow"), or shortcut links ("follow-once" and "follow-all").
   * 
   * The default is "follow-all".
   */
  links?: "no-follow" | "follow-once" | "follow-all"
  /** How to package the rendered value. All values are converted to string before becoming a datauri or response.
   * 
   * The default is "value".
  */
  format?: "value" | "datauri" | "response",
  /** A fallback value. This fallback value will be returned exactly as
   * is if there was no render endpoint for the given string name. If the
   * render function returns a nullish value, the nullish value will be returned
   * instead of this value.  */
  fallback?: string | Response
 }): any | string | Response
 /** Sets the part's factory settings, subparts and cardinality. */
 distributeInitializePart(PART_MANIFEST: object, CARDINALITY_CALLBACK: Function): void
 /** Sets the part's routeID, propagating it leafward and rootward and updating all views. */
 setRoute(ROUTE_ID: bigint): void
 /** Sets the match's arm to the given index, part, or key. This sets the part's routeID, propagating it leafward and rootward and updating all views. */
 setArm(ARM: number | CorePart | string): void
 /** Recomputes and then updates the part's routeID in response to a change in the the given subparts' routeIDs.
  * 
  * If the part has a parent, it calls collectRoute on that parent, passing the signal rootward.*/
 collectRoute(SUBPARTS: CorePart[]): void
 /** Updates the part's routeID to ROUTE_ID and then recomputes all subpart routeIDs to match.
  * 
  * For any active subparts, it calls distributeRoute on them, passing the signal leafward.
  * 
  * To avoid redistributing the same route, **check for route ID changes *before* calling distributeRoute**. */
 distributeRoute(ROUTE_ID: bigint): void
 /** If ROUTE_ID is in the part's range, sets the part to that routeID while caching information about
  * the previous routeID. Otherwise, throws an error.
  * 
  * This method is called by both collectRoute and distributeRoute.
  * It does not propagate the routeID or update any views. */
 updateRoute(ROUTE_ID: bigint): void
 /** Adds all view elements, properties, and references which the part needs to have in *all* of it's routes. */
 addView(): void
 /** An updating function which runs *every time* the route of a part changes to something other than `-1n`. */
 populateView(): void
 /** Removes all view elements, properties and references that were added in either `addView` or `populateView`. */
 removeView(): void
 /** If the part was just enabled, calls addView then calls collectAddView on any parent, passing the signal rootward.*/
 collectAddView(): void
 /** Whether the part is enabled or not, calls collectPopulateView on any parent, passing the signal rootward.
  * 
  * Then, if the part is enabled, calls populateView.*/
 collectPopulateView(): void
 /** If the part was just disabled, calls removeView and then calls collectRemoveView on any parent, passing the signal rootward.*/
 collectRemoveView(): void
 /** If the part just became enabled, calls addView and then calls distributeAddView on all subparts, passing the signal leafward.*/
 distributeAddView(): void
 /** If the part is enabled, calls populateView on it and then calls distributePopulateView on all subparts, passing the signal leafward.*/
 distributePopulateView(): void
 /** If the part was enabled, calls distributeRemoveView on any subparts that were also enabled, passing the signal leafward.
  * Then, if the part is no longer enabled, calls removeView on itself.*/
 distributeRemoveView(): void
 /** Resolves an implicit domain name from the part's host and KEY.
  * @param KEY - A string representing a valid JavaScript identifier.
  * 
  * For example, if the part's host is `part.example.com`, then:
  * ```
  *  part.resolveImplicitHost("someKey") === "some-key.part.example.com"
  * ```*/
 resolveImplicitHost(KEY: string): string
}
declare class PartError extends Error { }
/** The part instance on which the current script is being called.
 * 
 * Alias for `this` to disambiguate it from globalThis.
 * 
 * *Note: Not available in `constructor.js`*. */
declare const part: CorePart
/** The base type's version of this function.
 * 
 * Alias for `part.super[methodData.niceName]`. */
declare const base: Function
/** The value of `performance.now()` around the time this method was called. */
declare const now: DOMHighResTimeStamp
/** Alias for `part.render`. */
declare const render: CorePart
/** A proxy object that allows `inherit.exampleProperty` to replace `part.exampleProperty = part.parent.exampleProperty`.  */
declare const inherit: CorePart
/** The framework.MethodData object describing this method. */
declare const methodData: MethodData