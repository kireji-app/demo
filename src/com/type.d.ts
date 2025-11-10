declare interface ICom
 extends ITopLevelDomain<IComApplication> {

 // Subparts.
 readonly orenjinari: IOrenjinari
 readonly ejaugust: IEJAugust
}

declare type IComApplication =
 IApplication<ICom, IPart<IComApplication, IPartAny>>