declare interface ICom
 extends ITopLevelDomain<IComApplication> {

 // Subparts.
 readonly ejaugust: IEJAugust
}

declare type IComApplication =
 IApplication<ICom, IPart<IComApplication, IPartAny>>