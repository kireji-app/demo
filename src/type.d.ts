declare interface IEcosystem
 extends IMix<null, ITopLevelDomainAny>,
 IWebComponent {

 // Subparts.
 readonly app: IApp
 readonly click: IClick
 readonly com: ICom
 readonly io: IIo
 readonly parts: IParts

 // Serialized Properties.
 /** One of three strings representing the severity of the API change. Used to automatically compute the correct semantic version at build time. */
 readonly "change": "major" | "minor" | "patch"
 /** A number used to control the detail in logs. Only messages with a priority less than or equal to this number will be logged. */
 readonly "verbosity": number
 /** The git branch for the current build version. */
 readonly "branch": string
 /** Returns a packed version of the entire repo as a stand-alone script that boots the ecosystem. */
 readonly "build.js": string
 /** The hash of the most recent git commit at build time. */
 readonly "gitSHA": string
 /** The automatically generated semantic version number of the current build. */
 readonly "version": string
 /** The automatically generated HTTP identifier for the build. */
 readonly "ETag": string
 /** The current unix timestamp, acquired using the high-precision performance.now() + performance.timeOrigin. */
 readonly "now": DOMHighResTimeStamp
 /** The host of the desired default app. The server will redirect to this when the user visits localhost:3000 to test locally. */
 readonly "defaultApplicationHost": string
 /** A stylesheet containing CSS variables with `url()` values that correspond to images. Used to seamlessly hand-off image rendering from the server-rendered page to the client-rendered page without modifying the DOM. */
 readonly "images.css": string
 /** The current application's PWA manifest. */
 readonly "manifest.json": string
 /** A JSON object serializing the desired landing model of the ecosystem. */
 readonly "landing-model.json": string
 /** Returns a css that inlines `early-*` compressed images for enhancing the first page appearance when using server-side rendering. It scans the given body HTML for usages of the early images to optimize inclusion. */
 readonly getImagesEarly(BODY_HTML: string): string
 /** Handles standard anchor link clicks in one of four ways:
   * 1. For canonical links in the current app: calls `_.translateCanonicalPathname` on the anchor's href and then goes to the returned internal route.
   * 2. For links to other applications with no pathname: sets the current application by navigating to the given host, bringing the current pathname with it.
   * 3. For canonical links to other applications: does both of the above.
   * 4. For links to origins outside of the ecosystem: opens a new tab that navigates to the anchor's href. */
 readonly point(POINTER_EVENT: PointerEvent, TARGET_ELEMENT: HTMLElement): void
 /** Translates an SEO-friendly canonical pathname into a versioned, stateful route, using the current ecosystem state as the base state. */
 readonly translateCanonicalPathname(CANONICAL_ROUTE: string): string
 /** Sets the configuration space to match the given request url string. */
 readonly setRoute(REQUEST_URL: string): void
 /** Performs automated build-time unit tests to validate the state of the build. */
 readonly validate(): void

 // Runtime Properties.
 /** The ecosystem's currently assigned application, encoded by the host of the current URL. */
 readonly application: IApplicationAny
 /** A host-keyed object with all of the applications that are available from the web at their host thanks to DNS records. */
 readonly applications: Record<string, IApplicationAny>
 /** A host-keyed object with all of the applications that should appear in the task menu. */
 readonly menuApplications: Record<string, IApplicationAny>
 /** The hash of the desired landing page, as computed from data parameters during the initial boot process. */
 readonly landingHash: string
 /** The model of the desired landing page, used during the initial boot process to compute `_.landingHash` and `_.landingRouteID`. */
 readonly landingModel: string
 /** The routeID of the desired landing page, as computed from data parameters during the initial boot process. */
 readonly landingRouteID: bigint
 /** If in the client environment, an integer ID representing the application frame loop's current pending frame request. Null, otherwise. */
 readonly frameRequest: number | null
}

/** The root part. When JSON stringified, it should inline all information compiled from the git repo in node by the build process.
 * 
 * The serialized version should not include any values that are added during or after recursively hydrating the part tree. */
declare const _: IEcosystem
declare const Q: typeof document.querySelector
/** A function which simplifies the process of deploying to three environments (server, worker, client) by giving them all the same routing functions, virtual DOM and synchronous fetch method which can produce both static assets and dynamically generated files.
 * 
 * It creates a function scope in which all other .js files execute. It then boots the ecosystem. */
declare function ƒ(_): void
/** The source code of the boot function, as an array of strings representing each line. */
declare const sourceLines: string[]
/** Data about the locator symbols marks that determine the source mappings for code originating as string literals. */
declare const sourcePositionMarks: object
/** The regular expression used to pick out source position marks from code. */
declare const sourcePositionMarkPattern: RegExp
/** The host used to find all of the source code for the part whose code is currently being evaluated. */
declare const host: string
/** The compiled string which should evaluate to an object. */
declare const script: string
/** An object that serializes method signatures and meta data during part object hydration. The object is parsed from the file `part.json` (or `{}` if no file is found). Its prototype is the prototype part's own partManifest or null, if it's the Core. */
declare const partManifest: IPartData
/** The inverse of pathToRoot. The path "back up" to the repository root from the directory containing the source code the part used. */
declare const pathToRepo: string
/** All of the data collected about the source of each property added to the part during hydration. */
declare const property: Property
/** The dedicated SourceMappedFile for the object which was created to hydrate the part. */
declare const sourceFile: SourceMappedFile
/** The index of build.js in the list of source mapping files for the part's dedicated SourceMappedFile instance. */
declare const buildSource: number
/** The path to the folder in the git repo containing the source code for the part. */
declare const pathFromRepo: string
/** The list of subdomains for the part whose source code is currently being evaluated. */
declare const subdomains: string[]
/** The list of static assets for the part whose source code is currently being evaluated. */
declare const filenames: string[]
declare interface ISourceDirectory<T> { }
declare interface IPropertyTable<T> {
 readonly ["route-set"]: T
 readonly ["routeID-set"]: T
 readonly ["routeID-collect"]: T
 readonly ["routeID-distribute"]: T

 readonly ["view-remove"]: T
 readonly ["view-add"]: T
 readonly ["view-populate"]: T
 readonly ["view-distribute-update"]: T
 readonly ["view-distribute-end"]: T
}

declare interface IPartData extends IPropertyTable<string[]> {
 readonly extends: string
}
/** A type used for source mapping and packing data from one or more files into a single new file. */
class SourceMappedFile {
 /** The alphabet that Source Map Version 3 uses to base64 encode its source mapping data segments. */
 static readonly radix: string
 readonly lines: string[]
 readonly mappings: []
 readonly sources: string[]
 readonly scripts: [string | null]
 addLine(string: string, srcIndex: number, ogLn: number, ogCol: number, indent: string, mapTokens: boolean): void
 addLines(strings: string[], srcIndex: number, ogLn: number, ogCol: number, indent: string, mapTokens: boolean): void
 addSource(source: string, script: string | null = null): number
 packAndMap(url?: string): string
 getMap(): string
}
/** A string representing which of three known environments the framework is running on.
 * 1. "server"
 *     - Unpacked in a clone of the project git repo in node.
 *     - It's called by `node build` in order to pack the repo into a single client artifact and run as a backend to serve that artifact and to server-render HTML.
 *     = Its state is set by http requests on port 3000.
 * 3. "worker"
 *     - Packed and deployed as the browser's ServiceWorker.
 *     - It's booted by the browser after a client registers it.
 *     - Its state is set by client fetch requests.
 * 3. "client"
 *     - Packed and deployed as a front-end framework hydrating a browser tab.
 *     - It's booted by a script tag added to the server- or worker-rendered html file.
 *     - Its state is initially set by `location.href` (whatever is in the address bar) and then set by user interaction thereafter. */
declare const environment: "server" | "worker" | "client"
/** True if the framework was built on the cloud from the main branch. */
declare const production: boolean
/** A unicode-safe replacement for btoa. */
declare function btoaUnicode(BODY: string): string
declare function warn(...DATA: any[]): void
declare function debug(...DATA: any[]): void
/** Opens a collapsed log group with the given label at the given verbosity, calls the given callback (passing a log function with the same verbosity as an argument), closes the log group, then returns the result of the callback. */
declare function logScope(VERBOSITY: number, LABEL: string, CALLBACK: (log: (...data) => void) => T): T
/** A special wrap around logScope which logs server events with a reliable server format. */
declare function logServerScope(col1, col2, col3, CALLBACK: (log: (...data) => void) => T): T
/** A function which wraps JSON.stringify using a replacer which can serialize BigInt values. */
declare function serialize(data: any): void
/** Represents metadata and processing logic for a single property of the part. If the property is a method or getter/setter, it parses the method's ID and generates its signature, dynamic constants and body. If the property is a static file, a simple getter method is created automatically.
 * 
 * This is a nested type. There is a dedicated instance of this type for each part. */
declare class Property {
 /** Regular expression to validate if a string is a valid JavaScript identifier. */
 static readonly identifierPattern: RegExp
 /** The set of all property IDs for the part. */
 static readonly ids: Set<string>
 /** Traverses the prototype chain to add an inherited set of constant declarations to the the body of methods which will be added to the part during hydration. */
 static addConstants(targetFile): void
 /** Traverses the prototype chain to determine which constant declarations are used in the given method data. */
 static collectConstants(targetPart, targetProperty): void
 /** The original kebab-case identifier string for the property. */
 readonly id: string
 /** The expected file name for storing the method's source code. Typically `${PROPERTY_ID}.js`. */
 readonly filename: string
 /** Flag indicating if the property is an automatic getter generated by the framework. Determined by checking if `id` starts with "auto-". */
 readonly isAuto: boolean
 /** The raw source code for the body of the method. For 'auto' methods, it's a generated template string. Otherwise, it's read from the corresponding file (`filename`). Undefined if reading fails. */
 readonly content: string | undefined
 /** Flag indicating if the method is related to view logic. Determined by checking if `ids` starts with "view-". */
 readonly isView: boolean
 /** Flag indicating if the method is asynchronous. Determined by checking if `id` starts with "async-". */
 readonly isAsync: boolean
 /** Flag indicating if the method is a simple getter alias for a raw file. */
 readonly isAlias: boolean
 /** Flag indicating if the method represents a well-known Symbol (e.g., Symbol.iterator). Determined by checking if `id` starts with "symbol-". */
 readonly isSymbol: boolean
 /** Flag indicating if the property is a getter or setter. Determined by checking if `id` starts with "get-" or "set-". */
 readonly isGetOrSet: boolean
 /** Flag indicating if the property represents a generated file, as indicated by the filename ending with "*.js". */
 readonly isGenerated: boolean
 /** A processed, potentially more human-readable or code-friendly name for the method.
  * - For Symbols: `[Symbol.symbolName]`
  * - For certain get/set with dots: `["file.extension"]`
  * - For auto-getters: The base property name (quoted if not a valid identifier).
  * - For kebab-case method IDs: Transformed into camelCase (e.g., "view-update" -> "updateView").
  * - Otherwise: The original `id`. */
 readonly niceName: string
 /** Represents and manages constant declarations (`const ... = ...`) found or used within the method's body, handling dependencies between them. */
 static readonly Constant: typeof MethodConstant
 /** The index of the source object associated with the method's content. */
 readonly source: number
 /** An array containing the lines of the method's source code (`content`). Empty if `content` is undefined. */
 readonly lines: string[]
 /** The final property key which can be used to access the property on the part. */
 readonly key: string
 /** The Array.isArray() static method determines whether the passed value is an Array. */
 readonly toArray(value): boolean
 /** Flag indicating if the `niceName` can be used directly as a property name in code (i.e., it's a valid identifier or a Symbol representation). */
 readonly hasValidPropertyName: boolean
 /** The string representation used to reference the method/property in code. Uses `niceName` directly if valid, otherwise wraps it in brackets/quotes (`["niceName"]`).
  * 
  * Example: `myMethod`, `[Symbol.iterator]`, `["property-with-hyphens"]`. */
 readonly propertyReference: string
 /** The string representation used to access the property in source code. Uses dot notation (`.niceName`) if possible, otherwise bracket notation (`["niceName"]`).
  * 
  * Example: `.myMethod`, `[Symbol.iterator]`, `["property-with-hyphens"]`. */
 readonly propertyAccessor: string
 /** The string representing the method's arguments list, including parentheses. Derived from part configuration (`partManifest[PROPERTY_ID]`).
  * 
  * Example: `(arg1, arg2)`. Defaults to `()` if no arguments defined. */
 readonly argumentString: string
 /** String containing modifiers for the method signature (e.g., "async ", "get ", "set "). Determined based on `isAsync`, `isGetOrSet`, `isAuto` flags. */
 readonly modifiers: string
 /** The complete method signature string as it would appear in class syntax. Combines `modifiers`, `propertyReference`, and `argumentString`.
  * 
  * Example: `async myMethod(arg1)`, `get propertyName()`, `[Symbol.iterator]()`. */
 readonly signature: string
 /** Constructs a Property instance, parsing the PROPERTY_ID and processing associated metadata and source code content.
  * @param PROPERTY_ID The unique identifier string for the method. */
 constructor(PROPERTY_ID: string)
}
/** Inner class representing a single constant declaration within a method's scope. Manages its source, dependencies, and ensures it's declared when used. */
declare class MethodConstant {
 /** Registry of all MethodConstant instances created for the parent Property, keyed by identifier. Includes the special 'PROPERTY_ID' constant. */
 static all: Record<string, MethodConstant | { identifier: string, usageRegExp: RegExp, ensureDeclarationAndDependencies(): void }>
 /** Registry of MethodConstant instances that have not yet been marked as used within the method body. Keyed by identifier. Includes the special 'PROPERTY_ID' constant initially. */
 static unused: Record<string, MethodConstant | { identifier: string, usageRegExp: RegExp, ensureDeclarationAndDependencies(): void }>
 /** Flag indicating whether the constant has been used and its declaration added to the output source file. */
 used: boolean
 /** An array of other MethodConstant instances that the constant depends on. */
 readonly requirements: MethodConstant[]
 /** The file path where the constant declaration was originally found. */
 readonly path: string
 /** The full line of source code for the constant declaration (e.g., "const PI = 3.14"). */
 readonly line: string
 /** The line number in the original source file where the constant was declared. */
 readonly lineNumber: number
 /** The index of the source associated with the constant's declaration line. */
 readonly source: number
 /** The index of the '=' sign within the constant declaration line. */
 readonly equalsIndex: number
 /** The identifier (name) of the constant. */
 readonly identifier: string
 /** A regular expression used to detect usage of the constant's identifier within code lines. Looks for the identifier as a whole word, not preceded by a dot. */
 readonly usageRegExp: RegExp
 /** Manages a single inherited constant declaration, tracking its dependencies and ensuring it's added to the source output when used.
  * @param SOURCE_PATH The file path where the constant declaration originates.
  * @param SOURCE_LINE The full line of the constant declaration source code.
  * @param SOURCE_LINE_NUMBER The line number in the source file. */
 constructor(SOURCE_PATH: string, SOURCE_LINE: string, SOURCE_LINE_NUMBER: number)
 /** Idempotent function that ensures that the constant and all its recursive dependencies (`requirements`) are declared (added to the source file output). Marks the constant as used. */
 ensureDeclarationAndDependencies(): void
}
/** The incoming request url string.
 * 
 * Available only in _.setRoute(). */
declare const REQUEST_URL: string
/** A host-keyed map of all parts in the ecosystem. */
declare const partsByHost: Record<string, IPartAny>
/** Trades a versioned string pathname for the bigint routeID. */
declare function decodePathname(pathname: string): bigint
/** Trades a string segment for the bigint routeID. */
declare function decodeSegment(pathname: string): bigint
/** Trades a bigint routeID for a versioned string pathname. */
declare function encodePathname(routeID: bigint): string
/** Trades a bigint routeID for a string segment. */
declare function encodeSegment(routeID: bigint): string
/** Returns a string representing the given bigint in scientific notation (a coefficient times 10 to some power). When html is true, the power will be wrapped in a superscript tag. Otherwise, it will use unicode superscript characters. */
declare function scientific(x: bigint, html: boolean = false): string
/** Makes the given text html-friendly by escaping special characters using ampersand codes. */
declare function sanitizeAttr(input: string): string
/** Produces a bigint corresponding to a random sequence of bits of the given length. */
declare function randomBits(bigCount: number): bigint
/** Produces a cryptographically random route ID between 0 and one less than the given cardinality. */
declare function randomRouteID(cardinality: bigint): bigint
/** Returns a random boolean value. */
declare function flipCoin(): boolean
/** The immutable list of runtime instances for the root space, in order of when they were fully hydrated. */
declare const instances: IPartAny[]
/** The immutable list of every part in the root space, in order of when they were fully hydrated. */
declare const allParts: IPartAny[]