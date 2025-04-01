declare class CorePart extends Iterable<CorePart> {
 constructor(): CorePart
 [Symbol.iterator](): IterableIterator<CorePart>
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
  * *Note: There is no* `root.parent`. */
 readonly parent: CorePart
 /** The root part of the part's tree. */
 readonly root: CorePart
 /** The unique path to the instance from the root object. */
 readonly instancePath: string
 /** When parent type is `mix.core.parts`, a divisor which the parent mix uses to encode and decode subroutes.*/
 readonly mixedRadixPlaceValue: bigint
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
  stringName: string,
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

 /** Completely resets the part to it's factory settings, assigns it the given subpart,
  * and computes its own route cardinality from it. This is the only time the route cardinality should be set.
  * 
  * This function is like a reusable `constructor` for the part. */
 setParts(PARTS: object): void
 /** Set's the part's routeID, propagates it leafward and rootward, and then updates all views. */
 setRoute(ROUTE_ID: bigint): void
 /** Recomputes and then updates the part's routeID in response to a change in the the given subparts' routeIDs.
  * 
  * If the part has a parent, it calls collectRoute on that parent, passing the signal rootward.*/
 collectRoute(SUBPARTS: CorePart[]): void
 /** Updates the part's routeID to ROUTE_ID and then recomputes all subpart routeIDs to match.
  * 
  * For any active subparts, it calls distributeRoute on them, passing the signal leafward. */
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
 /** If the part was just enabled, calls addView then calls collectViewAdd on any parent, passing the signal rootward.*/
 collectViewAdd(): void
 /** Whether the part is enabled or not, calls collectViewPopulate on any parent, passing the signal rootward.
  * 
  * Then, if the part is enabled, calls populateView.*/
 collectViewPopulate(): void
 /** If the part was just disabled, calls removeView and then calls collectViewRemove on any parent, passing the signal rootward.*/
 collectViewRemove(): void
 /** If the part just became enabled, calls addView and then calls distributeViewAdd on all subparts, passing the signal leafward.*/
 distributeViewAdd(): void
 /** If the part is enabled, calls populateView on it and then calls distributeViewPopulate on all subparts, passing the signal leafward.*/
 distributeViewPopulate(): void
 /** If the part was enabled, calls distributeViewRemove on any subparts that were also enabled, passing the signal leafward.
  * Then, if the part is no longer enabled, calls removeView on itself.*/
 distributeViewRemove(): void
}

/** A wrapper class that constructs a part of the given host type.
 * 
 * If the host type doesn't exist yet or if CUSTOM_STRING_COLLECTION is
 * passed, creates a new framework, compiles a new type class from the host
 * source code and any source code in CUSTOM_STRING_COLLECTION, caches the new
 * type, and then returns a new instance of it. */
declare class Part {
 constructor(HOST, CUSTOM_STRING_COLLECTION): CorePart
}
/** The host of the currently evaluating script. */
declare const SCRIPT_HOST: string
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