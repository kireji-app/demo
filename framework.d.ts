declare const BUILD: {
 readonly tags: string[]
 readonly host: string,
 readonly change: string,
 readonly stringCollection: SourceDirectory
}

declare interface SourceMappedFile {
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

declare interface SourceDirectory<T> {
}

declare interface MethodDataEntry {
 readonly url: string
 readonly source: number,
 readonly content: string
 readonly arguments: string[]
}

declare interface MethodData<T> {
 readonly ["parts-set"]: T

 readonly ["render"]: T

 readonly ["route-set"]: T
 readonly ["route-bubble"]: T
 readonly ["route-capture"]: T

 readonly ["task-end"]: T
 readonly ["task-run"]: T
 readonly ["task-update"]: T
 readonly ["task-install"]: T
 readonly ["task-capture-update"]: T
 readonly ["task-capture-execution"]: T
}

declare interface PartData extends MethodData<string[]> {
 readonly extends: string
}

declare class Framework {
 static readonly root: RootPart
 static readonly hosts: string[]
 static readonly extends: string
 static readonly rootHost: string
 static readonly filenames: FrameworkFilenames
 static readonly responses: object
 static readonly verbosity: number
 static readonly frameworks: Framework[]
 static readonly outputRoot: string
 static readonly environment: string
 static readonly maxSegments: number
 static readonly isProduction: boolean
 static readonly sourceMapRadix: string
 static readonly renderedStrings: SourceDirectory<string>
 static readonly maxSegmentLength: number
 static readonly pathSegmentRadix: string
 static readonly sourcePositionMarks: object
 static readonly sourcePositionMarkPattern: RegExp

 static log(VERBOSITY: number, ...DATA: any[]): void
 static warn(VERBOSITY: number, ...DATA: any[]): void
 static debug(VERBOSITY: number, ...DATA: any[], METHOD: string): void
 static openLog(VERBOSITY: number, ...DATA: any[]): void
 static closeLog(VERBOSITY: number, ...DATA: any[]): void
 static compile(): string
 static headerOf(FILENAME: string): string
 static fetchSync(REQUEST: Request): Response
 static initialize(): void
 static btoaUnicode(BODY: string): string
 static getDirectory(HOST: string): string
 static encodeSourceMap(DECODED_MAPPINGS: []): string

 readonly PartConstructor: typeof CorePart
 readonly host: string
 readonly isCore: boolean
 readonly script: string
 readonly domains: string[]
 readonly extends: string
 readonly niceName: string
 readonly partJSON: PartData
 readonly directory: string
 readonly pathToRoot: string
 readonly methodData: MethodData<MethodDataEntry>
 readonly sourceFile: SourceFile
 readonly buildSource: number
 readonly pathFromRoot: string
 readonly customStringCollection?: SourceDirectory<string>

 addScope(TARGET_FILENAME: string, IS_TASK?: boolean, IS_DYNAMIC_FILE?: boolean, FILE?: SourceFile): void
 hasOwnFile(FILENAME: string): boolean
 constructor(HOST: string, CUSTOM_FILES: SourceDirectory): Framework
 getSourceObject(FILENAME: string): SourceDirectory | undefined
 openStaticFile(FILENAME: string, FALLBACK: string): string
 openOwnStaticFile(FILENAME: string, FALLBACK: string): string
 addFrameworkScope(FILE: SourceFile): void
}