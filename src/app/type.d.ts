declare interface IApp extends ITopLevelDomain {
 readonly kireji: IKirejiApp
}

declare interface IAppApplication extends IApplication {
 readonly "..": IApp
}