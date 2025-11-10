declare interface IApp
 extends ITopLevelDomain<IAppApplication> {

 // Subparts.
 readonly kireji: IKirejiApp
}

declare type IAppApplication =
 IApplication<IApp, IPart<IAppApplication, IPartAny>>