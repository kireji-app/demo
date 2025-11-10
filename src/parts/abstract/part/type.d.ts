declare interface IPart<TOwner, TSubpart>
 extends Iterable<TSubpart> {

 // Serialized Properties.
 [Symbol.iterator](): IterableIterator<TSubpart>
 /** A special description of an abstract part which is not propagated to its instance parts. */
 readonly "abstractDescription": string
 /** A special title of an abstract part which is not propagated to its instance parts. */
 readonly "abstractTitle": string
 /** A JavaScript snippet used to automate the declaration of common constants for all methods which refer to it in the part. */
 readonly "constants.js": string
 /** An optional short description of the part. */
 readonly "description"?: string
 /** A bit of HTML used to generate the editor panel for this part in the kireji.app editor pane. */
 readonly "editor.html": string
 /** An decorative title that uses unicode bold and mathematical characters to render the part's host name. */
 readonly "fancyTitle"?: string
 /** The part's index in it's parent domain. */
 readonly "index": number
 /** The path to the part in its instance hierarchy. */
 readonly "instancePath": string
 /** Whether or not the part is connected to the view root for the purpose of view method propagation. If false, the part should be ignored from view functions but should retain all other functionality including being able to be enabled, contributing to cardinality, and having route changes propagate. */
 readonly "isOpen": boolean
 /** The subdomain name used to identify the part in its parent domain. */
 readonly "key": string
 /** The number of subparts the part has. */
 readonly "length": number
 /** A getter that generates a model object from the state of the part and its subparts. */
 readonly "model": any
 /** The raw JSON string used to construct the object at `part.manifest`. */
 readonly "part.json": string
 /** A png icon that can represent the part and - for application parts - used as the application's icon and browser favicon. */
 readonly "part.png": string
 /** A JavaScript snippet representing global access to the part, available from HTML event handler attributes after hydration. */
 readonly "runtimeReference": string
 /** An optional display name for the part. */
 readonly "title"?: string
 /** Adds a listener that calls the given callback when the given event occurs. */
 readonly addEventListener(EVENT_TYPE: string, CALLBACK): void
 /** Removes the listener that calls the given callback when the given event occurs. */
 readonly removeEventListener(EVENT_TYPE: string, CALLBACK): void
 /** Computes the cardinality of this part from its subparts and defines any other necessary properties. */
 readonly build(COUNT, SUBPART, INDEX, SUBPARTS): bigint
 /** Calls loop on this part and then propagates the call leafward to all subparts. */
 readonly distributeLoop(): void
 /** Returns the subparts that meet the condition provided by FILTER_FUNCTION.  */
 readonly filter(FILTER_FUNCTION: (subpart: TSubpart, index: number, part: TSubpart) => TSubpart): TSubpart[]
 /** Perofrms MAP_FUNCTION on every subpart of the part. */
 readonly forEach(MAP_FUNCTION: (subpart: TSubpart, index: number, part: TSubpart) => void): void
 /** Returns a boolean indicating whether or not the part includes the given SUBPART.  */
 readonly includes(SUBPART: TSubpart): boolean
 /** If defined, the per-frame update method for this part. Useful for implementing game features. */
 readonly loop?(TIME: DOMHighResTimeStamp): void
 /** Performs MAP_FUNCTION on every subpart of the part and returns an array of the results. */
 readonly map(MAP_FUNCTION: (subpart: TSubpart, index: number, part: TSubpart) => TSubpart): TSubpart[]
 /** Converts the given model to a routeID without modifying the state of the part. */
 readonly modelToRouteID(MODEL: any): bigint
 /** A URI-encoded svg data segment that can represent the bounding box of a part image but is small enough to be inlined in image-heavy server-rendered views. */
 readonly placeholderImage(IMAGE_NAME: string): string
 /** Collects every build function in its prototype chain and then calls them all on itself. */
 readonly startBuild(COUNT, SUBPART, INDEX, SUBPARTS): bigint
 /** Sets the part's routeID, propagating it leafward and rootward and updating all views. */
 readonly setRouteID(ROUTE_ID: bigint): void
 /** Recomputes and then updates the part's routeID in response to a change in the the given subparts' routeIDs.
  * 
  * If the part has a parent, it calls collectRoute on that parent, passing the signal rootward.*/
 readonly collectRouteID(SUBPARTS: TSubpart[]): void
 /** Updates the part's routeID to ROUTE_ID and then recomputes all subpart routeIDs to match.
  * 
  * For any active subparts, it calls distributeRoute on them, passing the signal leafward.
  * 
  * To avoid redistributing the same route, **check for route ID changes *before* calling distributeRoute**. */
 readonly distributeRouteID(ROUTE_ID: bigint): void
 /** If ROUTE_ID is in the part's range, sets the part to that routeID while caching information about the previous routeID. Otherwise, throws an error.
  * 
  * This method is called by both collectRoute and distributeRoute. It does not propagate the routeID or update any views. */
 readonly updateRouteID(ROUTE_ID: bigint): void
 /** Adds all view elements, properties, and references which the part needs to have in *all* of it's routes. */
 readonly addView(): void
 /** An updating function which runs *every time* the route of a part changes to something other than `-1n`. */
 readonly populateView(): void
 /** Removes all view elements, properties and references that were added in either `addView` or `populateView`. */
 readonly removeView(): void
 /** If the part was just enabled, calls addView then calls collectAddView on any parent, passing the signal rootward.*/
 readonly collectAddView(): void
 /** Whether the part is enabled or not, calls collectPopulateView on any parent, passing the signal rootward.
  * 
  * Then, if the part is enabled, calls populateView.*/
 readonly collectPopulateView(): void
 /** If the part was just disabled, calls removeView and then calls collectRemoveView on any parent, passing the signal rootward.*/
 readonly collectRemoveView(): void
 /** If the part just became enabled, calls addView and then calls distributeAddView on all subparts, passing the signal leafward.*/
 readonly distributeAddView(): void
 /** If the part is enabled, calls populateView on it and then calls distributePopulateView on all subparts, passing the signal leafward.*/
 readonly distributePopulateView(): void
 /** If the part was enabled, calls distributeRemoveView on any subparts that were also enabled, passing the signal leafward. Then, if the part is no longer enabled, calls removeView on itself.*/
 readonly distributeRemoveView(): void

 // Runtime Properties.
 /** The parent part.
  * 
  *  *Note: There is no* `_[".."]`. */
 readonly "..": TOwner
 /** The record of all event callbacks currently attached to the part. */
 readonly callbacks: Record<string, Set<Function>>
 /** The number of routes the part has, used heavily to compute routing across the user space. */
 readonly cardinality: bigint
 /** The difference between the current routeID and the previous one. */
 readonly deltaRouteID: bigint
 /** True if the routeID of this part just changed in the current, still incomplete route propagation cycle.
  * 
  * Unlike other historical route properties which hold information about the part's last route change even if that change occurred one or more cycles ago, this property is always cleared at the end of the cycle so that view functions are not run multiple times. */
 readonly dirty: true | undefined
 /** Whether or not the part has a routeID equal to `-1n`. */
 readonly disabled: boolean
 /** The array of subdomain names corresponding to `part.host` split along ".". */
 readonly domains: string[]
 /** Whether or not the part has a routeID greater than `-1n`. */
 readonly enabled: boolean
 /** The list of static assets for the part whose source code is currently being evaluated. */
 readonly filenames: string[]
 /** The domain name used to identify the part. */
 readonly host: string
 /** Whether or not the part is an abstract part. All parts can be extended, but abstract parts don't participate in the routing function or run a build step. They also can't be listened to. */
 readonly isAbstract: boolean
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
 /** The object created by parsing this part's "part.json" file. */
 readonly manifest: {
  /** Whether or not this part should be considered a subpart of its parent part (abstract = false) or an uninstanceable prototype for other parts (abstract = true). */
  readonly abstract?: boolean
  /** Whether or not this part will be instanced (inherit = false) or retained (inherit = true) during the create step. */
  readonly inherit?: boolean
 }
 /** The previous route of the part, changed at the last call to distributeRouteID or collectRouteID. */
 readonly previousRouteID: bigint
 /** The part that is this part's prototype object.
  * 
  * *Note: The part `part.abstract.parts` does not have a prototype part.* */
 readonly prototype?: IPart
 /** The current route of the part expressed as a bigint index in the virtual array of all of its routes. */
 readonly routeID: bigint
 /** Whether or not the part has a running task */
 readonly running: boolean
 /** The list of subdomains for the part whose source code is currently being evaluated. */
 readonly subdomains: string[]
 /** The array of subdomains which correspond to concrete (non-abstract) subparts. */
 readonly subpartKeys: string[]
 /** Whether or not the part was enabled before the most recent route change. */
 readonly wasEnabled: boolean
 /** Extends the definition of the object by allowing the addition of custom properties.
  * 
  * All runtime properties are added using this method.
  * 
  * No property descriptor should have its "enumerable" property set to true, as this would make the property appear to be a serialized property, which can only be added by adding a new file into the part's repository folder. */
 readonly define(propertyDescriptorMap: PropertyDescriptorMap): IPart<TOwner, TSubpart>
}

declare type IPartAny =
 IPart<IPartAny, IPartAny>

/** The part instance on which the current script is being called.
 * 
 * Alias for `this` to disambiguate it from globalThis in IDEs.*/
declare const part: IPartAny
/** The Property object describing this property. */
declare const property: Property
/** This function's prototype. */
declare function base(...args): any
/** The current function, so that it can be called again from within itself. */
declare function recurse(...args): any