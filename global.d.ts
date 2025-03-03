declare function element(parents: HTMLElement, tagname: string): HTMLElement
declare function increment(): void
declare function decrement(): void
/** The ultimately part (type instance) on which the current script is being called.
 * 
 * Alias for `this` to disambiguate it from globalThis.
 * 
 * Not available in `define.js`. */
/// <reference path="./dns-root/parts/core/context.js" />
declare const part: Part
/** A proxy for `part.parent` that assigns gotten property values directly to `part`.
 * 
 * Shorthand for `part.parent.<property> = part.<property>`.*/
/// <reference path="./dns-root/parts/core/context.js" />
declare const inherit: Part
/** The host name of the currently evaluated script.
 * 
 * May be different from `part.host`.*/
/// <reference path="./dns-root/parts/core/context.js" />
declare const scriptHost: Part
/** The type of the currently evaluated script. 
 * 
 * May be different from `part.constructor`. */
declare const Type: typeof Part
/** The base type of Type. */
declare const Base: typeof Part
/** Available only in `propagateRootward.js`.
* 
* The subparts of `part` whose values have changed.*/
declare var LEAVES: Part[]
/** The integer index of the layer on which propagation is currently taking place.
 * |Filename|Availability
 * |-|-
 * |`context.js`|Not available.
 * |`define.js`|Not available.
 * |`postDefine.js`|Not available.
 * |`initialize.js`|Not available.
 * |`asyncContext.js`|Some positive integer.
 * |`setLayer.js`|Some positive integer.
 * |`propagateRootward.js`|Some positive integer.
 * |`propagateLeafward.js`|Some positive integer.
 * |`setDocument.js`|Equal to `root.primaryLayer`
 * |`updateDocument.js`|Equal to `root.primaryLayer`
 * |`unsetDocument.js`|Equal to `root.primaryLayer`*/
declare const LAYER: number
/** The incoming state to be propagated leafward. Available only in progateLeafward.js. */
declare const STATE: bigint
/** The framework that compiled the source code for the class instance of the currently evaluated script. */
declare const framework: Framework
/** The currently running application (not available in ServiceWorker). */
declare const app: Part & {
 /** The computed framerate of the application. */
 readonly fps: number
 /** The current session time. */
 readonly time: DOMHighResTimeStamp
 /** Whether or not the client OS is MacOS. */
 readonly isMac: boolean
 /** The alphabet used as the base when URI-encoding and -decoding a bigint state. */
 readonly radix: string
 /** The application state according to the rendered document. */
 readonly documentState: bigint
 /** The average length of time each frame is on screen in milliseconds. */
 readonly meanFrameTime: number
 /** The number of shift keys the user is holding down. */
 readonly shiftKeysDown: number
 /** The number of context keys (control on Windows, command on mac) the user is holding down. */
 readonly contextKeysDown: number
 /** The application state according to the addressbar. */
 readonly addressbarState: bigint
 /** The integer produced by the most recent call to requestAnimationFrame. */
 readonly animationFrameID: number
 /** The length of time between updates to the addressbar location. */
 readonly throttleDuration: number
 /** The session time when the addressbar was last updated.*/
 readonly throttleStartTime: number
 /** The main game loop, which must be running to handle most user interaction.*/
 requestFrame(now: DOMHighResTimeStamp): void
 /** Uses app.radix to parse the current location hash to override the current application state.*/
 parseStateFromAddressbar(): void
 /** Uses app.radix to turn a state into a location hash. */
 encodeState(state: bigint): string
 /** Updates a part on the staging layer and propagates it to the rest of the layer. */
 stageState(target: Part, state: bigint, resetStagingLayer?: boolean): Promise<string>
 /** The host element for the app's content. */
 containerHost: HTMLDivElement
 /** The shadow root of the app's content container. */
 container: ShadowRoot
 /** The main CSS stylesheet for the app. */
 styleSheet: CSSStyleSheet
 /** The main toolbar element. */
 toolbar: HTMLElement
 /** The home button element. */
 homeButton: HTMLButtonElement
 /** A spacer element in the toolbar. */
 toolbarSpacer: HTMLSpanElement
 /** Whether or not to show the fullscreen control. */
 showFullScreenControl: boolean
 /** Whether or not to show the share button. */
 showShareButton: boolean
 /** The share button element (if shown). */
 shareButton?: HTMLButtonElement
 /** The menu button element. */
 menuButton: HTMLButtonElement
 /** The fullscreen button element (if shown). */
 fullscreenButton?: HTMLButtonElement
 /** Gets the nested toolbar's shadow root. */
 getNestedToolbar(): ShadowRoot
 /** Destroys the nested toolbar. */
 destroyNestedToolbar(): void
 /** The main menu element. */
 menu: HTMLElement
 /** The sidebar element within the menu. */
 sidebar: HTMLDivElement
 /** The section in the sidebar containing app links. */
 appsSection: HTMLUListElement
 /** An object mapping app hosts to their corresponding list item elements. */
 appNodes: { [key: string]: HTMLLIElement }
 /** The settings section in the sidebar. */
 settingsSection: HTMLElement
 /** A line containing the tags label and the tags themselves. */
 tagsLine: HTMLSpanElement
 /** The label for the version tags. */
 tagsLabel: HTMLSpanElement
 /** A container for the version tags. */
 tags: HTMLSpanElement
 /** An array of elements representing the version tags. */
 tagElements: HTMLSpanElement[]
 /** The color mode control element. */
 colorModeButton: HTMLSpanElement
 /** The first label for the color mode control. */
 colorModeLabel1: HTMLSpanElement
 /** The second label for the color mode control. */
 colorModeLabel2: HTMLSpanElement
 /** The base element of the color mode slider. */
 colorModeBase: HTMLSpanElement
 /** The handle element of the color mode slider. */
 colorModeHandle: HTMLSpanElement
 /** The CSS stylesheet for the color mode. */
 colorModeStyleSheet: CSSStyleSheet;
}
/** The root part, which manages part layers. */
declare const root: Disjunction & {
 /** A string which is "client" when in a Window and "server" when in a ServiceWorker. */
 readonly environment: string
 /** The integer that identifies the primary layer, which controls all document rendering. */
 readonly primaryLayer: number
 /** The integer that identifies the staging layer, which doesn't affect document rendering. */
 readonly stagingLayer: number
 /** Sets the staging layer to be a clone of the primary layer. */
 resetStagingLayer(): Promise<void>
}
/** The root part for all client applications (not available in ServiceWorker). */
declare const client: Disjunction & {
 /** The host the client used to request an application. */
 requestedAppHost: string
}
/** The root part for all server activities (only available in ServiceWorker). */
declare const server: Server
/** The host of the currently evaluated script. */
declare const scriptHost: string

declare class Part extends Array<Part> {
 /** The framework instance which was dedicated to compiling the script of this type's class. */
 readonly static framework: Framework
 /** The index of this part, assigned in order of part creation. */
 readonly id: number
 /** The domain name used to identify this part's type. */
 readonly host: string
 /** The number of states this part can be in. */
 readonly size: bigint
 /** This part's index in it's parent. */
 readonly index: number
 /** This current state of this part expressed as its index in a virtual array of all of its states. */
 readonly state: bigint[]
 /** Available only on `disjunction.core.parts`.
  * 
  * The subpart which is currently chosen. */
 readonly choice?: Part[]
 /** The parent part.
  * 
  * *Note: There is no* `root.parent`. */
 readonly parent?: Part
 /** The parent part state at which this part becomes it's parent's chosen subpart.
  * 
  * Equal to `0n` if this part's index is `0` or it's parent is not a disjunction. */
 readonly offset: bigint
 /** The framework instance, which was dedicated to compiling the script of this part's class. */
 readonly framework: Framework
 /** When parent type is `conjunction.core.parts`, a cache of property `state` which the conjunction uses. Might become a third root layer.*/
 readonly stateCache: bigint[]
 /** When parent type is `conjunction.core.parts`, a divisor which the parent conjunction uses to encode and decode substate properties.*/
 readonly conjunctionDivisor: bigint
 insert(value: string | Part, unshift?: boolean): Part
 initialize?(): Promise<void>
 setLayer(LAYER: number, STATE: bigint): Promise<void>
 propagateLeafward(LAYER: number, STATE: bigint): Promise<void>
 propagateRootward(LAYER: number, LEAVES?: Part[]): Promise<void>
 setDocument(LAYER: number): Promise<void>
 unsetDocument(LAYER: number): Promise<void>
}
declare class Disjunction extends Part {
 readonly choice: Part[]
 readonly addends: [Part | string]
}
declare class Conjunction extends Part {
 readonly factors: Part[]
}
declare class Server extends Part { }
declare class SourceFile {
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
declare interface SourceDirectory {
 readonly "asyncContext.js"?: string
 readonly "context.js"?: string
 readonly "define.args"?: string
 readonly "define.js"?: string
 readonly "initialize.js"?: string
 readonly "postDefine.js"?: string
 readonly "propagateLeafward.js"?: string
 readonly "propagateRootward.js"?: string
 readonly "setDocument.js"?: string
 readonly "setLayer.js"?: string
 readonly "type.host"?: string
 readonly "unsetDocument.js"?: string
}
declare interface AsyncMethodData {
 readonly setLayer?: string
 readonly initialize?: string
 readonly propagateLeafward?: string
 readonly propagateRootward?: string
 readonly setDocument?: string
 readonly unsetDocument?: string
}
declare class Framework {
 static Type: typeof Part | null
 static BaseType: typeof Part | null
 static archive: {} | null
 static tags: string[] | null
 static vlqBase: string
 static baseHost: string
 static indexHTML: string
 static instances: object
 static isVerbose: boolean
 static clientRoot: string
 static domainRoot: string
 static asyncMethodArguments: AsyncMethodData
 static typeURL: string
 static contextURL: string
 static constructorURL: string
 static cloudScriptURL: string
 static clientScriptURL: string
 static asyncContextURL: string
 static postConstructorURL: string
 static constructorArgumentsURL: string
 static log(...data: any[]): void
 static createFile(sourceRoot: string): SourceFile
 static createType(host: string, options: SourceDirectory): typeof Part
 static createPart(host: string): Part
 static initialize(host: string): Promise<void>
 static compile(): string
 static encodeSourceMap(decodedMappings: [[[number]]]): string
 readonly host: string
 readonly asyncMethods: AsyncMethodData
 readonly get archive(): SourceDirectory
 compile(): void
 openClass(): void
 compileConstructor(): void
 compileMethods(): void
 closeClass(): void
 has(filename: string): boolean
 read(filename: string, fallback: string): string
 getSourceObject(filename): SourceDirectory
 addContext(isAsync?: boolean, file: SourceFile): void
}