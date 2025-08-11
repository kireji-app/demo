interface IAgent extends IFacet {
 readonly isMac: boolean
 readonly isSafari: boolean
}
declare function element(parent: HTMLElement, tagname: string): HTMLElement
declare function svg(parent: HTMLElement, ...paths: string[]): SVGElement
declare const agent: IAgent