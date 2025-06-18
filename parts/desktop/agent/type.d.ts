class PartAgent extends OSFacet {
 readonly isMac: boolean
 readonly isSafari: boolean
 readonly shiftKeysDown: number
 readonly contextKeysDown: number
}
declare function element(parent: HTMLElement, tagname: string): HTMLElement
declare function svg(parent: HTMLElement, ...paths: string[]): SVGElement
declare const agent: PartAgent