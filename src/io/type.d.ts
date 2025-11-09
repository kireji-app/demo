declare interface IIo extends ITopLevelDomain {
 readonly kireji: IKirejiIo
}

declare interface IIoApplication extends IApplication {
 readonly "..": IIo
}