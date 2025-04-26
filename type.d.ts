/** A class which simplifies the process of deploying to four environments
 * (build, server, service worker, window) by giving them all the same
 * routing functions, virtual DOM and synchronous fetch method which can
 * produce both static assets and dynamically generated files. */
declare class Framework {
 /** Populates the global object and then boots the user configuration space. */
 static initialize(_BUILD): void
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
 /** The alphabet that Source Map Version 3 uses to base64 encode its source mapping data segments. */
 static readonly sourceMapRadix: string
 /** A runtime-only archive of the strings which have been generated dynamically. */
 static readonly renderedStrings: Map<string, string>
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
 /** An object that serializes the method signatures and base type for the class script the framework compiled. The object is parsed from `part.json` in the custom string directory (or `{}` if no string is found). It's direct prototype object is parsed from `part.json` in the stock string directory (also {} if not found). Finally, the stock prototype's prototype is the framework's parent's partJSON or null, if it is the Core. */
 readonly partJSON: PartData
 /** The inverse of pathToRoot. The path "back up" to dns-root from the directory containing the source code the framework used. */
 readonly pathToRepo: string
 /** All of the data collected about the source of each method added to the type class compiled by the framework. */
 readonly methodData: MethodData<MethodDataEntry>
 /** The dedicated SourceMappedFile which the framework was created to assemble and evaluate. */
 readonly sourceFile: SourceMappedFile
 /** The index of framework.js in the list of source mapping files for the framework's dedicated sourceMappedFile. */
 readonly buildSource: number
 /** The path to the folder in the git repo containing the source code that the framework compiled. */
 readonly pathFromRepo: string
 /** A lookup table which tells all of the static assets the part can render as well as which string collection they came from (stock vs. custom). */
 readonly ownStringNameTable?: Map<string, SourceDirectory<string>>
 /** The collection of strings obtained when using the framework's host to traverse the dns-root string collection. */
 readonly stockStringCollection?: SourceDirectory<string>
 /** An optional collection (defaults to `{}`) which overrides any string in the collection corresponding to the framework's host directory dns-root. */
 readonly customStringCollection?: SourceDirectory<string>
 /** An array of all the strings whose render method is defined directly on the part type. */
 readonly ownRenderMethodIDs: string[]
 constructor(HOST: string, CUSTOM_FILES: SourceDirectory): Framework
 /** Reads a static asset string from the framework's two string directories, returning a fallback nothing is found.*/
 readOwnString(STRING_NAME, FALLBACK): void
 /** Traverses up the framework parent chain to add an inherited set of constant declarations to the the body of methods which will be added to the compiled class. */
 addConstants(FILE): void
 /** Traverses up the framework parent chain to determine which constant declarations are used in the given method data. */
 collectConstants(FRAMEWORK, METHOD_DATA): void
}
declare interface SourceDirectory<T> {
}
declare interface MethodDataTable<T> {
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
declare interface PartData extends MethodDataTable<string[]> {
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
declare const ENVIRONMENT: string
/** The index of ENVIRONMENT in the array `Framework.environments`. */
declare const ENVIRONMENT_INDEX: number
/** Whether the project is deploying/deployed as the live, public deployment (as determined by the absence of non-production build tags). */
declare const IS_PRODUCTION: boolean
/** All of the inline information compiled from the git repo in node by the build process. */
declare const _BUILD: {
 /** A packed archive of the necessary type definitions. */
 readonly dnsRoot: SourceDirectory
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
 readonly version: string,
 /** The git commit message for this build version. */
 readonly message: string,
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
declare function warn(...DATA: any[]): void
declare function debug(...DATA: any[]): void
declare function log(VERBOSITY: number, ...DATA: any[]): void
declare function openLog(VERBOSITY: number, ...DATA: any[]): void
declare function closeLog(VERBOSITY: number, ...DATA: any[]): void
/** A function which wraps JSON.stringify using a replacer which can serialize BigInt values. */
declare function serialize(VERBOSITY: number, ...DATA: any[]): void
/** Represents metadata and processing logic for a single method
 * of the framework's class script. It handles parsing method IDs,
 * generating the method's signature, dynamically generated constants and method body. */
declare class MethodData {
 /** Regular expression to validate if a string is a valid JavaScript identifier. */
 static readonly identifierPattern: RegExp;
 /** Creates and registers a new MethodData instance for the given METHOD_ID.
  * @param METHOD_ID The unique identifier string for the method. */
 static fromMethodID(METHOD_ID: string): void
 /** The original kebab-case identifier string for this method. */
 readonly methodID: string;
 /** The expected filename for storing the method's source code.
  * Typically `${METHOD_ID}.js`. */
 readonly stringName: string;
 /** Flag indicating if this method is an automatic getter generated by the framework.
  * Determined by checking if `methodID` starts with "auto-". */
 readonly isAuto: boolean;
 /** The raw source code for the body of the method.
  * For 'auto' methods, it's a generated template string.
  * Otherwise, it's read from the corresponding file (`stringName`).
  * Undefined if reading fails. */
 content: string | undefined;
 /** Flag indicating if this method is related to view logic.
  * Determined by checking if `methodID` starts with "view-". */
 readonly isView: boolean;
 /** Flag indicating if this method is asynchronous.
  * Determined by checking if `methodID` starts with "async-". */
 readonly isAsync: boolean;
 /** Flag indicating if this method represents a well-known Symbol (e.g., Symbol.iterator).
  * Determined by checking if `methodID` starts with "symbol-". */
 readonly isSymbol: boolean;
 /** Flag indicating if this method is a property getter or setter.
  * Determined by checking if `methodID` starts with "get-" or "set-". */
 readonly isGetOrSet: boolean;
 /** A processed, potentially more human-readable or code-friendly name for the method.
  * - For Symbols: `[Symbol.symbolName]`
  * - For certain get/set with dots: `["property.name"]`
  * - For auto-getters: The base property name (quoted if not a valid identifier).
  * - For kebab-case method IDs: Transformed into camelCase (e.g., "view-update" -> "updateView").
  * - Otherwise: The original `methodID`. */
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
  * Derived from framework configuration (`framework.partJSON[METHOD_ID]`).
  * Example: `(arg1, arg2)`. Defaults to `()` if no arguments defined. */
 readonly argumentString: string;
 /** String containing modifiers for the method signature (e.g., "async ", "get ", "set ").
  * Determined based on `isAsync`, `isGetOrSet`, `isAuto` flags. */
 readonly modifiers: string;
 /** The complete method signature string as it would appear in class syntax.
  * Combines `modifiers`, `propertyReference`, and `argumentString`.
  * Example: `async myMethod(arg1)`, `get propertyName()`, `[Symbol.iterator]()`. */
 readonly signature: string;
 /** Constructs a MethodData instance, parsing the METHOD_ID and processing
  * associated metadata and source code content.
  * @param METHOD_ID The unique identifier string for the method. */
 constructor(METHOD_ID: string);
}
/** Inner class representing a single constant declaration within a method's scope.
 * Manages its source, dependencies, and ensures it's declared when used. */
declare class MethodConstant {
 /** Registry of all MethodConstant instances created for the parent MethodData, keyed by identifier.
  * Includes the special 'METHOD_ID' constant. */
 static all: Record<string, MethodConstant | { identifier: string; usageRegExp: RegExp; ensureDeclarationAndDependencies(): void }>
 /** Registry of MethodConstant instances that have not yet been marked as used within the method body.
  * Keyed by identifier. Includes the special 'METHOD_ID' constant initially. */
 static unused: Record<string, MethodConstant | { identifier: string; usageRegExp: RegExp; ensureDeclarationAndDependencies(): void }>
 /** Flag indicating if the special METHOD_ID constant has been used/declared.*/
 static methodIDUsed: boolean
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
// Assign the inner class type to the static property of the outer class
// This reflects the structure `methodData.Constant = class MethodConstant { ... }`
// Note: In typical TS, you'd define the inner class directly inside the outer one.
// This reflects the JS pattern used.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface MethodData { // This alternative uses declaration merging
//    Constant: typeof MethodConstant;
// }
// Using `static readonly Constant: typeof MethodConstant;` within MethodData is cleaner.