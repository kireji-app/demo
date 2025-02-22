declare function element(parents: HTMLElement, tagname: string): HTMLElement
declare function increment(): void
declare function decrement(): void
declare const part: Part
declare const inherit: Part
declare const subparts: Part[]
declare const app: App
declare const root: Root
declare const client: Client
declare const server: Server
declare class Part extends Array<Part> {
 readonly id: number
 readonly host: string
 readonly size: bigint
 readonly index: number
 readonly state: bigint[]
 readonly choice: Part[]
 readonly parent?: Part
 readonly offset: bigint
 readonly core: Core
 readonly stateCache: bigint[]
 readonly conjunctionDivisor: bigint
 insert(value: string | Part, unshift?: boolean): Part
 initialize?(): Promise<void>
 setLayer(layer: number, newState: bigint): Promise<void>
 propagateLeafward(layer: number, newState: bigint): Promise<void>
 propagateRootward(layer: number, subparts?: Part[]): Promise<void>
 setDocument(layer: number): Promise<void>
 unsetDocument(layer: number): Promise<void>
}
declare class Disjunction extends Part {
 readonly choice: Part[]
 readonly addends: [Part | string]
}
declare class Conjunction extends Part {
 readonly factors: Part[]
}
declare class Root extends Disjunction {
 readonly environment: string
 readonly primaryLayer: number
 readonly stagingLayer: number
 resetStagingLayer(): Promise<void>
}
declare class Server extends Part { }
declare class Client extends Disjunction {
 requestedAppHost: string
 fallbackAppHost: string
}
declare class App extends Part {
 readonly fps: number
 readonly time: DOMHighResTimeStamp
 readonly isMac: boolean
 readonly radix: string
 readonly documentState: bigint
 readonly meanFrameTime: number
 readonly shiftKeysDown: number
 readonly addressbarState: number
 readonly contextKeysDown: number
 readonly animationFrameID: number
 readonly throttleDuration: number
 readonly throttleStartTime: number
 requestFrame(now: DOMHighResTimeStamp): void
 parseStateFromAddressbar(): void
 encodeState(state: bigint): string
 stageState(target: Part, state: bigint, resetStagingLayer?: boolean): Promise<string>
}
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
declare class Core {
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