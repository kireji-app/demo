declare interface IApp extends ITopLevelDomain {
 readonly kireji: IKirejiApp
}
declare interface IAppApexDomain extends IApexDomain {
 readonly "..": IApp
}