declare interface IDNSRoot extends IMix {
 readonly "kireji.js": string
 readonly "index.html": string
 readonly "images.css": string
 readonly "static.css": string
 readonly "inline.css": string
 readonly app: IApp
 readonly click: IClick
 readonly com: ICom
 readonly io: IIo
 readonly parts: IParts
 /** One of three strings representing the severity of the API change. Used to automatically compute the correct semantic version at build time. */
 readonly change: "major" | "minor" | "patch"
 /** A number used to control the detail in logs. Only messages with a priority less than or equal to this number will be logged. */
 readonly verbosity: number
 /** The git branch for this build version. */
 readonly branch: string
 /** The hash of the most recent git commit at build time. */
 readonly gitSHA: string
 /** The automatically generated semantic version number of the current build. */
 readonly version: string
 /** Sets the configuration space to match the given request url string. */
 setRoute(REQUEST_URL: string): void
 /** The operating system's currently assigned root application.
  * 
  * This selection is encoded by the host of the current route. */
 readonly application: IPart
 /** A host-keyed object with all of the applications that are available from the web at their host thanks to DNS records. */
 readonly applications: Record<string, IApplication>
 /** A host-keyed object with all of the applications that are available and which are not using the placeholder error 501 prototype. */
 readonly liveApplications: Record<string, IApplication>
 /** The hash of the desired landing page, as computed from data parameters during the initial boot process. */
 readonly landingHash: string
 /** The host of the desired default app. The server will redirect to this when the user visits localhost:3000 to test locally. */
 readonly defaultApplication: string
 /** If in the client environment, an integer ID representing the application frame loop's current pending frame request. Null, otherwise. */
 readonly frameRequest: number | null
}
/** The root part. When JSON stringified, it should inline all information compiled from the git repo in node by the build process.
 * 
 * The serialized version should not include any values that are added *before* recursively hydrating the part tree. */
declare const _: IDNSRoot
/** A function which simplifies the process of deploying to three environments
 * (server, worker, client) by giving them all the same
 * routing functions, virtual DOM and synchronous fetch method which can
 * produce both static assets and dynamically generated files.
 * 
 * It creates a function scope in which all other .js files execute. It then boots the operating system. */
declare function ƒ(_): void
/** The source code of the boot function, as an array of strings representing each line. */
declare const sourceLines: string[]
/** Data about the locator symbols marks that determine the source mappings for code originating as string literals. */
declare const sourcePositionMarks: object
/** The regular expression used to pick out source position marks from code. */
declare const sourcePositionMarkPattern: RegExp
/** The host used to find all of the source code for the part whose code is currently being evaluated. */
declare const host: string
/** Whether or not the current part is the core part (`part.core.part`), which has no prototype. */
declare const isCore: boolean
/** The compiled string which should evaluate to an object. */
declare const script: string
/** An object that serializes method signatures and meta data during part object hydration.
 * The object is parsed from the file `part.json` (or `{}` if no file is found).
 * Its prototype is the prototype part's own partManifest or null, if it's the Core. */
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
declare interface ISourceDirectory<T> {
}
declare interface IPropertyTable<T> {
 readonly ["render"]: T

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
 readonly part: IPart
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
/** The host of the currently evaluating script. */
declare const SCRIPT_HOST: string
/** A unicode-safe replacement for btoa. */
declare function btoaUnicode(BODY: string): string
/** Creates a main-thread-blocking loop for the given length of time. */
declare function hang(timeInMilliseconds: number): void
declare function warn(...DATA: any[]): void
declare function debug(...DATA: any[]): void
declare function log(VERBOSITY: number, ...DATA: any[]): void
declare function openLog(VERBOSITY: number, ...DATA: any[]): void
declare function closeLog(VERBOSITY: number, ...DATA: any[]): void
/** A function which wraps JSON.stringify using a replacer which can serialize BigInt values. */
declare function serialize(data: any): void
/** Represents metadata and processing logic for a single property
 * of the part. If the property is a method or getter/setter, it
 * parses the method's ID and generates its signature, dynamic constants and body.
 * If the property is a static file, a simple getter method is created automatically.
 * 
 * This is a nested type. There is a dedicated instance of this type for each part. */
declare class Property {
 /** Regular expression to validate if a string is a valid JavaScript identifier. */
 static readonly identifierPattern: RegExp;
 /** Traverses the prototype chain to add an inherited set of constant declarations to the the body of methods which will be added to the part during hydration. */
 static addConstants(targetFile): void
 /** Traverses the prototype chain to determine which constant declarations are used in the given method data. */
 static collectConstants(targetPart, targetProperty): void
 /** The original kebab-case identifier string for this property. */
 readonly id: string;
 /** The expected file name for storing the method's source code.
  * Typically `${PROPERTY_ID}.js`. */
 readonly filename: string;
 /** Flag indicating if this property is an automatic getter generated by the framework.
  * Determined by checking if `id` starts with "auto-". */
 readonly isAuto: boolean;
 /** The raw source code for the body of the method.
  * For 'auto' methods, it's a generated template string.
  * Otherwise, it's read from the corresponding file (`filename`).
  * Undefined if reading fails. */
 content: string | undefined;
 /** Flag indicating if this method is related to view logic.
  * Determined by checking if `ids` starts with "view-". */
 readonly isView: boolean;
 /** Flag indicating if this method is asynchronous.
  * Determined by checking if `id` starts with "async-". */
 readonly isAsync: boolean;
 /** Flag indicating if this method represents a well-known Symbol (e.g., Symbol.iterator).
  * Determined by checking if `id` starts with "symbol-". */
 readonly isSymbol: boolean;
 /** Flag indicating if this property is a getter or setter.
  * Determined by checking if `id` starts with "get-" or "set-". */
 readonly isGetOrSet: boolean;
 /** A processed, potentially more human-readable or code-friendly name for the method.
  * - For Symbols: `[Symbol.symbolName]`
  * - For certain get/set with dots: `["file.extension"]`
  * - For auto-getters: The base property name (quoted if not a valid identifier).
  * - For kebab-case method IDs: Transformed into camelCase (e.g., "view-update" -> "updateView").
  * - Otherwise: The original `id`. */
 readonly niceName: string;
 /** Represents and manages constant declarations (`const ... = ...`) found or used
  * within the method's body, handling dependencies between them. */
 static readonly Constant: typeof MethodConstant;
 /** The index of the source object associated with this method's content. */
 readonly source: number;
 /** An array containing the lines of the method's source code (`content`).
  * Empty if `content` is undefined. */
 readonly lines: string[];
 /** The Array.isArray() static method determines whether the passed value is an Array. */
 readonly toArray(value): boolean
 /** Flag indicating if the `niceName` can be used directly as a property name
  * in code (i.e., it's a valid identifier or a Symbol representation). */
 readonly hasValidPropertyName: boolean;
 /** The string representation used to reference the method/property in code.
  * Uses `niceName` directly if valid, otherwise wraps it in brackets/quotes (`["niceName"]`).
  * Example: `myMethod`, `[Symbol.iterator]`, `["property-with-hyphens"]`. */
 readonly propertyReference: string;
 /** The string representation used to access the property in source code.
  * Uses dot notation (`.niceName`) if possible, otherwise bracket notation (`["niceName"]`).
  * Example: `.myMethod`, `[Symbol.iterator]`, `["property-with-hyphens"]`. */
 readonly propertyAccessor: string;
 /** The string representing the method's arguments list, including parentheses.
  * Derived from part configuration (`partManifest[PROPERTY_ID]`).
  * Example: `(arg1, arg2)`. Defaults to `()` if no arguments defined. */
 readonly argumentString: string;
 /** String containing modifiers for the method signature (e.g., "async ", "get ", "set ").
  * Determined based on `isAsync`, `isGetOrSet`, `isAuto` flags. */
 readonly modifiers: string;
 /** The complete method signature string as it would appear in class syntax.
  * Combines `modifiers`, `propertyReference`, and `argumentString`.
  * Example: `async myMethod(arg1)`, `get propertyName()`, `[Symbol.iterator]()`. */
 readonly signature: string;
 /** Constructs a Property instance, parsing the PROPERTY_ID and processing
  * associated metadata and source code content.
  * @param PROPERTY_ID The unique identifier string for the method. */
 constructor(PROPERTY_ID: string);
}
/** Inner class representing a single constant declaration within a method's scope.
 * Manages its source, dependencies, and ensures it's declared when used. */
declare class MethodConstant {
 /** Registry of all MethodConstant instances created for the parent Property, keyed by identifier.
  * Includes the special 'PROPERTY_ID' constant. */
 static all: Record<string, MethodConstant | { identifier: string; usageRegExp: RegExp; ensureDeclarationAndDependencies(): void }>
 /** Registry of MethodConstant instances that have not yet been marked as used within the method body.
  * Keyed by identifier. Includes the special 'PROPERTY_ID' constant initially. */
 static unused: Record<string, MethodConstant | { identifier: string; usageRegExp: RegExp; ensureDeclarationAndDependencies(): void }>
 /** Flag indicating whether this specific constant has been used and its declaration
  * added to the output source file. */
 used: boolean
 /** An array of other MethodConstant instances that this constant depends on. */
 readonly requirements: MethodConstant[]
 /** The file path where the constant declaration was originally found. */
 readonly path: string
 /** The full line of source code for the constant declaration (e.g., "const PI = 3.14"). */
 readonly line: string
 /** The line number in the original source file where the constant was declared. */
 readonly lineNumber: number
 /** The index of the source associated with this constant's declaration line. */
 readonly source: number;
 /** The index of the '=' sign within the constant declaration line. */
 readonly equalsIndex: number;
 /** The identifier (name) of the constant. */
 readonly identifier: string;
 /** A regular expression used to detect usage of this constant's identifier within code lines.
  * Looks for the identifier as a whole word, not preceded by a dot. */
 readonly usageRegExp: RegExp;
 /** Manages a single inherited constant declaration, tracking its dependencies
  * and ensuring it's added to the source output when used.
  * @param SOURCE_PATH The file path where the constant declaration originates.
  * @param SOURCE_LINE The full line of the constant declaration source code.
  * @param SOURCE_LINE_NUMBER The line number in the source file.
  */
 constructor(SOURCE_PATH: string, SOURCE_LINE: string, SOURCE_LINE_NUMBER: number);
 /** Idempotent function that ensures that this constant and all its recursive dependencies (`requirements`)
  * are declared (added to the source file output). Marks the constant as used. */
 ensureDeclarationAndDependencies(): void;
}
/** The incoming request url string.
 * 
 * Available only in user.setRoute(). */
declare const REQUEST_URL: string
/** Gets a part instance from the root, given its array of domain parts. */
declare function getPartFromDomains(domains): IPart
/** Trades a string pathname for the bigint routeID. */
declare function decodeRoute(pathname: string): bigint
/** Trades a string segment for the bigint routeID. */
declare function decodeSegment(pathname: string): bigint
/** Trades a bigint routeID for a string pathname. */
declare function encodeRoute(routeID: bigint): string
/** Trades a bigint routeID for a string segment. */
declare function encodeSegment(routeID: bigint): string
/** Returns a string representing the given bigint in scientific notation (a coefficient times 10 to some power). When html is true, the power will be wrapped in a superscript tag. Otherwise, it will use unicode superscript characters. */
declare function scientific(x: bigint, html: boolean = false): string
/** The immutable list of runtime instances for the root space, in order of when they were fully hydrated. */
declare const instances: IPart[]
/** The immutable list of every part in the root space, in order of when they were fully hydrated. */
declare const allParts: IPart[]