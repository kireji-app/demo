/** A class which simplifies the process of deploying to four environments
 * (build, server, service worker, window) by giving them all the same
 * routing functions, virtual DOM and synchronous fetch method which can
 * produce both static assets and dynamically generated files. */
declare class Framework {

 /** A list of hosts collected during initialization. This is temporary. Later, we will probably remove the 'nesting' of string collections and the list of hosts will be provided for free. */
 static readonly hosts: string[]

 /** A cache of the response objects which have been produced by the fetch operation so far. */
 static readonly responses: object

 /** A cache of the framework objects that have been instantiated so far (used to prevent compiling the same script twice). */
 static readonly frameworks: Framework[]

 /** The maximum safe length of a URI path segment, used for determining the maximum safe route cardinality.
  * 
  * Equal to 2000.
 */
 static readonly maxPathLength: number

 /** The entire system as a single JavaScript string. */
 static readonly portableString: string

 /** The alphabet that Source Map Version 3 uses to base64 encode its source mapping data segments. */
 static readonly sourceMapRadix: string

 /** A runtime-only archive of the strings which have been generated dynamically. */
 static readonly renderedStrings: Map<string, string>

 /** The maximum length for a path segment in a URI. Equal to 250. */
 static readonly maxSegmentLength: number

 /** The alphabet used when encoding bigints as path segments. A URI path-friendly revision to Framework.sourceMapRadix. */
 static readonly pathSegmentRadix: string

 /** Data about the locator symbols marks that determine the source mappings for code originating as string literals. */
 static readonly sourcePositionMarks: object

 /** The regular expression used to pick out source position marks from code. */
 static readonly sourcePositionMarkPattern: RegExp

 /** A type used for tracking source code mapping while packing data from one or more files into a single new file. */
 static readonly SourceMappedFile = SourceMappedFile

 /** The current class, as a string. */
 static readonly sourceCode: string

 /** Populates the needed runtime values and then boots the virtual operating system. */
 static initialize(GLOBE): void
 /** Traverses the actual computer file system to pack source files into a collection of strings so that they can be inlined in the resulting file.
  * 
  * Throws an error if not in the build environment. */
 static buildStringCollection(HOST: string): string
 /** Generates the string called `portable.js`, which contains this class and an inline cache of the git repository. */
 static render(): string
 /** A synchronous server that can respond with every asset in the framework, both dynamic and static.  */
 static fetchSync(REQUEST: Request): Response
 /** A function that encodes source code mappings according to the Source Map Version 3 specification. */
 static encodeSourceMap(DECODED_MAPPINGS: []): string
 /** The part constructor obtained by evaluating `framework.script.` */
 readonly PartConstructor: typeof CorePart
 /** The host used to lookup all of the source code for the source file. */
 readonly host: string
 /** Whether or not the current framework is building a Core part, which has no parent type. */
 readonly isCore: boolean
 /** The compiled string which the framework evaluates to a class. */
 readonly script: string
 /** An array of subdomain names obtained by splitting the host at "." and adding "dns-root". */
 readonly domains: string[]
 /** A properly formatted class name made by converting the host's subdomain from kebab-case to PascalCase and append "Part".
  * 
  * Example: "www\.example\.part" => "WwwPart"
 */
 readonly niceName: string
 /** An object that serializes the method signatures and base type for the class script the framework compiled. The object is parsed from `part.json` in the custom string directory (or `{}` if no string is found). It's direct prototype object is parsed from `part.json` in the stock string directory (also {} if not found). Finally, the stock prototype's prototype is the framework's parent's partJSON or null, if it is the Core. */
 readonly partJSON: PartData
 /** The inverse of pathToRoot. The path "back up" to dns-root from the directory containing the source code the framework used. */
 readonly pathToRoot: string
 /** All of the data collected about the source of each method added to the type class compiled by the framework. */
 readonly methodData: MethodData<MethodDataEntry>
 /** The dedicated SourceFile which the framework was created to assemble and evaluate. */
 readonly sourceFile: SourceFile
 /** The index of framework.js in the list of source mapping files for the framework's dedicated sourceFile. */
 readonly buildSource: number
 /** The path to the folder in the git repo containing the source code that the framework compiled. */
 readonly pathFromRoot: string
 /** A lookup table which tells all of the static assets the part can render as well as which string collection they came from (stock vs. custom). */
 readonly ownStringNameTable?: Map<string, SourceDirectory<string>>
 /** The collection of strings obtained when using the framework's host to traverse the dns-root string collection. */
 readonly stockStringCollection?: SourceDirectory<string>
 /** An optional collection (defaults to `{}`) which overrides any string in the collection corresponding to the framework's host directory dns-root. */
 readonly customStringCollection?: SourceDirectory<string>
 /** An array of all the strings whose render method is defined directly on the part type. */
 readonly ownRenderMethodIDs: string[]
 constructor(HOST: string, CUSTOM_FILES: SourceDirectory): Framework
 /** Reads a static asset string from the framework's two string directories, passing the call to the parent framework if nothing is found on the one and returning a fallback if nothing is found all the way to Core. */
 readString(STRING_NAME, FALLBACK): void
 /** Reads a static asset string from the framework's two string directories, returning a fallback nothing is found.*/
 readOwnString(STRING_NAME, FALLBACK): void
 /** Traverses up the parent chain to add an inherited method prefix to the the body of methods which will be added to the compiled class. */
 addMethodScope(FILE, IS_VIEW): void
 /** Traverses up the parent chain to add an inherited method prefix to the body of the anonymous method in the framework script which returns the newly generated class instance. */
 addFrameworkScope(FILE): void
 /** Adds only the current framework's own method prefix script to the given file. */
 addOwnScopeString(STRING_NAME, FILE, INDENT = "  "): void
}


declare interface SourceDirectory<T> {
}

declare interface MethodDataEntry {
 readonly url: string
 readonly source: number,
 readonly content: string
 readonly arguments: string[]
}

declare interface MethodData<T> {
 readonly ["part-distribute-initialize"]: T

 readonly ["render"]: T

 readonly ["route-set"]: T
 readonly ["route-collect"]: T
 readonly ["route-distribute"]: T

 readonly ["view-remove"]: T
 readonly ["view-add"]: T
 readonly ["view-populate"]: T
 readonly ["view-distribute-update"]: T
 readonly ["view-distribute-end"]: T
}

declare interface PartData extends MethodData<string[]> {
 readonly extends: string
}

class SourceMappedFile {
 readonly lines: string[]
 readonly mappings: []
 readonly sources: string[]
 readonly scripts: [string | null]
 readonly framework: Framework
 addLine(string: string, srcIndex: number, ogLn: number, ogCol: number, indent: string, mapTokens: boolean): void
 addLines(strings: string[], srcIndex: number, ogLn: number, ogCol: number, indent: string, mapTokens: boolean): void
 addSource(source: string, script: string | null = null): number
 packAndMap(url?: string): string
 getMap(): string
}

/** A string representing which of four known environments the framework is running on.
 * 1. "build"
 *     - The project is running in it's unpacked state.
 *     - The script, `framework.js`, is running in node.
 *     - It is sitting in a clone of its git repository and can read/write files.
 *     - It was called with `node framework.js`.
 *     - It's task is to package and deploy itself.
 * 2. "server"
 *     - The project is packed and deployed.
 *     - The script, `portable.js` is running in node.
 *     - It only has an inline cache of its git repository and can only read files.
 *     - It was triggered by a network request (probably for index.html, but could for be anything).
 *     - It's task is to enter the given state and respond with a snapshot of what the machine renders in that state.
 * 3. "worker"
 *     - Behavior and context matches "server" except that it is running in the ServiceWorkerGlobalScope instead of node.js.
 * 3. "window"
 *     - The project is packed and deployed.
 *     - The script, `portable.js` is running in the Window.
 *     - It only has an inline cache of its git repository and can only read files.
 *     - The state changes are triggered by the user. The system's job is to patch the DOM and the address bar URL as the user interacts.
*/
declare const ENVIRONMENT: string
/** Whether the project is deploying/deployed as the live, public deployment (as determined by the absence of non-production build tags). */
declare const IS_PRODUCTION: boolean
/** A list of tags describing the build version. */
declare const TAGS: string[]
/** A debugging value for reliably switching between hosts in local and staging builds. */
declare const DEVELOPMENT_HOST: string
/** A packed archive of the git repository. */
declare const STRING_COLLECTION: SourceDirectory
/** A number used to control the detail in logs. Only messages with a priority less than or equal to this number will be logged. */
declare const SERVER_VERBOSITY: number
/** A wrapper class that constructs a part of the given host type.
 * 
 * If the host type doesn't exist yet or if CUSTOM_STRING_COLLECTION is
 * passed, creates a new framework, compiles a new type class from the host
 * source code and any source code in CUSTOM_STRING_COLLECTION, caches the new
 * type, and then returns a new instance of it. */
declare class Part {
 constructor(HOST, CUSTOM_STRING_COLLECTION): CorePart
}
/** An object dedicated to this method script's type and containing
 * data collected while compiling the source code for that type.
 * 
 * This is the framework for the currently evaluated source code file.
 * 
 * It may or may not differ from `part.framework`, the part's ultimate type framework.*/
declare const framework: Framework
/** The host of the currently evaluating script. */
declare const SCRIPT_HOST: string

/** Returns an array of content information based on the given string name. */
declare function headerOf(STRING_NAME: string): [string, string, string]
/** A unicode-safe replacement for btoa. */
declare function btoaUnicode(BODY: string): string
declare function log(VERBOSITY: number, ...DATA: any[]): void
declare function warn(...DATA: any[]): void
declare function debug(...DATA: any[]): void
declare function openLog(VERBOSITY: number, ...DATA: any[]): void
declare function closeLog(VERBOSITY: number, ...DATA: any[]): void