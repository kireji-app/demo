declare interface ICom
 extends IMix<IComApp, IEJAugust> {

 // Subparts.
 readonly ejaugust: IEJAugust
}

declare type IComApp =
 IApp<ICom, IPart<IComApp, IPartAny>>