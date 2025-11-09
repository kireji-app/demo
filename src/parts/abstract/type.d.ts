declare interface IAbstract extends IPartsApplication {
 readonly application: IApplication
 readonly clip: IClip
 readonly error: IErrorApplication
 readonly facet: IFacet
 readonly match: IMatch
 readonly mix: IMix
 readonly part: IPart
 readonly scroller: IScroller
 readonly tld: ITopLevelDomain
}

declare const abstract: IAbstract