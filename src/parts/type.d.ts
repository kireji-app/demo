declare interface IParts extends ITopLevelDomain {
 readonly abstract: IAbstract
 readonly core: ICore
 readonly desktop: IDesktop
 readonly user: IUser
}

declare interface IPartsApplication extends IApplication {
 readonly "..": IParts
}