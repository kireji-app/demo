interface IAgent
 extends IFacet<ICore> {

 // Runtime Properties.
 readonly isMac: boolean
 readonly isSafari: boolean
}

declare const agent: IAgent