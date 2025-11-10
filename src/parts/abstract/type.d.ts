declare interface IAbstract
 extends IErrorApplication<IParts> {

 // Subparts.
 readonly application: IApplication<IAbstract, null>
 readonly clip: IClip<IAbstract, null>
 readonly error: IErrorApplication<IAbstract>
 readonly facet: IFacet<IAbstract, null>
 readonly match: IMatch<IAbstract, null>
 readonly mix: IMix<IAbstract, null>
 readonly part: IPart<IAbstract, null>
 readonly scroller: IScroller<IAbstract, null>
 readonly section: IApplicationSection<IAbstract, null>
 readonly sections: IApplicationSections<IAbstract, null>
 readonly tld: ITopLevelDomain<IAbstract, null>
}