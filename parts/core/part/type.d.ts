declare class Part extends Iterable<Part> {
 constructor(): Part
 [Symbol.iterator](): IterableIterator<Part>
 /** Returns the subparts that meet the condition provided by FILTER_FUNCTION.  */
 filter(FILTER_FUNCTION: (subpart: Part, index: number, part: Part) => Part): Part[]
 /** Returns a boolean indicating whether or not the part includes the given SUBPART.  */
 includes(SUBPART: Part): boolean
 /** Performs MAP_FUNCTION on every subpart of the part and returns an array of the results. */
 map(MAP_FUNCTION: (subpart: Part, index: number, part: Part) => T): T[]
 /** The domain name used to identify the part whose code is currently executing. */
 readonly host: string
 /** The list of subdomains for the part whose source code is currently being evaluated. */
 readonly subdomains: string[]
 /** The list of static assets for the part whose source code is currently being evaluated. */
 readonly filenames: string[]
 /** The array of subdomain names corresponding to `part.host` split along ".". */
 readonly domains: string[]
 /** The number of routes the part has, used heavily to compute routing across the user space. */
 readonly cardinality: bigint
 /** The path to the part in its instance hierarchy. */
 readonly instancePath: string
 /** The subdomain name used to identify the part in its parent domain. */
 readonly key: string
 /** The part's index in it's parent domain. */
 readonly index: number
 /** The number of subparts the part has. */
 readonly length: number
 /** The part that is this part's prototype object.
  * 
  * *Note: The part `part.core.parts` does not have a prototype part.* */
 readonly prototype?: Part
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
 /** The previous route of the part, changed at the last call to distributeRouteID or collectRouteID. */
 readonly previousRouteID: bigint
 /** The difference between the current routeID and the previous one. */
 readonly deltaRouteID: bigint
 /** The parent part.
  * 
  * *Note: There is no* `root[".."]`. */
 readonly [".."]: Part
 /** A display name for the part.
  * 
  * By default, this is the part's key. */
 readonly title: string
 /** A unicode character to identify the part.
  * 
  * The default unicode character is the Mathematical Small Cursive form of the first letter of the part's domain name. */
 readonly unicode: string
 /** Generate a dynamic or static file from the part's directory.
  * 
  * Filenames are treated like their file extension. For binary file types (like .png)
   * the "value" format will return a base64 encoded string and the "response" and "datauri"
   * formats will return a file or file literal with the corresponding content-type.*/
 render(REQUEST: string | {
  /** The name of the file to render, which can include URI parameters, such as
   * ```
   * "icon.png?size=64"
   * ``` */
  request: string,
  /** How to package the rendered value. All values are converted to string before becoming a datauri or response.
   * 
   * The default is "value".
  */
  format?: "value" | "datauri" | "response",
  /** A fallback value. This fallback value will be returned exactly as
   * is if there was no render endpoint with the given filename. If the
   * render function returns a nullish value, the nullish value will be returned
   * instead of this value.  */
  fallback?: string | Response
 }): any | string | Response
 /** Sets the part's factory settings, subparts and cardinality. */
 distributeInitializePart(PART_MANIFEST: object, CARDINALITY_CALLBACK: Function): void
 /** Sets the part's routeID, propagating it leafward and rootward and updating all views. */
 setRouteID(ROUTE_ID: bigint): void
 /** Recomputes and then updates the part's routeID in response to a change in the the given subparts' routeIDs.
  * 
  * If the part has a parent, it calls collectRoute on that parent, passing the signal rootward.*/
 collectRouteID(SUBPARTS: Part[]): void
 /** Updates the part's routeID to ROUTE_ID and then recomputes all subpart routeIDs to match.
  * 
  * For any active subparts, it calls distributeRoute on them, passing the signal leafward.
  * 
  * To avoid redistributing the same route, **check for route ID changes *before* calling distributeRoute**. */
 distributeRouteID(ROUTE_ID: bigint): void
 /** If ROUTE_ID is in the part's range, sets the part to that routeID while caching information about
  * the previous routeID. Otherwise, throws an error.
  * 
  * This method is called by both collectRoute and distributeRoute.
  * It does not propagate the routeID or update any views. */
 updateRouteID(ROUTE_ID: bigint): void
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
 /** One of the six theme colors for this part. This is the accent/hover color when the color mode is dark. */
 readonly darkAccentTheme: string
 /** One of the six theme colors for this part. This is the background color when the color mode is dark. */
 readonly darkBgTheme: string
 /** One of the six theme colors for this part. This is the foreground color when the color mode is dark. */
 readonly darkFgTheme: string
 /** One of the six theme colors for this part. This is the accent/hover color when the color mode is light. */
 readonly lightAccentTheme: string
 /** One of the six theme colors for this part. This is the background color when the color mode is light. */
 readonly lightBgTheme: string
 /** One of the six theme colors for this part. This is the foreground color when the color mode is light. */
 readonly lightFgTheme: string
 /** True if the routeID of this part just changed in the current, still incomplete route propagation cycle.
  * 
  * Unlike other historical route properties which hold information about the part's last route change even
  * if that change occurred one or more cycles ago, this property is always cleared at the end of the cycle
  * so that view functions are not run multiple times. */
 readonly dirty: true | undefined
}
declare class Error extends Error { }
/** The part instance on which the current script is being called.
 * 
 * Alias for `this` to disambiguate it from globalThis in IDEs.*/
declare const part: Part
/** The value of `performance.now()` around the time this method was called. */
declare const now: DOMHighResTimeStamp
/** Alias for `part.render`. */
declare const render: Part
/** A proxy object that allows `inherit.exampleProperty` to replace `part.exampleProperty = part[".."].exampleProperty`.  */
declare const inherit: Part
/** The Property object describing this property. */
declare const property: Property
/** Whether or not the part is the one which owns the current script. */
declare const isLeaf: boolean