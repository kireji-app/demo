/** A class which simplifies the process of deploying to four environments
 * (build, server, service worker, window) by giving them all the same
 * routing functions, virtual DOM and synchronous fetch method which can
 * produce both static assets and dynamically generated files. */
declare class Framework {
 /** Populates the global object and then boots the user configuration space. */
 static initialize(buildData): void
 /** A type used for source mapping and packing data from one or more files into a single new file. */
 static readonly SourceMappedFile = SourceMappedFile
 /** A cache of the response objects which have been produced by the fetch operation so far. */
 static readonly responses: object
 /** A cache of the framework objects that have been instantiated so far (used to prevent compiling the same script twice). */
 static readonly frameworks: Framework[]
 /** The current class, as a string. */
 static readonly sourceCode: string
 /** An array of environment names corresponding to the four environments that the framework can run in.
  * ```
  * ["window", "worker", "build", "server"]
  * ``` */
 static readonly environments = ["window", "worker", "build", "server"]
 /** A runtime-only archive of the files (as strings) which have been generated dynamically. */
 static readonly renderedFiles: Map<string, string>
 /** Data about the locator symbols marks that determine the source mappings for code originating as string literals. */
 static readonly sourcePositionMarks: object
 /** The regular expression used to pick out source position marks from code. */
 static readonly sourcePositionMarkPattern: RegExp

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
 /** An object that serializes the method signatures and base type for the class script the framework compiled. The object is parsed from the file `part.json` in the custom directory (or `{}` if no file is found). It's direct prototype object is parsed from `part.json` in the stock directory (also {} if not found). Finally, the stock prototype's prototype is the framework's parent's partJSON or null, if it is the Core. */
 readonly partJSON: PartData
 /** The inverse of pathToRoot. The path "back up" to dns-root from the directory containing the source code the framework used. */
 readonly pathToRepo: string
 /** All of the data collected about the source of each property added to the type class compiled by the framework. */
 readonly property: Property<PropertyEntry>
 /** The dedicated SourceMappedFile which the framework was created to assemble and evaluate. */
 readonly sourceFile: SourceMappedFile
 /** The index of framework.js in the list of source mapping files for the framework's dedicated sourceMappedFile. */
 readonly buildSource: number
 /** The path to the folder in the git repo containing the source code that the framework compiled. */
 readonly pathFromRepo: string
 /** A lookup table which tells all of the static assets the part can render as well as which directory they came from (stock vs. custom). */
 readonly ownFilenameTable?: Map<string, SourceDirectory<string>>
 /** The archived repository files (strings) and folders (objects) obtained when using the framework's host to traverse the inline repository archive. */
 readonly stockDirectory?: SourceDirectory<string>
 /** An optional directory (defaults to `{}`) whose files are added on top of the files in the framework's stock directory before the class is compiled. */
 readonly customDirectory?: SourceDirectory<string>
 /** An array of all the property IDs which represent a custom render render method defined directly on the part type. */
 readonly ownRenderMethodIDs: string[]
 constructor(inputHost: string, customDirectory: SourceDirectory): Framework
}
declare interface SourceDirectory<T> {
}
declare interface PropertyTable<T> {
 readonly ["part-distribute-initialize"]: T

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
declare interface PartData extends PropertyTable<string[]> {
 readonly extends: string
}
class SourceMappedFile {
 /** The alphabet that Source Map Version 3 uses to base64 encode its source mapping data segments. */
 static readonly radix: string
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
/** A wrapper class that constructs a part of the given host type.
 * 
 * If the host type doesn't exist yet or if CUSTOM_STRING_COLLECTION is
 * passed, creates a new framework, compiles a new type class from the host
 * source code and any source code in CUSTOM_STRING_COLLECTION, caches the new
 * type, and then returns a new instance of it. */
declare class Part {
 constructor(HOST, CUSTOM_STRING_COLLECTION): CorePart
}
/** A string representing which of four known environments the framework is running on.
 * 1. "build"
 *     - Unpacked in clone (shallow in the production environment) of the project git repo in node.
 *     - It was called by `node framework.js`.
 *     - It's task is to pack and deploy itself.
 * 2. "server"
 *     - Packed and deployed as a serverless function in node.
 *     - It was created by Vercel and its state is set for and by the URL of a window network request.
 * 3. "worker"
 *     - Packed and deployed as the browser's ServiceWorker.
 *     - It was created by a window and its state is set for and by the URL of a window network request.
 * 3. "window"
 *     - Packed and deployed as a front-end framework in the browser window.
 *     - It was created by a server-rendered script to transfer rendering control from server to client. */
declare const environment: string
/** True if the framework was built on the cloud from the main branch. */
declare const production: boolean
/** All of the inline information compiled from the git repo in node by the build process. */
declare const build: {
 /** One of three strings representing the severity of the API change. Used to automatically compute the correct semantic version at build time. */
 readonly change: "major" | "minor" | "patch"
 /** A number used to control the detail in logs. Only messages with a priority less than or equal to this number will be logged. */
 readonly verbosity: number
 /** Whether or not this is a local build. */
 readonly local: boolean,
 /** The git branch for this build version. */
 readonly branch: string
 /** The hash of the most recent git commit at build time. */
 readonly hash: string
 /** The automatically generated semantic version number of the current build. */
 readonly semanticVersion: {
  /** The part of the version number which increments when there are breaking changes to the routes of the user space. */
  readonly major: number
  /** The part of the version number which increments when there are non-breaking additions to the routes of the user space. */
  readonly minor: number
  /** The part of the version number which increments when there are no changes to the routes of the user space. */
  readonly patch: number
 },
 /** A packed archive of the git repository at build time. */
 readonly repository: SourceDirectory
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
declare function serialize(VERBOSITY: number, ...DATA: any[]): void
/** Represents metadata and processing logic for a single property
 * of the framework's class script. If the property is a method or getter/setter, it
 * parses the method's ID and generates its signature, dynamic constants and body.
 * If the property is a static file, a simple getter method is created automatically.
 * 
 * This is a nested type. There is a dedicated instance of this type for each framework instance. */
declare class Property {
 /** Regular expression to validate if a string is a valid JavaScript identifier. */
 static readonly identifierPattern: RegExp;
 /** Traverses up the framework parent chain to add an inherited set of constant declarations to the the body of methods which will be added to the compiled class. */
 static addConstants(targetFile): void
 /** Traverses up the framework parent chain to determine which constant declarations are used in the given method data. */
 static collectConstants(targetFramework, targetProperty): void
 /** Reads a static file from the framework's two directories, returning a fallback if nothing is found.*/
 static readOwnString(filename, fallback): void
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
 /** Flag indicating if the `niceName` can be used directly as a property name
  * in code (i.e., it's a valid identifier or a Symbol representation). */
 readonly hasValidPropertyName: boolean;
 /** The string representation used to reference the method/property in code.
  * Uses `niceName` directly if valid, otherwise wraps it in brackets/quotes (`["niceName"]`).
  * Example: `myMethod`, `[Symbol.iterator]`, `["property-with-hyphens"]`. */
 readonly propertyReference: string;
 /** The string representation used to access the property via `this` or `super`.
  * Uses dot notation (`.niceName`) if possible, otherwise bracket notation (`["niceName"]`).
  * Example: `.myMethod`, `[Symbol.iterator]`, `["property-with-hyphens"]`. */
 readonly propertyAccessor: string;
 /** The string representing the method's arguments list, including parentheses.
  * Derived from framework configuration (`framework.partJSON[PROPERTY_ID]`).
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