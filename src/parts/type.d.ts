declare interface IParts extends ITopLevelDomain {
 readonly abstract: IAbstract
 readonly core: ICore
 readonly desktop: IDesktop
 readonly user: IUser
}

declare interface IPartsApexDomain extends IApexDomain {
 readonly "..": IParts
}