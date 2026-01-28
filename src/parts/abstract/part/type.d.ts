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
 /** A getter that generates a JSON-compatable model value from the state of the part and its subparts. */
 readonly "model": any
 /** The raw JSON string used to construct the object at `part.manifest`. */
 readonly "part.json": string
 /** A png icon that can represent the part and - for application parts - used as the application's icon and browser favicon. */
 readonly "part.png": string
 /** A JavaScript snippet representing global access to the part, available from HTML event handler attributes after hydration. */
 readonly "runtimeReference": string
 /** An optional display name for the part. */
 readonly "title"?: string
 /** Generates the attribute string that sets up an onpointerdown listener that calls `part[METHOD_NAME](event,this,...ARGS)`. */
 readonly pointAttr(METHOD_NAME: string = "point", ...ARGS: any[])
 /** Registers a listener that calls RECEIVER[CALLBACK_NAME](this) after the event of the given type occurs. */
 readonly attach(EVENT_TYPE: string, RECEIVER: IPartAny, CALLBACK_NAME: string): void
 /** Unregisters the listener that calls RECEIVER[CALLBACK_NAME](this) after the event of the given type occurs. */
 readonly detach(EVENT_TYPE: string, RECEIVER: IPartAny, CALLBACK_NAME: string): void
 /** Calls receiver[callbackName](this) for every receiver/callback pair registered to the given event type. */
 readonly notify(EVENT_TYPE: string): void
 /** Computes the cardinality of the part from its subparts and defines any other necessary properties. */
 readonly build(): void
 /** Calls loop on the part and then propagates the call leafward to all subparts. */
 readonly distributeLoop(): void
 /** Returns the subparts that meet the condition provided by FILTER_FUNCTION.  */
 readonly filter(FILTER_FUNCTION: (subpart: TSubpart, index: number, part: IPart<TOwner, TSubpart>) => TSubpart): TSubpart[]
 /** performs MAP_FUNCTION on every subpart of the part. */
 readonly forEach(MAP_FUNCTION: (subpart: TSubpart, index: number, part: IPart<TOwner, TSubpart>) => void): void
 /** Returns a boolean indicating whether or not the part includes the given SUBPART.  */
 readonly includes(SUBPART: TSubpart): boolean
 readonly reduce(REDUCE_FUNCTION: (result: TResult, subpart: TSubpart, index: number, part: IPart<TOwner, TSubpart>) => TResult, INITIAL_VALUE: TResult): TResult
 /** If defined, the per-frame update method for the part. Useful for implementing game features. */
 readonly loop?(TIME: DOMHighResTimeStamp): void
 /** Performs MAP_FUNCTION on every subpart of the part and returns an array of the results. */
 readonly map(MAP_FUNCTION: (subpart: TSubpart, index: number, part: IPart<TOwner, TSubpart>) => TResult): TResult[]
 /** Converts the given model to a routeID without modifying the state of the part. */
 readonly modelToRouteID(MODEL: any): bigint
 /** A URI-encoded svg data segment that can represent the bounding box of a part image but is small enough to be inlined in image-heavy server-rendered views. */
 readonly placeholderImage(IMAGE_NAME: string): string
 /** A css variable representing the absolute css name of the given image, traversing the prototype chain if necessary. */
 readonly cssVariableOfImage(IMAGE_NAME: string): string
 /** Collects every build function in its prototype chain and then calls them all on itself. */
 readonly startBuild(): void
 /** Sets the part's routeID, propagating it leafward and rootward and updating all views. If DELTA is true, then ROUTE_ID is added to the part's current route ID. */
 readonly setRouteID(ROUTE_ID: bigint, DELTA: boolean = false): void
 /** Recomputes and then updates the part's routeID in response to a change in the the given subpart's routeID.
  * 
  * If the part has a parent, it calls collectRoute on that parent, passing the signal rootward.
  * 
  * If DEPTH is a number greater than 0, the signal only propagates that many times (including the part itself). */
 readonly collectRouteID(SUBPARTS: TSubpart[], DEPTH: number): void
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
 readonly callbacks: Record<string, Record<string, [target: IPartAny, callbackName: string]>>
 /** The number of routes the part has, used heavily to compute routing across the user space. */
 readonly cardinality: bigint
 /** The difference between the current routeID and the previous one. */
 readonly deltaRouteID: bigint
 /** True if the routeID of the part just changed in the current, still incomplete route propagation cycle.
  * 
  * Unlike other historical route properties which hold information about the part's last route change even if that change occurred one or more cycles ago, this property is always cleared at the end of the cycle so that view functions are not run multiple times. */
 readonly dirty: true | undefined
 /** Whether or not the part has a routeID equal to `-1n`. */
 readonly disabled: boolean
 /** The array of subdomain names corresponding to `part.host` split along ".". */
 readonly domains: string[]
 /** The set of parts which extend from the part. */
 readonly inheritors: IPartAny[]
 /** Whether or not the part has a routeID greater than `-1n`. */
 readonly enabled: boolean
 /** The list of static asset names for the part. */
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
 /** The object created by parsing the part's "part.json" and assigning its prototype to the part's prototype's own manifest. */
 readonly manifest: {
  /** Whether or not the part should be considered a subpart of its parent part (abstract = false) or an uninstanceable prototype for other parts (abstract = true). */
  readonly abstract?: boolean
  /** Whether or not the part will be instanced (inherit = false) or retained (inherit = true) during the create step. */
  readonly inherit?: boolean
 }
 /** The previous route of the part, changed at the last call to distributeRouteID or collectRouteID. */
 readonly previousRouteID: bigint
 readonly Property: typeof Property
 /** The part's prototype part.
  * 
  * *Note: The part `part.abstract.parts` does not have a prototype part.* */
 readonly prototype?: IPartAny
 /** The current route of the part expressed as a bigint index in the virtual array of all of its routes. */
 readonly routeID: bigint
 /** Whether or not the part has a running task */
 readonly running: boolean
 /** The array of child parts which are not abstract. */
 readonly subparts: TSubpart[]
 /** The list of subdomains for the part whose source code is currently being evaluated. */
 readonly subdomains: string[]
 /** Whether or not the part was enabled before the most recent route change. */
 readonly wasEnabled: boolean
 /** Extends the definition of the part by allowing the addition of custom properties.
  * 
  * All runtime properties are added using this method.
  * 
  * No property descriptor should have its "enumerable" property set to true, as that would make the property appear to be a serialized property which can only be added by adding a new file into the part's repository folder. */
 readonly define(propertyDescriptorMap: PropertyDescriptorMap): this
}

declare type IPartAny =
 IPart<IPartAny, IPartAny>

declare interface IWebComponent {

 // Serialized Properties.
 /** The optional css content of the component, given the current state. */
 readonly "part.css"?: string
 /** The optional html content of the component, given the current state. */
 readonly "part.html"?: string
}

/** The part instance on which the current script is being called.
 * 
 * Alias for `this` to disambiguate it from globalThis in IDEs.*/
declare const part: IPartAny
/** The Property object describing the currently running method. */
declare const property: Property
/** The prototype part method which the currently running method overrides (if one is defined). */
declare function base(...args): any
/** The current function, so that it can be called again from within itself. */
declare function recurse(...args): any
/** Sets the current ecosystem route ID and host application as the undo point (the state the back button will return to). */
declare function setUndoPoint(): void
/** The current incoming route ID argument.
 * 
 * *Available within distributeRouteID, setRouteID and updateRouteID methods only.*  */
declare const ROUTE_ID: bigint
/** The part on which an event occurred.*
 * 
 * **where available as an argument passed to a part listener callback.* */
declare const SENDER: IPartAny
/** If on the client, returns whether or not the server-rendered view has been taken over by the client-side MVC framework. */
declare const hydrated: boolean | null