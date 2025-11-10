declare interface IParts
 extends ITopLevelDomain<IPartsApplication> {

 // Subparts.
 readonly abstract: IAbstract
 readonly core: ICore
 readonly desktop: IDesktop
 readonly user: IUser
}

declare type IPartsApplication =
 IApplication<IParts, IPart<IPartsApplication, IPartAny>>