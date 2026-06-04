declare interface ICom
 extends ITopLevelDomain<IComApp> {

 // Subparts.
 readonly ejaugust: IEJAugust
}

declare type IComApp =
 IApp<ICom, IPart<IComApp, IPartAny>>