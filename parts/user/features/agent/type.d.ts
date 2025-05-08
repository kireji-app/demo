class PartAgent extends UserFeature {
 readonly isMac: boolean
 readonly isSafari: boolean
 readonly shiftKeysDown: number
 readonly contextKeysDown: number
}
declare const agent: PartAgent
declare function element(parent: HTMLElement, tagname: string): HTMLElement
declare function svg(parent: HTMLElement, ...paths: string[]): SVGElement