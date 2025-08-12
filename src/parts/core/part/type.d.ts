declare interface IPartOf<T> extends Iterable<T> {
 [Symbol.iterator](): IterableIterator<T>
 /** Returns the subparts that meet the condition provided by FILTER_FUNCTION.  */
 filter(FILTER_FUNCTION: (subpart: T, index: number, part: T) => T): T[]
 /** Returns a boolean indicating whether or not the part includes the given SUBPART.  */
 includes(SUBPART: T): boolean
 /** Performs MAP_FUNCTION on every subpart of the part and returns an array of the results. */
 map(MAP_FUNCTION: (subpart: T, index: number, part: T) => T): T[]
 /** Adds a listener that calls the given callback when the given event occurs. */
 addEventListener(EVENT_TYPE: string, CALLBACK): void
 /** Removes the listener that calls the given callback when the given event occurs. */
 removeEventListener(EVENT_TYPE: string, CALLBACK): void
 /** The domain name used to identify the part. */
 readonly host: string
 /** Computes the cardinality of this part from its subparts and defines any other necessary properties. */
 readonly build(COUNT, SUBPART, INDEX, SUBPARTS): bigint
 /** Collects every build function in its prototype chain and then calls them all on itself. */
 readonly startBuild(COUNT, SUBPART, INDEX, SUBPARTS): bigint
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
 /** The object created by parsing this part's "part.json" file. */
 readonly manifest: {
  /** Whether or not this part should be considered a subpart of its parent part (abstract = false) or an uninstanceable prototype for other parts (abstract = true). */
  readonly abstract?: boolean
  /** Whether or not this part will be instanced (inherit = false) or retained (inherit = true) during the create step. */
  readonly inherit?: boolean
  /** The icon of the part, used whenever possible to represent the part throughout the O/S. */
  readonly "part.png"
 }
 /** The part's index in it's parent domain. */
 readonly index: number
 /** The number of subparts the part has. */
 readonly length: number
 /** The part that is this part's prototype object.
  * 
  * *Note: The part `part.core.parts` does not have a prototype part.* */
 readonly prototype?: IPart
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
  * *Note: There is no* `_[".."]`. */
 readonly "..": IPart
 /** The raw JSON string used to construct the object at `part.manifest`. */
 readonly "part.json": string
 /** A png icon that can represent the part and - for application parts - used as the application's icon and browser favicon. */
 readonly "part.png": string
 /** A URI-encoded svg data segment that can represent the bounding box of a part image but is small enough to be inlined in image-heavy server-rendered views. */
 readonly placeholderImage(IMAGE_NAME: string): string
 /** An optional display name for the part. */
 readonly title?: string
 /** An decorative title that uses unicode bold and mathematical characters to render the part's host name. */
 readonly fancyTitle?: string
 /** An optional short description of the part. */
 readonly description?: string
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
  /** The name of the file to render */
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
 /** Converts the given model to a routeID without modifying the state of the part. */
 modelToRouteID(MODEL: any): bigint
 /** A getter that generates a model object from the state of the part and its subparts. */
 readonly model: any
 /** Sets the part's routeID, propagating it leafward and rootward and updating all views. */
 setRouteID(ROUTE_ID: bigint): void
 /** Recomputes and then updates the part's routeID in response to a change in the the given subparts' routeIDs.
  * 
  * If the part has a parent, it calls collectRoute on that parent, passing the signal rootward.*/
 collectRouteID(SUBPARTS: T[]): void
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
 /** One of the six theme colors for this part. This is the accent/hover color when dark mode is enabled. */
 readonly darkAccentTheme: string
 /** One of the six theme colors for this part. This is the background color when dark mode is enabled. */
 readonly darkBgTheme: string
 /** One of the six theme colors for this part. This is the foreground color when dark mode is enabled. */
 readonly darkFgTheme: string
 /** One of the six theme colors for this part. This is the accent/hover color when the dark is disabled. */
 readonly lightAccentTheme: string
 /** One of the six theme colors for this part. This is the background color when the dark is disabled. */
 readonly lightBgTheme: string
 /** One of the six theme colors for this part. This is the foreground color when the dark is disabled. */
 readonly lightFgTheme: string
 /** True if the routeID of this part just changed in the current, still incomplete route propagation cycle.
  * 
  * Unlike other historical route properties which hold information about the part's last route change even
  * if that change occurred one or more cycles ago, this property is always cleared at the end of the cycle
  * so that view functions are not run multiple times. */
 readonly dirty: true | undefined
 /** Whether or not the part is connected to the view root for the purpose of view method propagation. If false, the part should be ignored from view functions but should retain all other functionality including being able to be enabled, contributing to cardinality, and having route changes propagate. */
 readonly isOpen: boolean
 /** Whether or not the part is an abstract part. All parts can be extended, but abstract parts don't participate in the routing function or run a build step. They also can't be listened to. */
 readonly isAbstract: boolean
 /** The record of all event callbacks currently attached to the part. */
 readonly callbacks: Record<string, Set<Function>>
 /** The array of subdomains which correspond to concrete (non-abstract) subparts. */
 readonly subpartKeys: string[]
}
declare interface IPart extends IPartOf<IPart> { }
/** The part instance on which the current script is being called.
 * 
 * Alias for `this` to disambiguate it from globalThis in IDEs.*/
declare const part: IPart
/** The value of `performance.now()` around the time this method was called. */
declare const now: DOMHighResTimeStamp
/** Alias for `part.render`. */
declare function render(): any
/** A proxy object that allows `inherit.exampleProperty` to replace `part.exampleProperty = part[".."].exampleProperty`.  */
declare const inherit: IPart
/** The Property object describing this property. */
declare const property: Property
/** Whether or not the part is the one which owns the current script. */
declare const isLeaf: boolean
/** This function's prototype. */
declare function base(...args): any
/** This nearest prototype object which owns the same method or getter as the one that is executing now. */
declare const basePropertyOwner: object
/** The same-named property descriptor as the currently executing method or getter from the nearest prototype. */
declare const basePropertyDescriptor: object
/** A getter which gets the final value of the currently evaluating getter from the nearest prototype object which has the same getter. */
declare const getBasePropertyValue: function
/** The part on which the current method is actually defined. */
declare const receiver