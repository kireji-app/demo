declare interface IParts extends ITopLevelDomain {
 readonly core: ICore
 readonly user: IUser
 readonly desktop: IDesktop
}

declare interface IPartsApexDomain extends IApexDomain {
 readonly "..": IParts
}